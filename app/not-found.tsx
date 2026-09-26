import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-2">
        Error 404 // Target Not Found
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-[#F4F4F6] mb-3">
        Resource or Tool Unavailable
      </h1>
      <p className="text-sm text-[#8F919E] max-w-md mb-8">
        The requested cybersecurity module, workflow, or entity could not be located in the current catalog.
      </p>
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors shadow-lg shadow-violet-600/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Arsenal Catalog
      </Link>
    </div>
  );
}
