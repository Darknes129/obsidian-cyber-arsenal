export type DetectedInputType =
  | "ipv4"
  | "ipv6"
  | "cidr"
  | "url"
  | "domain"
  | "email"
  | "jwt"
  | "hash_md5"
  | "hash_sha1"
  | "hash_sha256"
  | "hash_sha512"
  | "uuid"
  | "json"
  | "base64"
  | "unix_timestamp"
  | "unknown";

export interface AnalysisResult {
  type: DetectedInputType;
  label: string;
  confidence: "Format Match" | "High Confidence" | "Probable Format";
  summary: string;
  details: Record<string, string | number | boolean | null>;
  recommendedToolSlugs: string[];
  recommendedUtilityUrls: { name: string; href: string }[];
  contextualActions?: { label: string; actionKey: string; data?: string }[];
}

export function analyzeInput(raw: string): AnalysisResult | null {
  const input = raw.trim();
  if (!input) return null;

  // 1. JSON
  if ((input.startsWith("{") && input.endsWith("}")) || (input.startsWith("[") && input.endsWith("]"))) {
    try {
      const parsed = JSON.parse(input);
      const isArray = Array.isArray(parsed);
      const keys = !isArray && typeof parsed === "object" && parsed !== null ? Object.keys(parsed) : [];
      return {
        type: "json",
        label: "JSON Structured Data",
        confidence: "High Confidence",
        summary: `Valid JSON ${isArray ? `array with ${parsed.length} items` : `object with ${keys.length} top-level keys`}.`,
        details: {
          structure: isArray ? "Array" : "Object",
          topLevelKeys: keys.slice(0, 8).join(", ") || (isArray ? `Length: ${parsed.length}` : "Empty object"),
          byteSize: new Blob([input]).size,
        },
        recommendedToolSlugs: ["nuclei", "caido"],
        recommendedUtilityUrls: [
          { name: "JSON Formatter", href: "/utilities?tool=json-formatter" },
          { name: "Base64 Encoder", href: "/utilities?tool=base64" },
        ],
      };
    } catch {
      // not valid JSON, proceed to other checks
    }
  }

  // 2. JWT (Header.Payload.Signature)
  const jwtRegex = /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
  if (jwtRegex.test(input)) {
    try {
      const parts = input.split(".");
      const headerStr = atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"));
      const payloadStr = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);

      let expReadable: string | null = null;
      if (payload.exp && typeof payload.exp === "number") {
        expReadable = new Date(payload.exp * 1000).toUTCString();
      }

      return {
        type: "jwt",
        label: "JWT (JSON Web Token)",
        confidence: "High Confidence",
        summary: `Signed token detected (Algorithm: ${header.alg || "Unknown"}). Note: Decoding inspects claims locally and does not cryptographically verify the signature.`,
        details: {
          algorithm: header.alg || "none",
          type: header.typ || "JWT",
          subject: payload.sub || "None",
          issuer: payload.iss || "None",
          expiration: expReadable || "No expiration set",
        },
        recommendedToolSlugs: ["caido", "wfuzz"],
        recommendedUtilityUrls: [
          { name: "JWT Inspector Utility", href: `/utilities?tool=jwt-decoder&input=${encodeURIComponent(input)}` },
          { name: "Base64 Decoder", href: "/utilities?tool=base64" },
        ],
      };
    } catch {
      // malformed payload, fallback
    }
  }

  // 3. CIDR IPv4
  const cidrRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/;
  if (cidrRegex.test(input)) {
    const [ip, prefix] = input.split("/");
    const prefixNum = parseInt(prefix, 10);
    const totalHosts = prefixNum === 32 ? 1 : prefixNum === 31 ? 2 : Math.pow(2, 32 - prefixNum);
    const usableHosts = prefixNum >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

    return {
      type: "cidr",
      label: "IPv4 CIDR Network Block",
      confidence: "High Confidence",
      summary: `Subnet block /${prefix} encompassing ${totalHosts.toLocaleString()} total IP addresses (${usableHosts.toLocaleString()} usable hosts).`,
      details: {
        baseIp: ip,
        prefixLength: `/${prefix}`,
        totalHosts: totalHosts.toLocaleString(),
        usableHosts: usableHosts.toLocaleString(),
      },
      recommendedToolSlugs: ["masscan", "rustscan", "nmap", "shodan"],
      recommendedUtilityUrls: [
        { name: "Subnet Calculator", href: `/utilities?tool=subnet-calculator&input=${encodeURIComponent(input)}` },
      ],
    };
  }

  // 4. IPv4 Address
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(input)) {
    const octets = input.split(".").map(Number);
    let scope = "Public Internet Address";
    if (octets[0] === 10) scope = "RFC1918 Private (10.0.0.0/8)";
    else if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) scope = "RFC1918 Private (172.16.0.0/12)";
    else if (octets[0] === 192 && octets[1] === 168) scope = "RFC1918 Private (192.168.0.0/16)";
    else if (octets[0] === 127) scope = "Loopback (127.0.0.0/8)";
    else if (octets[0] === 169 && octets[1] === 254) scope = "Link-Local / APIPA (169.254.0.0/16)";

    return {
      type: "ipv4",
      label: "IPv4 Host Address",
      confidence: "High Confidence",
      summary: `Standard 32-bit Internet Protocol address (${scope}).`,
      details: {
        address: input,
        scope,
        integerValue: (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3],
      },
      recommendedToolSlugs: ["nmap", "rustscan", "masscan", "shodan", "wazuh"],
      recommendedUtilityUrls: [
        { name: "Subnet Calculator", href: `/utilities?tool=subnet-calculator&input=${encodeURIComponent(input + "/24")}` },
      ],
    };
  }

  // 5. IPv6 Address
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  if (ipv6Regex.test(input)) {
    return {
      type: "ipv6",
      label: "IPv6 Host Address",
      confidence: "High Confidence",
      summary: `Standard 128-bit IPv6 address identifier.`,
      details: {
        address: input,
        isLoopback: input === "::1",
      },
      recommendedToolSlugs: ["nmap", "shodan"],
      recommendedUtilityUrls: [],
    };
  }

  // 6. URL
  if (input.startsWith("http://") || input.startsWith("https://") || input.startsWith("ftp://")) {
    try {
      const parsedUrl = new URL(input);
      return {
        type: "url",
        label: "Uniform Resource Locator (URL)",
        confidence: "High Confidence",
        summary: `Web endpoint targeting host "${parsedUrl.hostname}" with protocol "${parsedUrl.protocol}".`,
        details: {
          protocol: parsedUrl.protocol,
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (parsedUrl.protocol === "https:" ? "443 (default)" : "80 (default)"),
          pathname: parsedUrl.pathname,
          searchParams: parsedUrl.search || "None",
        },
        recommendedToolSlugs: ["caido", "nuclei", "gobuster", "wfuzz"],
        recommendedUtilityUrls: [
          { name: "URL Encoder / Decoder", href: `/utilities?tool=url-encoder&input=${encodeURIComponent(input)}` },
        ],
      };
    } catch {
      // not a standard URL, continue
    }
  }

  // 7. Email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(input)) {
    const [, domain] = input.split("@");
    return {
      type: "email",
      label: "Email Address",
      confidence: "High Confidence",
      summary: `Electronic mail identifier on domain "${domain}".`,
      details: {
        mailbox: input.split("@")[0],
        domain,
      },
      recommendedToolSlugs: ["theharvester", "mailaccess", "revealer", "osintsearch", "spiderfoot"],
      recommendedUtilityUrls: [],
    };
  }

  // 8. UUID
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  if (uuidRegex.test(input)) {
    const version = input.split("-")[2]?.[0];
    return {
      type: "uuid",
      label: "Universally Unique Identifier (UUID)",
      confidence: "High Confidence",
      summary: `RFC 4122 compliant UUID Version ${version || "4"}.`,
      details: {
        canonical: input.toLowerCase(),
        version: version || "Unknown",
        variant: "DCE 1.1 / ISO/IEC 11578:1996",
      },
      recommendedToolSlugs: [],
      recommendedUtilityUrls: [
        { name: "UUID Generator", href: "/utilities?tool=uuid-generator" },
      ],
    };
  }

  // 9. Hashes (MD5, SHA-1, SHA-256, SHA-512)
  const hexOnly = /^[0-9a-fA-F]+$/;
  if (hexOnly.test(input)) {
    if (input.length === 32) {
      return {
        type: "hash_md5",
        label: "Possible MD5 Hash",
        confidence: "Format Match",
        summary: "128-bit (32 hexadecimal characters) cryptographic digest representation. Note: NTLM hashes also use 32 hex characters.",
        details: {
          digestLength: "128 bits (16 bytes)",
          hexLength: "32 characters",
          potentialAlgorithms: "MD5, NTLM, MD4",
        },
        recommendedToolSlugs: ["hashcat", "mimikatz", "impacket"],
        recommendedUtilityUrls: [
          { name: "Hash Generator", href: "/utilities?tool=hash-generator" },
        ],
      };
    }
    if (input.length === 40) {
      return {
        type: "hash_sha1",
        label: "Possible SHA-1 Hash",
        confidence: "Format Match",
        summary: "160-bit (40 hexadecimal characters) cryptographic digest representation.",
        details: {
          digestLength: "160 bits (20 bytes)",
          hexLength: "40 characters",
          potentialAlgorithms: "SHA-1, RIPEMD-160",
        },
        recommendedToolSlugs: ["hashcat"],
        recommendedUtilityUrls: [
          { name: "Hash Generator", href: "/utilities?tool=hash-generator" },
        ],
      };
    }
    if (input.length === 64) {
      return {
        type: "hash_sha256",
        label: "Possible SHA-256 Hash",
        confidence: "Format Match",
        summary: "256-bit (64 hexadecimal characters) cryptographic digest representation.",
        details: {
          digestLength: "256 bits (32 bytes)",
          hexLength: "64 characters",
          potentialAlgorithms: "SHA-256, HMAC-SHA256",
        },
        recommendedToolSlugs: ["hashcat", "pala-studio", "volatility-3"],
        recommendedUtilityUrls: [
          { name: "Hash Generator", href: "/utilities?tool=hash-generator" },
        ],
      };
    }
    if (input.length === 128) {
      return {
        type: "hash_sha512",
        label: "Possible SHA-512 Hash",
        confidence: "Format Match",
        summary: "512-bit (128 hexadecimal characters) cryptographic digest representation.",
        details: {
          digestLength: "512 bits (64 bytes)",
          hexLength: "128 characters",
          potentialAlgorithms: "SHA-512, Whirlpool",
        },
        recommendedToolSlugs: ["hashcat"],
        recommendedUtilityUrls: [
          { name: "Hash Generator", href: "/utilities?tool=hash-generator" },
        ],
      };
    }
  }

  // 10. Unix Timestamp
  if (/^[0-9]{9,13}$/.test(input)) {
    const num = parseInt(input, 10);
    // reasonable timestamp check between 2000 and 2038 for seconds, or ms
    const isSeconds = num > 946684800 && num < 2147483647;
    const isMilliseconds = num > 946684800000 && num < 2147483647000;
    if (isSeconds || isMilliseconds) {
      const date = new Date(isSeconds ? num * 1000 : num);
      return {
        type: "unix_timestamp",
        label: "Unix Epoch Timestamp",
        confidence: "Format Match",
        summary: `Numeric timestamp representing ${date.toUTCString()} (UTC).`,
        details: {
          utcDate: date.toUTCString(),
          isoDate: date.toISOString(),
          precision: isSeconds ? "Seconds" : "Milliseconds",
        },
        recommendedToolSlugs: ["volatility-3", "autopsy", "velociraptor"],
        recommendedUtilityUrls: [
          { name: "Timestamp Converter", href: `/utilities?tool=timestamp-converter&input=${input}` },
        ],
      };
    }
  }

  // 11. Domain Name (e.g. example.com, test.sub.co.uk)
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (domainRegex.test(input) && !input.includes("/")) {
    return {
      type: "domain",
      label: "Fully Qualified Domain Name (FQDN)",
      confidence: "High Confidence",
      summary: `Internet hostname "${input}".`,
      details: {
        domain: input,
        tld: input.split(".").pop() || "",
        levels: input.split(".").length,
      },
      recommendedToolSlugs: ["subfinder", "amass", "theharvester", "bbot", "shodan", "gobuster"],
      recommendedUtilityUrls: [
        { name: "URL Encoder", href: `/utilities?tool=url-encoder&input=${encodeURIComponent(input)}` },
      ],
    };
  }

  // 12. Base64
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (input.length >= 8 && input.length % 4 === 0 && base64Regex.test(input)) {
    try {
      const decoded = atob(input);
      // check if decoded has printable characters
      const isPrintable = /^[\x20-\x7E\s]*$/.test(decoded);
      if (isPrintable && decoded.length > 2) {
        return {
          type: "base64",
          label: "Base64 Encoded String",
          confidence: "Format Match",
          summary: `Encoded representation that resolves to "${decoded.slice(0, 48)}${decoded.length > 48 ? "..." : ""}".`,
          details: {
            decodedLength: `${decoded.length} bytes`,
            preview: decoded.slice(0, 80),
          },
          recommendedToolSlugs: ["caido"],
          recommendedUtilityUrls: [
            { name: "Base64 Decoder", href: `/utilities?tool=base64&input=${encodeURIComponent(input)}` },
          ],
        };
      }
    } catch {
      // not clean base64
    }
  }

  // Default fallback for unknown / general keyword
  return {
    type: "unknown",
    label: "Generic Technical Identifier",
    confidence: "Format Match",
    summary: `Search catalog for tools matching keyword "${input}".`,
    details: {
      inputLength: input.length,
      characters: input.slice(0, 32),
    },
    recommendedToolSlugs: ["nmap", "shodan", "theharvester"],
    recommendedUtilityUrls: [
      { name: "Regex Tester", href: `/utilities?tool=regex-tester&input=${encodeURIComponent(input)}` },
      { name: "Base64 Encoder", href: `/utilities?tool=base64&input=${encodeURIComponent(input)}` },
    ],
  };
}
