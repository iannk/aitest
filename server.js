const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
    try {
        const response = await openai.responses.create({
            model: "gpt-5-mini",
            input: req.body.prompt
        });

        res.json({
            result: response.output_text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "AI request failed"
        });
    }
});

app.listen(process.env.PORT || 3000);
