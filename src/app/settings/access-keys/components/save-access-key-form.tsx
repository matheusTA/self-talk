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
import {
  AiProviderModel,
  AiProviderModelEnum,
  useAiProviderStore,
} from "@/store/ai-provider";

import DeleteAccessKeyAlertDialog from "./delete-access-key-alert-dialog";

const formSchema = z.object({
  model: z.string().min(1, { message: "Please select a model" }),
  accessKey: z.string().min(1, { message: "Please enter a api key" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SaveAccessKeyForm() {
  const { aiProvider, setAiProvider } = useAiProviderStore();
  const isAiProviderSeted = !!aiProvider;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: aiProvider?.model || "",
      accessKey: aiProvider?.accessKey || "",
    },
  });

  function resetForm() {
    form.reset({
      model: "",
      accessKey: "",
    });
  }

  function onSubmit(data: FormSchema) {
    setAiProvider({
      model: data.model as AiProviderModel,
      accessKey: data.accessKey,
    });
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
              name="model"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Model</FormLabel>
                  <Select
                    disabled={isAiProviderSeted}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={AiProviderModelEnum.OPENAI}>
                        Open AI
                      </SelectItem>
                      <SelectItem value={AiProviderModelEnum.GEMINI}>
                        Google gemini
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accessKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********************"
                      type="password"
                      disabled={isAiProviderSeted}
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
        {isAiProviderSeted ? (
          <DeleteAccessKeyAlertDialog resetForm={resetForm} />
        ) : (
          <Button type="submit" form="save-access-keys-form">
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
