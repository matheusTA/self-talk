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

const formSchema = z.object({
  topic: z.string({ required_error: "Please enter a topic" }).min(1),
  lang: z.string({ required_error: "Please select a language" }).min(1),
  duration: z.string({ required_error: "Please select a duration" }).min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateChatForm() {
  const { push } = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      lang: "",
      duration: "",
    },
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
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
          name="lang"
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
                  <SelectItem value="pt-br">Portugues - Brasil</SelectItem>
                  <SelectItem value="en-us">English - USA</SelectItem>
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
                  <SelectItem value="SHORT">Short</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LONG">Long</SelectItem>
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