import { GearIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import Logo from "./logo";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Logo />

      <div className="flex items-center gap-3">
        <ThemeSwitcher />

        <Button asChild variant="ghost" size="icon" className="group">
          <Link href="/auth/sign-in">
            <GearIcon className="size-5 group-hover:animate-spin-halfway" />
          </Link>
        </Button>

        <Separator orientation="vertical" className="h-5" />

        <Button asChild variant="ghost" size="icon">
          <a href="https://github.com/matheusTA/self-talk" target="_blank">
            <GitHubLogoIcon className="size-5" />
          </a>
        </Button>
      </div>
    </header>
  );
}
