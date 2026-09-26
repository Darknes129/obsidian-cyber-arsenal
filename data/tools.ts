import { Tool } from "@/types/tool";

export const TOOLS: Tool[] = [
  // 1. OSINTGRAM
  {
    id: "tool-osintgram",
    slug: "osintgram",
    name: "Osintgram",
    tagline: "Modular Instagram open-source intelligence and profile analysis CLI.",
    description: "Osintgram provides a modular shell interface to perform authorized open-source intelligence analysis on target Instagram profiles, retrieving followers, metadata, locations, and interactive engagement metrics via legitimate API interactions.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Social Intelligence"],
    tags: ["Python", "CLI", "Instagram", "Profile Analysis", "Metadata"],
    type: "cli",
    platforms: ["Linux", "macOS", "Docker"],
    urls: {
      github: "https://github.com/Datalux/Osintgram",
      documentation: "https://github.com/Datalux/Osintgram#readme",
    },
    status: "Maintained",
    lastVerified: "2025-06-15",
    dualUseNotice: false,
    requirements: ["Python 3.8+", "pip", "Instagram Session Credentials"],
    installation: {
      linux: [
        "git clone https://github.com/Datalux/Osintgram.git",
        "cd Osintgram",
        "python3 -m venv venv && source venv/bin/activate",
        "pip3 install -r requirements.txt",
      ],
      docker: [
        "docker build -t osintgram .",
        "docker run --rm -it -v \"$PWD/config:/home/osintgram/config\" osintgram <target_username>",
      ],
      notes: "Requires configuring valid credentials in config/credentials.ini before launching the interactive shell.",
    },
    quickStart: {
      command: "python3 main.py <target_username>",
      shell: "bash",
      note: "Starts an interactive command shell with built-in subcommands like 'info', 'photodes', 'captions'.",
    },
    capabilities: [
      "Target profile biography, ID, and basic metadata extraction",
      "Analysis of follower/following networks and shared connections",
      "Photo captions, timestamps, and tagged user collection",
      "Geographical tagged location analysis across published posts",
    ],
    useCases: [
      "Investigative OSINT for cyber fraud and identity verification",
      "Digital footprint auditing for VIP and executive protection",
      "Authorized academic research into social media network graphs",
    ],
    commands: [
      {
        title: "Launch interactive session",
        command: "python3 main.py target_username",
        description: "Initializes the authenticated session and prompts for interactive subcommands.",
      },
      {
        title: "Export followers list",
        command: "Run command 'followers' inside the interactive Osintgram shell",
        description: "Collects and stores followers in the output directory.",
      },
    ],
    relatedToolSlugs: ["tookie-osint", "revealer", "osintsearch", "spiderfoot"],
  },

  // 2. OSINTSEARCH
  {
    id: "tool-osintsearch",
    slug: "osintsearch",
    name: "OSINTSearch",
    tagline: "Federated multi-engine search aggregator for public records and OSINT.",
    description: "OSINTSearch aggregates public data searches across domain records, username indexes, email leaks, and corporate filings into a single unified search interface.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Identity Intelligence"],
    tags: ["Web", "Search", "Public Records", "Identity"],
    type: "web",
    platforms: ["Web"],
    urls: {
      official: "https://osintsearch.org",
    },
    status: "Active",
    lastVerified: "2025-08-10",
    requirements: ["Modern web browser"],
    capabilities: [
      "Consolidated queries across public databases and registries",
      "Domain whois, DNS historical records, and ASN cross-referencing",
      "Username availability and profile existence verification",
    ],
    useCases: [
      "Initial background investigation and reconnaissance triage",
      "Verification of corporate affiliations and public entity registrations",
    ],
    relatedToolSlugs: ["revealer", "tookie-osint", "theharvester"],
  },

  // 3. REVEALER
  {
    id: "tool-revealer",
    slug: "revealer",
    name: "Revealer",
    tagline: "Identity correlation and online footprint discovery service.",
    description: "Revealer enables investigators to trace digital identities, phone numbers, and username aliases across publicly indexed data sources, supporting cybercrime attribution and fraud detection.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Identity Intelligence"],
    tags: ["Web", "Identity Intelligence", "Attribution", "Investigation"],
    type: "web",
    platforms: ["Web"],
    urls: {
      official: "https://revealer.us",
    },
    status: "Active",
    lastVerified: "2025-07-20",
    requirements: ["Modern web browser"],
    capabilities: [
      "Phone number carrier and line type resolution",
      "Public record correlation across identity attributes",
      "Cross-platform profile identifier discovery",
    ],
    useCases: [
      "Fraud investigation and identity verification",
      "Cybercrime suspect attribution from public identifiers",
    ],
    relatedToolSlugs: ["osintsearch", "tookie-osint", "osintgram"],
  },

  // 4. TOOKIE-OSINT
  {
    id: "tool-tookie-osint",
    slug: "tookie-osint",
    name: "tookie-osint",
    tagline: "Fast asynchronous username enumeration and digital presence scanner.",
    description: "tookie-osint checks for the existence of target usernames across hundreds of online platforms and communities using concurrent asynchronous HTTP requests.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Username Intelligence"],
    tags: ["Python", "CLI", "Async", "Username Recon", "Social"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/Alfredredbird/tookie-osint",
      documentation: "https://github.com/Alfredredbird/tookie-osint#readme",
    },
    status: "Maintained",
    lastVerified: "2025-05-12",
    requirements: ["Python 3.9+", "pip"],
    installation: {
      linux: [
        "git clone https://github.com/Alfredredbird/tookie-osint.git",
        "cd tookie-osint",
        "pip3 install -r requirements.txt",
      ],
      pip: ["pip3 install tookie-osint"],
    },
    quickStart: {
      command: "python3 tookie.py -u <target_username>",
      shell: "bash",
    },
    capabilities: [
      "Concurrent enumeration across 300+ platforms",
      "False-positive filtering via response status and content checks",
      "JSON export of identified profile URLs",
    ],
    useCases: [
      "Mapping online alias presence during authorized investigations",
      "Personal security reviews to discover forgotten registered accounts",
    ],
    commands: [
      {
        title: "Scan target username",
        command: "python3 tookie.py -u testuser --export-json results.json",
        description: "Scans all supported services for 'testuser' and saves the output.",
      },
    ],
    relatedToolSlugs: ["osintgram", "revealer", "theharvester"],
  },

  // 5. SMARTIMAGE
  {
    id: "tool-smartimage",
    slug: "smartimage",
    name: "SmartImage",
    tagline: "Automated reverse image search and visual intelligence aggregator.",
    description: "SmartImage queries multiple major reverse image search engines simultaneously (Google Lens, Yandex, Bing, TinEye) and extracts EXIF metadata to identify image provenance and location hints.",
    primaryCategory: "Image Intelligence",
    categories: ["Image Intelligence", "OSINT & Intelligence", "GEOINT & Situational"],
    tags: ["Python", "Reverse Image Search", "EXIF", "Visual Intel"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/Decimation/SmartImage",
      documentation: "https://github.com/Decimation/SmartImage#readme",
    },
    status: "Maintained",
    lastVerified: "2025-04-18",
    requirements: ["Python 3.8+", "pip", "Chromium/Playwright/Selenium drivers"],
    installation: {
      linux: [
        "git clone https://github.com/Decimation/SmartImage.git",
        "cd SmartImage",
        "pip3 install -r requirements.txt",
      ],
    },
    quickStart: {
      command: "python3 smartimage.py -i evidence.jpg",
      shell: "bash",
    },
    capabilities: [
      "Multi-engine reverse image querying across Google, Yandex, and Bing",
      "Embedded EXIF metadata extraction (GPS coordinates, camera model, timestamps)",
      "Automated perceptual hash comparison",
    ],
    useCases: [
      "Verifying authenticity of user-submitted images in OSINT",
      "Geolocation analysis from image landmarks and metadata",
    ],
    commands: [
      {
        title: "Analyze image file",
        command: "python3 smartimage.py -i sample.jpg -o report.html",
        description: "Runs reverse search across engines and generates an HTML comparison.",
      },
    ],
    relatedToolSlugs: ["exiftool", "geoaxis", "gods-eye-view"],
  },

  // 6. BBOT
  {
    id: "tool-bbot",
    slug: "bbot",
    name: "BBOT",
    tagline: "Bighorn recursive attack surface discovery and OSINT automation framework.",
    description: "BBOT (Bighorn Build-Out Tool) is a modular, high-performance recursive OSINT and asset discovery framework created by Black Lantern Security. It executes subdomain discovery, port scanning, web crawling, cloud bucket enumeration, and DNS resolution.",
    primaryCategory: "Attack Surface Management",
    categories: ["Attack Surface Management", "Reconnaissance & DNS", "OSINT & Intelligence"],
    tags: ["Python", "CLI", "AsyncIO", "Attack Surface", "Subdomains", "Recon"],
    type: "cli",
    platforms: ["Linux", "macOS", "Docker"],
    urls: {
      github: "https://github.com/blacklanternsecurity/bbot",
      documentation: "https://www.blacklanternsecurity.com/bbot/",
    },
    status: "Active",
    lastVerified: "2025-09-01",
    dualUseNotice: true,
    requirements: ["Python 3.10+", "pipx / pip", "Linux / macOS"],
    installation: {
      pip: ["pipx install bbot", "bbot --help"],
      docker: [
        "docker run -it --rm -v ~/.bbot:/root/.bbot blacklanternsecurity/bbot -t example.com -f subdomain-enum",
      ],
      linux: [
        "sudo apt update && sudo apt install -y pipx",
        "pipx ensurepath",
        "pipx install bbot",
      ],
    },
    quickStart: {
      command: "bbot -t example.com -f subdomain-enum",
      shell: "bash",
      note: "Executes passive and active subdomain enumeration for the authorized domain scope.",
    },
    capabilities: [
      "Recursive asset discovery across DNS, web endpoints, and cloud buckets",
      "Graph-based relationship modeling between domains, IPs, and technologies",
      "Over 80 modular plugins with Neo4j and web UI export capabilities",
      "Strict in-scope filtering to avoid out-of-scope interactions",
    ],
    useCases: [
      "Attack surface mapping for enterprise defensive programs",
      "Automated asset inventory for bug bounty and authorized assessments",
    ],
    commands: [
      {
        title: "Subdomain enumeration preset",
        command: "bbot -t authorized-lab.local -f subdomain-enum",
        description: "Runs passive and active discovery modules for authorized hostnames.",
      },
      {
        title: "Passive-only reconnaissance",
        command: "bbot -t target.corp -m crt,virustotal,alienvault -f passive",
        description: "Executes OSINT without sending packets to the target infrastructure.",
      },
    ],
    relatedToolSlugs: ["subfinder", "amass", "theharvester", "shodan"],
  },

  // 7. GEOAXIS
  {
    id: "tool-geoaxis",
    slug: "geoaxis",
    name: "GeoAxis",
    tagline: "AI-driven geospatial image analysis and terrain geolocation platform.",
    description: "GeoAxis provides a browser-based suite for geospatial intelligence analysts, offering automated landmark identification, satellite imagery overlay analysis, and terrain feature matching.",
    primaryCategory: "GEOINT & Situational",
    categories: ["GEOINT & Situational", "Image Intelligence"],
    tags: ["Web", "GEOINT", "Satellite", "Terrain Analysis", "Geolocation"],
    type: "web",
    platforms: ["Web"],
    urls: {
      official: "https://geoaxis.ai/dashboard",
    },
    status: "Active",
    lastVerified: "2025-06-30",
    requirements: ["Modern WebGL-capable browser"],
    capabilities: [
      "Satellite imagery alignment and comparative change detection",
      "Automated terrain signature matching for geolocation challenges",
      "Integration of geospatial metadata with public mapping providers",
    ],
    useCases: [
      "Visual verification of conflict zone imagery and environmental claims",
      "Open-source intelligence investigations requiring precise coordinates",
    ],
    relatedToolSlugs: ["gods-eye-view", "trafficvision-live", "smartimage"],
  },

  // 8. GOD'S EYE VIEW
  {
    id: "tool-gods-eye-view",
    slug: "gods-eye-view",
    name: "God's Eye View",
    tagline: "3D real-time geospatial intelligence and situational awareness visualizer.",
    description: "God's Eye View by Bilawal Sidhu is an open-source experimental visualizer combining 3D WebGL terrain engines, satellite tiles, live flight paths, marine tracking, and open data layers into a situational awareness dashboard.",
    primaryCategory: "GEOINT & Situational",
    categories: ["GEOINT & Situational", "Situational Awareness", "Data Visualization"],
    tags: ["JavaScript", "WebGL", "Three.js", "Cesium", "3D GIS", "GEOINT"],
    type: "web",
    platforms: ["Web", "Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/bilawalsidhu/gods-eye-view",
      documentation: "https://github.com/bilawalsidhu/gods-eye-view#readme",
    },
    status: "Maintained",
    lastVerified: "2025-07-15",
    requirements: ["Node.js 18+", "Mapbox / Cesium API tokens"],
    installation: {
      linux: [
        "git clone https://github.com/bilawalsidhu/gods-eye-view.git",
        "cd gods-eye-view",
        "npm install",
        "npm run dev",
      ],
    },
    quickStart: {
      command: "npm run dev",
      shell: "bash",
      note: "Spins up the local 3D globe visualization server on localhost:3000.",
    },
    capabilities: [
      "Interactive 3D globe with photorealistic terrain elevation meshes",
      "Layering of ADS-B flight telemetry and AIS vessel tracking",
      "Custom vector polygon overlays for disaster or security zone monitoring",
    ],
    useCases: [
      "Situational awareness during live incident response",
      "Geospatial visualization for security research and open-source investigations",
    ],
    relatedToolSlugs: ["geoaxis", "trafficvision-live"],
  },

  // 9. TRAFFICVISION.LIVE
  {
    id: "tool-trafficvision-live",
    slug: "trafficvision-live",
    name: "Trafficvision.live",
    tagline: "Global directory of publicly broadcast traffic and security surveillance feeds.",
    description: "Trafficvision.live indexes publicly available, unauthenticated municipal traffic camera streams and highway monitoring feeds worldwide, enabling investigators to verify physical conditions in real-time.",
    primaryCategory: "GEOINT & Situational",
    categories: ["GEOINT & Situational", "Public Camera Intelligence"],
    tags: ["Web", "CCTV", "Traffic Feeds", "GEOINT", "Live Stream"],
    type: "web",
    platforms: ["Web"],
    urls: {
      official: "https://trafficvision.live",
    },
    status: "Active",
    lastVerified: "2025-08-01",
    requirements: ["Modern web browser with HLS/WebRTC streaming support"],
    capabilities: [
      "Map-based navigation of municipal traffic video feeds",
      "Verification of weather, road conditions, and physical incidents",
      "Cross-referencing camera coordinate metadata with public map grids",
    ],
    useCases: [
      "Physical security incident verification in monitored cities",
      "OSINT timeline validation using camera timestamps and environmental conditions",
    ],
    relatedToolSlugs: ["geoaxis", "gods-eye-view"],
  },

  // 10. HORUS
  {
    id: "tool-horus",
    slug: "horus",
    name: "Horus",
    tagline: "Lightweight multi-source OSINT and identity investigation tool.",
    description: "Horus provides a unified reconnaissance script for gathering emails, social media handles, and domain records from open databases and search APIs.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Investigation"],
    tags: ["Python", "CLI", "Recon", "Email", "OSINT"],
    type: "cli",
    platforms: ["Linux", "macOS"],
    urls: {
      github: "https://github.com/6abd/horus",
      documentation: "https://github.com/6abd/horus#readme",
    },
    status: "Maintained",
    lastVerified: "2025-05-18",
    requirements: ["Python 3.8+", "pip"],
    installation: {
      linux: [
        "git clone https://github.com/6abd/horus.git",
        "cd horus",
        "pip3 install -r requirements.txt",
      ],
    },
    quickStart: {
      command: "python3 horus.py --target target@example.com",
      shell: "bash",
    },
    capabilities: [
      "Target identity resolution across public social footprints",
      "Automated web search scraping with rate-limit evasion heuristics",
    ],
    useCases: [
      "Rapid preliminary target scoping in authorized intelligence assignments",
    ],
    relatedToolSlugs: ["theharvester", "tookie-osint", "mailaccess"],
  },

  // 11. TORBOT
  {
    id: "tool-torbot",
    slug: "torbot",
    name: "TorBot",
    tagline: "Dark web crawler and automated hidden services (.onion) OSINT tool.",
    description: "TorBot is an open-source intelligence tool written in Python that routes requests through the Tor SOCKS proxy to crawl, index, and analyze .onion hidden services.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Tor / Onion Intelligence", "Threat Intelligence"],
    tags: ["Python", "Tor", "Dark Web", "Crawler", "Onion", "Threat Intel"],
    type: "cli",
    platforms: ["Linux", "Docker"],
    urls: {
      github: "https://github.com/DedSecInside/TorBot",
      documentation: "https://github.com/DedSecInside/TorBot#readme",
    },
    status: "Maintained",
    lastVerified: "2025-07-02",
    dualUseNotice: true,
    requirements: ["Python 3.9+", "Local Tor service running (SOCKS port 9050/9150)"],
    installation: {
      linux: [
        "sudo apt install -y tor",
        "sudo systemctl start tor",
        "git clone https://github.com/DedSecInside/TorBot.git",
        "cd TorBot",
        "pip3 install -r requirements.txt",
      ],
      docker: [
        "docker build -t torbot .",
        "docker run --net=host -it torbot -u http://expyuz5wqqfdgah56...onion --depth 1",
      ],
    },
    quickStart: {
      command: "python3 torbot.py -u http://targethidden.onion --depth 1",
      shell: "bash",
    },
    capabilities: [
      "Recursive crawling of Tor hidden service links",
      "Title, meta tag, and email scraping from .onion HTML",
      "Identification of connected clearnet domains and tracking IDs",
      "Tree-view graph visualization of linked onion sites",
    ],
    useCases: [
      "Dark web threat intelligence and credential leak monitoring",
      "Ransomware leak site tracking for incident response teams",
    ],
    commands: [
      {
        title: "Crawl onion URL to depth 2",
        command: "python3 torbot.py -u http://examplehidden.onion -d 2 --save json",
        description: "Scrapes hyperlinks and outputs discovered links in JSON format.",
      },
    ],
    relatedToolSlugs: ["spiderfoot", "theharvester"],
  },

  // 12. MAILACCESS
  {
    id: "tool-mailaccess",
    slug: "mailaccess",
    name: "MailAccess",
    tagline: "Automated verification and configuration scanner for email accounts.",
    description: "MailAccess checks SMTP, IMAP, and POP3 mail server access and configuration policies for target email infrastructure in authorized security audits.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Email Intelligence"],
    tags: ["Python", "Email", "SMTP", "IMAP", "Auditing"],
    type: "cli",
    platforms: ["Linux", "macOS"],
    urls: {
      github: "https://github.com/KatrielMoses/MailAccess",
    },
    status: "Maintained",
    lastVerified: "2025-04-10",
    dualUseNotice: true,
    requirements: ["Python 3.8+", "pip"],
    installation: {
      linux: [
        "git clone https://github.com/KatrielMoses/MailAccess.git",
        "cd MailAccess",
        "pip3 install -r requirements.txt",
      ],
    },
    quickStart: {
      command: "python3 mailaccess.py --help",
      shell: "bash",
    },
    capabilities: [
      "Verification of mail service ports and TLS configurations",
      "Automated testing of test accounts against internal SMTP relay endpoints",
    ],
    useCases: [
      "Auditing corporate email server encryption and open-relay configurations",
    ],
    relatedToolSlugs: ["theharvester", "revealer"],
  },

  // 13. NEKO
  {
    id: "tool-neko",
    slug: "neko",
    name: "Neko",
    tagline: "Self-hosted browser in Docker running via WebRTC for isolated web activity.",
    description: "Neko runs a virtual browser inside a Docker container accessible via WebRTC with multi-user screen sharing. In cybersecurity operations, it provides an isolated browser sandbox for analyzing suspicious links and conducting malware triage without exposing the host operating system.",
    primaryCategory: "Privacy & Infrastructure",
    categories: ["Privacy & Infrastructure", "Self-hosted Infrastructure", "Malware Analysis"],
    tags: ["Docker", "WebRTC", "Browser Isolation", "Sandbox", "Privacy"],
    type: "self-hosted",
    platforms: ["Docker", "Linux"],
    urls: {
      github: "https://github.com/m1k1o/neko",
      documentation: "https://neko.m1k.io/",
    },
    status: "Active",
    lastVerified: "2025-08-15",
    requirements: ["Docker", "Docker Compose"],
    installation: {
      docker: [
        "docker run -d --name=neko --net=host \\",
        "  -e NEKO_SCREEN=1920x1080@30 \\",
        "  -e NEKO_PASSWORD=neko \\",
        "  -e NEKO_PASSWORD_ADMIN=admin \\",
        "  -e NEKO_EPR=59000-59100 \\",
        "  -e NEKO_ICELITE=1 \\",
        "  m1k1o/neko:firefox",
      ],
    },
    quickStart: {
      command: "docker run -d -p 8080:8080 -p 59000-59100:59000-59100/udp m1k1o/neko:firefox",
      shell: "bash",
      note: "Access the isolated browser at http://localhost:8080 with configured credentials.",
    },
    capabilities: [
      "Complete network and filesystem isolation of browser sessions",
      "Low-latency WebRTC streaming with full keyboard and clipboard support",
      "Multi-user collaboration for joint forensic investigations",
      "Support for Firefox, Chromium, and Tor Browser base images",
    ],
    useCases: [
      "Opening suspicious phishing links and unknown URLs safely in an ephemeral container",
      "Isolated OSINT browsing without browser fingerprint leakage to target websites",
    ],
    relatedToolSlugs: ["session", "torbot"],
  },

  // 14. SESSION
  {
    id: "tool-session",
    slug: "session",
    name: "Session",
    tagline: "Decentralized end-to-end encrypted private messaging ecosystem.",
    description: "Session is an end-to-end encrypted messenger utilizing the decentralized Oxen Service Node Network. It requires no phone number or email to register, employs onion routing to conceal IP addresses, and produces no user metadata.",
    primaryCategory: "Privacy & Infrastructure",
    categories: ["Privacy & Infrastructure", "Communications"],
    tags: ["Privacy", "E2EE", "Onion Routing", "Decentralized", "Secure Messaging"],
    type: "gui",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      official: "https://getsession.org",
      github: "https://github.com/session-foundation",
      documentation: "https://getsession.org/whitepaper",
    },
    status: "Active",
    lastVerified: "2025-08-25",
    requirements: ["Desktop or mobile operating system"],
    installation: {
      linux: [
        "sudo apt install flatpak",
        "flatpak install flathub network.loki.Session",
        "flatpak run network.loki.Session",
      ],
      macos: ["brew install --cask session"],
      windows: ["Download official installer from https://getsession.org/download"],
    },
    quickStart: {
      command: "session-desktop",
      shell: "bash",
      note: "Generates an alphanumeric Session ID used as the decentralized contact identifier.",
    },
    capabilities: [
      "Zero phone number or identity requirements during account creation",
      "Multi-hop onion routing through the decentralized Service Node Network",
      "PFS (Perfect Forward Secrecy) based on the Signal protocol / Session Protocol",
      "Open-source audited clients and cryptographic infrastructure",
    ],
    useCases: [
      "Whistleblower communication and confidential threat intelligence exchanges",
      "Operational security (OPSEC) for high-risk security researchers and journalists",
    ],
    relatedToolSlugs: ["neko"],
  },

  // 15. HASHCAT
  {
    id: "tool-hashcat",
    slug: "hashcat",
    name: "Hashcat",
    tagline: "World's fastest open-source GPU-accelerated password recovery and hash auditing utility.",
    description: "Hashcat is the industry-standard hash auditing tool. It leverages OpenCL and CUDA to achieve billion-hash-per-second recovery rates across hundreds of hash types, supporting dictionary, mask, combinator, and hybrid attack rules in authorized lab assessments.",
    primaryCategory: "Credential & Password Auditing",
    categories: ["Credential & Password Auditing", "Security Research"],
    tags: ["C", "GPU", "CUDA", "OpenCL", "Password Auditing", "Hashes", "Cracking"],
    type: "cli",
    platforms: ["Linux", "Windows", "macOS"],
    urls: {
      official: "https://hashcat.net/hashcat/",
      github: "https://github.com/hashcat/hashcat",
      documentation: "https://hashcat.net/wiki/",
    },
    status: "Active",
    lastVerified: "2025-08-30",
    dualUseNotice: true,
    requirements: ["OpenCL / CUDA compatible GPU and runtime drivers"],
    installation: {
      linux: [
        "sudo apt update && sudo apt install -y hashcat",
        "hashcat -I",
      ],
      macos: ["brew install hashcat"],
      windows: ["Download 7-Zip archive from https://hashcat.net/hashcat/ and extract binaries."],
    },
    quickStart: {
      command: "hashcat -b -m 1000",
      shell: "bash",
      note: "Executes an internal benchmark for mode 1000 (NTLM) across all installed GPUs.",
    },
    capabilities: [
      "Hardware acceleration for NVIDIA CUDA, AMD ROCm, and Apple Metal",
      "Support for over 400 hash modes (MD5, SHA-256, NTLM, Kerberos, bcrypt, WPA2)",
      "Rule-based attack engine allowing deep wordlist permutation",
      "Distributed cluster cracking support via session save and restore states",
    ],
    useCases: [
      "Enterprise password strength auditing in compliance assessments",
      "Authorized digital forensics recovery of lost administrative passwords",
    ],
    commands: [
      {
        title: "Benchmark hash speeds",
        command: "hashcat -b",
        description: "Evaluates GPU compute capability across primary cryptographic hashing algorithms.",
      },
      {
        title: "Audit NTLM hashes with dictionary and best64 rules",
        command: "hashcat -m 1000 -a 0 lab_ntlm_hashes.txt wordlist.txt -r rules/best64.rule",
        description: "Executes dictionary rule permutations on NTLM hashes from an authorized test domain.",
      },
      {
        title: "Mask attack for 8-character mixed passwords",
        command: "hashcat -m 0 hashes.txt -a 3 ?u?l?l?l?d?d?d?s",
        description: "Tests keyspace matching uppercase-lowercase-digit-symbol structure.",
      },
    ],
    outputExplained: "Outputs real-time cracking status: Speed.Dev.# (hashes/sec), Exec.Status (Running/Exhausted), Candidates.Engine, and Recovered (percentage of target hashes solved).",
    troubleshooting: [
      {
        issue: "No devices found / OpenCL library missing",
        resolution: "Install proprietary NVIDIA CUDA or AMD ROCm drivers along with ocl-icd-libopencl1 package.",
      },
    ],
    relatedToolSlugs: ["mimikatz", "lazagne", "impacket"],
  },

  // 16. IMPACKET
  {
    id: "tool-impacket",
    slug: "impacket",
    name: "Impacket",
    tagline: "Python classes for programmatic interaction with network protocols (SMB, MSRPC, Kerberos).",
    description: "Impacket by Fortra is a library of Python classes providing low-level programmatic access to network protocols, focused heavily on Microsoft Windows network protocols including SMB, MSRPC, NTLM, and Kerberos. It contains standard auditing scripts such as secretsdump.py, psexec.py, and wmiexec.py used in enterprise security assessments.",
    primaryCategory: "Identity & Active Directory",
    categories: ["Identity & Active Directory", "Network Discovery", "Credential & Password Auditing"],
    tags: ["Python", "SMB", "Kerberos", "Active Directory", "MSRPC", "WMI"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/fortra/impacket",
      documentation: "https://www.secureauth.com/labs/open-source-tools/impacket/",
    },
    status: "Active",
    lastVerified: "2025-08-15",
    dualUseNotice: true,
    requirements: ["Python 3.8+", "pip", "libffi, libssl headers"],
    installation: {
      pip: ["pipx install impacket"],
      linux: [
        "git clone https://github.com/fortra/impacket.git",
        "cd impacket",
        "pip3 install .",
      ],
    },
    quickStart: {
      command: "secretsdump.py -h",
      shell: "bash",
      note: "Displays syntax for remote SAM, LSA, and NTDS.dit credential auditing in authorized environments.",
    },
    capabilities: [
      "Low-level protocol implementations for SMB1/2/3, MSRPC, TDS, LDAP, and Kerberos",
      "Extraction of NTLM hashes and Kerberos tickets (secretsdump.py) from domain controllers",
      "Agentless remote command execution via SMB named pipes (psexec.py, smbexec.py)",
      "Execution of Kerberoasting (GetUserSPNs.py) to audit service account ticket encryption",
    ],
    useCases: [
      "Active Directory security configuration reviews and credential hygiene audits",
      "Defensive testing of SIEM detections against DCSync and SMB named-pipe behaviors",
    ],
    commands: [
      {
        title: "Enumerate Kerberoastable SPNs",
        command: "GetUserSPNs.py -dc-ip 192.168.1.10 corp.local/labuser:Passw0rd1! -request",
        description: "Requests Kerberos TGS tickets for domain service accounts to audit cipher strength.",
      },
      {
        title: "Authorized DCSync credential audit",
        command: "secretsdump.py -just-dc-user Administrator corp.local/admin:Secret@192.168.1.10",
        description: "Simulates directory replication to audit the Administrator password hash on owned lab DC.",
      },
    ],
    relatedToolSlugs: ["bloodhound", "mimikatz", "hashcat"],
  },

  // 17. NMAP
  {
    id: "tool-nmap",
    slug: "nmap",
    name: "Nmap",
    tagline: "Network Mapper — the premier open-source network exploration and security auditing tool.",
    description: "Nmap is an indispensable network scanner designed to rapidly inventory computer networks, detect running services and daemon versions, identify host operating systems via TCP/IP stack fingerprinting, and detect vulnerabilities via the Nmap Scripting Engine (NSE).",
    primaryCategory: "Network Discovery",
    categories: ["Network Discovery", "Reconnaissance & DNS", "Vulnerability Assessment"],
    tags: ["C++", "Port Scanner", "Network Mapping", "NSE", "OS Fingerprinting"],
    type: "cli",
    platforms: ["Linux", "Windows", "macOS"],
    urls: {
      official: "https://nmap.org/",
      documentation: "https://nmap.org/book/",
    },
    status: "Active",
    lastVerified: "2025-08-20",
    dualUseNotice: true,
    requirements: ["Raw socket privileges (root/Administrator for SYN stealth scans)"],
    installation: {
      linux: ["sudo apt update && sudo apt install -y nmap"],
      macos: ["brew install nmap"],
      windows: ["Download official Windows installer / Zenmap from https://nmap.org/download.html"],
    },
    quickStart: {
      command: "nmap -sV -sC 127.0.0.1",
      shell: "bash",
      note: "Performs version detection and default NSE script checks on localhost.",
    },
    capabilities: [
      "SYN stealth scans (-sS), TCP connect scans (-sT), UDP scans (-sU), and SCTP scans",
      "Remote OS detection using TCP/IP stack fingerprinting database",
      "Application version detection (-sV) across thousands of protocol signatures",
      "Over 600 extensible Lua automation scripts via the Nmap Scripting Engine (NSE)",
    ],
    useCases: [
      "Enterprise network asset discovery and port perimeter baseline auditing",
      "Verifying firewall egress and ingress filter policies",
      "Identifying unpatched or legacy service versions during compliance audits",
    ],
    commands: [
      {
        title: "Standard service and script scan",
        command: "nmap -sC -sV -oA lab_scan_results 192.168.1.10",
        description: "Scans top 1000 TCP ports with safe default scripts and version detection.",
      },
      {
        title: "Full port fast SYN sweep",
        command: "nmap -p- --min-rate 1000 -T4 10.0.0.5",
        description: "Rapidly inspects all 65,535 TCP ports on an authorized target host.",
      },
      {
        title: "Vulnerability script audit",
        command: "nmap --script vuln -p 80,443 192.168.1.50",
        description: "Evaluates target HTTP services against CVE detection scripts in the NSE database.",
      },
    ],
    outputExplained: "PORT STATE SERVICE VERSION: Indicates port number/transport, state (open, closed, filtered), identified service name, and version banner. 'Filtered' indicates packet drops by a firewall.",
    relatedToolSlugs: ["masscan", "rustscan", "shodan", "nuclei"],
  },

  // 18. SHODAN
  {
    id: "tool-shodan",
    slug: "shodan",
    name: "Shodan",
    tagline: "The world's search engine for Internet-connected devices and infrastructure.",
    description: "Shodan crawls the entire IPv4 address space continuously, banner-grabbing exposed ports and protocols (HTTP, SSH, RDP, SCADA/ICS, MQTT) to provide comprehensive internet-wide asset discovery without active port scanning.",
    primaryCategory: "Internet Intelligence",
    categories: ["Internet Intelligence", "Attack Surface Management", "Reconnaissance & DNS"],
    tags: ["Web", "API", "CLI", "Internet Scanner", "Asset Discovery", "IoT"],
    type: "api",
    platforms: ["Web", "Linux", "macOS", "Windows"],
    urls: {
      official: "https://www.shodan.io/",
      documentation: "https://developer.shodan.io/api",
    },
    status: "Active",
    lastVerified: "2025-08-25",
    requirements: ["Shodan API key / account"],
    installation: {
      pip: ["pip install shodan", "shodan init <API_KEY>"],
    },
    quickStart: {
      command: "shodan host 8.8.8.8",
      shell: "bash",
      note: "Queries cached telemetry for an IP address without transmitting packets to the host.",
    },
    capabilities: [
      "Querying billions of cached service banners across 100+ protocols",
      "Filtering by organization, country, city, ASN, operating system, and CVE vulnerability",
      "Monitoring organizational IP prefixes for unexpected open perimeter ports",
      "Extensive REST API for automated threat intelligence integration",
    ],
    useCases: [
      "External attack surface visibility for enterprise security teams",
      "Identifying exposed SCADA, industrial control systems, and management interfaces",
      "Broad threat intelligence and global vulnerability exposure research",
    ],
    commands: [
      {
        title: "Search organization assets",
        command: "shodan search --fields ip_str,port,org 'org:\"Example Corp\"'",
        description: "Identifies indexed public endpoints registered to an organization.",
      },
      {
        title: "Inspect host profile",
        command: "shodan host 198.51.100.25",
        description: "Retrieves historical open ports, certificates, and potential CVEs for an IP.",
      },
    ],
    relatedToolSlugs: ["nmap", "theharvester", "bbot", "amass"],
  },

  // 19. THEHARVESTER
  {
    id: "tool-theharvester",
    slug: "theharvester",
    name: "theHarvester",
    tagline: "Passive OSINT gathering tool for emails, subdomains, hosts, and employee names.",
    description: "theHarvester is a staple reconnaissance tool designed for passive information gathering during external security assessments. It queries dozens of search engines, PGP key servers, Shodan, and social platforms to collect domains, IPs, virtual hosts, and employee email addresses.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Reconnaissance & DNS", "Attack Surface Management"],
    tags: ["Python", "CLI", "Passive Recon", "Email Scraping", "Subdomains"],
    type: "cli",
    platforms: ["Linux", "macOS", "Docker"],
    urls: {
      github: "https://github.com/laramies/theHarvester",
      documentation: "https://github.com/laramies/theHarvester/wiki",
    },
    status: "Active",
    lastVerified: "2025-07-10",
    requirements: ["Python 3.9+", "pip", "API keys for premium sources (optional)"],
    installation: {
      linux: [
        "git clone https://github.com/laramies/theHarvester.git",
        "cd theHarvester",
        "pip3 install -r requirements/base.txt",
      ],
      docker: ["docker run --rm -it theharvester/theharvester -d example.com -b all"],
    },
    quickStart: {
      command: "theHarvester -d example.com -b crtsh,certspotter,duckduckgo",
      shell: "bash",
      note: "Gathers passive intelligence using free, unauthenticated search modules.",
    },
    capabilities: [
      "Aggregation from over 30 public intelligence sources (crt.sh, Bing, DuckDuckGo, Baidu, Shodan)",
      "Discovery of employee email addresses for authorized phishing simulation baseline",
      "Identification of corporate virtual hosts and forgotten subdomain records",
      "Direct integration with DNS bruteforcing and Shodan enrichment",
    ],
    useCases: [
      "Pre-engagement reconnaissance for authorized penetration tests",
      "Credential leak prevention and exposed email auditing",
    ],
    commands: [
      {
        title: "Comprehensive passive domain scan",
        command: "theHarvester -d example.com -b all -l 500 -f recon_report.html",
        description: "Queries all supported sources and compiles results into an HTML report.",
      },
    ],
    relatedToolSlugs: ["subfinder", "amass", "shodan", "spiderfoot"],
  },

  // 20. WAZUH
  {
    id: "tool-wazuh",
    slug: "wazuh",
    name: "Wazuh",
    tagline: "Free and open-source unified XDR and SIEM platform for threat detection and compliance.",
    description: "Wazuh is an enterprise-grade open-source security monitoring solution integrating XDR (Extended Detection and Response) and SIEM capabilities. It provides endpoint security monitoring, log data analysis, file integrity monitoring (FIM), vulnerability detection, and automated incident response across Linux, Windows, macOS, and cloud environments.",
    primaryCategory: "Endpoint Security & SIEM",
    categories: ["Endpoint Security & SIEM", "Blue Team", "Threat Intelligence"],
    tags: ["SIEM", "XDR", "FIM", "Blue Team", "Log Analysis", "Threat Detection"],
    type: "self-hosted",
    platforms: ["Linux", "Docker"],
    urls: {
      official: "https://wazuh.com",
      github: "https://github.com/wazuh/wazuh",
      documentation: "https://documentation.wazuh.com/",
    },
    status: "Active",
    lastVerified: "2025-08-28",
    requirements: ["Linux server (4GB+ RAM recommended for single-node indexer/server)"],
    installation: {
      linux: [
        "curl -sO https://packages.wazuh.com/4.8/wazuh-install.sh",
        "sudo bash wazuh-install.sh -a",
      ],
      docker: [
        "git clone https://github.com/wazuh/wazuh-docker.git -b v4.8.0 --depth=1",
        "cd wazuh-docker/single-node",
        "docker compose -f generate-indexer-certs.yml run --rm generator",
        "docker compose up -d",
      ],
    },
    quickStart: {
      command: "sudo systemctl status wazuh-manager",
      shell: "bash",
      note: "Checks status of the central Wazuh manager service.",
    },
    capabilities: [
      "Endpoint log analysis and real-time security event correlation",
      "Real-time File Integrity Monitoring (FIM) detecting unauthorized configuration changes",
      "Vulnerability detection correlating installed packages with national CVE feeds",
      "Regulatory compliance mapping against PCI DSS, HIPAA, NIST 800-53, and CIS benchmarks",
      "Active response execution to isolate compromised endpoints automatically",
    ],
    useCases: [
      "Centralized Security Operations Center (SOC) log monitoring",
      "Host intrusion detection across cloud server fleets and developer machines",
    ],
    commands: [
      {
        title: "Deploy Wazuh agent on target Ubuntu host",
        command: "wget https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.8.0-1_amd64.deb && sudo WAZUH_MANAGER='192.168.1.100' dpkg -i wazuh-agent_4.8.0-1_amd64.deb",
        description: "Registers an endpoint to the central Wazuh manager node.",
      },
    ],
    relatedToolSlugs: ["velociraptor", "volatility-3", "autopsy"],
  },

  // 21. PESTUDIO
  {
    id: "tool-pestudio",
    slug: "pestudio",
    name: "PEStudio",
    tagline: "Initial assessment and static malware analysis tool for Windows executables.",
    description: "PEStudio by Marc Ochsenmeier (Winitor) performs deep static analysis of Windows Portable Executable (PE) binaries without executing the untrusted file. It parses headers, imports, exported functions, embedded strings, entropy anomalies, digital signatures, and VirusTotal reputation indicators.",
    primaryCategory: "File & Metadata Analysis",
    categories: ["File & Metadata Analysis", "Malware Analysis", "Digital Forensics & Incident Response"],
    tags: ["GUI", "Windows", "Static Analysis", "Malware", "PE Headers", "Forensics"],
    type: "gui",
    platforms: ["Windows"],
    urls: {
      official: "https://www.winitor.com/",
      documentation: "https://www.winitor.com/features",
    },
    status: "Active",
    lastVerified: "2025-08-05",
    requirements: ["Windows 10/11 / Windows Server (portable binary, no install required)"],
    installation: {
      windows: ["Download pestudio.zip from https://www.winitor.com/ and extract the executable."],
      notes: "Requires no registry changes; runs as a portable static analysis utility in analysis sandboxes.",
    },
    quickStart: {
      command: "pestudio.exe suspicious_sample.exe",
      shell: "cmd",
      note: "Loads the target binary into the analysis interface without executing it.",
    },
    capabilities: [
      "Static detection of suspicious API imports (VirtualAllocEx, WriteProcessMemory, CreateRemoteThread)",
      "High-entropy section detection indicating UPX packing, crypters, or encrypted shellcode",
      "Analysis of PE headers, compile timestamps, rich headers, and digital certificates",
      "Extraction and blacklisting of suspicious ASCII and Unicode strings (URLs, IPs, registry keys)",
    ],
    useCases: [
      "Triage of suspicious file attachments in SOC and incident response pipelines",
      "Pre-execution safety screening of unknown Windows binaries",
    ],
    relatedToolSlugs: ["exiftool", "volatility-3", "autopsy"],
  },

  // 22. MALTEGO
  {
    id: "tool-maltego",
    slug: "maltego",
    name: "Maltego",
    tagline: "Interactive link analysis and graphical intelligence investigation platform.",
    description: "Maltego is an industry-leading visual link analysis tool that transforms open-source intelligence into interactive node-link relationship graphs. Through its extensive catalog of transforms, Maltego correlates people, email addresses, domains, IP addresses, infrastructure, and social profiles.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Link Analysis", "Threat Intelligence"],
    tags: ["Java", "GUI", "Graph Analysis", "Transforms", "Entities", "OSINT"],
    type: "gui",
    platforms: ["Linux", "Windows", "macOS"],
    urls: {
      official: "https://www.maltego.com/",
      documentation: "https://docs.maltego.com/",
    },
    status: "Active",
    lastVerified: "2025-08-18",
    requirements: ["Java Runtime Environment (JRE 11+)"],
    installation: {
      linux: ["Download the .deb or .rpm package from https://www.maltego.com/downloads/"],
      macos: ["brew install --cask maltego"],
      windows: ["Download Windows installer from official Maltego downloads portal."],
    },
    quickStart: {
      command: "maltego",
      shell: "bash",
      note: "Launches the graphical workspace; select Community Edition or enter an enterprise license.",
    },
    capabilities: [
      "Graphical link visualization rendering thousands of interconnected entities",
      "Transform hub integrating dozens of intelligence providers (Shodan, VirusTotal, WhoisXML)",
      "Mining relationships between DNS, WHOIS, IP blocks, and cryptographic wallet addresses",
      "Comprehensive report generation for executive briefings and legal investigations",
    ],
    useCases: [
      "Visual cybercrime and infrastructure link analysis",
      "Complex organizational attack surface investigations",
    ],
    relatedToolSlugs: ["spiderfoot", "theharvester", "shodan", "bloodhound"],
  },

  // 23. SPIDERFOOT
  {
    id: "tool-spiderfoot",
    slug: "spiderfoot",
    name: "SpiderFoot",
    tagline: "Automated OSINT and threat intelligence collection engine.",
    description: "SpiderFoot automates the gathering of intelligence about target IP addresses, domain names, hostnames, network subnets, ASN, email addresses, and phone numbers. It integrates over 200 data sources into an automated investigation pipeline.",
    primaryCategory: "OSINT & Intelligence",
    categories: ["OSINT & Intelligence", "Threat Intelligence", "Attack Surface Management"],
    tags: ["Python", "Web UI", "Automation", "Threat Intel", "OSINT"],
    type: "cli",
    platforms: ["Linux", "macOS", "Docker"],
    urls: {
      github: "https://github.com/smicallef/spiderfoot",
      documentation: "https://spiderfoot.net/documentation/",
    },
    status: "Maintained",
    lastVerified: "2025-06-25",
    requirements: ["Python 3.8+", "pip"],
    installation: {
      linux: [
        "git clone https://github.com/smicallef/spiderfoot.git",
        "cd spiderfoot",
        "pip3 install -r requirements.txt",
        "python3 sf.py -l 127.0.0.1:5001",
      ],
      docker: ["docker run -d -p 5001:5001 spiderfoot/spiderfoot"],
    },
    quickStart: {
      command: "python3 sf.py -l 127.0.0.1:5001",
      shell: "bash",
      note: "Starts the embedded web server and opens the management console at http://127.0.0.1:5001.",
    },
    capabilities: [
      "Over 200 integrated OSINT modules collecting data concurrently",
      "Visual graph representations of target infrastructure and dark web sightings",
      "Identification of exposed cloud storage buckets and leaked API tokens",
      "Continuous scheduled scans for corporate brand monitoring",
    ],
    useCases: [
      "Comprehensive external footprint discovery for security audits",
      "Threat intelligence correlation against IP blocklists and threat actors",
    ],
    commands: [
      {
        title: "CLI scan targeting domain",
        command: "python3 sf.py -s target.com -m sfp_whois,sfp_dnsresolve -q",
        description: "Executes targeted passive reconnaissance directly from the command line.",
      },
    ],
    relatedToolSlugs: ["maltego", "theharvester", "bbot", "amass"],
  },

  // 24. RECON-NG
  {
    id: "tool-recon-ng",
    slug: "recon-ng",
    name: "Recon-ng",
    tagline: "Metasploit-style interactive reconnaissance framework for web and OSINT.",
    description: "Recon-ng by Tim Tomes is a full-featured web reconnaissance framework written in Python. It features an interactive command-line interface reminiscent of the Metasploit Framework, an integrated database schema, built-in API key management, and a marketplace of community modules.",
    primaryCategory: "Reconnaissance & DNS",
    categories: ["Reconnaissance & DNS", "OSINT & Intelligence"],
    tags: ["Python", "CLI", "Framework", "Modular", "Database", "Recon"],
    type: "cli",
    platforms: ["Linux", "macOS"],
    urls: {
      github: "https://github.com/lanmaster53/recon-ng",
      documentation: "https://github.com/lanmaster53/recon-ng/wiki",
    },
    status: "Maintained",
    lastVerified: "2025-05-30",
    requirements: ["Python 3.8+", "pip"],
    installation: {
      linux: [
        "git clone https://github.com/lanmaster53/recon-ng.git",
        "cd recon-ng",
        "pip3 install -r REQUIREMENTS",
      ],
    },
    quickStart: {
      command: "./recon-ng",
      shell: "bash",
      note: "Launches the interactive shell workspace: [recon-ng][default] >",
    },
    capabilities: [
      "Workspace-based investigation separation backed by SQLite database",
      "Extensive module marketplace (recon/domains-hosts, recon/companies-contacts)",
      "Standardized data tables for hosts, contacts, vulnerabilities, and credentials",
    ],
    useCases: [
      "Structured data collection and reporting for professional penetration test scoping",
    ],
    commands: [
      {
        title: "Install and run recon modules",
        command: "marketplace install all\nmodules load recon/domains-hosts/brute_hosts\nrun",
        description: "Standard workflow inside the interactive Recon-ng console.",
      },
    ],
    relatedToolSlugs: ["theharvester", "spiderfoot", "amass"],
  },

  // 25. OWASP AMASS
  {
    id: "tool-amass",
    slug: "amass",
    name: "OWASP Amass",
    tagline: "In-depth attack surface mapping and asset discovery framework.",
    description: "OWASP Amass performs network mapping of attack surfaces and external asset discovery using open-source intelligence gathering and active reconnaissance techniques. It constructs an in-memory graph of DNS records, IP blocks, ASNs, and certificates to model an organization's perimeter.",
    primaryCategory: "Attack Surface Management",
    categories: ["Attack Surface Management", "Reconnaissance & DNS", "Internet Intelligence"],
    tags: ["Go", "CLI", "OWASP", "Attack Surface", "DNS", "Subdomains"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows", "Docker"],
    urls: {
      official: "https://owasp.org/www-project-amass/",
      github: "https://github.com/owasp-amass/amass",
      documentation: "https://github.com/owasp-amass/amass/wiki",
    },
    status: "Active",
    lastVerified: "2025-08-22",
    dualUseNotice: true,
    requirements: ["Go 1.21+ (if compiling from source) or pre-built binary"],
    installation: {
      go: ["go install -v github.com/owasp-amass/amass/v4/...@master"],
      linux: ["sudo apt install -y amass"],
      macos: ["brew install amass"],
      docker: ["docker run -v ~/.config/amass:/root/.config/amass/ -it caffix/amass enum -d example.com"],
    },
    quickStart: {
      command: "amass enum -passive -d example.com",
      shell: "bash",
      note: "Performs passive asset discovery querying external databases without active DNS probing.",
    },
    capabilities: [
      "Integration with over 55 external data sources and threat feeds",
      "Graph database storage engine (PostgreSQL/Cayley) tracking infrastructure changes over time",
      "Autonomous System Number (ASN) and routing prefix discovery",
      "Certificate Transparency log scraping and DNS reverse lookup sweeps",
    ],
    useCases: [
      "Enterprise external attack surface management (EASM)",
      "Discovery of shadow IT and unmonitored subsidiary domains",
    ],
    commands: [
      {
        title: "Passive subdomain enumeration",
        command: "amass enum -passive -d authorized-target.org",
        description: "Gathers subdomains exclusively from certificate logs and OSINT sources.",
      },
      {
        title: "Active network mapping with ASN scoping",
        command: "amass intel -asn 13335 -d example.com",
        description: "Identifies domains hosted on the target organization's ASN.",
      },
    ],
    relatedToolSlugs: ["subfinder", "bbot", "theharvester", "shodan"],
  },

  // 26. SUBFINDER
  {
    id: "tool-subfinder",
    slug: "subfinder",
    name: "Subfinder",
    tagline: "Fast passive subdomain discovery tool built by ProjectDiscovery.",
    description: "Subfinder is a high-speed subdomain discovery tool designed to passively enumerate valid subdomains for websites. It curates passive sources including DNS dumps, search engines, Certificate Transparency logs, and security platforms, avoiding direct traffic generation toward target endpoints.",
    primaryCategory: "Reconnaissance & DNS",
    categories: ["Reconnaissance & DNS", "Attack Surface Management"],
    tags: ["Go", "CLI", "ProjectDiscovery", "Subdomains", "Passive Recon"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows", "Docker"],
    urls: {
      github: "https://github.com/projectdiscovery/subfinder",
      documentation: "https://docs.projectdiscovery.io/tools/subfinder",
    },
    status: "Active",
    lastVerified: "2025-08-25",
    requirements: ["Go 1.21+ (for source install) or standalone binary"],
    installation: {
      go: ["go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest"],
      macos: ["brew install subfinder"],
      docker: ["docker run -it projectdiscovery/subfinder:latest -d example.com"],
    },
    quickStart: {
      command: "subfinder -d example.com -silent",
      shell: "bash",
      note: "Outputs clean list of identified subdomains suitable for piping into other tools.",
    },
    capabilities: [
      "High-speed concurrent scraping across 40+ passive data sources",
      "Seamless UNIX pipeline integration: 'subfinder -d target.com | httpx | nuclei'",
      "Custom configuration file (~/.config/subfinder/provider-config.yaml) for API keys",
      "Recursive subdomain discovery support",
    ],
    useCases: [
      "Initial phase of attack surface reconnaissance pipelines",
      "Bug bounty target scoping on authorized domain assets",
    ],
    commands: [
      {
        title: "Enumerate domain and export to file",
        command: "subfinder -d example.com -o subdomains.txt",
        description: "Discovers all passive subdomains and writes them to a text file.",
      },
      {
        title: "Pipeline into port scanner",
        command: "subfinder -d example.com -silent | dnsx -silent | naabu",
        description: "Resolves discovered subdomains and feeds active hosts into port scanner.",
      },
    ],
    relatedToolSlugs: ["amass", "bbot", "theharvester", "nuclei"],
  },

  // 27. MASSCAN
  {
    id: "tool-masscan",
    slug: "masscan",
    name: "Masscan",
    tagline: "Ultra high-speed asynchronous TCP port scanner transmitting raw SYN packets.",
    description: "Masscan is the fastest Internet port scanner, capable of scanning the entire IPv4 Internet in under 5 minutes at 10 million packets per second using custom asynchronous raw socket transmission inspired by scanrand and unicornscan.",
    primaryCategory: "Network Discovery",
    categories: ["Network Discovery", "Internet Intelligence"],
    tags: ["C", "CLI", "Async", "Raw Sockets", "Port Scanner", "High Speed"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/robertdavidgraham/masscan",
      documentation: "https://github.com/robertdavidgraham/masscan#readme",
    },
    status: "Active",
    lastVerified: "2025-07-28",
    dualUseNotice: true,
    requirements: ["Root / Administrator privileges", "libpcap-dev", "Hardware capable of high packet rates"],
    installation: {
      linux: [
        "sudo apt update && sudo apt install -y git gcc make libpcap-dev",
        "git clone https://github.com/robertdavidgraham/masscan",
        "cd masscan && make",
        "sudo make install",
      ],
      macos: ["brew install masscan"],
    },
    quickStart: {
      command: "sudo masscan -p80,443 127.0.0.1 --rate=1000",
      shell: "bash",
      note: "Performs an asynchronous SYN sweep against local address at 1,000 packets per second.",
    },
    capabilities: [
      "Custom asynchronous TCP stack independent of the operating system socket layer",
      "Scan rates exceeding 10 million packets per second on 10Gbps interfaces",
      "Banner grabbing for HTTP, SSL, SSH, and RDP protocols",
      "Strict network CIDR exclude list support to honor testing boundaries",
    ],
    useCases: [
      "Large-scale enterprise internal and external IP range discovery",
      "Academic Internet-wide security measurement and protocol census",
    ],
    commands: [
      {
        title: "Scan subnet for web ports",
        command: "sudo masscan -p80,443,8080,8443 192.168.1.0/24 --rate=1000 -oG scan.txt",
        description: "Sweeps internal subnet for web services at 1,000 pps in grepable format.",
      },
    ],
    relatedToolSlugs: ["nmap", "rustscan", "shodan"],
  },

  // 28. GOBUSTER
  {
    id: "tool-gobuster",
    slug: "gobuster",
    name: "Gobuster",
    tagline: "High-speed directory, DNS, vhost, and S3 bucket brute-force tool in Go.",
    description: "Gobuster is a fast directory, file, and virtual host brute-forcer written in Go. It supports URI directory discovery (dir mode), DNS subdomain brute-forcing (dns mode), virtual host discovery (vhost mode), and public AWS S3 bucket identification (s3 mode).",
    primaryCategory: "Web Security & Fuzzing",
    categories: ["Web Security & Fuzzing", "Reconnaissance & DNS"],
    tags: ["Go", "CLI", "Web Fuzzing", "Directory Brute Force", "Vhosts"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/OJ/gobuster",
      documentation: "https://github.com/OJ/gobuster#readme",
    },
    status: "Active",
    lastVerified: "2025-08-12",
    dualUseNotice: true,
    requirements: ["Wordlists (such as SecLists or dirbuster lists)"],
    installation: {
      go: ["go install github.com/OJ/gobuster/v3@latest"],
      linux: ["sudo apt install -y gobuster"],
      macos: ["brew install gobuster"],
    },
    quickStart: {
      command: "gobuster dir -u http://127.0.0.1 -w /usr/share/wordlists/dirb/common.txt",
      shell: "bash",
      note: "Tests common directory paths against a local development server.",
    },
    capabilities: [
      "Concurrent multi-threaded directory and file discovery with extensions filter",
      "Virtual Host (vhost) fuzzing detecting hidden multi-tenant applications",
      "DNS subdomain brute forcing with custom resolvers",
      "Custom HTTP headers, user-agents, and authentication token injection",
    ],
    useCases: [
      "Discovering unlinked administrative panels, backup files, and API endpoints",
      "Identifying misconfigured virtual hosts during web penetration tests",
    ],
    commands: [
      {
        title: "Directory and file brute-force",
        command: "gobuster dir -u http://192.168.1.50 -w wordlist.txt -x php,html,txt,json -t 30",
        description: "Scans for paths matching wordlist with specific file extension suffixes.",
      },
      {
        title: "Virtual host discovery",
        command: "gobuster vhost -u http://example.corp -w vhost_words.txt --append-domain",
        description: "Checks Host header values to find hidden internal sites on the same IP.",
      },
    ],
    relatedToolSlugs: ["wfuzz", "caido", "nuclei"],
  },

  // 29. RUSTSCAN
  {
    id: "tool-rustscan",
    slug: "rustscan",
    name: "RustScan",
    tagline: "The Modern Port Scanner — scans all 65,535 ports in 3 seconds and pipes into Nmap.",
    description: "RustScan is a high-speed port scanner written in Rust designed to solve the speed dilemma in network reconnaissance. It quickly scans all 65,535 TCP ports using asynchronous I/O and automatically pipes the open ports into Nmap for detailed service and OS enumeration.",
    primaryCategory: "Network Discovery",
    categories: ["Network Discovery", "Reconnaissance & DNS"],
    tags: ["Rust", "CLI", "Fast", "Port Scanner", "Nmap Integration"],
    type: "cli",
    platforms: ["Linux", "macOS", "Docker"],
    urls: {
      github: "https://github.com/bee-san/rustscan",
      documentation: "https://github.com/bee-san/rustscan/wiki",
    },
    status: "Active",
    lastVerified: "2025-07-22",
    requirements: ["Nmap installed locally for secondary piping"],
    installation: {
      linux: [
        "wget https://github.com/RustScan/RustScan/releases/download/2.3.0/rustscan_2.3.0_amd64.deb",
        "sudo dpkg -i rustscan_2.3.0_amd64.deb",
      ],
      macos: ["brew install rustscan"],
      docker: ["docker run -it --rm --name rustscan rustscan/rustscan:latest -a 127.0.0.1"],
    },
    quickStart: {
      command: "rustscan -a 127.0.0.1 -- -sC -sV",
      shell: "bash",
      note: "Quickly sweeps localhost and triggers Nmap default scripts on open ports.",
    },
    capabilities: [
      "Ultra-fast asynchronous port verification (full port range in seconds)",
      "Automated piping of discovered open ports directly into Nmap arguments",
      "Adaptive socket timeout heuristics that adjust to network latency",
      "Scriptable output supporting greppable and JSON formats",
    ],
    useCases: [
      "Rapid triage of network perimeters in time-restricted security assessments",
      "CTF challenges and lab environments where fast host enumeration is critical",
    ],
    commands: [
      {
        title: "Scan target with custom batch size",
        command: "rustscan -a 192.168.1.100 -b 2000 -- -A",
        description: "Scans with 2000 batch size and passes aggressive detection (-A) to Nmap.",
      },
    ],
    relatedToolSlugs: ["nmap", "masscan"],
  },

  // 30. NUCLEI
  {
    id: "tool-nuclei",
    slug: "nuclei",
    name: "Nuclei",
    tagline: "Fast and customizable vulnerability scanner based on simple YAML DSL templates.",
    description: "Nuclei by ProjectDiscovery is a community-driven vulnerability scanner powered by a human-readable YAML-based domain-specific language. It sends requests across protocols (TCP, DNS, HTTP, SSL, WHOIS, WebSocket, Headless browser) to detect zero-days, misconfigurations, and CVEs with minimal false positives.",
    primaryCategory: "Vulnerability Assessment",
    categories: ["Vulnerability Assessment", "Web Security & Fuzzing", "Attack Surface Management"],
    tags: ["Go", "CLI", "ProjectDiscovery", "YAML Templates", "CVE Detection", "Automation"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows", "Docker"],
    urls: {
      github: "https://github.com/projectdiscovery/nuclei",
      documentation: "https://docs.projectdiscovery.io/tools/nuclei",
    },
    status: "Active",
    lastVerified: "2025-08-25",
    dualUseNotice: true,
    requirements: ["Go 1.21+ (or prebuilt binary)", "Community templates (~/.local/nuclei-templates)"],
    installation: {
      go: ["go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest"],
      macos: ["brew install nuclei"],
      docker: ["docker run -it projectdiscovery/nuclei:latest -u https://example.com"],
    },
    quickStart: {
      command: "nuclei -update-templates && nuclei -u http://127.0.0.1 -t http/misconfiguration/",
      shell: "bash",
      note: "Updates the community templates and runs safe misconfiguration checks on localhost.",
    },
    capabilities: [
      "Over 7,000 community-contributed detection templates for known CVEs and exposures",
      "Multi-protocol scanning across HTTP, DNS, TCP, SSL, Code, and Headless Chrome",
      "Fine-grained severity tagging (Info, Low, Medium, High, Critical)",
      "Clustering of similar requests to dramatically reduce network traffic",
    ],
    useCases: [
      "Automated continuous vulnerability monitoring across cloud infrastructure",
      "Verifying patch installation and remediation verification across server fleets",
    ],
    commands: [
      {
        title: "Scan target for high and critical CVEs",
        command: "nuclei -u https://authorized-lab.local -severity high,critical -o vuln_report.txt",
        description: "Executes only templates classified as high or critical severity.",
      },
      {
        title: "Audit technologies and exposed panels",
        command: "nuclei -list targets.txt -t http/technologies/ -t http/exposed-panels/",
        description: "Identifies running web software and admin interfaces across target lists.",
      },
    ],
    relatedToolSlugs: ["subfinder", "caido", "gobuster", "nmap"],
  },

  // 31. CAIDO
  {
    id: "tool-caido",
    slug: "caido",
    name: "Caido",
    tagline: "A lightweight, modern web security auditing proxy written in Rust.",
    description: "Caido is a modern intercepting web proxy designed as a high-performance alternative to traditional Java-based proxies. Written in Rust, it operates as a lightweight daemon with a responsive web and desktop frontend, offering request interception, replay, tampering, automated workflows, and sitemap generation.",
    primaryCategory: "Web Security & Fuzzing",
    categories: ["Web Security & Fuzzing", "Application Security"],
    tags: ["Rust", "GUI", "Web Proxy", "Intercepting Proxy", "AppSec", "Modern"],
    type: "gui",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      official: "https://caido.io",
      github: "https://github.com/caido/caido",
      documentation: "https://docs.caido.io/",
    },
    status: "Active",
    lastVerified: "2025-08-20",
    requirements: ["Desktop OS or Docker (runs headless backend with browser UI)"],
    installation: {
      linux: ["Download AppImage or .deb from https://caido.io/download"],
      macos: ["brew install --cask caido"],
      windows: ["Download Windows installer from official Caido download portal."],
    },
    quickStart: {
      command: "caido-cli",
      shell: "bash",
      note: "Starts the local daemon; launch UI at http://127.0.0.1:8080 and set browser proxy to 8080.",
    },
    capabilities: [
      "Low CPU and memory footprint compared to legacy Java proxies",
      "Headless daemon architecture allowing remote assessment of server environments",
      "Full HTTP/1.1 and HTTP/2 request interception, tampering, and replay engine",
      "Automated workflow automation engine with regex and Python script plugins",
    ],
    useCases: [
      "Manual web application penetration testing and API vulnerability assessment",
      "Intercepting and inspecting mobile application traffic via local root CA trust",
    ],
    relatedToolSlugs: ["wfuzz", "nuclei", "gobuster"],
  },

  // 32. WFUZZ
  {
    id: "tool-wfuzz",
    slug: "wfuzz",
    name: "Wfuzz",
    tagline: "Modular web application fuzzer and parameter security assessment tool.",
    description: "Wfuzz is an established web application fuzzer written in Python. It replaces any HTTP request parameter, header, path segment, or body payload with values from dictionary files, facilitating detection of SQL injection, XSS, and parameter tampering in authorized test applications.",
    primaryCategory: "Web Security & Fuzzing",
    categories: ["Web Security & Fuzzing", "Application Security"],
    tags: ["Python", "CLI", "Web Fuzzing", "Parameters", "AppSec"],
    type: "cli",
    platforms: ["Linux", "macOS"],
    urls: {
      github: "https://github.com/xmendez/wfuzz",
      documentation: "https://wfuzz.readthedocs.io/",
    },
    status: "Maintained",
    lastVerified: "2025-05-15",
    dualUseNotice: true,
    requirements: ["Python 3.8+", "pip", "pycurl, libcurl4-openssl-dev"],
    installation: {
      linux: [
        "sudo apt install -y libcurl4-openssl-dev python3-pip",
        "pip3 install wfuzz",
      ],
      macos: ["brew install wfuzz"],
    },
    quickStart: {
      command: "wfuzz -c -z file,wordlist.txt --hc 404 http://127.0.0.1/FUZZ",
      shell: "bash",
      note: "Tests wordlist values against local endpoint and hides HTTP 404 responses.",
    },
    capabilities: [
      "Multi-payload injection supporting simultaneous FUZZ, FUZ2Z, FUZ3Z parameters",
      "Granular response filtering by HTTP status code, response length, lines, and regex",
      "Proxy support with SOCKS5, HTTP authentication, and custom cookie jars",
    ],
    useCases: [
      "Testing web forms and REST API endpoints for parameter tampering vulnerabilities",
      "Discovering unadvertised HTTP headers and parameters in web apps",
    ],
    commands: [
      {
        title: "Fuzz query parameters",
        command: "wfuzz -c -z range,1-100 --hc 404,500 http://lab.local/item?id=FUZZ",
        description: "Tests integer values 1 through 100 on an authorized lab endpoint.",
      },
    ],
    relatedToolSlugs: ["caido", "gobuster", "nuclei"],
  },

  // 33. METASPLOIT FRAMEWORK
  {
    id: "tool-metasploit-framework",
    slug: "metasploit-framework",
    name: "Metasploit Framework",
    tagline: "Premier penetration testing platform and security assessment framework.",
    description: "Metasploit Framework by Rapid7 is the standard open-source framework for security testing and vulnerability validation. It provides thousands of verified exploit modules, auxiliary scanners, post-exploitation payloads (Meterpreter), and encoders for validating security postures in authorized lab environments.",
    primaryCategory: "Vulnerability Assessment",
    categories: ["Vulnerability Assessment", "Security Testing", "Authorized Labs"],
    tags: ["Ruby", "CLI", "Framework", "Metasploit", "Penetration Testing", "Meterpreter"],
    type: "framework",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      official: "https://www.metasploit.com/",
      github: "https://github.com/rapid7/metasploit-framework",
      documentation: "https://docs.metasploit.com/",
    },
    status: "Active",
    lastVerified: "2025-08-30",
    dualUseNotice: true,
    requirements: ["PostgreSQL database (for workspace storage)", "Ruby 3.0+"],
    installation: {
      linux: [
        "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall",
        "chmod 755 msfinstall && ./msfinstall",
      ],
      macos: ["brew install metasploit"],
    },
    quickStart: {
      command: "msfconsole -q",
      shell: "bash",
      note: "Launches the interactive Metasploit console in quiet mode: msf6 >",
    },
    capabilities: [
      "Over 2,400 exploits, 1,200 auxiliary modules, and 400 post-exploitation modules",
      "Cross-platform Meterpreter payload engine running in memory",
      "Network routing and pivoting through compromised dual-homed lab hosts",
      "Database integration correlating discovered vulnerabilities with target hosts",
    ],
    useCases: [
      "Validating the real-world exploitability of discovered CVE vulnerabilities in lab environments",
      "Simulating adversary techniques during Red Team vs Blue Team cyber defense exercises",
    ],
    commands: [
      {
        title: "Search modules for verified CVE",
        command: "msf6 > search cve:2021-44228 type:auxiliary",
        description: "Finds auxiliary scanner modules for Log4Shell vulnerability.",
      },
      {
        title: "Execute auxiliary port sweep in authorized lab",
        command: "msf6 > use auxiliary/scanner/portscan/tcp\nmsf6 auxiliary(tcp) > set RHOSTS 192.168.1.0/24\nmsf6 auxiliary(tcp) > run",
        description: "Scans an authorized lab network subnet for open ports.",
      },
    ],
    relatedToolSlugs: ["nmap", "impacket", "mimikatz"],
  },

  // 34. BLOODHOUND
  {
    id: "tool-bloodhound",
    slug: "bloodhound",
    name: "BloodHound",
    tagline: "Active Directory and Azure/Entra ID attack path visualization and management tool.",
    description: "BloodHound by SpecterOps uses graph theory to reveal the hidden and unintended relationships within an Active Directory or Azure/Entra ID environment. Defenders and authorized testers use it to identify attack paths where low-privilege users can chain permissions to achieve Domain Administrator privileges.",
    primaryCategory: "Identity & Active Directory",
    categories: ["Identity & Active Directory", "Attack Path Analysis", "Privilege Analysis & Auditing"],
    tags: ["Graph Theory", "Active Directory", "Neo4j", "Azure AD", "BloodHound", "Blue Team"],
    type: "gui",
    platforms: ["Linux", "Windows", "macOS", "Docker"],
    urls: {
      official: "https://bloodhound.specterops.io/",
      github: "https://github.com/SpecterOps/BloodHound",
      documentation: "https://support.bloodhoundenterprise.io/",
    },
    status: "Active",
    lastVerified: "2025-08-26",
    dualUseNotice: true,
    requirements: ["Docker & Docker Compose (BloodHound Community Edition)"],
    installation: {
      docker: [
        "curl -L https://ghst.ly/getbhce -o docker-compose.yml",
        "docker compose pull",
        "docker compose up -d",
      ],
    },
    quickStart: {
      command: "docker compose up -d",
      shell: "bash",
      note: "Initializes BloodHound CE backend; access UI at http://localhost:8080.",
    },
    capabilities: [
      "Graph-theoretic shortest path computation from any user to Tier 0 assets (Domain Admins)",
      "Analysis of complex ACLs: GenericAll, WriteDacl, AddMember, ForceChangePassword",
      "Azure / Entra ID tenant graph inspection (App Registrations, Service Principals, Global Admins)",
      "SharpHound / AzureHound automated ingest data processing",
    ],
    useCases: [
      "Defensive remediation: breaking identified attack paths before adversaries can abuse them",
      "Tiered administration model auditing in enterprise enterprise Windows domains",
    ],
    commands: [
      {
        title: "Ingest collection with SharpHound (run on domain workstation)",
        command: "SharpHound.exe -c All --outputdirectory C:\\temp",
        description: "Collects group memberships, ACLs, and session mappings into a zip for BloodHound.",
      },
    ],
    relatedToolSlugs: ["impacket", "mimikatz", "peass-ng"],
  },

  // 35. MIMIKATZ
  {
    id: "tool-mimikatz",
    slug: "mimikatz",
    name: "Mimikatz",
    tagline: "Windows security research tool for inspecting memory and extracting credential artifacts.",
    description: "Mimikatz by Benjamin Delpy (gentilkiwi) is a widely recognized Windows security research tool. It demonstrates flaws in Windows authentication by extracting plain-text passwords, NTLM hashes, PIN codes, and Kerberos tickets directly from the Local Security Authority Subsystem Service (LSASS) memory in lab environments.",
    primaryCategory: "Credential & Password Auditing",
    categories: ["Credential & Password Auditing", "Identity & Active Directory", "Security Research"],
    tags: ["C", "Windows", "LSASS", "Kerberos", "Pass-the-Hash", "Security Research"],
    type: "cli",
    platforms: ["Windows"],
    urls: {
      official: "https://blog.gentilkiwi.com/mimikatz",
      github: "https://github.com/gentilkiwi/mimikatz",
      documentation: "https://github.com/gentilkiwi/mimikatz/wiki",
    },
    status: "Active",
    lastVerified: "2025-08-10",
    dualUseNotice: true,
    requirements: ["Windows OS with local Administrator / SeDebugPrivilege privilege in authorized test lab"],
    installation: {
      windows: [
        "Download latest release binaries from official repository releases on an isolated test VM.",
        "Ensure Windows Defender real-time protection is configured with a test lab exclusion.",
      ],
      notes: "Strictly for isolated research systems. Modern EDR systems block standard Mimikatz binaries immediately.",
    },
    quickStart: {
      command: "mimikatz.exe \"privilege::debug\" \"sekurlsa::logonpasswords\" exit",
      shell: "cmd",
      note: "Enables debug privileges and inspects logged-on session credentials on test machine.",
    },
    capabilities: [
      "Extraction of Kerberos tickets, NTLM hashes, and LSA secrets from LSASS memory",
      "Pass-the-Hash, Pass-the-Ticket, and Overpass-the-Hash credential re-use validation",
      "Golden Ticket and Silver Ticket generation for Kerberos protocol research",
      "DCSync implementation simulating domain replication protocol to extract account hashes",
    ],
    useCases: [
      "Verifying Credential Guard, LSA Protection, and Restricted Admin defensive mitigations",
      "Developing SIEM and EDR detection rules for LSASS memory dumping behavior",
    ],
    commands: [
      {
        title: "Export Kerberos tickets",
        command: "sekurlsa::tickets /export",
        description: "Exports Kerberos tickets in .kirbi format for lab analysis.",
      },
    ],
    relatedToolSlugs: ["impacket", "hashcat", "lazagne", "bloodhound"],
  },

  // 36. PEASS-NG
  {
    id: "tool-peass-ng",
    slug: "peass-ng",
    name: "PEASS-ng",
    tagline: "Privilege Escalation Awesome Scripts Suite — automated local security auditing.",
    description: "PEASS-ng (including LinPEAS for Linux and WinPEAS for Windows) contains automated local privilege escalation auditing scripts. They search target systems for misconfigurations, weak permissions, vulnerable software, cron jobs, registry keys, and plaintext passwords, highlighting potential paths to root or SYSTEM.",
    primaryCategory: "Privilege Analysis & Auditing",
    categories: ["Privilege Analysis & Auditing", "System Auditing"],
    tags: ["Bash", "C#", "Linux", "Windows", "Privilege Escalation", "Audit"],
    type: "cli",
    platforms: ["Linux", "Windows", "macOS"],
    urls: {
      github: "https://github.com/peass-ng/PEASS-ng",
      documentation: "https://book.hacktricks.xyz/",
    },
    status: "Active",
    lastVerified: "2025-08-25",
    dualUseNotice: true,
    requirements: ["Standard user shell on target Linux or Windows host"],
    installation: {
      linux: [
        "wget https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh",
        "chmod +x linpeas.sh",
      ],
      windows: ["Download winPEASx64.exe from the official GitHub releases."],
    },
    quickStart: {
      command: "./linpeas.sh -s -N",
      shell: "bash",
      note: "Executes quiet scan on Linux without writing files to disk.",
    },
    capabilities: [
      "Color-coded output distinguishing 99% privilege escalation vectors (RED/YELLOW)",
      "Detection of SUID binaries, writable system files, and misconfigured sudo rules",
      "Windows service misconfigurations (unquoted service paths, weak permissions)",
      "Discovery of plaintext passwords in configuration files, history, and memory",
    ],
    useCases: [
      "Hardening system baselines across internal Linux and Windows images",
      "Authorized post-exploitation privilege review during penetration tests",
    ],
    commands: [
      {
        title: "Run LinPEAS in memory",
        command: "curl -sL https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh",
        description: "Streams and executes LinPEAS directly in memory on an authorized test machine.",
      },
    ],
    relatedToolSlugs: ["lazagne", "impacket", "bloodhound"],
  },

  // 37. LAZAGNE
  {
    id: "tool-lazagne",
    slug: "lazagne",
    name: "LaZagne",
    tagline: "Open-source credential recovery project extracting passwords saved on local systems.",
    description: "The LaZagne project is an open-source application used to retrieve passwords stored on a local computer. It parses local data stores from web browsers, email clients, chat tools, databases, Wi-Fi keys, and sysadmin utilities across Windows, Linux, and macOS in authorized security reviews.",
    primaryCategory: "Credential & Password Auditing",
    categories: ["Credential & Password Auditing", "Local Security Assessment"],
    tags: ["Python", "CLI", "Credential Auditing", "Browser Passwords", "Post-Exploitation"],
    type: "cli",
    platforms: ["Windows", "Linux", "macOS"],
    urls: {
      github: "https://github.com/AlessandroZ/LaZagne",
      documentation: "https://github.com/AlessandroZ/LaZagne#readme",
    },
    status: "Maintained",
    lastVerified: "2025-06-15",
    dualUseNotice: true,
    requirements: ["Python 2.7 or 3.x / standalone compiled executable"],
    installation: {
      linux: [
        "git clone https://github.com/AlessandroZ/LaZagne.git",
        "cd LaZagne",
        "pip install -r requirements.txt",
      ],
      windows: ["Download pre-compiled laZagne.exe release from GitHub."],
    },
    quickStart: {
      command: "python laZagne.py all",
      shell: "bash",
      note: "Audits all locally stored credential stores on the host system.",
    },
    capabilities: [
      "Extraction of saved credentials from 15+ web browsers (Chrome, Firefox, Edge)",
      "Retrieval of saved Wi-Fi WPA/WPA2 pre-shared keys",
      "Parsing of developer credentials from Git config, FileZilla, PuTTY, and KeePass",
    ],
    useCases: [
      "Auditing workstation data security and employee password hygiene policies",
    ],
    commands: [
      {
        title: "Audit browser credentials only",
        command: "python laZagne.py browsers",
        description: "Scans only locally installed browser databases for unencrypted passwords.",
      },
    ],
    relatedToolSlugs: ["mimikatz", "hashcat", "peass-ng"],
  },

  // 38. VOLATILITY 3
  {
    id: "tool-volatility-3",
    slug: "volatility-3",
    name: "Volatility 3",
    tagline: "The world's leading open-source memory forensics framework.",
    description: "Volatility 3 is the complete rewrite of the world's most widely used memory forensics platform. Written in Python 3, it extracts volatile memory artifacts from raw RAM dumps, crash dumps, and hibernation files across Windows, Linux, and macOS systems to investigate advanced malware and rootkits.",
    primaryCategory: "Memory Forensics",
    categories: ["Memory Forensics", "Digital Forensics & Incident Response", "Malware Analysis"],
    tags: ["Python 3", "CLI", "DFIR", "Memory Forensics", "RAM Analysis", "Rootkits"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      official: "https://www.volatilityfoundation.org/",
      github: "https://github.com/volatilityfoundation/volatility3",
      documentation: "https://volatility3.readthedocs.io/",
    },
    status: "Active",
    lastVerified: "2025-08-20",
    requirements: ["Python 3.9+", "pip", "Volatile RAM image (.raw, .vmem, .dmp)"],
    installation: {
      linux: [
        "git clone https://github.com/volatilityfoundation/volatility3.git",
        "cd volatility3",
        "pip3 install -r requirements.txt",
        "python3 vol.py -h",
      ],
      pip: ["pip3 install volatility3"],
    },
    quickStart: {
      command: "python3 vol.py -f memory.raw windows.pslist",
      shell: "bash",
      note: "Lists running processes captured in the Windows memory dump.",
    },
    capabilities: [
      "Process listing (pslist, pstree, psscan) discovering hidden or unlinked processes",
      "Network connection reconstruction (netscan, netstat) linking sockets to PIDs",
      "Code injection detection (malfind) identifying VAD memory regions with RWX permissions",
      "Registry hive parsing and password hash extraction directly from kernel structures",
    ],
    useCases: [
      "Incident response investigations for fileless malware and in-memory living-off-the-land attacks",
      "Ransomware encryption key recovery and rootkit detection",
    ],
    commands: [
      {
        title: "Identify hidden injected code",
        command: "python3 vol.py -f incident_ram.raw windows.malfind",
        description: "Scans process virtual address descriptors for executable injected code.",
      },
      {
        title: "Reconstruct network connections",
        command: "python3 vol.py -f incident_ram.raw windows.netscan",
        description: "Extracts TCP/UDP listening endpoints and active remote connections.",
      },
    ],
    outputExplained: "windows.pslist output: PID, PPID, ImageFileName, Offset(V), Threads, Handles, SessionId, Wow64, CreateTime, ExitTime. Compare pslist against psscan to identify hidden malware processes.",
    relatedToolSlugs: ["autopsy", "velociraptor", "pestudio", "kape"],
  },

  // 39. AUTOPSY
  {
    id: "tool-autopsy",
    slug: "autopsy",
    name: "Autopsy",
    tagline: "Digital forensics platform and graphical interface to The Sleuth Kit.",
    description: "Autopsy is the premier open-source digital forensics platform used by law enforcement, military, and corporate investigators to analyze what occurred on a computer. It provides an extensible GUI over The Sleuth Kit, parsing disk images (E01, raw/DD), file systems, web activity, and deleted files.",
    primaryCategory: "Digital Forensics & Incident Response",
    categories: ["Digital Forensics & Incident Response", "File & Metadata Analysis"],
    tags: ["Java", "GUI", "DFIR", "Disk Forensics", "Sleuth Kit", "Timeline"],
    type: "gui",
    platforms: ["Windows", "Linux", "macOS"],
    urls: {
      official: "https://www.autopsy.com/",
      github: "https://github.com/sleuthkit/autopsy",
      documentation: "https://sleuthkit.org/autopsy/docs.php",
    },
    status: "Active",
    lastVerified: "2025-08-15",
    requirements: ["Java JRE/JDK 17+", "64-bit Windows or Linux with 8GB+ RAM"],
    installation: {
      windows: ["Download official 64-bit MSI installer from https://www.autopsy.com/download/"],
      linux: [
        "sudo apt update && sudo apt install -y sleuthkit openjdk-17-jdk",
        "Download autopsy-4.x.tar.gz, extract, and execute ./unix_setup.sh",
      ],
    },
    quickStart: {
      command: "autopsy",
      shell: "bash",
      note: "Launches the graphical workspace; create a New Case and add a data source (E01 or raw image).",
    },
    capabilities: [
      "Timeline analysis integrating filesystem timestamps, web history, and event logs",
      "Keyword search indexing all files, unallocated clusters, and slack space",
      "Web artifact analysis (browser history, cookies, bookmarks, downloads)",
      "Carving deleted files from raw unallocated disk space using file signatures",
    ],
    useCases: [
      "Forensic investigation of compromised employee laptops and internal breaches",
      "Corporate intellectual property theft investigations and legal discovery",
    ],
    relatedToolSlugs: ["volatility-3", "exiftool", "velociraptor", "kape"],
  },

  // 40. EXIFTOOL
  {
    id: "tool-exiftool",
    slug: "exiftool",
    name: "ExifTool",
    tagline: "Platform-independent Perl library and CLI for reading, writing, and editing file metadata.",
    description: "ExifTool by Phil Harvey is the definitive metadata analysis utility. It reads, writes, and modifies metadata across hundreds of file formats (EXIF, IPTC, XMP, JFIF, GeoTIFF, ICC Profile, ID3), revealing camera serial numbers, GPS coordinates, timestamps, and software versions.",
    primaryCategory: "File & Metadata Analysis",
    categories: ["File & Metadata Analysis", "Image Intelligence", "Digital Forensics & Incident Response"],
    tags: ["Perl", "CLI", "Metadata", "EXIF", "Forensics", "OSINT"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      official: "https://exiftool.org/",
      github: "https://github.com/exiftool/exiftool",
      documentation: "https://exiftool.org/exiftool_pod.html",
    },
    status: "Active",
    lastVerified: "2025-08-28",
    requirements: ["Perl 5.004 or newer (preinstalled on most UNIX systems)"],
    installation: {
      linux: ["sudo apt update && sudo apt install -y libimage-exiftool-perl"],
      macos: ["brew install exiftool"],
      windows: ["Download standalone Windows executable from https://exiftool.org/"],
    },
    quickStart: {
      command: "exiftool suspicious_image.jpg",
      shell: "bash",
      note: "Outputs all embedded EXIF, XMP, and IPTC metadata tags from the file.",
    },
    capabilities: [
      "Parses metadata from images (JPEG, TIFF, PNG), documents (PDF, DOCX), audio, and video",
      "Extracts GPS latitude, longitude, altitude, and timestamps for geolocation investigations",
      "Sanitizes files by stripping all metadata tags prior to publication (-all=)",
      "Extracts embedded thumbnail previews and camera maker notes",
    ],
    useCases: [
      "Forensic analysis of photos, documents, and media submitted in investigations",
      "Operational security (OPSEC) metadata removal before publishing research",
    ],
    commands: [
      {
        title: "Extract GPS coordinates and camera model",
        command: "exiftool -GPSLatitude -GPSLongitude -Make -Model photo.jpg",
        description: "Retrieves location coordinates and equipment tags from media.",
      },
      {
        title: "Strip all metadata from all images in directory",
        command: "exiftool -all= -overwrite_original ./public_images/",
        description: "Removes all EXIF and metadata tags cleanly to protect investigator privacy.",
      },
    ],
    relatedToolSlugs: ["smartimage", "pestudio", "autopsy"],
  },

  // 41. VELOCIRAPTOR
  {
    id: "tool-velociraptor",
    slug: "velociraptor",
    name: "Velociraptor",
    tagline: "Advanced endpoint visibility, digital forensics, and incident response platform.",
    description: "Velociraptor by Rapid7/Velocidex is an endpoint monitoring and digital forensics platform. It uses the Velociraptor Query Language (VQL) to execute custom forensic queries across thousands of connected enterprise endpoints within minutes.",
    primaryCategory: "Digital Forensics & Incident Response",
    categories: ["Digital Forensics & Incident Response", "Endpoint Security & SIEM"],
    tags: ["Go", "CLI", "Web UI", "VQL", "DFIR", "Endpoint", "Hunting"],
    type: "cli",
    platforms: ["Linux", "Windows", "macOS"],
    urls: {
      official: "https://docs.velociraptor.app/",
      github: "https://github.com/Velocidex/velociraptor",
      documentation: "https://docs.velociraptor.app/docs/",
    },
    status: "Active",
    lastVerified: "2025-08-20",
    requirements: ["Standalone single binary, Go runtime optional"],
    installation: {
      linux: [
        "wget https://github.com/Velocidex/velociraptor/releases/latest/download/velociraptor-v0.72-linux-amd64",
        "chmod +x velociraptor-*",
      ],
      windows: ["Download velociraptor-v*-windows-amd64.exe from GitHub."],
    },
    quickStart: {
      command: "./velociraptor gui",
      shell: "bash",
      note: "Launches local standalone GUI for offline investigation on http://127.0.0.1:8889.",
    },
    capabilities: [
      "VQL (Velociraptor Query Language) allowing SQL-like querying of OS state",
      "Rapid artifact hunting across tens of thousands of deployed endpoints simultaneously",
      "Raw NTFS filesystem parsing (MFT, USN Journal) bypassing Windows OS file locks",
      "Live memory inspection and process hollow detection",
    ],
    useCases: [
      "Enterprise threat hunting during active APT breach investigations",
      "Rapid triage and artifact collection across distributed remote workforces",
    ],
    commands: [
      {
        title: "Triage host running processes with VQL",
        command: "./velociraptor query 'SELECT Name, Pid, Exe FROM pslist()'",
        description: "Executes a VQL query directly against the local host.",
      },
    ],
    relatedToolSlugs: ["wazuh", "volatility-3", "kape", "autopsy"],
  },

  // 42. KAPE / KAPEFILES
  {
    id: "tool-kape",
    slug: "kape",
    name: "KAPE / KapeFiles",
    tagline: "Kroll Artifact Parser and Extractor — rapid forensic triage and artifact collection.",
    description: "KAPE (Kroll Artifact Parser and Extractor) by Eric Zimmerman is a specialized triage tool that rapidly targets and acquires forensic artifacts from Windows storage devices. Note: KapeFiles is the open-source repository containing the Targets (what to collect) and Modules (how to parse) powering the proprietary KAPE engine.",
    primaryCategory: "Digital Forensics & Incident Response",
    categories: ["Digital Forensics & Incident Response", "File & Metadata Analysis"],
    tags: ["DFIR", "Triage", "Artifact Collection", "Windows", "MFT", "Registry"],
    type: "cli",
    platforms: ["Windows"],
    urls: {
      official: "https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kroll-artifact-parser-extractor-kape",
      github: "https://github.com/EricZimmerman/KapeFiles",
      documentation: "https://ericzimmerman.github.io/KapeDocs/",
    },
    status: "Active",
    lastVerified: "2025-08-15",
    requirements: ["Windows 10/11 / Windows Server with .NET 6+ runtime"],
    installation: {
      windows: [
        "Download KAPE from Kroll official portal.",
        "Clone updated community targets and modules: git clone https://github.com/EricZimmerman/KapeFiles.git into the KAPE root directory.",
      ],
      notes: "KapeFiles contains the open-source Targets (.tkape) and Modules (.mkape) definitions.",
    },
    quickStart: {
      command: "kape.exe --tsource C: --tdest D:\\Triage --target KapeTriage",
      shell: "cmd",
      note: "Extracts key Windows triage artifacts (MFT, Event Logs, Registry) to destination drive in minutes.",
    },
    capabilities: [
      "Rapid collection of high-value DFIR artifacts in under 2 minutes",
      "VSS (Volume Shadow Copy) artifact parsing",
      "Automated execution of Eric Zimmerman tools (EZ Tools) via Modules",
      "Extensive community-maintained target collection definitions",
    ],
    useCases: [
      "Rapid incident response triage when imaging entire multi-terabyte drives is impractical",
      "Preserving volatile forensic timestamps and registry state during breach containment",
    ],
    relatedToolSlugs: ["velociraptor", "volatility-3", "autopsy"],
  },

  // 43. DOCKER EXPLOITATION FRAMEWORK
  {
    id: "tool-docker-exploitation-framework",
    slug: "docker-exploitation-framework",
    name: "Docker Exploitation Framework",
    tagline: "Container and Kubernetes security auditing and escape research tool.",
    description: "Docker Exploitation Framework is an open-source security tool designed to identify and demonstrate security misconfigurations in Docker and container runtimes within authorized lab testing environments. It automates checks for exposed Docker daemon sockets, privileged container breakouts, host mount permissions, and namespace leaks.",
    primaryCategory: "Container & Cloud Security",
    categories: ["Container & Cloud Security", "Privilege Analysis & Auditing", "Security Research"],
    tags: ["Bash", "Docker", "Container Security", "Breakout", "Lab Testing"],
    type: "cli",
    platforms: ["Linux", "Docker"],
    urls: {
      github: "https://github.com/DockerExploitationFramework/DockerExploitationFramework",
    },
    status: "Maintained",
    lastVerified: "2025-06-10",
    dualUseNotice: true,
    requirements: ["Linux host with Docker runtime installed in authorized test lab"],
    installation: {
      linux: [
        "git clone https://github.com/DockerExploitationFramework/DockerExploitationFramework.git",
        "cd DockerExploitationFramework",
        "chmod +x def.sh",
      ],
    },
    quickStart: {
      command: "./def.sh --help",
      shell: "bash",
      note: "Displays options for container security auditing in lab environments.",
    },
    capabilities: [
      "Audits containers for dangerous capabilities (CAP_SYS_ADMIN, CAP_SYS_PTRACE)",
      "Tests for writable host root filesystem mounts inside containers",
      "Verifies Docker socket exposure (/var/run/docker.sock) risk",
    ],
    useCases: [
      "Hardening container deployments and Docker Daemon configurations",
      "Validating Kubernetes pod security standards and admission controllers in labs",
    ],
    commands: [
      {
        title: "Audit local container privileges",
        command: "./def.sh --audit-container",
        description: "Inspects the running container environment for privilege escalation vectors.",
      },
    ],
    relatedToolSlugs: ["peass-ng", "gato"],
  },

  // 44. GATO
  {
    id: "tool-gato",
    slug: "gato",
    name: "Gato",
    tagline: "GitHub Action Tool (GATO) for auditing CI/CD attack surfaces.",
    description: "Gato (GitHub Action Tool) by Praetorian audits GitHub organizations, repositories, and workflows for CI/CD security risks. It evaluates repository permissions, self-hosted runner vulnerabilities, and workflow configurations to prevent unauthorized code execution and secret leakage in supply chains.",
    primaryCategory: "Container & Cloud Security",
    categories: ["Container & Cloud Security", "Attack Surface Management", "Vulnerability Assessment"],
    tags: ["Python", "CLI", "GitHub Actions", "CI/CD", "Supply Chain", "Cloud Security"],
    type: "cli",
    platforms: ["Linux", "macOS", "Windows"],
    urls: {
      github: "https://github.com/praetorian-inc/gato",
      documentation: "https://github.com/praetorian-inc/gato#readme",
    },
    status: "Archived",
    successor: {
      name: "Gato-X (Community Successor)",
      url: "https://github.com/praetorian-inc/gato-x",
    },
    lastVerified: "2025-08-10",
    dualUseNotice: true,
    requirements: ["Python 3.8+", "GitHub Personal Access Token (PAT) with repo/admin scopes"],
    installation: {
      pip: ["pip3 install gato-x", "gato-x --help"],
      linux: [
        "git clone https://github.com/praetorian-inc/gato-x.git",
        "cd gato-x",
        "pip3 install .",
      ],
      notes: "Note: The original GATO repository has been superseded by Gato-X for active development.",
    },
    quickStart: {
      command: "gato-x scan --target target_organization",
      shell: "bash",
      note: "Scans accessible repositories in target GitHub org for misconfigured action runners.",
    },
    capabilities: [
      "Enumeration of self-hosted GitHub Actions runners across organizations",
      "Detection of public repositories using non-ephemeral self-hosted runners",
      "Identification of workflow injection vulnerabilities ($GITHUB_ENV, run: unchecked expressions)",
      "Audit of repository secret access policies and GitHub Apps permissions",
    ],
    useCases: [
      "CI/CD supply chain hardening for enterprise engineering organizations",
      "Auditing self-hosted runner isolation to prevent lateral cloud movement",
    ],
    commands: [
      {
        title: "Scan organization for self-hosted runner vulnerabilities",
        command: "gato-x scan --target my-company-org --output-yaml audit_results.yaml",
        description: "Audits target GitHub organization repositories for runner exposure.",
      },
    ],
    relatedToolSlugs: ["docker-exploitation-framework", "nuclei"],
  },
];
