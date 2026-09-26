export interface SubnetResult {
  ip: string;
  prefix: number;
  netmask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  isPrivate: boolean;
}

export const nativeUtilities = {
  // 1. Base64
  base64Encode(text: string): string {
    try {
      const bytes = new TextEncoder().encode(text);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } catch {
      return btoa(unescape(encodeURIComponent(text)));
    }
  },

  base64Decode(encoded: string): { text: string; error?: string } {
    try {
      const binary = atob(encoded.trim());
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return { text: new TextDecoder().decode(bytes) };
    } catch (e: unknown) {
      return { text: "", error: e instanceof Error ? e.message : "Invalid Base64 sequence." };
    }
  },

  // 2. URL Encoder / Decoder
  urlEncode(text: string, encodeAll = false): string {
    if (encodeAll) {
      return encodeURIComponent(text);
    }
    return encodeURI(text);
  },

  urlDecode(encoded: string): { text: string; error?: string } {
    try {
      return { text: decodeURIComponent(encoded) };
    } catch (e: unknown) {
      return { text: "", error: e instanceof Error ? e.message : "Malformed URI sequence." };
    }
  },

  // 3. JWT Decoder
  decodeJwt(token: string): {
    header: Record<string, unknown> | null;
    payload: Record<string, unknown> | null;
    error?: string;
  } {
    const cleanToken = token.trim();
    const parts = cleanToken.split(".");
    if (parts.length !== 3) {
      return { header: null, payload: null, error: "Invalid JWT format. A valid token consists of three dot-separated segments." };
    }

    try {
      const decodeSegment = (seg: string) => {
        const base64 = seg.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        return JSON.parse(decodeURIComponent(escape(atob(padded))));
      };

      const header = decodeSegment(parts[0]);
      const payload = decodeSegment(parts[1]);
      return { header, payload };
    } catch (e: unknown) {
      return { header: null, payload: null, error: e instanceof Error ? e.message : "Failed to parse JWT payload." };
    }
  },

  // 4. Hash Generator
  async computeHash(algorithm: "SHA-256" | "SHA-384" | "SHA-512", text: string): Promise<string> {
    if (typeof window === "undefined" || !window.crypto || !window.crypto.subtle) {
      throw new Error("Web Cryptography API is unavailable in this environment.");
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  },

  // 5. UUID v4 Generator
  generateUuidV4(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  // 6. JSON Formatter
  formatJson(raw: string, mode: "pretty" | "minify" = "pretty"): { output: string; error?: string } {
    try {
      const parsed = JSON.parse(raw);
      if (mode === "minify") {
        return { output: JSON.stringify(parsed) };
      }
      return { output: JSON.stringify(parsed, null, 2) };
    } catch (e: unknown) {
      return { output: "", error: e instanceof Error ? e.message : "Malformed JSON syntax." };
    }
  },

  // 7. Unix Timestamp Converter
  convertTimestamp(input: string): {
    utcDate?: string;
    localDate?: string;
    isoDate?: string;
    timestampSec?: number;
    timestampMs?: number;
    error?: string;
  } {
    const trimmed = input.trim();
    if (!trimmed) return { error: "Please enter a timestamp or date." };

    let timestamp: number;
    if (/^\d+$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      timestamp = trimmed.length <= 10 ? num * 1000 : num;
    } else {
      const parsedDate = new Date(trimmed);
      if (isNaN(parsedDate.getTime())) {
        return { error: "Unrecognized date format." };
      }
      timestamp = parsedDate.getTime();
    }

    const d = new Date(timestamp);
    if (isNaN(d.getTime())) {
      return { error: "Invalid timestamp value." };
    }

    return {
      utcDate: d.toUTCString(),
      localDate: d.toLocaleString(),
      isoDate: d.toISOString(),
      timestampSec: Math.floor(d.getTime() / 1000),
      timestampMs: d.getTime(),
    };
  },

  // 8. Regex Tester
  testRegex(pattern: string, flags: string, text: string): {
    matches: { index: number; text: string; groups?: Record<string, string> }[];
    error?: string;
  } {
    if (!pattern) return { matches: [] };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { index: number; text: string; groups?: Record<string, string> }[] = [];

      if (flags.includes("g")) {
        let match: RegExpExecArray | null;
        let loops = 0;
        while ((match = regex.exec(text)) !== null && loops < 2000) {
          loops++;
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.groups ? { ...match.groups } : undefined,
          });
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(text);
        if (match) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.groups ? { ...match.groups } : undefined,
          });
        }
      }
      return { matches };
    } catch (e: unknown) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid Regular Expression syntax." };
    }
  },

  // 9. IPv4 Subnet Calculator
  calculateSubnet(cidrInput: string): SubnetResult | { error: string } {
    const trimmed = cidrInput.trim();
    const parts = trimmed.split("/");
    const ip = parts[0];
    const prefix = parts.length > 1 ? parseInt(parts[1], 10) : 24;

    if (isNaN(prefix) || prefix < 0 || prefix > 32) {
      return { error: "CIDR prefix must be an integer between 0 and 32." };
    }

    const ipParts = ip.split(".").map(Number);
    if (ipParts.length !== 4 || ipParts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      return { error: "Invalid IPv4 address format (e.g. 192.168.1.0/24)." };
    }

    const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const wildcardInt = ~maskInt >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const intToIp = (num: number) =>
      [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".");

    const totalHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.pow(2, 32 - prefix);
    const usableHosts = prefix >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

    const firstUsableInt = prefix >= 31 ? networkInt : networkInt + 1;
    const lastUsableInt = prefix >= 31 ? broadcastInt : Math.max(networkInt, broadcastInt - 1);

    let ipClass = "Classless";
    const firstOctet = ipParts[0];
    if (firstOctet < 128) ipClass = "Class A";
    else if (firstOctet < 192) ipClass = "Class B";
    else if (firstOctet < 224) ipClass = "Class C";
    else if (firstOctet < 240) ipClass = "Class D (Multicast)";
    else ipClass = "Class E (Reserved)";

    const isPrivate =
      firstOctet === 10 ||
      (firstOctet === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
      (firstOctet === 192 && ipParts[1] === 168);

    return {
      ip,
      prefix,
      netmask: intToIp(maskInt),
      wildcardMask: intToIp(wildcardInt),
      networkAddress: intToIp(networkInt),
      broadcastAddress: intToIp(broadcastInt),
      firstUsableIp: intToIp(firstUsableInt),
      lastUsableIp: intToIp(lastUsableInt),
      totalHosts,
      usableHosts,
      ipClass,
      isPrivate,
    };
  },
};
