import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import SaveAccessKeysForm from "./save-access-keys-form";

export default function AccessKeyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <Alert>
        <TriangleAlert className="size-4" />
        <AlertTitle>Access keys required for GPT providers</AlertTitle>
        <AlertDescription>
          <p>
            To generate conversations, we need access keys from one of the GPT
            providers. Your keys are not saved or shared, and you can delete
            them at any time.
          </p>
        </AlertDescription>
      </Alert>

      <SaveAccessKeysForm />
    </div>
  );
}
