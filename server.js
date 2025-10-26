// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ⚠️ Keep your API key only on the server
const API_KEY = "AIzaSyCCi_Cinde_sPe5VbXsDbT8o1knZnzff9o";
const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-latest:generateContent";

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    res.json(data); // send full response to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch from Google API" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
