export interface ToolRelationship {
  id: string;
  source: string;
  target: string;
  type: "alternative" | "workflow_step" | "complementary" | "successor";
  label: string;
}

export const TOOL_RELATIONSHIPS: ToolRelationship[] = [
  // Network Recon & Port Scanning
  { id: "rel-1", source: "rustscan", target: "nmap", type: "workflow_step", label: "Pipes open ports to" },
  { id: "rel-2", source: "masscan", target: "nmap", type: "alternative", label: "High-speed alternative" },
  { id: "rel-3", source: "nmap", target: "nuclei", type: "workflow_step", label: "Hands off services to" },
  { id: "rel-4", source: "shodan", target: "nmap", type: "complementary", label: "Passive vs Active comparison" },

  // Domain & Subdomain Recon
  { id: "rel-5", source: "theharvester", target: "subfinder", type: "workflow_step", label: "Feeds passive OSINT to" },
  { id: "rel-6", source: "subfinder", target: "amass", type: "complementary", label: "Subdomains to network graph" },
  { id: "rel-7", source: "amass", target: "bbot", type: "complementary", label: "Graph to recursive asset scan" },
  { id: "rel-8", source: "subfinder", target: "nuclei", type: "workflow_step", label: "Pipes live hosts to" },
  { id: "rel-9", source: "bbot", target: "shodan", type: "complementary", label: "Asset mapping enrichment" },

  // Web Security & Fuzzing
  { id: "rel-10", source: "gobuster", target: "caido", type: "complementary", label: "Content discovery to proxy" },
  { id: "rel-11", source: "caido", target: "wfuzz", type: "complementary", label: "Proxy inspection to fuzzing" },
  { id: "rel-12", source: "wfuzz", target: "nuclei", type: "complementary", label: "Parameter fuzzing to CVE checks" },

  // Active Directory & Credentials
  { id: "rel-13", source: "bloodhound", target: "impacket", type: "workflow_step", label: "Path analysis to protocol testing" },
  { id: "rel-14", source: "impacket", target: "mimikatz", type: "complementary", label: "Remote protocol to memory dump" },
  { id: "rel-15", source: "impacket", target: "hashcat", type: "workflow_step", label: "Exports ticket hashes to" },
  { id: "rel-16", source: "mimikatz", target: "hashcat", type: "workflow_step", label: "Extracted hashes to" },
  { id: "rel-17", source: "peass-ng", target: "lazagne", type: "complementary", label: "Privilege audit to saved creds" },

  // Digital Forensics & Incident Response
  { id: "rel-18", source: "volatility-3", target: "autopsy", type: "complementary", label: "Memory vs Disk artifacts" },
  { id: "rel-19", source: "kape", target: "autopsy", type: "workflow_step", label: "Triage artifacts to deep analysis" },
  { id: "rel-20", source: "velociraptor", target: "wazuh", type: "complementary", label: "Fleet hunting to central SIEM" },
  { id: "rel-21", source: "pestudio", target: "exiftool", type: "complementary", label: "PE structure to metadata" },
  { id: "rel-22", source: "volatility-3", target: "pestudio", type: "workflow_step", label: "Extracted memory dump to static analysis" },

  // OSINT & Social Intelligence
  { id: "rel-23", source: "osintgram", target: "tookie-osint", type: "complementary", label: "Instagram to username scanner" },
  { id: "rel-24", source: "revealer", target: "osintsearch", type: "complementary", label: "Identity trace to public records" },
  { id: "rel-25", source: "maltego", target: "spiderfoot", type: "complementary", label: "Visual link analysis to automated OSINT" },
  { id: "rel-26", source: "smartimage", target: "exiftool", type: "workflow_step", label: "Reverse image search to EXIF parsing" },

  // GEOINT & Situational
  { id: "rel-27", source: "geoaxis", target: "gods-eye-view", type: "complementary", label: "Geospatial AI to 3D globe" },
  { id: "rel-28", source: "trafficvision-live", target: "geoaxis", type: "complementary", label: "Public camera feeds to terrain analysis" },

  // Privacy & Dark Web
  { id: "rel-29", source: "torbot", target: "neko", type: "complementary", label: "Onion scraping to isolated browser" },
  { id: "rel-30", source: "neko", target: "session", type: "complementary", label: "Isolated sandbox to private comms" },

  // Cloud & Containers
  { id: "rel-31", source: "docker-exploitation-framework", target: "peass-ng", type: "complementary", label: "Container escape to host privilege" },
  { id: "rel-32", source: "gato", target: "nuclei", type: "complementary", label: "CI/CD runner audit to template scanning" },
];
