import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Users, Map, QrCode, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { title: "Active Rooms", value: 12, icon: <Map className="w-6 h-6" /> },
    { title: "Current Users", value: 256, icon: <Users className="w-6 h-6" /> },
    { title: "QR Scans Today", value: 480, icon: <QrCode className="w-6 h-6" /> },
    { title: "Settings", value: "Manage", icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="shadow-lg rounded-2xl hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-xl text-white">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
