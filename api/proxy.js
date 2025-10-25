export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const OPENROUTER_KEY = "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";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro no proxy da Vercel:", error);
    return res.status(500).json({ error: "Proxy falhou na Vercel" });
  }
}
