import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { QrCode, CheckCircle, XCircle } from "lucide-react";

function ScanRoom() {
  const { roomId } = useParams();
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const type = new URLSearchParams(location.search).get("type") || "entry";

  const handleScan = async () => {
    try {
      const response = await axios.post(`/api/scan/${roomId}/${type}`);
      setStatus({ success: true, message: `Successfully scanned ${type}.` });
    } catch (error) {
      setStatus({ success: false, message: "Scan failed. Try again." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <QrCode className="h-24 w-24 text-blue-600 mb-6" />
      <h1 className="text-3xl font-bold mb-4">
        Scan {type === "entry" ? "Entry" : "Exit"}
      </h1>
      <button
        onClick={handleScan}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md transition"
      >
        Confirm {type}
      </button>
      {status && (
        <div className={`mt-6 flex items-center gap-2 ${status.success ? "text-green-600" : "text-red-600"}`}>
          {status.success ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
          <p className="font-medium">{status.message}</p>
        </div>
      )}
    </div>
  );
}

export default ScanRoom;
