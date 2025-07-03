import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">CannaTrace</span>
        </Link>
        <div className="hidden md:flex flex-1">
          <MainNav />
        </div>
        <div className="md:hidden flex flex-1 justify-end">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
