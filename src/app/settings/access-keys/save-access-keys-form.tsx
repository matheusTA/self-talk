"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
  modelProvider: z
    .string({ required_error: "Please select a model provider" })
    .min(1),
  apiKey: z.string({ required_error: "Please enter a api key" }).min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SaveAccessKeysForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      modelProvider: "",
    },
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="modelProvider"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Model provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPEN_AI">Open AI</SelectItem>
                  <SelectItem value="GOOGLE">Google gemini</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Api key</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********************"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="self-end">
          Save
        </Button>
      </form>
    </Form>
  );
}
