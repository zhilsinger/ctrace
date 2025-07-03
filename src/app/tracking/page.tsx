"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { Search, LogIn, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const formSchema = z.object({
  plantId: z.string().min(1, 'Plant ID is required.'),
  eventType: z.enum([
    'Growth Stage Change',
    'Harvest',
    'Lab Test',
    'Package',
    'Other',
  ]),
  employeeId: z.string().min(1, 'Employee ID is required.'),
  notes: z.string().optional(),
});

type EventLog = {
  id: number;
  eventType: string;
  timestamp: string;
  employee: string;
};

const initialEvents: EventLog[] = [
    { id: 1, eventType: 'Growth Stage', timestamp: '2025-10-01 14:00', employee: '1002'},
    { id: 2, eventType: 'Watering', timestamp: '2025-10-02 08:00', employee: '1002'},
    { id: 3, eventType: 'Nutrient Add', timestamp: '2025-10-03 09:30', employee: '1005'},
    { id: 4, eventType: 'Pruning', timestamp: '2025-10-05 11:00', employee: '1005'},
]

export default function TrackingPage() {
  const { toast } = useToast();
  const [plantId, setPlantId] = useState('AK-PLANT-00001234');
  const [events, setEvents] = useState<EventLog[]>(initialEvents);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plantId: 'AK-PLANT-00001234',
      employeeId: '1021',
      notes: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEvent = {
        id: events.length + 1,
        eventType: values.eventType,
        timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        employee: values.employeeId,
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 10));
    toast({
      title: 'Success!',
      description: `Event "${values.eventType}" for Plant ID ${values.plantId} logged successfully.`,
    });
    form.reset({
        ...values,
        notes: '',
        eventType: undefined,
    });
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Plant Lifecycle Tracking</CardTitle>
          <CardDescription>
            Log events for a specific plant by scanning its QR code or entering the ID.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="plantIdSearch">Plant ID or Scan QR</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="plantIdSearch"
                placeholder="Search by Plant ID or scan..."
                className="pl-10"
                value={plantId}
                onChange={(e) => {
                    setPlantId(e.target.value);
                    form.setValue('plantId', e.target.value);
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Growth Stage Change">Growth Stage Change</SelectItem>
                      <SelectItem value="Harvest">Harvest</SelectItem>
                      <SelectItem value="Lab Test">Lab Test</SelectItem>
                      <SelectItem value="Package">Package</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>Employee ID</FormLabel>
                        <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Scan your badge or enter your employee number.</p>
                            </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                  <FormControl>
                    <Input placeholder="e.g., 1021" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Add any relevant notes..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
             <Button type="submit">
                <LogIn className="mr-2 h-4 w-4" />
                Log Event
            </Button>
          </div>
        </CardContent>
        </form>
        </Form>
        <CardFooter className="flex-col items-start space-y-4">
            <h3 className="text-lg font-semibold">Recent Events for {plantId || "Plant"}</h3>
            <div className="w-full border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Employee</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.length > 0 ? (
                            events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.eventType}</TableCell>
                                    <TableCell>{event.timestamp}</TableCell>
                                    <TableCell>{event.employee}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                No events logged for this plant yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
