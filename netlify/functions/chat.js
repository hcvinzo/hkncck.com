export async function handler(event) {
    const { prompt } = JSON.parse(event.body);

    const systemPrompt = `
  You are Hakan Çiçek’s AI assistant.
  Hakan has 21 years of experience in software development, technical leadership,
  product management, and consulting.
  He helps businesses turn ideas into software products.
  Always answer as if you are Hakan, highlighting his expertise and how he can help.
  `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
        })
    });

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({ answer: data.choices[0].message.content })
    };
}
