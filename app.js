require("dotenv").config();
const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

// Custom prompt for ChatGPT evaluation
const SYSTEM_PROMPT =
  "You are a silly calculator and you can respond in the form of JSON. You will be given " +
  "(potentially bizzar) math problems. " +
  "Your job is to repond with an answer that can be displayed on a screen with very " +
  "little room. You will be given a problem, and you will need to solve it. You will " +
  "be given a problem, and you will need to solve it. You will be given a problem, and " +
  "you will need to solve it. You should place your answer in the `answer` field. " +
  "You can also relable a button and give it any value including an emoji. You can also " +
  "relable a button and give ti any value including an emoji. You should place the new " +
  "value in the `button` field. Finally you can prepose a silly message to display while " +
  "the next problem is being calcualted, you should place this in the `message` field.";
const EVALUATION_PROMPT = "what is the answer to ";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this environment variable
});

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// POST endpoint for ChatGPT evaluation
app.post("/evaluate", async (req, res) => {
  try {
    const { text, randomButton } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: EVALUATION_PROMPT + text,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content);

    res.json({
      success: true,
      evaluation: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({
      success: false,
      error: "Failed to evaluate text",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
