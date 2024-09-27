"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAiProviderStore } from "@/store/ai-provider";

interface DeleteAccessKeyAlertDialogProps {
  resetForm: () => void;
}

export default function DeleteAccessKeyAlertDialog({
  resetForm,
}: DeleteAccessKeyAlertDialogProps) {
  const { removeAiProvider } = useAiProviderStore();

  function onDelete() {
    removeAiProvider();
    resetForm();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Access Key Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this access key? This action will
            disable access to the selected AI provider. Any future requests
            using this key will fail.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDelete}>
            Delete key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
