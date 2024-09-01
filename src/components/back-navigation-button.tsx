"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function BackNavigationButton() {
  const router = useRouter();

  return (
    <Button className="pl-0" variant="link" onClick={() => router.back()}>
      <ChevronLeft className="mr-1 size-4" />
      Back
    </Button>
  );
}
