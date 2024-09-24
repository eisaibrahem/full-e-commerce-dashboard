"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const { storeId } = useParams();
  const pathname = usePathname();

  const routes = [
    "Overview",
    "Billboards",
    "Categories",
    "Sizes",
    "Colors",
    "Products",
    "Orders",
    "Settings",
  ].map((label) => {
    const href =
      label === "Overview"
        ? `/${storeId}`
        : `/${storeId}/${label.toLowerCase()}`;
    const isActive =
      label === "Overview" ? pathname === `/${storeId}` : pathname === href;

    return {
      href,
      label,
      active: isActive,
    };
  });

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map(({ href, label, active }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
