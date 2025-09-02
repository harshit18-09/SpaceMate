import React from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function ZoneModal({ zone, onClose }) {
  const isOpen = Boolean(zone);
  if (!zone) return null;

  const color =
    zone.level <= 40 ? "bg-green-500" : zone.level <= 70 ? "bg-yellow-400" : "bg-red-500";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={zone.name} size="md"
      actions={
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <p className="text-sm text-gray-700 mb-3">
        Current crowd level in <span className="font-medium">{zone.name}</span>.
      </p>

      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(zone.level, 100)}%` }} />
      </div>

      <p className="mt-2 text-right text-xs text-gray-500">
        {Math.min(zone.level, 100)}% full
      </p>
    </Modal>
  );
}
