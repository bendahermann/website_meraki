import React from "react";
import { MOCK_STATS } from "@/data/mockData";

export function StatsBar() {
  return (
    <section className="bg-zinc-900 border-b border-zinc-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {MOCK_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
