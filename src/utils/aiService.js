// src/aiService.js
export async function getAIResponse(userPrompt) {
  try {
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    const textResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return textResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
