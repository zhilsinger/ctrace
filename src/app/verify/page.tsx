"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScanLine, CheckCircle, Shield, Beaker, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ProductInfo = {
    origin: string;
    labTest: string;
    status: string;
};

const sampleProductInfo: ProductInfo = {
    origin: "Green Valley Farms, Anchorage, AK",
    labTest: "Passed (THC: 18%, CBD: 1.2%)",
    status: "Compliant"
};


export default function VerifyPage() {
    const [scanned, setScanned] = useState(false);
    const [productId, setProductId] = useState("");

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        if(productId) {
            setScanned(true);
        }
    }

    return (
        <div className="container mx-auto py-8 flex justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                        <CheckCircle className="h-10 w-10 text-primary"/>
                    </div>
                    <CardTitle className="text-2xl">Consumer Product Verification</CardTitle>
                    <CardDescription>
                        Scan your product's QR code to verify its authenticity and history.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!scanned ? (
                        <form onSubmit={handleScan} className="space-y-4">
                            <div className="relative">
                                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    placeholder="Scan or enter product ID..." 
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" className="w-full">Verify Product</Button>
                        </form>
                    ) : (
                        <div className="space-y-6 animate-in fade-in-50">
                            <h3 className="text-center font-semibold text-lg">Product Verified!</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-foreground">Product Origin</p>
                                        <p className="text-muted-foreground">{sampleProductInfo.origin}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-4">
                                    <Beaker className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-foreground">Lab Test Results</p>
                                        <p className="text-muted-foreground">{sampleProductInfo.labTest}</p>
                                    </div>
                                </div>
                                <Separator />
                                 <div className="flex items-start gap-4">
                                    <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-foreground">Legal Compliance Status</p>
                                        <p className="text-muted-foreground">{sampleProductInfo.status}</p>
                                    </div>
                                </div>
                            </div>
                             <Button variant="outline" className="w-full" onClick={() => {setScanned(false); setProductId("")}}>Scan Another Product</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
