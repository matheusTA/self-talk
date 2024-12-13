import { ChatConfigDuration } from "@/store/chat";

const durationMap: Record<ChatConfigDuration, number> = {
  short: 5,
  medion: 10,
  long: 15,
};

export function generatePrompt(
  lang: string,
  topic: string,
  duration: ChatConfigDuration
) {
  return `Act as an ${lang} teacher. Ask me a question in ${lang} about the topic '${topic}'. After I answer, ask another question related to the same topic. Repeat this process ${durationMap[duration]} times keeping the tone natural and without numbering or labeling the questions. After my ${durationMap[duration]}º response, end the conversation with a brief message letting me know we've reached the end.`;
}
