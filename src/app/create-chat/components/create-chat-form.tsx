"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePrompt } from "@/functions/generate-prompt";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import {
  ChatConfigDuration,
  ChatConfigDurationEnum,
  useChatStore,
} from "@/store/chat";

const formSchema = z.object({
  topic: z.string({ required_error: "Please enter a topic" }).min(1),
  voiceURI: z.string({ required_error: "Please select a language" }).min(1),
  duration: z.string({ required_error: "Please select a duration" }).min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateChatForm() {
  const { speechSynthesisVoices } = useSpeechSynthesis();
  const { setConfig } = useChatStore();
  const { push } = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      voiceURI: "",
      duration: "",
    },
  });

  const findVoiceByURI = (voiceURI: string) => {
    return speechSynthesisVoices.find((voice) => voice.voiceURI === voiceURI);
  };

  function onSubmit(data: FormSchema) {
    const voice = findVoiceByURI(data.voiceURI);

    if (!voice) {
      return;
    }

    setConfig({
      topic: data.topic,
      voice: {
        lang: voice.lang,
        name: voice.name,
        uri: voice.voiceURI,
      },
      duration: data.duration as ChatConfigDuration,
      prompt: generatePrompt(
        voice.lang,
        data.topic,
        data.duration as ChatConfigDuration
      ),
    });

    push("/chat");
  }

  return (
    <Form {...form}>
      <form
        id="create-chat-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What topic do you want to talk about?</FormLabel>
              <FormControl>
                <Input placeholder="Travel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voiceURI"
          render={({ field }) => (
            <FormItem className="lg:flex-1">
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {speechSynthesisVoices.map((voice) => (
                    <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="lg:flex-1">
              <FormLabel>Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ChatConfigDurationEnum.SHORT}>
                    Short
                  </SelectItem>
                  <SelectItem value={ChatConfigDurationEnum.MEDION}>
                    Medium
                  </SelectItem>
                  <SelectItem value={ChatConfigDurationEnum.LONG}>
                    Long
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
