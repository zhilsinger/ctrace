import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BadgePlus,
  History,
  Warehouse,
  Store,
  ClipboardCheck,
  ScanLine,
  Settings,
  Leaf,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const modules: {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Digital Plant ID',
    href: '/plant-id',
    description: 'Issue a digital ID and print a QR/NFC label for each plant.',
    icon: BadgePlus,
  },
  {
    title: 'Lifecycle Tracking',
    href: '/tracking',
    description: 'Log plant events like growth, harvest, and lab tests.',
    icon: History,
  },
  {
    title: 'Inventory Dashboard',
    href: '/inventory',
    description: 'View real-time inventory of plants and products.',
    icon: Warehouse,
  },
  {
    title: 'POS Verification',
    href: '/pos',
    description: 'Confirm sales and update inventory for retailers.',
    icon: Store,
  },
  {
    title: 'Regulator Inspection',
    href: '/inspection',
    description: 'Batch scan plants/products for compliance checks.',
    icon: ClipboardCheck,
  },
  {
    title: 'Consumer Verification',
    href: '/verify',
    description: 'Allow consumers to scan and verify product information.',
    icon: ScanLine,
  },
  {
    title: 'Admin & Settings',
    href: '/admin',
    description: 'Manage users, system configuration, and audit logs.',
    icon: Settings,
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Leaf className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to CannaTrace
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          A transparent and secure cannabis tracking system from seed to sale.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link href={mod.href} key={mod.href} className="group">
            <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {mod.title}
                </CardTitle>
                <mod.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {mod.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
