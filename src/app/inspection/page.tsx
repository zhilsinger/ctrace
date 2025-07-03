"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Download, PlayCircle, Scan, AlertTriangle } from "lucide-react";

type ScannedItem = {
  id: string;
  status: string;
  lastEvent: string;
  discrepancy: "Yes" | "No";
};

const initialScannedItems: ScannedItem[] = [
  { id: "AK-PLANT-00001234", status: "Harvested", lastEvent: "Harvest", discrepancy: "No" },
];

export default function InspectionPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>(initialScannedItems);
  const [scanInput, setScanInput] = useState("");
  const [showDiscrepancyAlert, setShowDiscrepancyAlert] = useState(false);
  const { toast } = useToast();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput) return;

    const isDiscrepancy = Math.random() > 0.8; // 20% chance of discrepancy
    const newItem: ScannedItem = {
      id: scanInput,
      status: isDiscrepancy ? "Missing" : "Harvested",
      lastEvent: "Harvest",
      discrepancy: isDiscrepancy ? "Yes" : "No",
    };

    if (isDiscrepancy) {
      setShowDiscrepancyAlert(true);
    }

    setScannedItems(prev => [newItem, ...prev]);
    setScanInput("");
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Regulator Inspection</CardTitle>
            <CardDescription>
              Batch scan multiple plants/products to check for compliance and discrepancies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <Button onClick={() => setIsScanning(true)} disabled={isScanning} size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Batch Scan
              </Button>
              <div className="flex-1 w-full">
                {isScanning && (
                  <form onSubmit={handleScan} className="relative">
                    <Scan className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      placeholder="Scan Plant/Product QR..."
                      className="pl-10"
                      autoFocus
                    />
                  </form>
                )}
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Inspection Report
              </Button>
            </div>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plant/Product ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Event</TableHead>
                    <TableHead>Discrepancy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scannedItems.length > 0 ? (
                    scannedItems.map((item) => (
                      <TableRow key={item.id} className={item.discrepancy === 'Yes' ? 'bg-destructive/10' : ''}>
                        <TableCell className="font-mono">{item.id}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.lastEvent}</TableCell>
                        <TableCell>
                          <Badge variant={item.discrepancy === "Yes" ? "destructive" : "secondary"}>
                            {item.discrepancy}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        {isScanning ? "Waiting for first scan..." : "Start a batch scan to see items here."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <AlertDialog open={showDiscrepancyAlert} onOpenChange={setShowDiscrepancyAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Discrepancy Found!
            </AlertDialogTitle>
            <AlertDialogDescription>
              A mismatch was found for the scanned item. The item has been flagged in the report. Please investigate further.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDiscrepancyAlert(false)}>
              Acknowledge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
