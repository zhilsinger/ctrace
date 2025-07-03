"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, BadgePlus, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  plantType: z.enum(['Clone', 'Seed', 'Cutting'], {
    required_error: 'Please select a plant type.',
  }),
  germinationDate: z.date({
    required_error: 'A date is required.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function PlantIdPage() {
  const { toast } = useToast();
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormData) {
    const newId = `AK-PLANT-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setGeneratedId(newId);
    setFormData(data);
    toast({
      title: 'Plant ID Generated',
      description: `Successfully created ID: ${newId}`,
    });
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Digital Plant Identification</CardTitle>
          <CardDescription>
            Issue a digital ID and print a QR/NFC label for each new plant.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="plantType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plant Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plant type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Clone">Clone</SelectItem>
                        <SelectItem value="Seed">Seed</SelectItem>
                        <SelectItem value="Cutting">Cutting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="germinationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Germination/Cloning</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1990-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button type="submit">
                <BadgePlus className="mr-2 h-4 w-4" />
                Generate Plant ID
              </Button>
            </CardFooter>
          </form>
        </Form>
        
        {generatedId && formData && (
          <>
            <Separator className="my-6" />
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 text-center">Generated ID Preview</h3>
              <div className="border rounded-lg p-6 bg-secondary/50 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-muted-foreground">Plant ID</p>
                  <p className="text-xl font-mono font-bold text-primary">{generatedId}</p>
                  <p className="text-sm text-muted-foreground pt-2">Plant Type</p>
                  <p className="font-semibold">{formData.plantType}</p>
                  <p className="text-sm text-muted-foreground pt-2">Date</p>
                  <p className="font-semibold">{format(formData.germinationDate, 'yyyy-MM-dd')}</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image
                        src="https://placehold.co/150x150.png"
                        alt="QR Code Preview"
                        width={150}
                        height={150}
                        data-ai-hint="qr code"
                        className="rounded-md"
                    />
                    <Button variant="outline" className="mt-4 w-full" onClick={() => toast({ title: 'Printing label...', description: 'Sent to network printer.'})}>
                        <Printer className="mr-2 h-4 w-4"/>
                        Print QR/NFC Label
                    </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
