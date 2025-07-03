"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui";
import { ScanLine, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  productId: z.string().min(1, "Product ID cannot be empty."),
  ageVerified: z.boolean().default(false).refine((val) => val === true, {
    message: "Customer age must be verified.",
  }),
});

type SaleLog = {
    id: number;
    product: string;
    time: string;
    employee: string;
    verified: boolean;
};

const initialSales: SaleLog[] = [
    {id: 1, product: 'AK-PROD-00008887', time: '14:32', employee: '2011', verified: true},
    {id: 2, product: 'AK-PROD-00008891', time: '14:35', employee: '2011', verified: true},
]

export default function PosPage() {
    const { toast } = useToast();
    const [sales, setSales] = useState<SaleLog[]>(initialSales);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: "",
            ageVerified: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newSale = {
            id: sales.length + 1,
            product: values.productId,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
            employee: '2011', // Assuming a logged-in employee
            verified: values.ageVerified
        };
        setSales(prev => [newSale, ...prev]);
        toast({
            title: "Sale Logged",
            description: `Product ${values.productId} sold successfully.`,
        });
        form.reset();
    }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl">POS Verification</CardTitle>
                <CardDescription>
                    Scan product QR code to log a sale and update inventory.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Scan Product QR/NFC</FormLabel>
                            <FormControl>
                            <div className="relative">
                                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Scan or enter product ID..." className="pl-10" {...field} />
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ageVerified"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                            <FormLabel>
                                Customer Age Verified
                            </FormLabel>
                            <FormMessage />
                            </div>
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Log Sale
                    </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Today's Sales</CardTitle>
                    <CardDescription>A log of all sales processed today.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Verified</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-mono">{sale.product}</TableCell>
                                    <TableCell>{sale.time}</TableCell>
                                    <TableCell>{sale.employee}</TableCell>
                                    <TableCell>{sale.verified ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
