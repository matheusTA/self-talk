"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavLinkProps {
  title: string;
  href: string;
  Icon?: React.ReactElement;
}

export default function SideNavLink({ title, href, Icon }: SideNavLinkProps) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      data-active={isActive}
      className="flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent data-[active=true]:bg-accent"
    >
      {!!Icon && <Icon.type {...Icon.props} className="size-4" />}
      <span className="text-sm">{title}</span>
    </Link>
  );
}
