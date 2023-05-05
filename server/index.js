import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello" });
});

app.post("/api", async (req, res) => {
  const query = req.body.query;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${query}`,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""'],
    });
    res.status(200).send({
      response: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

const port = 3000 || process.env.port;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
