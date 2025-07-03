"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const routes = [
    { href: '/', label: 'Dashboard' },
    { href: '/plant-id', label: 'Plant ID' },
    { href: '/tracking', label: 'Tracking' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/pos', label: 'POS' },
    { href: '/inspection', label: 'Inspection' },
    { href: '/verify', label: 'Verify' },
    { href: '/admin', label: 'Admin' },
];


export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold">CannaTrace</span>
        </Link>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
          {routes.map((route) => (
            <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === route.href ? "text-primary" : "text-muted-foreground"
                )}
            >
                {route.label}
            </Link>
           ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
