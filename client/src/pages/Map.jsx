import { MapPin } from "lucide-react";

function Map() {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Campus Map</h1>
      <div className="w-full max-w-4xl h-[500px] bg-gray-200 rounded-2xl flex items-center justify-center shadow-inner">
        <MapPin className="h-16 w-16 text-blue-600" />
        <p className="text-gray-500 ml-3">Interactive Map Coming Soon...</p>
      </div>
    </div>
  );
}

export default Map;
