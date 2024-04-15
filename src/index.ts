import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import dontenv from "dotenv";
dontenv.config();

const client = new OpenAIClient(
  process.env.AZURE_OPENAI_ENDPOINT as string,
  new AzureKeyCredential(process.env.AZURE_OPENAI_KEY as string)
);
const messages = [
  { role: "user", content: "What is the biggest city in Canada?" },
];

const { id, created, choices, usage } = await client.getChatCompletions(
  "gpt-4",
  messages
);

if (!choices || choices.length === 0) {
  throw new Error("No completions returned from the API");
} else {
  console.log("id: ", id);
  console.log("created: ", created);
  console.log("usage: ", usage);
  console.log("reply: ", choices[0].message!.content);
}
