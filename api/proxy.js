export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const OPENROUTER_KEY = "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";

  try {
    const response = await fetch("https://api.openrouter.ai/v1/chat/completions", {
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
    console.error("Erro no proxy Vercel:", error);
    return res.status(500).json({ error: "Proxy falhou na Vercel" });
  }
}
