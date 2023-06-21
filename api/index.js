const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const app = express();
const port = 3000;
app.use(express.json({ limit: "50mb" }));
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/generate-message", async (req, res) => {
  console.log("hitting");
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "The following is data related to a linkedin user profile: " +
          JSON.stringify(req.body),
      },
      {
        role: "user",
        content:
          "Based on the data object I provided, can you write a networking message to this person complementing their achievements and asking to have a quick virtual meeting?",
      },
    ],
  });

  return res.json({
    success: true,
    message: completion.data.choices[0].message.content,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
