import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

export default function QRScanPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleScan = (data) => {
    if (data) {
      navigate(`/scan/${data}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error accessing camera or scanning QR code.');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Scan Room QR Code</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
