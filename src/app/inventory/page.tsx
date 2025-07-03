import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter } from "lucide-react";

const inventoryData = [
  {
    plantId: "AK-PLANT-00001234",
    status: "Harvested",
    location: "GrowRoom A",
    lastEvent: "Harvest (2025-10-06)",
    employee: "1021",
  },
  {
    plantId: "AK-PLANT-00001235",
    status: "Growing",
    location: "Room 2",
    lastEvent: "Growth Stage (2025-10-01)",
    employee: "1002",
  },
  {
    plantId: "AK-PROD-00008888",
    status: "Packaged",
    location: "Storage B",
    lastEvent: "Packaging (2025-10-10)",
    employee: "1055",
  },
  {
    plantId: "AK-PLANT-00001236",
    status: "Drying",
    location: "Drying Room",
    lastEvent: "Harvest (2025-10-08)",
    employee: "1021",
  },
    {
    plantId: "AK-PLANT-00001237",
    status: "Growing",
    location: "Room 3",
    lastEvent: "Growth Stage (2025-10-05)",
    employee: "1002",
  },
  {
    plantId: "AK-PROD-00008889",
    status: "Ready for Sale",
    location: "Retail Floor",
    lastEvent: "Transfer (2025-10-12)",
    employee: "1080",
  },
];

export default function InventoryPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Inventory Dashboard</CardTitle>
          <CardDescription>
            View real-time inventory of all plants and products in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex flex-1 items-center gap-4 w-full">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="growing">Growing</SelectItem>
                        <SelectItem value="drying">Drying</SelectItem>
                        <SelectItem value="harvested">Harvested</SelectItem>
                        <SelectItem value="packaged">Packaged</SelectItem>
                        <SelectItem value="ready-for-sale">Ready for Sale</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Filter by location..." className="w-full md:w-[240px]" />
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Inventory
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plant/Product ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Event</TableHead>
                  <TableHead>Assigned Employee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.plantId}>
                    <TableCell className="font-mono">{item.plantId}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastEvent}</TableCell>
                    <TableCell>{item.employee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
