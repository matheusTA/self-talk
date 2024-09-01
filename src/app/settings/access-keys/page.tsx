import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import SaveAccessKeyForm from "./save-access-key-form";

export default function AccessKeyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <Alert>
        <TriangleAlert className="size-5" />
        <AlertTitle>Access keys required for GPT providers</AlertTitle>
        <AlertDescription>
          <p>
            To start generating conversations, we require access keys from one
            of the GPT providers. Your keys are never stored or shared, and you
            can remove them whenever you like.
          </p>
        </AlertDescription>
      </Alert>

      <SaveAccessKeyForm />
    </div>
  );
}
