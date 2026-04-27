"use client";
import { useState, useEffect } from "react";

const defaultPlots = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  size: 0.1012,
  status: "available",
}));

const statusColors = {
  available: "bg-green-500",
  not_selling: "bg-red-500",
  negotiable: "bg-yellow-400",
};

export default function Home() {
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("plots");
    setPlots(saved ? JSON.parse(saved) : defaultPlots);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (plots.length > 0) {
      localStorage.setItem("plots", JSON.stringify(plots));
    }
  }, [plots]);

  const updateStatus = (status) => {
    const updated = plots.map((p) =>
      p.id === selectedPlot.id ? { ...p, status } : p
    );
    setPlots(updated);
    setSelectedPlot({ ...selectedPlot, status });
  };

  return (
    <div className="flex h-screen font-sans">
      {/* LEFT PANEL */}
      <div className="w-3/4 bg-gray-100 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Kikopey Land Map
        </h1>

        <div className="grid grid-cols-12 gap-1">
          {plots.map((plot) => (
            <div
              key={plot.id}
              onClick={() => setSelectedPlot(plot)}
              className={`h-16 text-xs flex items-center justify-center cursor-pointer text-white rounded
              ${statusColors[plot.status]}`}
            >
              {plot.id}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/4 bg-white p-4 border-l">
        {selectedPlot ? (
          <>
            <h2 className="text-xl font-bold">
              Plot #{selectedPlot.id}
            </h2>
            <p className="text-sm text-gray-600">
              Size: {selectedPlot.size} Ha
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => updateStatus("available")}
                className="w-full bg-green-500 text-white p-2 rounded"
              >
                Available
              </button>
              <button
                onClick={() => updateStatus("negotiable")}
                className="w-full bg-yellow-400 p-2 rounded"
              >
                Negotiable
              </button>
              <button
                onClick={() => updateStatus("not_selling")}
                className="w-full bg-red-500 text-white p-2 rounded"
              >
                Not Selling
              </button>
            </div>
          </>
        ) : (
          <p>Select a plot to view details</p>
        )}
      </div>
    </div>
  );
}
