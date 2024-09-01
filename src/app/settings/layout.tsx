import { KeyRound } from "lucide-react";

import BackNavigationButton from "@/components/back-navigation-button";
import SideNavLink from "@/components/side-nav-link";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex size-full py-8">
      <div className="w-52 space-y-8 border-r-2 px-2 py-4">
        <div>
          <BackNavigationButton />
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>

        <nav>
          <SideNavLink
            title="Access keys"
            href="/settings/access-keys"
            Icon={<KeyRound />}
          />
        </nav>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
