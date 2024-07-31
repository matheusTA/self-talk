import { LockClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex size-full pt-20">
      <div className="w-52 space-y-5 border-r p-2">
        <h1 className="text-3xl font-semibold">Settings</h1>

        <nav>
          <Link
            href="/settings/keys"
            className="flex items-center gap-2 rounded-md p-1.5 text-sm transition-colors hover:bg-accent"
          >
            <LockClosedIcon className="size-4" />
            Keys
          </Link>
        </nav>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
