const fs = require("fs");

const workflowsData = {
  en: {
    "domain-intelligence": {
      title: "Domain Intelligence & Attack Surface Recon",
      discipline: "Reconnaissance & OSINT",
      summary: "A progressive passive-to-active domain mapping pipeline for identifying perimeter assets without premature target contact.",
      description: "This workflow outlines how analysts begin with an authorized apex domain, systematically discover related infrastructure through passive certificate transparency, search aggregators, recursive DNS correlation, and asset inventory feeds.",
      methodology: "Phased reconnaissance: Start with strictly passive OSINT sources to avoid alert triggers, then correlate findings through graph engines, and finally validate live internet telemetry without invasive active packet sweeps.",
      steps: [
        {
          stage: "01. Passive Search Scraping",
          description: "Aggregate indexed public records, search engine results, exposed employee contact points, and public virtual host records.",
          dataOutput: "Raw domain mentions, employee email formats, and initial third-party service provider references.",
          authorizedScope: "Entirely passive. No packets sent directly to target infrastructure."
        },
        {
          stage: "02. High-Speed Subdomain Enumeration",
          description: "Query passive DNS providers, Certificate Transparency (CT) logs, and passive threat intelligence feeds to discover subdomains.",
          dataOutput: "List of valid fully qualified domain names (FQDNs).",
          authorizedScope: "Passive queries against public log providers."
        },
        {
          stage: "03. Graph-Based Network Mapping",
          description: "Correlate discovered subdomains against ASN allocations, IP ranges, reverse DNS pointers, and infrastructure ownership records.",
          dataOutput: "Structured infrastructure graph mapping subdomains to autonomous systems and IP blocks.",
          authorizedScope: "Passive and authorized DNS resolution queries."
        },
        {
          stage: "04. Recursive Asset Discovery",
          description: "Execute recursive asset mapping across cloud storage buckets, open redirects, virtual hosts, and perimeter services within verified target scope.",
          dataOutput: "Comprehensive asset map including cloud resources, web applications, and network services.",
          authorizedScope: "Verified target scope only."
        },
        {
          stage: "05. Historical Telemetry & Exposure Check",
          description: "Cross-reference target IP addresses and hostnames against Shodan's global sensor index to inspect banner histories and known CVE exposures.",
          dataOutput: "Exposed port profiles, historical service banners, SSL certificate fingerprints, and open protocol listings.",
          authorizedScope: "Queries against pre-indexed Shodan telemetry database."
        }
      ],
      defensiveMitigation: "Defenders should monitor Certificate Transparency logs in real time (e.g. using Certspotter/Certstream), audit public DNS zones for stale CNAME pointers (subdomain takeover mitigation), and maintain an active EASM inventory."
    },
    "network-discovery": {
      title: "Network Perimeter Discovery & Service Auditing",
      discipline: "Network Security & Vulnerability Assessment",
      summary: "High-efficiency network auditing: from rapid asynchronous port sweeping to deep NSE script and template verification.",
      description: "Designed for authorized lab networks and internal enterprise perimeter reviews. Combines fast asynchronous port enumeration with precision protocol fingerprinting and template-based vulnerability assessment.",
      methodology: "Two-stage scanning: High-rate raw SYN discovery sweeps identify active ports across large CIDRs, followed by low-rate stateful service versioning and targeted CVE template checks.",
      steps: [
        {
          stage: "01. Perimeter Port Sweeping",
          description: "Perform an initial fast asynchronous sweep across all 65,535 TCP ports to isolate responsive host endpoints within authorized subnets.",
          dataOutput: "List of active IP:port pairs across the target range.",
          authorizedScope: "Explicitly authorized test network or internal IP block."
        },
        {
          stage: "02. Stateful Service & Version Fingerprinting",
          description: "Perform precise TCP connect handshakes, protocol negotiation, banner grabs, and default Nmap Scripting Engine (NSE) checks on open ports.",
          dataOutput: "Detailed service versions, operating system TCP/IP stack fingerprints, and protocol parameters.",
          authorizedScope: "Target hosts confirmed open in Phase 01."
        },
        {
          stage: "03. Targeted Vulnerability Template Auditing",
          description: "Execute targeted Nuclei templates and Nmap vuln scripts matching detected software versions to verify whether unpatched security flaws are exposed.",
          dataOutput: "Validated vulnerability findings with severity ratings and CVE references.",
          authorizedScope: "Identified services and ports only."
        }
      ],
      defensiveMitigation: "Implement strict firewall egress/ingress filtering, close unused ports, enforce zero-trust network access (ZTNA), and run continuous internal port audits to detect rogue services."
    },
    "digital-forensics": {
      title: "Comprehensive Digital Forensics & Incident Response",
      discipline: "Digital Forensics & Incident Response",
      summary: "End-to-end incident response triage: from volatile memory dump extraction to dead-disk artifact carving and timeline analysis.",
      description: "Standardized operating procedure for forensic analysts triaging compromised hosts. Combines fast live-response artifact collection with deep offline memory parsing and filesystem timeline reconstruction.",
      methodology: "Order of Volatility: Capture volatile RAM first before shutting down or isolating endpoints. Extract critical forensic triage artifacts before full disk imaging. Analyze artifacts offline to preserve chain of custody.",
      steps: [
        {
          stage: "01. Volatile Memory Extraction & Process Triage",
          description: "Capture volatile RAM image and analyze running processes (pslist/pstree), active network sockets (netscan), and injected memory regions (malfind).",
          dataOutput: "Identified malicious PIDs, injected memory offsets, C2 network connections, and unlinked rootkit processes.",
          authorizedScope: "Compromised host in incident response investigation."
        },
        {
          stage: "02. Fast Triage Artifact Parsing",
          description: "Execute targeted collection of high-value Windows artifacts (MFT, Registry Hives, Event Logs, Prefetch, Amcache, Shimcache) using KAPE.",
          dataOutput: "Processed CSV reports of recent execution, USB mounts, user logins, and file modifications.",
          authorizedScope: "Forensic image or live endpoint under investigation."
        },
        {
          stage: "03. Static Malware & Binary Inspection",
          description: "Extract suspicious binaries, DLLs, and dropped files identified in memory or triage for static header analysis and anomaly detection.",
          dataOutput: "Suspicious API imports, section entropy scores, embedded compiler signatures, and MITRE ATT&CK technique mappings.",
          authorizedScope: "Isolated forensic laboratory."
        },
        {
          stage: "04. Deep Filesystem & Timeline Reconstruction",
          description: "Import disk images into Autopsy to build an end-to-end forensic timeline correlating user activity, web history, file downloads, and registry modifications.",
          dataOutput: "Comprehensive chronological incident timeline showing initial infection vector, lateral movement, and data staging.",
          authorizedScope: "Preserved forensic disk image (E01/RAW)."
        }
      ],
      defensiveMitigation: "Enforce centralized endpoint telemetry logging (Sysmon/Wazuh), enable PowerShell script block logging, configure Windows Defender Credential Guard, and isolate suspicious hosts via network containment."
    },
    "web-security-assessment": {
      title: "Web Application Security & API Assessment",
      discipline: "Web Security & Penetration Testing",
      summary: "Structured web application assessment: from route discovery to parameter fuzzing, traffic interception, and vulnerability verification.",
      description: "Methodological security testing for web applications and REST/GraphQL APIs within an authorized assessment scope. Moves systematically from surface discovery to parameter mining and authenticated testing.",
      methodology: "Gray-box methodology: Map all public and authenticated endpoints, intercept and inspect HTTP traffic flow, discover hidden parameter inputs, and verify security controls using custom templates.",
      steps: [
        {
          stage: "01. Content & Route Discovery",
          description: "Enumerate directories, unlinked API endpoints, backup files, and administrative panels using high-speed concurrent wordlist testing.",
          dataOutput: "Discovered URL hierarchy, administrative endpoints, and unprotected static files.",
          authorizedScope: "Explicitly authorized web application hostname."
        },
        {
          stage: "02. Traffic Interception & Request Tampering",
          description: "Route browser and automated testing traffic through an intercepting proxy to inspect request headers, session tokens, and API payload structures.",
          dataOutput: "Full HTTP/S transaction log with annotated endpoints and authentication tokens.",
          authorizedScope: "Target application within testing scope."
        },
        {
          stage: "03. Hidden Parameter Fuzzing",
          description: "Fuzz query parameters and JSON payloads on sensitive endpoints to discover hidden administrative flags, debug modes, or injection reflection points.",
          dataOutput: "Discovered undocumented parameter names and input reflection behavior.",
          authorizedScope: "Target endpoints identified in Phase 01/02."
        },
        {
          stage: "04. Automated Security Template Verification",
          description: "Execute targeted Nuclei templates for web vulnerabilities (XSS, SQLi, SSRF, CORS misconfigurations, outdated libraries) against all mapped endpoints.",
          dataOutput: "Verified vulnerability findings with reproduction steps and HTTP proof-of-concept logs.",
          authorizedScope: "Target application within testing scope."
        }
      ],
      defensiveMitigation: "Implement parameterized database queries, strict Content Security Policy (CSP), automated dependency vulnerability scanning in CI/CD pipelines, and secure CORS headers."
    },
    "active-directory-auditing": {
      title: "Active Directory & Identity Hygiene Auditing",
      discipline: "Active Directory Security",
      summary: "Domain security auditing: from privilege graph analysis to credential hygiene verification and lateral movement mitigation.",
      description: "Designed for enterprise internal security audits. Discovers unintended delegation paths, excessive ACL permissions, stale accounts, and weak authentication protocols across on-premises Active Directory and hybrid Entra ID.",
      methodology: "Identity-first defense: Map the full graph of domain trusts and permissions to find non-obvious paths to Domain Admin, then verify credential hygiene without modifying domain state.",
      steps: [
        {
          stage: "01. Permission Graph Mapping",
          description: "Collect domain session, ACL, and group membership telemetry to construct an interactive Neo4j graph of all attack paths to Tier 0 assets.",
          dataOutput: "Visual graph identifying shortest attack paths to Domain Admins and critical security groups.",
          authorizedScope: "Authorized enterprise domain network."
        },
        {
          stage: "02. Protocol & Credential Hygiene Verification",
          description: "Audit Kerberos delegation configurations, check for Kerberoastable service accounts with weak SPNs, and test protocol security policies.",
          dataOutput: "Inventory of unconstrained delegation hosts, accounts susceptible to Kerberoasting, and weak encryption types.",
          authorizedScope: "Authorized enterprise domain."
        },
        {
          stage: "03. Memory Credential Exposure Audit",
          description: "In controlled lab workstations, verify whether LSASS protection, Credential Guard, and Restricted Admin modes successfully prevent credential dumping.",
          dataOutput: "Verification of endpoint credential protection effectiveness against LSASS scraping.",
          authorizedScope: "Designated test workstations only."
        },
        {
          stage: "04. Password Robustness & Policy Testing",
          description: "Perform offline password strength auditing against extracted domain password hashes to identify shared, weak, or breached passwords across the organization.",
          dataOutput: "Report on password policy compliance, weak password percentages, and common pattern usage without exposing plaintext values.",
          authorizedScope: "Authorized offline assessment of enterprise domain hash dump."
        }
      ],
      defensiveMitigation: "Implement a tiered administration model (Tier 0/1/2), eliminate unconstrained Kerberos delegation, enforce Protected Users security group for privileged accounts, and deploy Windows Defender Credential Guard."
    }
  },

  "pt-BR": {
    "domain-intelligence": {
      title: "Inteligência de Domínios e Reconhecimento de Superfície de Ataque",
      discipline: "Reconhecimento & OSINT",
      summary: "Pipeline progressivo de mapeamento de domínio (passivo a ativo) para identificação de ativos perimetrais sem contato prematuro com o alvo.",
      description: "Este fluxo de trabalho descreve como analistas partem de um domínio principal autorizado para descobrir sistematicamente a infraestrutura relacionada por meio de transparência de certificados, agregadores de busca e correlação DNS.",
      methodology: "Reconhecimento em fases: comece com fontes OSINT estritamente passivas para evitar alertas, correlacione os dados em grafos e valide a telemetria pública da internet sem varreduras invasivas.",
      steps: [
        {
          stage: "01. Coleta Passiva em Buscadores",
          description: "Agregue registros públicos, resultados de motores de busca, pontos de contato de colaboradores e registros de hosts virtuais.",
          dataOutput: "Menções ao domínio, formatos de e-mail institucional e referências iniciais a provedores de serviços.",
          authorizedScope: "Totalmente passivo. Nenhum pacote enviado diretamente à infraestrutura alvo."
        },
        {
          stage: "02. Enumeração Rápida de Subdomínios",
          description: "Consulte provedores de DNS passivo, logs de transparência de certificados (CT) e feeds de Threat Intel para descobrir subdomínios.",
          dataOutput: "Lista de nomes de domínio totalmente qualificados (FQDNs) válidos.",
          authorizedScope: "Consultas passivas em provedores públicos de logs."
        },
        {
          stage: "03. Mapeamento de Rede em Grafos",
          description: "Correlacione os subdomínios descobertos com alocações de ASN, faixas de IP, ponteiros DNS reversos e registros de titularidade.",
          dataOutput: "Grafo estruturado de infraestrutura mapeando subdomínios para sistemas autônomos e blocos de IP.",
          authorizedScope: "Consultas passivas e resolução DNS autorizada."
        },
        {
          stage: "04. Descoberta Recursiva de Ativos",
          description: "Execute mapeamento recursivo de ativos em baldes de armazenamento em nuvem, redirecionamentos abertos e serviços perimetrais no escopo.",
          dataOutput: "Mapa completo de ativos incluindo recursos em nuvem, aplicações web e serviços de rede.",
          authorizedScope: "Apenas escopo verificado e autorizado."
        },
        {
          stage: "05. Telemetria Histórica e Exposição",
          description: "Cruze endereços IP e nomes de host com o índice global de sensores do Shodan para inspecionar banners históricos e vulnerabilidades CVE expostas.",
          dataOutput: "Perfis de portas abertas, banners de serviço históricos, certificados SSL e protocolos abertos.",
          authorizedScope: "Consultas na base de telemetria pré-indexada do Shodan."
        }
      ],
      defensiveMitigation: "Defensores devem monitorar logs de transparência de certificados em tempo real (ex.: Certspotter/Certstream), auditar zonas DNS públicas contra CNAMEs órfãos e manter um inventário contínuo de EASM."
    },
    "network-discovery": {
      title: "Descoberta de Perímetro de Rede e Auditoria de Serviços",
      discipline: "Segurança de Redes & Avaliação de Vulnerabilidades",
      summary: "Auditoria de rede de alta eficiência: desde varreduras assíncronas ultrarrápidas de portas até verificação aprofundada com scripts NSE e templates.",
      description: "Projetado para laboratórios autorizados e revisões internas de perímetro corporativo. Combina enumeração veloz de portas com identificação precisa de protocolos e verificação de falhas.",
      methodology: "Varredura em duas etapas: varreduras rápidas SYN identificam portas ativas em grandes blocos CIDR, seguidas de identificação detalhada de serviços e checagem direcionada de CVEs.",
      steps: [
        {
          stage: "01. Varredura Perimetral de Portas",
          description: "Realize uma varredura assíncrona inicial em todas as 65.535 portas TCP para isolar endpoints responsivos nas sub-redes autorizadas.",
          dataOutput: "Lista de pares IP:porta ativos em toda a faixa alvo.",
          authorizedScope: "Rede de teste explicitamente autorizada ou bloco de IP interno."
        },
        {
          stage: "02. Identificação de Serviços e Versões",
          description: "Execute conexões TCP precisas, negociação de protocolos, captura de banners e scripts padrão do Nmap (NSE) nas portas abertas.",
          dataOutput: "Versões detalhadas de serviços, impressões digitais da pilha TCP/IP e parâmetros de protocolo.",
          authorizedScope: "Hosts alvo confirmados como abertos na Fase 01."
        },
        {
          stage: "03. Auditoria de Vulnerabilidades Direcionada",
          description: "Execute templates direcionados do Nuclei e scripts de vulnerabilidade do Nmap correspondentes às versões detectadas para verificar falhas sem correção.",
          dataOutput: "Achados de vulnerabilidades validados com classificações de severidade e referências CVE.",
          authorizedScope: "Apenas portas e serviços identificados."
        }
      ],
      defensiveMitigation: "Implemente filtragem rigorosa de entrada e saída em firewalls, encerre portas não utilizadas, aplique acesso de confiança zero (ZTNA) e execute auditorias internas periódicas de portas."
    },
    "digital-forensics": {
      title: "Forense Digital Abrangente e Resposta a Incidentes (DFIR)",
      discipline: "Forense Digital & Resposta a Incidentes",
      summary: "Triagem completa de resposta a incidentes: da extração de memória volátil à análise de artefatos de disco e linha do tempo.",
      description: "Procedimento operacional padronizado para peritos e analistas de resposta a incidentes em hosts comprometidos. Combina coleta rápida de artefatos em tempo real com análise aprofundada de memória RAM e reconstrução de linha do tempo.",
      methodology: "Ordem de Volatilidade: capture a memória RAM volátil primeiro antes de desligar ou isolar endpoints. Extraia artefatos críticos de triagem antes da imagem de disco completa. Analise em ambiente isolado para preservar a cadeia de custódia.",
      steps: [
        {
          stage: "01. Extração de Memória Volátil e Triagem de Processos",
          description: "Capture a imagem da memória RAM e analise processos ativos (pslist/pstree), conexões de rede (netscan) e regiões de memória injetadas (malfind).",
          dataOutput: "PIDs maliciosos identificados, offsets de memória injetada, conexões C2 e processos ocultos de rootkit.",
          authorizedScope: "Host comprometido na investigação de resposta a incidentes."
        },
        {
          stage: "02. Processamento Rápido de Artefatos Forenses",
          description: "Colete artefatos de alto valor do Windows (MFT, Registro, Logs de Eventos, Prefetch, Amcache, Shimcache) usando o KAPE.",
          dataOutput: "Relatórios CSV de execuções recentes, montagens de USB, logins de usuários e arquivos modificados.",
          authorizedScope: "Imagem forense ou endpoint sob investigação."
        },
        {
          stage: "03. Inspeção Estática de Binários e Malware",
          description: "Extraia binários suspeitos e DLLs identificados na memória para análise estática de cabeçalhos e detecção de anomalias.",
          dataOutput: "APIs suspeitas importadas, pontuações de entropia de seções, assinaturas de compiladores e mapeamentos do MITRE ATT&CK.",
          authorizedScope: "Laboratório forense isolado."
        },
        {
          stage: "04. Reconstrução de Linha do Tempo e Sistema de Arquivos",
          description: "Importe imagens de disco no Autopsy para construir uma linha do tempo cronológica relacionando atividades do usuário, histórico web e modificações no registro.",
          dataOutput: "Linha do tempo cronológica detalhada do incidente mostrando vetor inicial, movimentação lateral e exfiltração.",
          authorizedScope: "Imagem forense de disco preservada (E01/RAW)."
        }
      ],
      defensiveMitigation: "Ative telemetria centralizada em endpoints (Sysmon/Wazuh), habilite log de blocos de script PowerShell, configure Windows Defender Credential Guard e isole hosts suspeitos via contenção de rede."
    },
    "web-security-assessment": {
      title: "Avaliação de Segurança em Aplicações Web e APIs",
      discipline: "Segurança Web & Testes de Invasão",
      summary: "Avaliação estruturada de aplicações web: da descoberta de rotas ao fuzzing de parâmetros, interceptação de tráfego e validação de falhas.",
      description: "Testes metodológicos de segurança para aplicações web e APIs REST/GraphQL em escopo autorizado. Evolui sistematicamente da descoberta de superfície para mineração de parâmetros e testes autenticados.",
      methodology: "Metodologia Gray-Box: mapeie todos os endpoints públicos e autenticados, intercepte o tráfego HTTP, descubra parâmetros ocultos e valide controles de segurança com templates personalizados.",
      steps: [
        {
          stage: "01. Descoberta de Rotas e Conteúdo",
          description: "Enumere diretórios, endpoints de API não documentados, arquivos de backup e painéis de administração com listas de palavras de alto rendimento.",
          dataOutput: "Hierarquia de URLs descobertas, endpoints administrativos e arquivos estáticos desprotegidos.",
          authorizedScope: "Hostname da aplicação web explicitamente autorizado."
        },
        {
          stage: "02. Interceptação de Tráfego e Manipulação de Requisições",
          description: "Direcione o tráfego do navegador através de um proxy de interceptação para inspecionar cabeçalhos, tokens de sessão e estruturas de dados de APIs.",
          dataOutput: "Registro completo de transações HTTP/S com endpoints anotados e tokens de autenticação.",
          authorizedScope: "Aplicação alvo dentro do escopo de testes."
        },
        {
          stage: "03. Fuzzing de Parâmetros Ocultos",
          description: "Execute fuzzing em parâmetros de consulta e dados JSON em endpoints sensíveis para descobrir parâmetros de debug, flags ocultas e pontos de injeção.",
          dataOutput: "Parâmetros não documentados descobertos e comportamento de reflexão de entrada.",
          authorizedScope: "Endpoints alvo identificados nas fases anteriores."
        },
        {
          stage: "04. Validação Automatizada com Templates de Segurança",
          description: "Execute templates do Nuclei direcionados a vulnerabilidades web (XSS, SQLi, SSRF, falhas de CORS, bibliotecas vulneráveis) em todos os endpoints mapeados.",
          dataOutput: "Achados de vulnerabilidades validados com passos de reprodução e logs de prova de conceito (PoC).",
          authorizedScope: "Aplicação alvo dentro do escopo de testes."
        }
      ],
      defensiveMitigation: "Implemente consultas parametrizadas a bancos de dados, políticas estritas de Content Security Policy (CSP), análise automatizada de vulnerabilidades em dependências no CI/CD e cabeçalhos CORS restritivos."
    },
    "active-directory-auditing": {
      title: "Auditoria de Active Directory e Higiene de Identidades",
      discipline: "Segurança de Active Directory",
      summary: "Auditoria de segurança de domínio: da análise de grafos de privilégio à verificação de higiene de credenciais e mitigação de movimento lateral.",
      description: "Projetado para auditorias corporativas internas. Identifica caminhos não intencionais de delegação, permissões ACL excessivas, contas inativas e protocolos fracos de autenticação no Active Directory local e híbrido (Entra ID).",
      methodology: "Defesa focada em identidade: mapeie o grafo completo de relações de confiança e permissões para encontrar caminhos não óbvios até o Domain Admin, verificando a higiene de credenciais sem alterar o estado do domínio.",
      steps: [
        {
          stage: "01. Mapeamento de Grafo de Permissões",
          description: "Colete sessões de domínio, ACLs e associações a grupos para construir um grafo interativo no Neo4j com todos os caminhos até os ativos de Nível 0.",
          dataOutput: "Grafo visual identificando os caminhos mais curtos até Administradores de Domínio e grupos de segurança críticos.",
          authorizedScope: "Rede corporativa do domínio autorizado."
        },
        {
          stage: "02. Verificação de Protocolos e Higiene de Credenciais",
          description: "Audite configurações de delegação Kerberos, contas de serviço vulneráveis a Kerberoasting com SPNs fracas e políticas de autenticação.",
          dataOutput: "Inventário de computadores com delegação irrestrita, contas vulneráveis a Kerberoasting e cifras fracas.",
          authorizedScope: "Domínio corporativo autorizado."
        },
        {
          stage: "03. Auditoria de Exposição de Credenciais em Memória",
          description: "Em estações de laboratório controladas, verifique se proteções do LSASS, Credential Guard e Restricted Admin impedem com sucesso a extração de senhas.",
          dataOutput: "Verificação da eficácia das proteções de credenciais de endpoint contra scraping de memória do LSASS.",
          authorizedScope: "Apenas estações de trabalho de teste designadas."
        },
        {
          stage: "04. Teste de Robustez de Senhas e Políticas",
          description: "Realize auditoria offline de força de senhas contra hashes extraídos do domínio para identificar senhas compartilhadas, fracas ou comprometidas.",
          dataOutput: "Relatório de conformidade da política de senhas e padrões comuns de fraqueza sem expor senhas em texto puro.",
          authorizedScope: "Auditoria offline autorizada de dump de hashes do domínio."
        }
      ],
      defensiveMitigation: "Adote o modelo de administração em camadas (Tier 0/1/2), elimine delegações Kerberos irrestritas, imponha o grupo de segurança Protected Users para contas privilegiadas e ative o Windows Defender Credential Guard."
    }
  },

  "es": {
    "domain-intelligence": {
      title: "Inteligencia de Dominios y Reconocimiento de Superficie de Ataque",
      discipline: "Reconocimiento & OSINT",
      summary: "Pipeline progresivo de mapeo de dominio (pasivo a activo) para identificar activos perimetrales sin contacto prematuro.",
      description: "Este flujo de trabajo detalla cómo los analistas parten de un dominio autorizado y descubren sistemáticamente la infraestructura relacionada mediante transparencia de certificados, agregadores de búsqueda y correlación DNS.",
      methodology: "Reconocimiento por fases: comience con fuentes OSINT estrictamente pasivas para evitar alertas, correlacione los datos en grafos y valide la telemetría pública sin escaneos invasivos.",
      steps: [
        {
          stage: "01. Recolección Pasiva en Buscadores",
          description: "Agregue registros públicos, resultados de motores de búsqueda, puntos de contacto de empleados y registros de hosts virtuales.",
          dataOutput: "Menciones al dominio, formatos de correo institucional y referencias iniciales a proveedores de servicios.",
          authorizedScope: "Totalmente pasivo. Ningún paquete enviado a la infraestructura objetivo."
        },
        {
          stage: "02. Enumeración Rápida de Subdominios",
          description: "Consulte proveedores de DNS pasivo, logs de transparencia de certificados (CT) y fuentes de Threat Intel para descubrir subdominios.",
          dataOutput: "Lista de nombres de dominio totalmente cualificados (FQDN) válidos.",
          authorizedScope: "Consultas pasivas a proveedores públicos de registros."
        },
        {
          stage: "03. Mapeo de Red en Grafos",
          description: "Correlacione los subdominios descubiertos con asignaciones de ASN, rangos IP, punteros inversos de DNS y registros de titularidad.",
          dataOutput: "Grafo estructurado de infraestructura mapeando subdominios con sistemas autónomos y bloques IP.",
          authorizedScope: "Consultas pasivas y resolución DNS autorizada."
        },
        {
          stage: "04. Descubrimiento Recursivo de Activos",
          description: "Ejecute mapeo recursivo de activos en buckets de almacenamiento en la nube, redirecciones abiertas y servicios perimetrales.",
          dataOutput: "Mapa completo de activos incluyendo recursos cloud, aplicaciones web y servicios de red.",
          authorizedScope: "Únicamente alcance verificado y autorizado."
        },
        {
          stage: "05. Telemetría Histórica y Exposición",
          description: "Cruce direcciones IP y nombres de host con el índice global de sensores de Shodan para inspeccionar banners históricos y CVEs conocidos.",
          dataOutput: "Perfiles de puertos expuestos, banners de servicio históricos, certificados SSL y protocolos abiertos.",
          authorizedScope: "Consultas en la base de telemetría preindexada de Shodan."
        }
      ],
      defensiveMitigation: "Los defensores deben monitorizar logs de transparencia de certificados en tiempo real (ej. Certspotter/Certstream), auditar zonas DNS públicas contra CNAMEs huérfanos y mantener un inventario EASM continuo."
    },
    "network-discovery": {
      title: "Descubrimiento de Perímetro de Red y Auditoría de Servicios",
      discipline: "Seguridad de Red & Evaluación de Vulnerabilidades",
      summary: "Auditoría de red de alta eficiencia: desde barridos asíncronos rápidos de puertos hasta verificación profunda con scripts NSE y plantillas.",
      description: "Diseñado para entornos de laboratorio y revisiones de perímetro corporativo. Combina enumeración veloz de puertos con identificación precisa de protocolos y evaluación de fallos.",
      methodology: "Escaneo en dos fases: barridos SYN rápidos identifican puertos activos en grandes bloques CIDR, seguidos de identificación detallada de servicios y comprobación dirigida de CVEs.",
      steps: [
        {
          stage: "01. Barrido Perimetral de Puertos",
          description: "Realice un barrido asíncrono inicial en los 65.535 puertos TCP para aislar equipos que responden en las subredes autorizadas.",
          dataOutput: "Lista de pares IP:puerto activos en todo el rango objetivo.",
          authorizedScope: "Red de pruebas explícitamente autorizada o bloque IP interno."
        },
        {
          stage: "02. Identificación de Servicios y Versiones",
          description: "Ejecute conexiones TCP precisas, negociación de protocolos, captura de banners y scripts estándar de Nmap (NSE) en puertos abiertos.",
          dataOutput: "Versiones detalladas de servicios, huellas de pila TCP/IP del sistema operativo y parámetros de protocolo.",
          authorizedScope: "Hosts objetivo confirmados como abiertos en la Fase 01."
        },
        {
          stage: "03. Auditoría Dirigida con Plantillas de Vulnerabilidad",
          description: "Ejecute plantillas dirigidas de Nuclei y scripts de vulnerabilidad de Nmap acordes a las versiones detectadas para verificar fallos sin parchear.",
          dataOutput: "Hallazgos de vulnerabilidades validados con niveles de severidad y referencias CVE.",
          authorizedScope: "Únicamente servicios y puertos identificados."
        }
      ],
      defensiveMitigation: "Implemente filtrado riguroso en firewalls, cierre puertos innecesarios, aplique acceso de confianza cero (ZTNA) y realice auditorías internas continuas de puertos."
    },
    "digital-forensics": {
      title: "Forense Digital Integral y Respuesta ante Incidentes (DFIR)",
      discipline: "Forense Digital & Respuesta a Incidentes",
      summary: "Clasificación forense completa en respuesta a incidentes: desde la extracción de memoria volátil hasta el análisis de artefactos de disco y cronología.",
      description: "Procedimiento operativo estándar para analistas forenses en equipos comprometidos. Combina recolección rápida de artefactos en vivo con análisis exhaustivo de memoria RAM y reconstrucción cronológica.",
      methodology: "Orden de Volatilidad: capture la memoria RAM primero antes de apagar o aislar el equipo. Extraiga artefactos críticos de triaje antes de la imagen completa de disco. Analice en entorno aislado para preservar la cadena de custodia.",
      steps: [
        {
          stage: "01. Extracción de Memoria Volátil y Triaje de Procesos",
          description: "Capture la imagen de memoria RAM y analice procesos activos (pslist/pstree), conexiones de red (netscan) y regiones de memoria inyectadas (malfind).",
          dataOutput: "PIDs maliciosos identificados, desplazamientos de memoria inyectada, conexiones C2 y procesos ocultos de rootkits.",
          authorizedScope: "Host comprometido en la investigación de respuesta a incidentes."
        },
        {
          stage: "02. Procesamiento Rápido de Artefactos Forenses",
          description: "Recopile artefactos de alto valor de Windows (MFT, Registro, Registros de eventos, Prefetch, Amcache, Shimcache) con KAPE.",
          dataOutput: "Informes CSV de ejecuciones recientes, dispositivos USB montados, inicios de sesión y ficheros modificados.",
          authorizedScope: "Imagen forense o equipo bajo investigación."
        },
        {
          stage: "03. Inspección Estática de Malware y Binarios",
          description: "Extraiga binarios sospechosos y DLLs identificados en memoria para análisis estático de cabeceras y detección de anomalías.",
          dataOutput: "Importaciones de APIs sospechosas, entropía de secciones, firmas de compilador y mapeo MITRE ATT&CK.",
          authorizedScope: "Laboratorio forense aislado."
        },
        {
          stage: "04. Reconstrucción de Línea Temporal y Sistema de Ficheros",
          description: "Importe imágenes de disco en Autopsy para construir una cronología detallada relacionando actividad de usuario, historial web y modificaciones en el registro.",
          dataOutput: "Línea temporal cronológica completa del incidente mostrando vector inicial, movimiento lateral y exfiltración.",
          authorizedScope: "Imagen forense preservada de disco (E01/RAW)."
        }
      ],
      defensiveMitigation: "Habilite telemetría centralizada de endpoints (Sysmon/Wazuh), active registro de bloques de script en PowerShell, configure Windows Defender Credential Guard y aísle equipos sospechosos mediante contención de red."
    },
    "web-security-assessment": {
      title: "Evaluación de Seguridad en Aplicaciones Web y APIs",
      discipline: "Seguridad Web & Pruebas de Penetración",
      summary: "Evaluación estructurada de aplicaciones web: desde descubrimiento de rutas hasta fuzzing de parámetros, intercepción de tráfico y validación de fallos.",
      description: "Pruebas de seguridad metódicas para aplicaciones web y APIs REST/GraphQL en alcance autorizado. Avanza de forma sistemática desde el descubrimiento de superficie hacia la búsqueda de parámetros y pruebas autenticadas.",
      methodology: "Metodología Gray-Box: mapee endpoints públicos y autenticados, intercepte el tráfico HTTP, descubra parámetros ocultos y verifique controles de seguridad con plantillas personalizadas.",
      steps: [
        {
          stage: "01. Descubrimiento de Rutas y Contenido",
          description: "Enumere directorios, endpoints de API no vinculados, copias de seguridad y paneles de administración con diccionarios de alto rendimiento.",
          dataOutput: "Jerarquía de URLs descubiertas, endpoints administrativos y ficheros estáticos desprotegidos.",
          authorizedScope: "Hostname de la aplicación web explícitamente autorizado."
        },
        {
          stage: "02. Intercepción de Tráfico y Manipulación de Peticiones",
          description: "Enrute el tráfico del navegador por un proxy de intercepción para examinar cabeceras, tokens de sesión y cargas de datos en APIs.",
          dataOutput: "Registro completo de transacciones HTTP/S con endpoints anotados y tokens de autenticación.",
          authorizedScope: "Aplicación objetivo dentro del alcance de pruebas."
        },
        {
          stage: "03. Fuzzing de Parámetros Ocultos",
          description: "Realice fuzzing sobre parámetros de consulta y JSON en endpoints críticos para descubrir parámetros de depuración, flags ocultas y puntos de inyección.",
          dataOutput: "Parámetros no documentados descubiertos y comportamiento de reflexión de datos.",
          authorizedScope: "Endpoints objetivo identificados en fases anteriores."
        },
        {
          stage: "04. Verificación Automatizada con Plantillas de Seguridad",
          description: "Ejecute plantillas de Nuclei orientadas a vulnerabilidades web (XSS, SQLi, SSRF, errores de CORS, librerías vulnerables) en los endpoints identificados.",
          dataOutput: "Hallazgos de vulnerabilidades validados con pasos de reproducción y evidencias HTTP.",
          authorizedScope: "Aplicación objetivo dentro del alcance de pruebas."
        }
      ],
      defensiveMitigation: "Implemente consultas parametrizadas a bases de datos, políticas estrictas de Content Security Policy (CSP), análisis automático de dependencias en CI/CD y cabeceras CORS seguras."
    },
    "active-directory-auditing": {
      title: "Auditoría de Active Directory e Higiene de Identidades",
      discipline: "Seguridad de Active Directory",
      summary: "Auditoría de seguridad de dominio: desde análisis de grafos de privilegios hasta verificación de higiene de credenciales y mitigación de movimiento lateral.",
      description: "Diseñado para auditorías corporativas internas. Identifica rutas imprevistas de delegación, permisos ACL excesivos, cuentas inactivas y protocolos débiles de autenticación en Active Directory local e híbrido (Entra ID).",
      methodology: "Defensa centrada en la identidad: mapee el grafo completo de permisos para encontrar rutas no evidentes hacia Domain Admin, verificando la higiene de credenciales sin alterar el estado del dominio.",
      steps: [
        {
          stage: "01. Mapeo de Grafo de Permisos",
          description: "Recopile sesiones de dominio, ACLs y grupos para construir un grafo interactivo en Neo4j con todas las rutas de ataque hacia activos Tier 0.",
          dataOutput: "Grafo visual que identifica las rutas de ataque más cortas hacia Administradores de Dominio y grupos críticos.",
          authorizedScope: "Red corporativa del dominio autorizado."
        },
        {
          stage: "02. Verificación de Protocolos e Higiene de Credenciales",
          description: "Audite configuraciones de delegación Kerberos, cuentas de servicio vulnerables a Kerberoasting con SPNs débiles y políticas de autenticación.",
          dataOutput: "Inventario de equipos con delegación no restringida, cuentas vulnerables a Kerberoasting y tipos de cifrado débiles.",
          authorizedScope: "Dominio corporativo autorizado."
        },
        {
          stage: "03. Auditoría de Exposición de Credenciales en Memoria",
          description: "En equipos de laboratorio controlados, verifique si la protección de LSASS, Credential Guard y Restricted Admin impiden con éxito el volcado de contraseñas.",
          dataOutput: "Verificación de la efectividad de las protecciones de credenciales de endpoint frente a volcado de memoria.",
          authorizedScope: "Únicamente estaciones de trabajo de prueba designadas."
        },
        {
          stage: "04. Prueba de Robustez de Contraseñas y Políticas",
          description: "Realice una auditoría offline de fortaleza de contraseñas sobre hashes extraídos del dominio para identificar claves compartidas, débiles o comprometidas.",
          dataOutput: "Informe de cumplimiento de directivas de contraseñas y patrones comunes de debilidad sin revelar contraseñas en texto claro.",
          authorizedScope: "Auditoría offline autorizada del volcado de hashes del dominio."
        }
      ],
      defensiveMitigation: "Implemente el modelo de administración por niveles (Tier 0/1/2), elimine delegaciones Kerberos no restringidas, aplique el grupo Protected Users para cuentas privilegiadas y despliegue Windows Defender Credential Guard."
    }
  },

  "zh-CN": {
    "domain-intelligence": {
      title: "域名情报收集与外部攻击面测绘",
      discipline: "侦察与开源情报",
      summary: "渐进式（由被动至主动）域名资产映射流水线，在避免过早触碰目标的前提下厘清外网边界资产清单。",
      description: "本工作流规范了分析人员如何从合法授权的根域名入手，借助证书透明度日志、聚合搜索引擎、DNS递归解析与资产清单数据流，系统性摸排关联的网络基础设施。",
      methodology: "分阶段侦察策略：优先采用纯被动OSINT渠道以防触发目标告警，随后在图数据库中关联聚合，最后在不发送高危探测包的前提下校验互联网存活遥测数据。",
      steps: [
        {
          stage: "01. 搜索引擎与公开记录被动抓取",
          description: "聚合公开索引记录、主要搜索引擎检索结果、公开的企业员工联络方式以及虚拟主机解析线索。",
          dataOutput: "原始域名提及记录、企业员工邮箱命名规则以及初步第三方云服务商引用信息。",
          authorizedScope: "完全被动收集。严禁向目标资产直接发送任何网络探测数据包。"
        },
        {
          stage: "02. 高速子域名枚举",
          description: "查询被动DNS服务商、证书透明度（CT）公开日志库以及威胁情报源以发现关联子域名。",
          dataOutput: "有效且结构完整的完全限定域名（FQDN）列表清单。",
          authorizedScope: "仅向公开公共日志数据库发起被动查询。"
        },
        {
          stage: "03. 基于拓扑图的网络映射",
          description: "将发现的子域名与自治系统号（ASN）分配、公网IP段、反向DNS指针及归属机构进行拓扑关联。",
          dataOutput: "将子域名精准映射至自治系统与公网IP网段的结构化网络拓扑图谱。",
          authorizedScope: "仅限被动查询及经授权的常规DNS正反向解析。"
        },
        {
          stage: "04. 递归式资产暴露面测绘",
          description: "在经核实的授权测试范围内，对云端对象存储桶、开放重定向、虚拟主机及外网边界服务展开递归测绘。",
          dataOutput: "涵盖云端基础设施、Web应用系统与网络边界端口的全面资产台账。",
          authorizedScope: "严格限定在已获书面授权验证的目标测试范围之内。"
        },
        {
          stage: "05. 历史遥测数据与暴露面核查",
          description: "将目标IP地址与主机名与Shodan全球传感器历史索引进行交叉比对，排查历史Banner与已知CVE暴露。",
          dataOutput: "开放端口分布特征、历史服务响应Banner、SSL证书指纹及公网开放协议清单。",
          authorizedScope: "仅向Shodan预先索引的离线遥测数据库发起检索。"
        }
      ],
      defensiveMitigation: "防守方应配置证书透明度（CT）日志的实时告警监控，定期审计公共DNS解析区以防泛解析或孤儿CNAME劫持，并保持常态化外部攻击面管理（EASM）。"
    },
    "network-discovery": {
      title: "网络外围资产探测与开放服务安全审计",
      discipline: "网络安全与漏洞评估",
      summary: "高能效网络安全审计流程：涵盖从极速异步全端口拉网普查，到深层NSE指纹识别与漏洞模板比对验证。",
      description: "专为授权靶场实验网络及企业内部网络边界合规巡检而设计。融合了高速异步全端口扫描、高精度协议版本指纹识别以及模板驱动的漏洞实证技术。",
      methodology: "双阶段递进式扫描：首先以高发包速率发送原始SYN数据包在整个CIDR网段快速定位存活端口，随后针对开放端口实施低速率状态化服务识别与定向CVE模板验证。",
      steps: [
        {
          stage: "01. 网络边界端口普查",
          description: "对授权网段内的全量65,535个TCP端口发起快速异步扫描，排查出具备网络响应的主机终结点。",
          dataOutput: "目标网段内所有存活的 IP:端口 键值对清单。",
          authorizedScope: "经书面明确授权的测试网络或内部IP网段。"
        },
        {
          stage: "02. 状态化服务与运行版本指纹识别",
          description: "对已识别的开放端口执行完整TCP握手、协议协商、Banner抓取并加载Nmap默认安全脚本（NSE）。",
          dataOutput: "详尽的应用服务具体版本、操作系统TCP/IP协议栈指纹以及底层协议参数。",
          authorizedScope: "仅限在第01阶段明确确认为开放状态的目标主机与端口。"
        },
        {
          stage: "03. 定向漏洞模板合规性复核",
          description: "根据检测出的具体软件版本，定向加载Nuclei对应漏洞模板及Nmap vuln分类脚本，核验已知高危缺陷是否存在。",
          dataOutput: "附带严重级别评级与标准CVE编号的已核实验证报告。",
          authorizedScope: "仅限已定位的特定网络服务与端口。"
        }
      ],
      defensiveMitigation: "严格部署防火墙出入站双向访问控制策略，关闭一切非必需端口，落地零信任网络访问架构（ZTNA），并推行定期的内网端口连通性安全抽检。"
    },
    "digital-forensics": {
      title: "全面数字化取证与安全事件应急响应（DFIR）",
      discipline: "数字取证与应急响应",
      summary: "端到端事件响应取证作业流程：从易失性物理内存镜像提取，到静态磁盘关键痕迹排查与全景时间线还原。",
      description: "面向被入侵受害主机的标准化电子数据鉴定与取证流程。兼顾了内存取证的即时性、关键痕迹提取的敏捷性，以及离线文件系统时间线的严密重构。",
      methodology: "依据易失性优先次序（Order of Volatility）：在断电或网络物理隔离前优先采集RAM物理内存镜像；在全盘克隆镜像前快速提取高价值分类痕迹；全流程实施离线分析以确保证据链完整。",
      steps: [
        {
          stage: "01. 易失性物理内存采集与进程初筛",
          description: "完整采集物理RAM镜像并分析正在运行的系统进程树（pslist/pstree）、活跃网络连接套接字（netscan）及内存注入代码段（malfind）。",
          dataOutput: "识别出的恶意进程PID、内存注入偏移量、C2回连网络地址以及被断链隐匿的Rootkit。",
          authorizedScope: "处于应急响应立案调查中的涉案失陷主机。"
        },
        {
          stage: "02. 关键取证痕迹快速分流提取",
          description: "利用KAPE快速提取Windows核心高价值痕迹文件（包括MFT、系统配置单元、事件日志、Prefetch、Amcache与Shimcache）。",
          dataOutput: "涵盖近期程序执行、外接USB设备记录、用户登录时间及文件篡改行为的结构化CSV报表。",
          authorizedScope: "正在接受调查的案涉证据介质或在线受害终端。"
        },
        {
          stage: "03. 落地样本与恶意程序静态分析",
          description: "从内存转储或磁盘痕迹中提取可疑二进制程序与DLL模块，进行PE头部解析与反常特征排查。",
          dataOutput: "可疑API导入函数列表、文件节区熵值评分、编译器特征以及映射的MITRE ATT&CK技术编号。",
          authorizedScope: "受控且物理隔离的安全实验室环境。"
        },
        {
          stage: "04. 深入文件系统与全景时间线重构",
          description: "将磁盘镜像导入Autopsy中构建全局时间线，交叉关联用户桌面操作、浏览器浏览记录、文件下载及注册表改动。",
          dataOutput: "清晰展示初始入侵点、内网横向移动与核心数据外发全过程的完整时间线分析卷宗。",
          authorizedScope: "依照证据链规范固定封存的法医磁盘镜像文件（E01/RAW）。"
        }
      ],
      defensiveMitigation: "部署中心化终端遥测日志采集方案（如Sysmon/Wazuh），开启PowerShell脚本块详细审核，启用Credential Guard凭据防泄漏保护，并在发现异常时即刻实施网络围堵隔离。"
    },
    "web-security-assessment": {
      title: "Web应用系统与API接口安全性深度评估",
      discipline: "Web安全与渗透测试",
      summary: "结构化Web安全测试工作流：从路由目录发现到隐藏参数模糊测试、抓包流量篡改及安全漏洞深度核验。",
      description: "在明确的书面授权测试框架内，针对Web应用程序和REST/GraphQL接口展开方法论指导下的安全性评估。遵循从暴露面测绘到参数深度挖掘，再到受控身份认证测试的严谨路径。",
      methodology: "灰盒测试方法体系：系统梳理公开和已认证的所有功能端点，拦截审查双向HTTP流量交互，挖掘未公开的隐藏参数，并依托定制模板验证安全机制是否健全。",
      steps: [
        {
          stage: "01. 网站路由与隐藏资源探测",
          description: "借助高并发词典爆破探测未公开的接口路径、备份文件、开发遗留文档及内部管理后台。",
          dataOutput: "已发现的URL路径层级树、管理员后台接口及未授权即可访问的静态资源清单。",
          authorizedScope: "经明确书面授权的目标Web应用系统域名或IP。"
        },
        {
          stage: "02. 网络流量拦截与数据包动态重放",
          description: "将浏览器及自动化脚本流量导入中间拦截代理，深入解构请求头部、会话Token与API负载数据体。",
          dataOutput: "标注有敏感接口、鉴权凭据及数据流走向的完整HTTP/S交互历史日志。",
          authorizedScope: "测试合同授权范围内的目标Web应用。"
        },
        {
          stage: "03. 隐藏输入参数模糊测试",
          description: "针对敏感业务接口的查询参数与JSON报文执行模糊测试，挖掘未公开的调试参数、特权标识或注入漏洞点。",
          dataOutput: "挖掘出的未公开隐藏参数名称及其输入反射反馈特征。",
          authorizedScope: "在前序阶段梳理出的关键业务API与表单接口。"
        },
        {
          stage: "04. 自动化漏洞安全模板交叉复核",
          description: "针对已识别的资产端点，加载针对Web高危漏洞（XSS、SQLi、SSRF、CORS错误配置等）的Nuclei模板展开测试。",
          dataOutput: "附带复现步骤与完整HTTP PoC证明数据的已验证漏洞报告。",
          authorizedScope: "测试合同授权范围内的目标Web应用。"
        }
      ],
      defensiveMitigation: "实施数据库参数化查询彻底杜绝SQL注入，制定严格的Content Security Policy（CSP）防护策略，在CI/CD流水线中植入开源组件依赖安全扫描，并规范CORS跨域策略。"
    },
    "active-directory-auditing": {
      title: "Active Directory域架构与特权身份合规审计",
      discipline: "Active Directory安全",
      summary: "企业域环境安全审计规范：涵盖从图论特权拓扑分析到凭据存储卫生检查以及横向移动缓解防范。",
      description: "专为企业内部安全审计设计。深入排查本地Active Directory域以及混合云Entra ID中潜藏的意外委托路径、过宽的访问控制列表（ACL）、废弃特权账号以及不安全的弱加密认证协议。",
      methodology: "以身份为核心的防御思想：构建完整的域信任与权限拓扑图谱，发现通往域管权限的最短攻击跳板，并在完全不干扰破坏域环境正常运行的前提下评估凭据安全态势。",
      steps: [
        {
          stage: "01. 权限拓扑图谱构建",
          description: "采集域内活动会话、ACL访问控制项及安全组成员拓扑，并在Neo4j中生成通向Tier 0特权资产的交互式攻击路径图。",
          dataOutput: "直观展示通往Domain Admins域管及核心敏感特权组最短跃迁路径的可视化拓扑图谱。",
          authorizedScope: "获正式授权的企业内部域网络环境。"
        },
        {
          stage: "02. 认证协议与服务账号凭据审计",
          description: "系统审计Kerberos委派配置，排查注册了弱SPN且容易遭受Kerberoasting攻击的服务账号，核查加密套件合规性。",
          dataOutput: "配置了非受限委派的主机清单、易受Kerberoasting攻击的账号以及过时弱加密算法汇总。",
          authorizedScope: "经授权的企业生产或测试域环境。"
        },
        {
          stage: "03. 内存驻留凭据暴露面排查",
          description: "在受控测试工作站上验证LSASS进程保护、Credential Guard及受限管理员模式（Restricted Admin）是否能有效阻断密码抓取。",
          dataOutput: "关于终端身份凭据防护机制抵御LSASS内存提取能力的实测评估报告。",
          authorizedScope: "严格限定在预先指定的专用测试工作站上。"
        },
        {
          stage: "04. 口令策略合规性与离线强度校验",
          description: "在离线环境中对安全导出的域密码哈希开展强度碰撞校验，识别企业内部广泛存在的弱口令、通用口令及泄露口令。",
          dataOutput: "在不暴露明文密码的前提下，生成关于密码策略合规率、弱密码占比及规律性弱口令分布的统计审计报告。",
          authorizedScope: "经过专门审批的域哈希离线合规性安全审计。"
        }
      ],
      defensiveMitigation: "坚决推行特权分层管理模型（Tier 0/1/2），彻底消除非受限Kerberos委派配置，将特权管理账号强制纳入Protected Users安全组，并全员普及部署Windows Defender Credential Guard。"
    }
  },

  "ru": {
    "domain-intelligence": {
      title: "Разведка доменной инфраструктуры и картирование поверхности атаки",
      discipline: "Разведка и OSINT",
      summary: "Последовательный пайплайн картирования доменов (от пассивного к активному) для инвентаризации периметра без риска преждевременного контакта.",
      description: "Этот сценарий описывает, как аналитики начинают исследование с авторизованного основного домена и систематически выявляют связанную инфраструктуру через прозрачность сертификатов, поисковые агрегаторы и корреляцию DNS.",
      methodology: "Поэтапная разведка: начинайте со строго пассивных источников OSINT для исключения срабатывания систем обнаружения, затем сопоставляйте данные на графах и верифицируйте открытую телеметрию без инвазивных сканирований.",
      steps: [
        {
          stage: "01. Пассивный сбор данных через поисковые системы",
          description: "Агрегация проиндексированных открытых записей, результатов поисковых систем, контактов сотрудников и записей виртуальных хостов.",
          dataOutput: "Упоминания домена, шаблоны корпоративных email-адресов и первичные ссылки на сторонних провайдеров.",
          authorizedScope: "Строго пассивно. Никаких пакетов в сторону целевой инфраструктуры."
        },
        {
          stage: "02. Высокоскоростной сбор поддоменов",
          description: "Запросы к пассивным DNS-провайдерам, логам прозрачности сертификатов (CT) и базам Threat Intel для обнаружения поддоменов.",
          dataOutput: "Список действительных полных доменных имен (FQDN).",
          authorizedScope: "Пассивные запросы к общедоступным базам логов."
        },
        {
          stage: "03. Графовое картирование сети",
          description: "Сопоставление поддоменов с номерами ASN, диапазонами IP-адресов, обратными записями DNS и регистрационными данными.",
          dataOutput: "Структурированный инфраструктурный граф, связывающий поддомены с автономными системами и блоками адресов.",
          authorizedScope: "Пассивные запросы и авторизованный DNS-резолвинг."
        },
        {
          stage: "04. Рекурсивное обнаружение активов",
          description: "Рекурсивное картирование облачных хранилищ, открытых редиректов, виртуальных хостов и периметра в границах зоны тестирования.",
          dataOutput: "Полная карта инфраструктуры, включая облачные сервисы, веб-ресурсы и порты.",
          authorizedScope: "Исключительно в границах подтвержденного скоупа."
        },
        {
          stage: "05. Проверка истории телеметрии и экспозиции",
          description: "Сверка IP-адресов и хостов с глобальной базой датчиков Shodan для анализа истории баннеров и известных уязвимостей CVE.",
          dataOutput: "Профили открытых портов, исторические баннеры сервисов, отпечатки сертификатов SSL и сетевые протоколы.",
          authorizedScope: "Запросы к предварительно проиндексированной базе Shodan."
        }
      ],
      defensiveMitigation: "Службам безопасности рекомендуется отслеживать логи прозрачности сертификатов в реальном времени, устранять бесхозные CNAME-записи в DNS и поддерживать непрерывный EASM-мониторинг."
    },
    "network-discovery": {
      title: "Инвентаризация сетевого периметра и аудит сервисов",
      discipline: "Сетевая безопасность и оценка уязвимостей",
      summary: "Высокоэффективный аудит сети: от быстрого асинхронного сканирования портов до глубокого анализа скриптами NSE и шаблонами.",
      description: "Предназначен для лабораторных стендов и анализа защищенности внешнего периметра предприятия. Сочетает скоростной перебор портов с точной идентификацией версий и проверкой известных уязвимостей.",
      methodology: "Двухэтапное сканирование: скоростные SYN-сканирования выявляют открытые порты на больших диапазонах CIDR, после чего запускается детальная инспекция версий и точечные проверки CVE.",
      steps: [
        {
          stage: "01. Периметральное сканирование портов",
          description: "Начальное быстрое асинхронное сканирование всех 65 535 портов TCP для выявления доступных хостов в авторизованных подсетях.",
          dataOutput: "Список пар IP:порт, отвечающих на запросы в целевом диапазоне.",
          authorizedScope: "Авторизованная тестовая сеть или внутренний пул IP-адресов."
        },
        {
          stage: "02. Определение версий сервисов и стека ОС",
          description: "Точные TCP-соединения, согласование протоколов, сбор баннеров и запуск стандартных скриптов Nmap (NSE) на открытых портах.",
          dataOutput: "Детальные версии сервисов, отпечатки стека TCP/IP операционных систем и параметры сетевых протоколов.",
          authorizedScope: "Узлы, подтвержденные как открытые на Этапе 01."
        },
        {
          stage: "03. Точечный аудит шаблонами уязвимостей",
          description: "Запуск целевых шаблонов Nuclei и скриптов Nmap vuln под обнаруженные версии программного обеспечения для проверки актуальности патчей.",
          dataOutput: "Верифицированные отчеты об уязвимостях с уровнем риска и номерами CVE.",
          authorizedScope: "Исключительно выявленные сервисы и открытые порты."
        }
      ],
      defensiveMitigation: "Настройте строгую фильтрацию трафика на межсетевых экранах, закройте неиспользуемые порты, внедряйте модель нулевого доверия (ZTNA) и проводите регулярный аудит доступности служб."
    },
    "digital-forensics": {
      title: "Комплексная цифровая криминалистика и реагирование на инциденты (DFIR)",
      discipline: "Цифровая криминалистика и реагирование",
      summary: "Сквозной процесс расследования инцидента: от снятия дампа оперативной памяти до парсинга дисковых артефактов и реконструкции таймлайна.",
      description: "Стандартизированная процедура криминалистического анализа скомпрометированных узлов. Объединяет оперативный сбор артефактов в живой системе с глубоким исследованием памяти и таймлайна файловой системы.",
      methodology: "Порядок энергозависимости: фиксируйте оперативную память до выключения или изоляции хоста. Соберите ключевые артефакты триажа до снятия полного посекторного образа диска. Анализируйте улики изолированно.",
      steps: [
        {
          stage: "01. Снятие оперативной памяти и триаж процессов",
          description: "Фиксация дампа RAM и исследование активных процессов (pslist/pstree), сетевых сокетов (netscan) и областей инъекций кода (malfind).",
          dataOutput: "Идентификаторы вредоносных PID, смещения инъекций в памяти, сетевые подключения C2 и скрытые процессы руткитов.",
          authorizedScope: "Скомпрометированный узел в рамках расследуемого инцидента."
        },
        {
          stage: "02. Быстрый сбор криминалистических артефактов",
          description: "Целевой сбор ключевых артефактов Windows (MFT, ветки реестра, журналы событий, Prefetch, Amcache, Shimcache) с помощью KAPE.",
          dataOutput: "Сводные CSV-отчеты о недавних запусках, подключенных USB-устройствах, входах пользователей и измененных файлах.",
          authorizedScope: "Криминалистический образ или исследуемый узел."
        },
        {
          stage: "03. Статический анализ подозрительных бинарных файлов",
          description: "Извлечение обнаруженных в памяти подозрительных исполняемых файлов и библиотек DLL для статического анализа структуры PE и поиска аномалий.",
          dataOutput: "Подозрительные вызовы API, энтропия секций, сигнатуры компиляторов и привязка к матрице MITRE ATT&CK.",
          authorizedScope: "Изолированная криминалистическая лаборатория."
        },
        {
          stage: "04. Детальная реконструкция таймлайна событий",
          description: "Импорт образов дисков в Autopsy для построения хронологической шкалы действий пользователя, истории браузера и правок реестра.",
          dataOutput: "Хронологический отчет об инциденте с фиксацией точки первичного проникновения, шагов бокового смещения и утечки данных.",
          authorizedScope: "Сохраненный криминалистический образ диска (E01/RAW)."
        }
      ],
      defensiveMitigation: "Внедрите централизованный сбор телеметрии с конечных точек (Sysmon/Wazuh), включите аудит сценариев PowerShell, активируйте Windows Defender Credential Guard и настраивайте изоляцию хостов."
    },
    "web-security-assessment": {
      title: "Оценка защищенности веб-приложений и API-интерфейсов",
      discipline: "Безопасность веб-приложений и пентестинг",
      summary: "Структурированный аудит веб-систем: от исследования маршрутов и скрытых файлов до фаззинга параметров, перехвата трафика и верификации уязвимостей.",
      description: "Методологическое тестирование веб-приложений и API (REST/GraphQL) в рамках согласованного скоупа. Процесс строится от общего анализа периметра до поиска скрытых параметров и тестирования логики.",
      methodology: "Методология серого ящика (Gray-box): картируйте открытые и закрытые эндпоинты, перехватывайте HTTP-трафик, находите скрытые параметры и проверяйте средства защиты готовыми шаблонами.",
      steps: [
        {
          stage: "01. Инвентаризация путей и содержимого",
          description: "Поиск каталогов, скрытых API-эндпоинтов, файлов резервных копий и панелей управления методом параллельного подбора по словарям.",
          dataOutput: "Карта обнаруженных URL-адресов, панели администратора и незащищенные статические файлы.",
          authorizedScope: "Прямо указанное доменное имя веб-приложения."
        },
        {
          stage: "02. Перехват трафика и модификация запросов",
          description: "Направление сетевого потока через перехватывающий прокси для анализа заголовков, токенов сессий и структур данных API.",
          dataOutput: "Полный журнал транзакций HTTP/S с аннотированными эндпоинтами и авторизационными токенами.",
          authorizedScope: "Целевое веб-приложение в рамках скоупа тестирования."
        },
        {
          stage: "03. Фаззинг недокументированных параметров",
          description: "Фаззинг параметров запросов и тел JSON на критических эндпоинтах для выявления отладочных опций, скрытых флагов и точек инъекций.",
          dataOutput: "Обнаруженные имена скрытых параметров и характер отражения введенных данных.",
          authorizedScope: "Эндпоинты, выявленные на предыдущих этапах."
        },
        {
          stage: "04. Автоматизированная верификация уязвимостей",
          description: "Запуск целевых шаблонов Nuclei на веб-уязвимости (XSS, SQLi, SSRF, ошибки CORS, устаревшие библиотеки) по всей карте эндпоинтов.",
          dataOutput: "Верифицированные уязвимости с пошаговыми инструкциями по воспроизведению и логами PoC.",
          authorizedScope: "Целевое веб-приложение в рамках скоупа тестирования."
        }
      ],
      defensiveMitigation: "Используйте параметризованные SQL-запросы, настройте строгую политику Content Security Policy (CSP), проверяйте зависимости в пайплайнах CI/CD и контролируйте заголовки CORS."
    },
    "active-directory-auditing": {
      title: "Аудит инфраструктуры Active Directory и гигиены учетных записей",
      discipline: "Безопасность Active Directory",
      summary: "Комплексный аудит доменной среды: от графового анализа прав до проверки устойчивости паролей и предотвращения бокового смещения.",
      description: "Предназначен для внутреннего аудита корпоративной безопасности. Выявляет неявные цепочки делегирования, избыточные права доступа (ACL), заброшенные учетные записи и небезопасные протоколы аутентификации.",
      methodology: "Защита на основе идентификации: постройте полный граф доменных связей для выявления кратчайших путей к правам Domain Admin, после чего проверьте надежность учетных данных без внесения изменений в домен.",
      steps: [
        {
          stage: "01. Построение графа прав и связей",
          description: "Сбор сведений о сессиях, списках управления доступом (ACL) и составе групп для построения графа в Neo4j с путями атак к активам Tier 0.",
          dataOutput: "Наглядный граф кратчайших путей эскалации привилегий к группе Domain Admins и критическим объектам.",
          authorizedScope: "Авторизованная корпоративная доменная сеть."
        },
        {
          stage: "02. Проверка протоколов и гигиены аутентификации",
          description: "Аудит настроек делегирования Kerberos, поиск сервисных учетных записей со слабыми SPN, подверженных атакам Kerberoasting, и проверка шифрования.",
          dataOutput: "Реестр хостов с неограниченным делегированием, уязвимых к Kerberoasting учетных записей и слабых шифров.",
          authorizedScope: "Авторизованный корпоративный домен."
        },
        {
          stage: "03. Аудит защищенности учетных данных в памяти",
          description: "На тестовых рабочих станциях проверьте, блокируют ли механизмы защиты LSASS, Credential Guard и режим Restricted Admin извлечение паролей из памяти.",
          dataOutput: "Отчет об эффективности механизмов предотвращения выгрузки учетных данных из памяти LSASS.",
          authorizedScope: "Исключительно выделенные тестовые рабочие станции."
        },
        {
          stage: "04. Проверка надежности паролей и политик",
          description: "Офлайн-аудит стойкости паролей по выгруженным хэшам домена для обнаружения скомпрометированных, повторяющихся или тривиальных паролей.",
          dataOutput: "Статистический отчет о соответствии парольной политике и типовых шаблонах уязвимых паролей без раскрытия открытого текста.",
          authorizedScope: "Авторизованный офлайн-аудит выгрузки доменных хэшей."
        }
      ],
      defensiveMitigation: "Внедрите многоуровневую модель администрирования (Tier 0/1/2), устраните неограниченное делегирование Kerberos, включите привилегированные учетные записи в группу Protected Users и активируйте Windows Defender Credential Guard."
    }
  },

  "hi": {
    "domain-intelligence": {
      title: "डोमेन इंटेलिजेंस और बाहरी आक्रमण सतह का मानचित्रण",
      discipline: "टोही एवं ओपन-सोर्स इंटेलिजेंस",
      summary: "लक्ष्य से समयपूर्व संपर्क किए बिना परिधि संपत्तियों की पहचान करने के लिए एक प्रगतिशील (निष्क्रिय से सक्रिय) डोमेन मैपिंग पाइपलाइन।",
      description: "यह वर्कफ़्लो बताता है कि विश्लेषक कैसे एक अधिकृत डोमेन से शुरुआत करते हैं, प्रमाणपत्र पारदर्शिता लॉग, खोज एग्रीगेटर और डीएनएस सहसंबंध के माध्यम से संबंधित बुनियादी ढांचे की व्यवस्थित खोज करते हैं।",
      methodology: "चरणबद्ध टोही रणनीति: अलर्ट ट्रिगर से बचने के लिए सख्त निष्क्रिय OSINT स्रोतों से शुरुआत करें, निष्कर्षों को ग्राफ़ में सहसंबंधित करें, और बिना आक्रामक स्कैनिंग के खुले टेलीमेट्री डेटा की पुष्टि करें।",
      steps: [
        {
          stage: "01. खोज इंजन और सार्वजनिक रिकॉर्ड्स का निष्क्रिय संग्रह",
          description: "अनुक्रमित सार्वजनिक रिकॉर्ड, खोज इंजन परिणाम, कर्मचारियों के संपर्क विवरण और सार्वजनिक वर्चुअल होस्ट रिकॉर्ड एकत्र करें।",
          dataOutput: "कच्चे डोमेन संदर्भ, कर्मचारी ईमेल प्रारूप और तीसरे पक्ष के सेवा प्रदाताओं की प्रारंभिक सूची।",
          authorizedScope: "पूरी तरह से निष्क्रिय। लक्ष्य बुनियादी ढांचे को सीधे कोई पैकेट नहीं भेजा जाता है।"
        },
        {
          stage: "02. उच्च गति से सबडोमेन की खोज",
          description: "सबडोमेन खोजने के लिए निष्क्रिय DNS प्रदाताओं, प्रमाणपत्र पारदर्शिता (CT) लॉग और सार्वजनिक खतरे की खुफिया फ़ीड से पूछताछ करें।",
          dataOutput: "वैध पूर्ण योग्य डोमेन नामों (FQDNs) की सूची।",
          authorizedScope: "सार्वजनिक लॉग प्रदाताओं के खिलाफ केवल निष्क्रिय प्रश्न।"
        },
        {
          stage: "03. ग्राफ़-आधारित नेटवर्क मैपिंग",
          description: "खोजे गए सबडोमेन को ASN आवंटन, आईपी रेंज, रिवर्स DNS पॉइंटर्स और स्वामित्व रिकॉर्ड के साथ सहसंबंधित करें।",
          dataOutput: "सबडोमेन को स्वायत्त प्रणालियों और आईपी ब्लॉकों से जोड़ने वाला संरचित नेटवर्क बुनियादी ढांचा ग्राफ़।",
          authorizedScope: "निष्क्रिय प्रश्न और अधिकृत DNS रिज़ॉल्यूशन।"
        },
        {
          stage: "04. पुनरावर्ती संपत्ति खोज",
          description: "सत्यापित लक्ष्य सीमा के भीतर क्लाउड स्टोरेज बकेट, ओपन रीडायरेक्ट और परिधि सेवाओं पर पुनरावर्ती संपत्ति मैपिंग निष्पादित करें।",
          dataOutput: "क्लाउड संसाधनों, वेब अनुप्रयोगों और नेटवर्क सेवाओं सहित व्यापक संपत्ति मानचित्र।",
          authorizedScope: "केवल सत्यापित और अधिकृत लक्ष्य सीमा।"
        },
        {
          stage: "05. ऐतिहासिक टेलीमेट्री और एक्सपोजर जांच",
          description: "ऐतिहासिक सेवा बैनर और ज्ञात CVE कमजोरियों की जांच करने के लिए Shodan के वैश्विक सेंसर इंडेक्स के साथ आईपी पते क्रॉस-रेफरेंस करें।",
          dataOutput: "खुले पोर्ट प्रोफाइल, ऐतिहासिक सेवा बैनर, एसएसएल प्रमाणपत्र फिंगरप्रिंट और खुले प्रोटोकॉल।",
          authorizedScope: "Shodan के पूर्व-अनुक्रमित टेलीमेट्री डेटाबेस से पूछताछ।"
        }
      ],
      defensiveMitigation: "सुरक्षा टीमों को रीयल-टाइम में प्रमाणपत्र पारदर्शिता लॉग की निगरानी करनी चाहिए, लावारिस CNAME पॉइंटर्स के लिए सार्वजनिक DNS ज़ोन का ऑडिट करना चाहिए, और निरंतर EASM इन्वेंट्री बनाए रखनी चाहिए।"
    },
    "network-discovery": {
      title: "नेटवर्क परिधि खोज और सेवा सुरक्षा ऑडिट",
      discipline: "नेटवर्क सुरक्षा और भेद्यता मूल्यांकन",
      summary: "अत्यधिक कुशल नेटवर्क ऑडिटिंग: तेज़ एसिंक्रोनस पोर्ट स्कैनिंग से लेकर गहन NSE स्क्रिप्ट और टेम्पलेट सत्यापन तक।",
      description: "अधिकृत प्रयोगशाला नेटवर्क और आंतरिक उद्यम परिधि समीक्षाओं के लिए डिज़ाइन किया गया। सटीक प्रोटोकॉल फ़िंगरप्रिंटिंग और टेम्पलेट-आधारित भेद्यता मूल्यांकन के साथ तेज़ पोर्ट स्कैनिंग को जोड़ता है।",
      methodology: "दो चरणों वाली स्कैनिंग: हाई-स्पीड रॉ SYN स्कैन बड़े सबनेट्स में सक्रिय पोर्ट्स की पहचान करते हैं, जिसके बाद सेवा संस्करणों और लक्षित CVE टेम्पलेट्स की विस्तृत जांच की जाती है।",
      steps: [
        {
          stage: "01. परिधि पोर्ट स्कैनिंग",
          description: "अधिकृत सबनेट्स के भीतर प्रतिक्रियाशील होस्ट एंडपॉइंट्स को अलग करने के लिए सभी 65,535 टीसीपी पोर्ट्स का तेज़ एसिंक्रोनस स्कैन करें।",
          dataOutput: "लक्षित रेंज में सक्रिय IP:port जोड़ियों की सूची।",
          authorizedScope: "स्पष्ट रूप से अधिकृत परीक्षण नेटवर्क या आंतरिक आईपी ब्लॉक।"
        },
        {
          stage: "02. सेवा संस्करण और ऑपरेटिंग सिस्टम फ़िंगरप्रिंटिंग",
          description: "खुले पोर्ट्स पर सटीक टीसीपी हैंडशेक, प्रोटोकॉल बातचीत, बैनर ग्रैब और डिफ़ॉल्ट Nmap स्क्रिप्ट (NSE) चलाएं।",
          dataOutput: "विस्तृत सेवा संस्करण, ऑपरेटिंग सिस्टम TCP/IP स्टैक फ़िंगरप्रिंट और प्रोटोकॉल पैरामीटर।",
          authorizedScope: "चरण 01 में खुले पाए गए लक्ष्य होस्ट।"
        },
        {
          stage: "03. लक्षित भेद्यता टेम्पलेट ऑडिटिंग",
          description: "पहचाने गए सॉफ़्टवेयर संस्करणों से मेल खाने वाले लक्षित Nuclei टेम्पलेट्स और Nmap vuln स्क्रिप्ट्स चलाकर पुष्टि करें कि ज्ञात कमजोरियां मौजूद हैं या नहीं।",
          dataOutput: "गंभीरता रेटिंग और CVE संदर्भों के साथ सत्यापित भेद्यता निष्कर्ष।",
          authorizedScope: "केवल पहचानी गई सेवाएं और खुले पोर्ट।"
        }
      ],
      defensiveMitigation: "फ़ायरवॉल पर सख्त इनबाउंड/आउटबाउंड फ़िल्टरिंग लागू करें, अप्रयुक्त पोर्ट्स को बंद करें, शून्य-विश्वास नेटवर्क एक्सेस (ZTNA) लागू करें, और नियमित आंतरिक पोर्ट ऑडिट चलाएं।"
    },
    "digital-forensics": {
      title: "व्यापक डिजिटल फोरेंसिक और घटना प्रतिक्रिया (DFIR)",
      discipline: "डिजिटल फोरेंसिक एवं घटना प्रतिक्रिया",
      summary: "एंड-टू-एंड घटना प्रतिक्रिया ट्राइएज: अस्थिर रैम मेमोरी निष्कर्षण से लेकर डिस्क कलाकृतियों के विश्लेषण और कालानुक्रमिक टाइमलाइन तक।",
      description: "समझौता किए गए कंप्यूटरों की जांच करने वाले फोरेंसिक विश्लेषकों के लिए मानकीकृत संचालन प्रक्रिया। त्वरित लाइव-प्रतिक्रिया कलाकृति संग्रह को गहन ऑफ़लाइन मेमोरी पार्सिंग और टाइमलाइन पुनर्निर्माण के साथ जोड़ती है।",
      methodology: "परिवर्तनशीलता का क्रम (Order of Volatility): सिस्टम को बंद करने या नेटवर्क से अलग करने से पहले अस्थिर रैम मेमोरी कैप्चर करें। पूर्ण डिस्क इमेजिंग से पहले महत्वपूर्ण ट्राइएज कलाकृतियों को निकालें। सबूतों की श्रृंखला बनाए रखने के लिए ऑफ़लाइन विश्लेषण करें।",
      steps: [
        {
          stage: "01. अस्थिर मेमोरी निष्कर्षण और प्रक्रिया ट्राइएज",
          description: "अस्थिर रैम छवि कैप्चर करें और चल रही प्रक्रियाओं (pslist/pstree), सक्रिय नेटवर्क सॉकेट्स (netscan), और इंजेक्ट की गई मेमोरी (malfind) का विश्लेषण करें।",
          dataOutput: "पहचाने गए दुर्भावनापूर्ण PID, इंजेक्टेड मेमोरी ऑफ़सेट, C2 नेटवर्क कनेक्शन और छिपी हुई रूटकिट प्रक्रियाएं।",
          authorizedScope: "घटना प्रतिक्रिया जांच के तहत समझौता किया गया होस्ट।"
        },
        {
          stage: "02. त्वरित फोरेंसिक कलाकृति पार्सिंग",
          description: "KAPE का उपयोग करके उच्च-मूल्य वाली विंडोज़ कलाकृतियों (MFT, रजिस्ट्री, इवेंट लॉग, प्रीफ़ैच, Amcache, Shimcache) का लक्षित संग्रह निष्पादित करें।",
          dataOutput: "हाल ही में चलाए गए प्रोग्रामों, यूएसबी माउंट, उपयोगकर्ता लॉगिन और संशोधित फ़ाइलों की संसाधित CSV रिपोर्ट।",
          authorizedScope: "जांच के तहत फोरेंसिक छवि या सक्रिय कंप्यूटर।"
        },
        {
          stage: "03. स्थिर मैलवेयर और बाइनरी निरीक्षण",
          description: "स्थिर हेडर विश्लेषण और विसंगति का पता लगाने के लिए मेमोरी या ट्राइएज में पहचाने गए संदिग्ध बाइनरी और डीएलएल निकालें।",
          dataOutput: "संदिग्ध एपीआई आयात, अनुभाग एन्ट्रापी स्कोर, संकलक हस्ताक्षर और MITRE ATT&CK मैपिंग।",
          authorizedScope: "पृथक फोरेंसिक प्रयोगशाला।"
        },
        {
          stage: "04. गहन फ़ाइल सिस्टम और टाइमलाइन पुनर्निर्माण",
          description: "उपयोगकर्ता गतिविधि, वेब इतिहास, फ़ाइल डाउनलोड और रजिस्ट्री परिवर्तनों को सहसंबंधित करते हुए एक कालानुक्रमिक फोरेंसिक टाइमलाइन बनाने के लिए Autopsy में डिस्क छवियों को आयात करें।",
          dataOutput: "प्रारंभिक संक्रमण बिंदु, पार्श्व आंदोलन और डेटा रिसाव को प्रदर्शित करने वाली विस्तृत कालानुक्रमिक घटना टाइमलाइन।",
          authorizedScope: "सुरक्षित संरक्षित फोरेंसिक डिस्क छवि (E01/RAW)।"
        }
      ],
      defensiveMitigation: "केंद्रीकृत एंडपॉइंट टेलीमेट्री लॉगिंग (Sysmon/Wazuh) सक्षम करें, पावरशेल स्क्रिप्ट ब्लॉक लॉगिंग सक्रिय करें, Windows Defender Credential Guard कॉन्फ़िगर करें, और संदिग्ध कंप्यूटरों को नेटवर्क स्तर पर अलग करें।"
    },
    "web-security-assessment": {
      title: "वेब एप्लिकेशन सुरक्षा और एपीआई मूल्यांकन",
      discipline: "वेब सुरक्षा और पेनेट्रेशन परीक्षण",
      summary: "संरचित वेब एप्लिकेशन मूल्यांकन: निर्देशिका खोज से लेकर पैरामीटर फ़ज़िंग, ट्रैफ़िक अवरोधन और भेद्यता सत्यापन तक।",
      description: "अधिकृत परीक्षण दायरे में वेब अनुप्रयोगों और REST/GraphQL API के लिए कार्यप्रणाली सुरक्षा परीक्षण। बाहरी सतह की खोज से लेकर छिपे हुए मापदंडों की खोज और प्रमाणित परीक्षण तक व्यवस्थित रूप से आगे बढ़ता है।",
      methodology: "ग्रे-बॉक्स कार्यप्रणाली: सभी सार्वजनिक और प्रमाणित एंडपॉइंट्स को मैप करें, HTTP ट्रैफ़िक प्रवाह को रोकें और जांचें, छिपे हुए पैरामीटर इनपुट खोजें, और कस्टम टेम्पलेट्स का उपयोग करके सुरक्षा नियंत्रणों को सत्यापित करें।",
      steps: [
        {
          stage: "01. सामग्री और रूट खोज",
          description: "उच्च गति वाले वर्डलिस्ट परीक्षण का उपयोग करके निर्देशिकाओं, अनियंत्रित एपीआई एंडपॉइंट्स, बैकअप फ़ाइलों और व्यवस्थापक पैनलों की गणना करें।",
          dataOutput: "खोजे गए यूआरएल पदानुक्रम, प्रशासनिक एंडपॉइंट और असुरक्षित स्थिर फ़ाइलें।",
          authorizedScope: "स्पष्ट रूप से अधिकृत वेब एप्लिकेशन होस्टनाम।"
        },
        {
          stage: "02. ट्रैफ़िक अवरोधन और अनुरोध संशोधन",
          description: "अनुरोध हेडर, सत्र टोकन और एपीआई पेलोड संरचनाओं का निरीक्षण करने के लिए ब्राउज़र ट्रैफ़िक को इंटरसेप्टिंग प्रॉक्सी के माध्यम से रूट करें।",
          dataOutput: "टिप्पणी किए गए एंडपॉइंट्स और प्रमाणीकरण टोकन के साथ पूर्ण HTTP/S लेनदेन लॉग।",
          authorizedScope: "परीक्षण दायरे के भीतर लक्ष्य एप्लिकेशन।"
        },
        {
          stage: "03. छिपे हुए पैरामीटर की फ़ज़िंग",
          description: "छिपे हुए व्यवस्थापकीय फ़्लैग, डीबग मोड, या इंजेक्शन बिंदुओं को खोजने के लिए संवेदनशील एंडपॉइंट्स पर क्वेरी पैरामीटर और JSON पेलोड को फ़ज़ करें।",
          dataOutput: "अप्रलेखित पैरामीटर नाम और इनपुट परावर्तन व्यवहार।",
          authorizedScope: "चरण 01/02 में पहचाने गए लक्ष्य एंडपॉइंट।"
        },
        {
          stage: "04. स्वचालित सुरक्षा टेम्पलेट सत्यापन",
          description: "सभी मैप किए गए एंडपॉइंट्स के खिलाफ वेब कमजोरियों (XSS, SQLi, SSRF, CORS त्रुटियां, पुरानी लाइब्रेरी) के लिए लक्षित Nuclei टेम्पलेट्स निष्पादित करें।",
          dataOutput: "प्रजनन चरणों और HTTP साक्ष्य लॉग के साथ सत्यापित भेद्यता निष्कर्ष।",
          authorizedScope: "परीक्षण दायरे के भीतर लक्ष्य एप्लिकेशन।"
        }
      ],
      defensiveMitigation: "पैरामीटरयुक्त डेटाबेस प्रश्नों को लागू करें, सख्त Content Security Policy (CSP) लागू करें, CI/CD पाइपलाइनों में स्वचालित निर्भरता भेद्यता स्कैनिंग करें, और सुरक्षित CORS हेडर सेट करें।"
    },
    "active-directory-auditing": {
      title: "Active Directory और पहचान स्वच्छता ऑडिटिंग",
      discipline: "Active Directory सुरक्षा",
      summary: "डोमेन सुरक्षा ऑडिटिंग: विशेषाधिकार ग्राफ़ विश्लेषण से लेकर क्रेडेंशियल स्वच्छता सत्यापन और पार्श्व आंदोलन रोकथाम तक।",
      description: "उद्यम आंतरिक सुरक्षा ऑडिट के लिए डिज़ाइन किया गया। स्थानीय Active Directory और हाइब्रिड Entra ID में अनपेक्षित प्रतिनिधिमंडल पथ, अत्यधिक ACL अनुमतियां, निष्क्रिय खाते और कमजोर प्रमाणीकरण प्रोटोकॉल की पहचान करता है।",
      methodology: "पहचान-प्रथम रक्षा: डोमेन व्यवस्थापक विशेषाधिकारों के लिए गैर-स्पष्ट पथ खोजने के लिए डोमेन ट्रस्ट और अनुमतियों का पूरा ग्राफ़ मैप करें, फिर डोमेन स्थिति को संशोधित किए बिना क्रेडेंशियल स्वच्छता की पुष्टि करें।",
      steps: [
        {
          stage: "01. अनुमति ग्राफ़ मैपिंग",
          description: "टियर 0 संपत्तियों के सभी आक्रमण पथों का इंटरैक्टिव Neo4j ग्राफ़ बनाने के लिए डोमेन सत्र, ACL और समूह सदस्यता एकत्र करें।",
          dataOutput: "डोमेन व्यवस्थापकों और महत्वपूर्ण सुरक्षा समूहों के सबसे छोटे आक्रमण पथों की पहचान करने वाला विज़ुअल ग्राफ़।",
          authorizedScope: "अधिकृत उद्यम डोमेन नेटवर्क।"
        },
        {
          stage: "02. प्रोटोकॉल और क्रेडेंशियल स्वच्छता सत्यापन",
          description: "Kerberos प्रतिनिधिमंडल सेटिंग्स का ऑडिट करें, कमजोर SPN वाले सेवा खातों की जांच करें जिन पर Kerberoasting का खतरा है, और प्रोटोकॉल सुरक्षा नीतियों का परीक्षण करें।",
          dataOutput: "अप्रतिबंधित प्रतिनिधिमंडल वाले कंप्यूटर, Kerberoasting के प्रति संवेदनशील खाते और कमजोर एन्क्रिप्शन प्रकारों की सूची।",
          authorizedScope: "अधिकृत उद्यम डोमेन।"
        },
        {
          stage: "03. मेमोरी क्रेडेंशियल एक्सपोजर ऑडिट",
          description: "नियंत्रित कार्यस्थानों में, सत्यापित करें कि क्या LSASS सुरक्षा, Credential Guard और Restricted Admin मोड क्रेडेंशियल डंपिंग को सफलतापूर्वक रोकते हैं।",
          dataOutput: "LSASS मेमोरी से पासवर्ड निष्कर्षण के खिलाफ एंडपॉइंट क्रेडेंशियल सुरक्षा की प्रभावशीलता का सत्यापन।",
          authorizedScope: "केवल निर्दिष्ट परीक्षण वर्कस्टेशन।"
        },
        {
          stage: "04. पासवर्ड मजबूती और नीति परीक्षण",
          description: "पूरे संगठन में साझा, कमजोर या लीक हुए पासवर्ड की पहचान करने के लिए निकाले गए डोमेन पासवर्ड हैश के खिलाफ ऑफ़लाइन पासवर्ड ऑडिट करें।",
          dataOutput: "सादे पाठ पासवर्ड को उजागर किए बिना पासवर्ड नीति अनुपालन और कमजोर पैटर्न पर रिपोर्ट।",
          authorizedScope: "उद्यम डोमेन हैश डंप का अधिकृत ऑफ़लाइन मूल्यांकन।"
        }
      ],
      defensiveMitigation: "एक स्तरीय प्रशासन मॉडल (टियर 0/1/2) लागू करें, अप्रतिबंधित Kerberos प्रतिनिधिमंडल को समाप्त करें, विशेषाधिकार प्राप्त खातों के लिए Protected Users समूह लागू करें, और Windows Defender Credential Guard तैनात करें।"
    }
  }
};

for (const [lang, data] of Object.entries(workflowsData)) {
  fs.writeFileSync(`./messages/workflows/${lang}.json`, JSON.stringify(data, null, 2));
  console.log(`Written messages/workflows/${lang}.json with ${Object.keys(data).length} workflows`);
}
