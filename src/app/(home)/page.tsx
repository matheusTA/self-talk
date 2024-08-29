import {
  BotMessageSquare,
  ChevronsRight,
  Languages,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-20">
      <div className="flex flex-col items-center gap-5">
        <h1 className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-5xl font-bold text-transparent">
          Unlock your conversation skills with{" "}
          <span className="underline decoration-black decoration-wavy decoration-1 dark:decoration-white">
            AI voice chat
          </span>
        </h1>

        <span className="text-center text-lg font-medium text-muted-foreground">
          Practice speaking any language fluently with real-time AI in a safe
          and interactive environment.
        </span>
      </div>

      <Button asChild size="lg">
        <Link href="/create-chat" className="group relative overflow-hidden">
          <span>Get started</span>
          <div className="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
            <ChevronsRight className="size-5" />
          </div>
        </Link>
      </Button>

      <div className="grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-2 md:grid-rows-2">
        <Alert>
          <BotMessageSquare className="size-5" />
          <AlertTitle>AI-Driven Conversations.</AlertTitle>
          <AlertDescription>
            Engage in conversations with AI that provides real-time feedback.
          </AlertDescription>
        </Alert>

        <Alert>
          <Languages className="size-5" />
          <AlertTitle>Multilingual Practice.</AlertTitle>
          <AlertDescription>
            Practice with AI in multiple languages.
          </AlertDescription>
        </Alert>

        <Alert>
          <ShieldCheck className="size-5" />
          <AlertTitle>Safe & Inclusive Environment.</AlertTitle>
          <AlertDescription>
            A space where everyone can practice without fear of judgment.
          </AlertDescription>
        </Alert>

        <Alert>
          <PiggyBank className="size-5" />
          <AlertTitle>Free to Use.</AlertTitle>
          <AlertDescription>
            All features are free, making language learning accessible to
            everyone.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
