import React, { useState } from "react";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const QRScan = () => {
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanned(true);
    setTimeout(() => setScanned(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-96 text-center">
        <QrCode className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
        <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
        <Button className="w-full" onClick={handleScan}>
          Start Scanning
        </Button>
        {scanned && <p className="mt-4 text-green-600 font-semibold">✅ QR Code Scanned Successfully!</p>}
      </div>
    </div>
  );
};

export default QRScan;
