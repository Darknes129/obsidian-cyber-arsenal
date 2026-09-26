"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wrench,
  Copy,
  Check,
  ShieldCheck,
  Terminal,
  FileCode,
  Hash,
  Clock,
  Code2,
  Network,
  Cpu,
} from "lucide-react";
import { nativeUtilities } from "@/lib/native-utilities";
import { useTranslations } from "@/lib/i18n";

type UtilityKey =
  | "base64"
  | "url-encoder"
  | "jwt-decoder"
  | "hash-generator"
  | "uuid-generator"
  | "json-formatter"
  | "timestamp-converter"
  | "regex-tester"
  | "subnet-calculator";

function UtilitiesContent() {
  const { t } = useTranslations("utilities");
  const searchParams = useSearchParams();
  const paramTool = searchParams.get("tool") as UtilityKey | null;
  const initialInput = searchParams.get("input") || "";

  const [userSelectedTab, setUserSelectedTab] = useState<UtilityKey | null>(null);
  const activeTab: UtilityKey = userSelectedTab ?? paramTool ?? "base64";
  const [copied, setCopied] = useState(false);

  const setActiveTab = (t: UtilityKey) => {
    setUserSelectedTab(t);
  };

  // Utility 1: Base64
  const [b64Input, setB64Input] = useState(initialInput || "OBSIDIAN // Cyber Intelligence Arsenal");
  const [b64Mode, setB64Mode] = useState<"encode" | "decode">("encode");
  const { b64Result, b64Error } = useMemo(() => {
    if (b64Mode === "encode") {
      return { b64Result: nativeUtilities.base64Encode(b64Input), b64Error: null };
    } else {
      const res = nativeUtilities.base64Decode(b64Input);
      return { b64Result: res.text, b64Error: res.error || null };
    }
  }, [b64Input, b64Mode]);

  // Utility 2: URL Encoder
  const [urlInput, setUrlInput] = useState(initialInput || "https://example.corp/api/v1?token=xyz 123&query=test");
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode");
  const { urlResult, urlError } = useMemo(() => {
    if (urlMode === "encode") {
      return { urlResult: nativeUtilities.urlEncode(urlInput, true), urlError: null };
    } else {
      const res = nativeUtilities.urlDecode(urlInput);
      return { urlResult: res.text, urlError: res.error || null };
    }
  }, [urlInput, urlMode]);

  // Utility 3: JWT Decoder
  const [jwtInput, setJwtInput] = useState(
    initialInput ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1IiwibmFtZSI6IkFuYWx5c3QgT2JzaWRpYW4iLCJyb2xlIjoiU2VjdXJpdHlFbmdpbmVlciIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.signature_verification_skipped"
  );
  const jwtData = useMemo(() => {
    if (!jwtInput.trim()) return { header: null, payload: null };
    return nativeUtilities.decodeJwt(jwtInput);
  }, [jwtInput]);

  // Utility 4: Hash Generator (Async Web Crypto)
  const [hashInput, setHashInput] = useState(initialInput || "Security intelligence, organized.");
  const [hashResults, setHashResults] = useState<{ sha256: string; sha384: string; sha512: string }>({
    sha256: "",
    sha384: "",
    sha512: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const s256 = await nativeUtilities.computeHash("SHA-256", hashInput);
        const s384 = await nativeUtilities.computeHash("SHA-384", hashInput);
        const s512 = await nativeUtilities.computeHash("SHA-512", hashInput);
        if (!cancelled) {
          setHashResults({ sha256: s256, sha384: s384, sha512: s512 });
        }
      } catch {
        // ignore
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [hashInput]);

  // Utility 5: UUID Generator
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [generatedUuids, setGeneratedUuids] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => nativeUtilities.generateUuidV4())
  );

  const handleGenerateUuids = () => {
    const list = Array.from({ length: uuidCount }, () => nativeUtilities.generateUuidV4());
    setGeneratedUuids(list);
  };

  // Utility 6: JSON Formatter
  const [jsonInput, setJsonInput] = useState(
    initialInput ||
      '{"service":"obsidian","targets":["192.168.1.1","192.168.1.2"],"config":{"rateLimit":1000,"active":true}}'
  );
  const [jsonMode, setJsonMode] = useState<"pretty" | "minify">("pretty");
  const { jsonResult, jsonError } = useMemo(() => {
    if (!jsonInput.trim()) return { jsonResult: "", jsonError: null };
    const res = nativeUtilities.formatJson(jsonInput, jsonMode);
    return { jsonResult: res.output, jsonError: res.error || null };
  }, [jsonInput, jsonMode]);

  // Utility 7: Unix Timestamp Converter
  const [timeInput, setTimeInput] = useState(initialInput || "1710000000");
  const timeResult = useMemo(() => {
    return nativeUtilities.convertTimestamp(timeInput);
  }, [timeInput]);

  // Utility 8: Regex Tester
  const [regexPattern, setRegexPattern] = useState(
    initialInput ? "" : "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
  );
  const [regexFlags, setRegexFlags] = useState("g");
  const [regexText, setRegexText] = useState(
    "Contact security@obsidian.local or devops.team@sub.domain.org for inquiries."
  );
  const regexResult = useMemo(() => {
    return nativeUtilities.testRegex(regexPattern, regexFlags, regexText);
  }, [regexPattern, regexFlags, regexText]);

  // Utility 9: Subnet Calculator
  const [subnetInput, setSubnetInput] = useState(initialInput || "192.168.10.0/24");
  const subnetResult = useMemo(() => {
    return nativeUtilities.calculateSubnet(subnetInput);
  }, [subnetInput]);

  // Generic copy helper
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const utilityTabs: { id: UtilityKey; label: string; icon: React.ReactNode }[] = [
    { id: "base64", label: "Base64", icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: "url-encoder", label: "URL Encoder", icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: "jwt-decoder", label: "JWT Inspector", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "hash-generator", label: "Hash Generator", icon: <Hash className="w-3.5 h-3.5" /> },
    { id: "uuid-generator", label: "UUID Generator", icon: <FileCode className="w-3.5 h-3.5" /> },
    { id: "json-formatter", label: "JSON Formatter", icon: <FileCode className="w-3.5 h-3.5" /> },
    { id: "timestamp-converter", label: "Unix Timestamp", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "regex-tester", label: "Regex Tester", icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: "subnet-calculator", label: "Subnet Calculator", icon: <Network className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-pink-400 font-semibold">
              {t("tag")}
            </span>
            <span className="text-xs text-[#737582] font-mono">
              · 9 Standalone Utilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("zeroTelemetry")}</span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0F1017] border border-white/6">
        {utilityTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            type="button"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
              activeTab === t.id
                ? "bg-violet-600 text-white font-medium shadow-md shadow-violet-600/20"
                : "text-[#737582] hover:text-[#F4F4F6] hover:bg-white/4"
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Main Utility Workspace */}
      <div className="rounded-2xl bg-[#0F1017] border border-white/8 p-6 sm:p-8 space-y-6 shadow-xl">
        {/* ================= 1. BASE64 ================= */}
        {activeTab === "base64" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/6 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F4F4F6]">Base64 Encoder / Decoder</h2>
                <p className="text-xs text-[#737582]">Encode plain text to Base64 or decode Base64 data locally.</p>
              </div>
              <div className="flex items-center gap-1 bg-[#11121A] p-1 rounded-lg border border-white/6 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setB64Mode("encode")}
                  className={`px-3 py-1 rounded transition-colors ${b64Mode === "encode" ? "bg-violet-600 text-white font-medium" : "text-[#737582]"}`}
                >
                  Encode
                </button>
                <button
                  type="button"
                  onClick={() => setB64Mode("decode")}
                  className={`px-3 py-1 rounded transition-colors ${b64Mode === "decode" ? "bg-violet-600 text-white font-medium" : "text-[#737582]"}`}
                >
                  Decode
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">Input Data</label>
              <textarea
                value={b64Input}
                onChange={(e) => setB64Input(e.target.value)}
                rows={4}
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl p-3 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#A7A8B3] uppercase">Result</label>
                <button
                  onClick={() => handleCopyText(b64Result)}
                  type="button"
                  className="flex items-center gap-1 text-xs font-mono text-violet-400 hover:text-violet-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              {b64Error ? (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                  {b64Error}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#090A10] border border-white/6 text-xs font-mono text-[#F4F4F6] break-all min-h-[70px]">
                  {b64Result || <span className="text-[#545662]">No result</span>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 2. URL ENCODER ================= */}
        {activeTab === "url-encoder" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/6 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F4F4F6]">URL Percent Encoder / Decoder</h2>
                <p className="text-xs text-[#737582]">Encode query parameters or decode percent-encoded URLs.</p>
              </div>
              <div className="flex items-center gap-1 bg-[#11121A] p-1 rounded-lg border border-white/6 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setUrlMode("encode")}
                  className={`px-3 py-1 rounded transition-colors ${urlMode === "encode" ? "bg-violet-600 text-white font-medium" : "text-[#737582]"}`}
                >
                  Encode
                </button>
                <button
                  type="button"
                  onClick={() => setUrlMode("decode")}
                  className={`px-3 py-1 rounded transition-colors ${urlMode === "decode" ? "bg-violet-600 text-white font-medium" : "text-[#737582]"}`}
                >
                  Decode
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">Input String</label>
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                rows={3}
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl p-3 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#A7A8B3] uppercase">Output</label>
                <button
                  onClick={() => handleCopyText(urlResult)}
                  type="button"
                  className="flex items-center gap-1 text-xs font-mono text-violet-400 hover:text-violet-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              {urlError ? (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                  {urlError}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#090A10] border border-white/6 text-xs font-mono text-[#F4F4F6] break-all min-h-[70px]">
                  {urlResult || <span className="text-[#545662]">No result</span>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 3. JWT INSPECTOR ================= */}
        {activeTab === "jwt-decoder" && (
          <div className="space-y-6">
            <div className="border-b border-white/6 pb-4">
              <h2 className="text-lg font-bold text-[#F4F4F6]">JWT Claims Inspector</h2>
              <p className="text-xs text-[#737582] mt-0.5">
                Decode JSON Web Token headers and payload claims locally. Notice: Decoding a JWT does not cryptographically verify its signature.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">Encoded JWT String</label>
              <textarea
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                rows={3}
                placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl p-3 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {jwtData.error ? (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                {jwtData.error}
              </div>
            ) : jwtData.header || jwtData.payload ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-violet-400 font-semibold uppercase">Header (JOSE)</span>
                    <button
                      onClick={() => handleCopyText(JSON.stringify(jwtData.header, null, 2))}
                      className="text-xs font-mono text-[#737582] hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#090A10] border border-white/6 text-xs font-mono text-[#F4F4F6] overflow-x-auto">
                    {JSON.stringify(jwtData.header, null, 2)}
                  </pre>
                </div>

                {/* Payload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-pink-400 font-semibold uppercase">Payload (Claims)</span>
                    <button
                      onClick={() => handleCopyText(JSON.stringify(jwtData.payload, null, 2))}
                      className="text-xs font-mono text-[#737582] hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#090A10] border border-white/6 text-xs font-mono text-[#F4F4F6] overflow-x-auto">
                    {JSON.stringify(jwtData.payload, null, 2)}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================= 4. HASH GENERATOR ================= */}
        {activeTab === "hash-generator" && (
          <div className="space-y-6">
            <div className="border-b border-white/6 pb-4">
              <h2 className="text-lg font-bold text-[#F4F4F6]">Cryptographic Hash Generator</h2>
              <p className="text-xs text-[#737582] mt-0.5">
                Computes standard cryptographic digests in browser via the native Web Crypto API.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">Input Text / Seed</label>
              <textarea
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                rows={3}
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl p-3 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-4">
              {/* SHA-256 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-400 font-semibold uppercase">SHA-256 (256-bit)</span>
                  <button
                    onClick={() => handleCopyText(hashResults.sha256)}
                    className="text-[#737582] hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 font-mono text-xs text-[#F4F4F6] break-all">
                  {hashResults.sha256 || "Computing..."}
                </div>
              </div>

              {/* SHA-384 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-semibold uppercase">SHA-384 (384-bit)</span>
                  <button
                    onClick={() => handleCopyText(hashResults.sha384)}
                    className="text-[#737582] hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 font-mono text-xs text-[#F4F4F6] break-all">
                  {hashResults.sha384 || "Computing..."}
                </div>
              </div>

              {/* SHA-512 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-pink-400 font-semibold uppercase">SHA-512 (512-bit)</span>
                  <button
                    onClick={() => handleCopyText(hashResults.sha512)}
                    className="text-[#737582] hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 font-mono text-xs text-[#F4F4F6] break-all">
                  {hashResults.sha512 || "Computing..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. UUID GENERATOR ================= */}
        {activeTab === "uuid-generator" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/6 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F4F4F6]">UUID v4 Generator</h2>
                <p className="text-xs text-[#737582]">Generate cryptographically secure RFC 4122 Version 4 UUIDs.</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={uuidCount}
                  onChange={(e) => setUuidCount(Number(e.target.value))}
                  className="bg-[#11121A] border border-white/8 rounded-lg px-2.5 py-1 text-xs font-mono text-[#F4F4F6]"
                  aria-label="UUID quantity"
                >
                  <option value={1}>1 UUID</option>
                  <option value={5}>5 UUIDs</option>
                  <option value={10}>10 UUIDs</option>
                  <option value={20}>20 UUIDs</option>
                </select>
                <button
                  type="button"
                  onClick={handleGenerateUuids}
                  className="px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs"
                >
                  Regenerate
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#A7A8B3] uppercase">Generated Identifiers</span>
                <button
                  onClick={() => handleCopyText(generatedUuids.join("\n"))}
                  className="text-xs font-mono text-violet-400 hover:text-violet-300"
                >
                  Copy All
                </button>
              </div>
              <div className="p-4 rounded-xl bg-[#090A10] border border-white/6 space-y-1 font-mono text-xs text-[#F4F4F6]">
                {generatedUuids.map((id, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-white/4 last:border-0">
                    <span>{id}</span>
                    <button
                      onClick={() => handleCopyText(id)}
                      className="text-[11px] text-[#737582] hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. JSON FORMATTER ================= */}
        {activeTab === "json-formatter" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/6 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F4F4F6]">JSON Formatter & Validator</h2>
                <p className="text-xs text-[#737582]">Validate, prettify, or minify JSON data locally.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setJsonMode("pretty")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    jsonMode === "pretty" ? "bg-violet-600 text-white font-medium" : "bg-[#11121A] text-[#737582]"
                  }`}
                >
                  Prettify
                </button>
                <button
                  type="button"
                  onClick={() => setJsonMode("minify")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    jsonMode === "minify" ? "bg-violet-600 text-white font-medium" : "bg-[#11121A] text-[#737582]"
                  }`}
                >
                  Minify
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A8B3] uppercase">Input JSON</label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={10}
                  className="w-full bg-[#0A0A10] border border-white/10 rounded-xl p-3 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-[#A7A8B3] uppercase">Formatted Result</label>
                  {jsonResult && (
                    <button
                      onClick={() => handleCopyText(jsonResult)}
                      className="text-xs font-mono text-violet-400 hover:text-violet-300"
                    >
                      Copy Output
                    </button>
                  )}
                </div>
                {jsonError ? (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                    Syntax Error: {jsonError}
                  </div>
                ) : (
                  <pre className="p-3 rounded-xl bg-[#090A10] border border-white/6 text-xs font-mono text-[#F4F4F6] overflow-x-auto min-h-[220px]">
                    {jsonResult || <span className="text-[#545662]">Enter valid JSON to format</span>}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. TIMESTAMP CONVERTER ================= */}
        {activeTab === "timestamp-converter" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/6 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F4F4F6]">Unix Timestamp Converter</h2>
                <p className="text-xs text-[#737582]">Convert Unix epoch timestamps to UTC and ISO 8601 strings.</p>
              </div>
              <button
                type="button"
                onClick={() => setTimeInput(String(Math.floor(Date.now() / 1000)))}
                className="px-3 py-1 rounded-lg bg-[#11121A] hover:bg-[#181926] text-xs font-mono text-violet-300 border border-violet-500/30"
              >
                Now (Epoch)
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">Timestamp or Date String</label>
              <input
                type="text"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {timeResult.error ? (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                {timeResult.error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">UTC Date</span>
                  <span className="text-[#F4F4F6] font-semibold">{timeResult.utcDate}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Local Browser Date</span>
                  <span className="text-[#F4F4F6]">{timeResult.localDate}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">ISO 8601</span>
                  <span className="text-[#F4F4F6]">{timeResult.isoDate}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Seconds / Milliseconds</span>
                  <span className="text-[#F4F4F6]">{timeResult.timestampSec}s · {timeResult.timestampMs}ms</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 8. REGEX TESTER ================= */}
        {activeTab === "regex-tester" && (
          <div className="space-y-6">
            <div className="border-b border-white/6 pb-4">
              <h2 className="text-lg font-bold text-[#F4F4F6]">Regular Expression Tester</h2>
              <p className="text-xs text-[#737582] mt-0.5">
                Evaluate RegExp patterns with instant match extraction and group parsing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs font-mono text-[#A7A8B3] uppercase">RegExp Pattern</label>
                <input
                  type="text"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  placeholder="e.g. \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
                  className="w-full bg-[#0A0A10] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A7A8B3] uppercase">Flags</label>
                <input
                  type="text"
                  value={regexFlags}
                  onChange={(e) => setRegexFlags(e.target.value)}
                  placeholder="g, i, m"
                  className="w-full bg-[#0A0A10] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">Test String</label>
              <textarea
                value={regexText}
                onChange={(e) => setRegexText(e.target.value)}
                rows={3}
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl p-3 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#A7A8B3] uppercase">
                  Matches Identified ({regexResult.matches.length})
                </span>
              </div>
              {regexResult.error ? (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                  {regexResult.error}
                </div>
              ) : regexResult.matches.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#090A10] border border-white/6 text-xs text-[#545662] font-mono">
                  No matches found for the current pattern.
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#090A10] border border-white/6 space-y-1.5 font-mono text-xs">
                  {regexResult.matches.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-[#11121A] border border-white/4">
                      <span className="text-violet-300 font-semibold">{m.text}</span>
                      <span className="text-[#545662] text-[10px]">Index: {m.index}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 9. SUBNET CALCULATOR ================= */}
        {activeTab === "subnet-calculator" && (
          <div className="space-y-6">
            <div className="border-b border-white/6 pb-4">
              <h2 className="text-lg font-bold text-[#F4F4F6]">IPv4 Subnet & CIDR Calculator</h2>
              <p className="text-xs text-[#737582] mt-0.5">
                Calculate network address, broadcast address, usable IP range, and host capacities.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A8B3] uppercase">IPv4 Address & CIDR Prefix</label>
              <input
                type="text"
                value={subnetInput}
                onChange={(e) => setSubnetInput(e.target.value)}
                placeholder="e.g. 192.168.1.0/24 or 10.0.0.0/16"
                className="w-full bg-[#0A0A10] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {subnetResult && "error" in subnetResult ? (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                {subnetResult.error}
              </div>
            ) : subnetResult ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Network Address</span>
                  <span className="text-[#F4F4F6] font-semibold">{subnetResult.networkAddress}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Broadcast Address</span>
                  <span className="text-[#F4F4F6] font-semibold">{subnetResult.broadcastAddress}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Netmask</span>
                  <span className="text-[#F4F4F6]">{subnetResult.netmask}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Wildcard Mask</span>
                  <span className="text-[#F4F4F6]">{subnetResult.wildcardMask}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">First Usable IP</span>
                  <span className="text-emerald-400 font-semibold">{subnetResult.firstUsableIp}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Last Usable IP</span>
                  <span className="text-emerald-400 font-semibold">{subnetResult.lastUsableIp}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Usable Hosts</span>
                  <span className="text-[#F4F4F6]">{subnetResult.usableHosts.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#090A10] border border-white/6 space-y-1">
                  <span className="text-[#737582] text-[10px] uppercase block">Scope / Class</span>
                  <span className="text-[#F4F4F6]">
                    {subnetResult.isPrivate ? "RFC1918 Private" : "Public"} · {subnetResult.ipClass}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default function UtilitiesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-500 font-mono">Loading Utility Suite...</div>}>
      <UtilitiesContent />
    </Suspense>
  );
}
