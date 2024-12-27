"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { generatePrompt } from "@/functions/generate-prompt";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { GoogleGenerativeAiService } from "@/services/google-generative-ai-service";
import { useAiProviderStore } from "@/store/ai-provider";
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
  const [isCreating, setIsCreating] = useState(false);
  const { speechSynthesisVoices } = useSpeechSynthesis();
  const { setUpChatStore } = useChatStore();
  const { aiProvider } = useAiProviderStore();
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

  async function onSubmit(data: FormSchema) {
    setIsCreating(true);
    const voice = findVoiceByURI(data.voiceURI);

    if (!voice || !aiProvider) {
      setIsCreating(false);
      return;
    }

    const prompt = generatePrompt(
      voice.lang,
      data.topic,
      data.duration as ChatConfigDuration
    );

    const aiStartMessage = await GoogleGenerativeAiService.startConversation(
      aiProvider.accessKey,
      prompt
    );

    setUpChatStore(
      {
        topic: data.topic,
        voice: {
          lang: voice.lang,
          name: voice.name,
          uri: voice.voiceURI,
        },
        duration: data.duration as ChatConfigDuration,
        prompt,
      },
      { role: "assistant", content: aiStartMessage }
    );

    setIsCreating(false);
    push("/chat");
  }

  return (
    <>
      <CardContent className="space-y-5">
        <Separator />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ChatConfigDurationEnum.SHORT}>
                        Short
                      </SelectItem>
                      <SelectItem value={ChatConfigDurationEnum.MEDIUM}>
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
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <Button type="submit" form="create-chat-form" disabled={isCreating}>
          {isCreating ? "Loading..." : "Start"}
        </Button>
      </CardFooter>
    </>
  );
}
