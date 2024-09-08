"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import DeleteAccessKeyAlertDialog from "./delete-access-key-alert-dialog";

const formSchema = z.object({
  modelProvider: z
    .string({ required_error: "Please select a model provider" })
    .min(1),
  apiKey: z.string({ required_error: "Please enter a api key" }).min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SaveAccessKeyForm() {
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
    <Card>
      <CardHeader>
        <CardTitle>Save your access key</CardTitle>
        <CardDescription>
          Select your AI provider and enter your API key below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <Separator />
        <Form {...form}>
          <form
            id="save-access-keys-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="modelProvider"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Model provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <FormLabel>API key</FormLabel>
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <DeleteAccessKeyAlertDialog />
        <Button type="submit" form="save-access-keys-form">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
