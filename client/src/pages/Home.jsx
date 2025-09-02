import { Link } from "react-router-dom";
import { Map, Users } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to SpaceMate</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl">
        Navigate your campus smarter. Check crowd levels, scan QR codes for entry/exit, and
        manage your time better.
      </p>
      <div className="flex gap-6">
        <Link
          to="/scan/crowd"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md flex items-center gap-2"
        >
          <Users className="h-5 w-5" /> View Crowd
        </Link>
        <Link
          to="/scan/map"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-md flex items-center gap-2"
        >
          <Map className="h-5 w-5" /> Campus Map
        </Link>
      </div>
    </div>
  );
}

export default Home;
