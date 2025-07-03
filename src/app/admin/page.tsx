import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";

const users = [
  { id: 'usr_1', name: 'Alice', role: 'Grower' },
  { id: 'usr_2', name: 'Bob', role: 'Processor' },
  { id: 'usr_3', name: 'Charlie', role: 'Retailer' },
  { id: 'usr_4', name: 'Diana', role: 'Regulator' },
];

const auditLogs = [
  { id: 'log_1', user: 'Alice', action: 'Logged event: Harvest', timestamp: '2025-10-06 09:30' },
  { id: 'log_2', user: 'Admin', action: 'Updated setting: tag_cost', timestamp: '2025-10-05 11:00' },
  { id: 'log_3', user: 'Bob', action: 'Logged event: Package', timestamp: '2025-10-04 15:00' },
  { id: 'log_4', user: 'Charlie', action: 'Logged sale: AK-PROD-00008888', timestamp: '2025-10-03 18:45' },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Admin & Settings</CardTitle>
              <CardDescription>
                Manage users, system configuration, and view audit logs.
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download System Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="config">System Configuration</TabsTrigger>
              <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Add, edit, or remove users and manage their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="config" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                  <CardDescription>Adjust system-wide settings and compliance rules.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="tagCost">Tag Cost ($)</Label>
                    <Input id="tagCost" type="number" defaultValue="0.50" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="complianceRule">Compliance Rule Set</Label>
                    <Select>
                      <SelectTrigger id="complianceRule">
                        <SelectValue placeholder="Select rule set" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alaska-2025">Alaska 2025 Rules</SelectItem>
                        <SelectItem value="colorado-2024">Colorado 2024 Rules</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Configuration</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>A record of all significant actions taken within the system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Timestamp</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditLogs.map(log => (
                          <TableRow key={log.id}>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.timestamp}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
