// Brazilian Portuguese Translations for 44 Cybersecurity Tools
module.exports = {
  // 1. OSINTGRAM
  "osintgram": {
    "tagline": "CLI modular para análise de perfis e inteligência de fontes abertas no Instagram.",
    "description": "O Osintgram fornece uma interface de shell modular para realizar análise autorizada de inteligência de fontes abertas (OSINT) em perfis-alvo do Instagram, coletando seguidores, metadados, localizações e métricas de engajamento por meio de interações legítimas de API.",
    "capabilities": [
      "Extração de biografia, ID e metadados básicos de perfis-alvo",
      "Análise de redes de seguidores/seguidos e conexões compartilhadas",
      "Coleta de legendas de fotos, registros de data/hora e usuários marcados",
      "Análise de localizações geográficas marcadas em postagens publicadas"
    ],
    "useCases": [
      "OSINT investigativa para detecção de fraudes virtuais e verificação de identidade",
      "Auditoria de pegada digital para proteção executiva e de VIPs",
      "Pesquisa acadêmica autorizada em grafos de redes sociais"
    ],
    "requirements": ["Python 3.8+", "pip", "Credenciais de sessão do Instagram"],
    "installationNotes": "Requer a configuração de credenciais válidas em config/credentials.ini antes de iniciar o shell interativo.",
    "quickStartNote": "Inicia um shell de comandos interativo com subcomandos integrados como 'info', 'photodes', 'captions'.",
    "commands": [
      {
        "title": "Iniciar sessão interativa",
        "description": "Inicializa a sessão autenticada e aguarda os subcomandos interativos."
      },
      {
        "title": "Exportar lista de seguidores",
        "description": "Coleta e armazena os seguidores no diretório de saída."
      }
    ]
  },

  // 2. OSINTSEARCH
  "osintsearch": {
    "tagline": "Agregador de busca federada multimotores para registros públicos e OSINT.",
    "description": "O OSINTSearch agrega buscas em dados públicos sobre registros de domínio, índices de nomes de usuário, vazamentos de e-mail e registros corporativos em uma interface unificada de pesquisa.",
    "capabilities": [
      "Consultas consolidadas em bancos de dados e registros públicos",
      "Cruzamento de Whois de domínio, histórico de registros DNS e ASN",
      "Verificação de disponibilidade e existência de perfis e nomes de usuário"
    ],
    "useCases": [
      "Investigação preliminar de antecedentes e triagem de reconhecimento",
      "Verificação de afiliações corporativas e registros de entidades públicas"
    ],
    "requirements": ["Navegador web moderno"]
  },

  // 3. REVEALER
  "revealer": {
    "tagline": "Serviço de correlação de identidades e descoberta de pegada digital online.",
    "description": "O Revealer permite que investigadores rastreiem identidades digitais, números de telefone e pseudônimos em fontes de dados indexadas publicamente, apoiando a atribuição de cibercrimes e a detecção de fraudes.",
    "capabilities": [
      "Resolução de operadora e tipo de linha telefônica",
      "Correlação de registros públicos com atributos de identidade",
      "Descoberta de identificadores de perfil entre diferentes plataformas"
    ],
    "useCases": [
      "Descoberta de números de telefone e identidades virtuais em investigações autorizadas",
      "Auditoria de exposição pessoal e pegada digital pública"
    ],
    "requirements": ["Navegador web moderno"]
  },

  // 4. TOOKIE-OSINT
  "tookie-osint": {
    "tagline": "Framework automatizado de OSINT para busca de nomes de usuário e pegada digital.",
    "description": "O tookie-osint automatiza a enumeração de pseudônimos e perfis em centenas de plataformas e serviços web, identificando contas associadas e correlacionando pegadas digitais abertas.",
    "capabilities": [
      "Enumeração concorrente de pseudônimos em dezenas de redes sociais",
      "Validação de resposta HTTP e detecção de falsos positivos",
      "Exportação de relatórios estruturados para casos investigativos"
    ],
    "useCases": [
      "Reconhecimento de identidade de fontes abertas em avaliações autorizadas",
      "Auditoria de superfície de ataque pessoal e contas esquecidas"
    ],
    "requirements": ["Python 3.8+", "pip", "Git"],
    "installationNotes": "Execute dentro de um ambiente virtual Python para evitar conflitos de dependências.",
    "quickStartNote": "Executa a enumeração no nome de usuário especificado em todos os serviços mapeados.",
    "commands": [
      {
        "title": "Verificar nome de usuário em plataformas",
        "description": "Verifica a existência do perfil de destino em sites e fóruns indexados."
      }
    ]
  },

  // 5. SMARTIMAGE
  "smartimage": {
    "tagline": "Utilitário forense de busca reversa e verificação visual de imagens.",
    "description": "O SmartImage automatiza consultas simultâneas de busca reversa em múltiplos motores de busca visual (Google, Yandex, Bing, TinEye), facilitando a identificação da origem de fotografias e detecção de manipulação de mídia.",
    "capabilities": [
      "Busca reversa simultânea em múltiplos serviços de inteligência visual",
      "Extração preliminar de metadados e comparação de hashes perceptuais",
      "Apoio a checagem de fatos e análise de autenticidade de imagens"
    ],
    "useCases": [
      "Verificação de autenticidade de fotos em investigações OSINT",
      "Identificação de reutilização de imagens de perfil em fraudes de identidade"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "installationNotes": "Pode requerer chaves de API opcionais para motores de busca específicos para evitar limites de taxa.",
    "quickStartNote": "Carrega a imagem de destino e consulta os motores de pesquisa reversa suportados.",
    "commands": [
      {
        "title": "Executar busca reversa de imagem",
        "description": "Inicia a pesquisa em lote nos serviços de imagem indexados."
      }
    ]
  },

  // 6. BBOT
  "bbot": {
    "tagline": "Scanner recursivo de superfície de ataque e inteligência modular para OSINT.",
    "description": "O BBOT (Bighuge BLT OSINT Tool) é um framework recursivo de reconhecimento e mapeamento de superfície de ataque. Desenvolvido para equipes de segurança ofensiva e defensiva, ele correlaciona subdomínios, certificados, portas abertas, servidores web e recursos em nuvem.",
    "capabilities": [
      "Descoberta recursiva orientada a eventos para mapeamento perimetral",
      "Módulos para DNS, portas, certificados SSL, baldes S3 e redirecionamentos abertos",
      "Exportação para formatos legíveis por máquina e visualização gráfica Neo4j",
      "Mecanismo de controle estrito de escopo para evitar testes não autorizados"
    ],
    "useCases": [
      "Gerenciamento contínuo de superfície de ataque externo (EASM)",
      "Reconhecimento preparatório em exercícios autorizados de Red Team",
      "Inventário de ativos perimetrais expostos à internet pública"
    ],
    "requirements": ["Python 3.9+", "pipx ou pip", "Ambiente Linux/macOS"],
    "installationNotes": "Recomenda-se a instalação via pipx para isolamento de dependências de sistema.",
    "quickStartNote": "Executa varredura com módulos passivos e de subdomínios no domínio especificado.",
    "commands": [
      {
        "title": "Varredura básica de subdomínios",
        "description": "Coleta subdomínios passivamente usando fontes públicas e logs de certificados."
      },
      {
        "title": "Mapeamento completo com resolução DNS",
        "description": "Executa varredura profunda com verificação de servidores web e registros DNS."
      }
    ]
  },

  // 7. GEOAXIS
  "geoaxis": {
    "tagline": "Plataforma de inteligência geoespacial e análise de terreno para OSINT.",
    "description": "O GeoAxis integra camadas geoespaciais, imagens de satélite, dados de elevação e fontes de dados abertos para investigações baseadas em localização física e inteligência geográfica (GEOINT).",
    "capabilities": [
      "Sobreposição de camadas cartográficas e dados de satélite de alta resolução",
      "Análise de visibilidade e modelo digital de elevação (DEM)",
      "Correlação de eventos com coordenadas geográficas e metadados de mídia"
    ],
    "useCases": [
      "Geolocalização de imagens e vídeos em investigações de fontes abertas",
      "Análise situacional de infraestruturas físicas críticas"
    ],
    "requirements": ["Navegador web moderno com suporte a WebGL"]
  },

  // 8. GODS-EYE-VIEW
  "gods-eye-view": {
    "tagline": "Visualizador 3D de inteligência global e rastreamento de satélites em tempo real.",
    "description": "O God's Eye View fornece uma representação gráfica tridimensional do globo terrestre, rastreando satélites em órbita, posições de aeronaves (ADS-B) e dados de tráfego marítimo em tempo real para consciência situacional.",
    "capabilities": [
      "Renderização 3D de órbitas de satélites e cálculos de passagem sobre áreas-alvo",
      "Integração com telemetria aberta de rastreamento aéreo e marítimo",
      "Visualização de condições de iluminação solar e cobertura sensorial"
    ],
    "useCases": [
      "Planejamento de janelas de observação por satélite em exercícios de campo",
      "Consciência situacional de transporte e infraestrutura logística global"
    ],
    "requirements": ["Navegador web moderno", "GPU com aceleração WebGL"],
    "quickStartNote": "Carrega o globo 3D interativo na porta padrão local."
  },

  // 9. TRAFFICVISION-LIVE
  "trafficvision-live": {
    "tagline": "Monitoramento de fluxos de vídeo de tráfego público e câmeras municipais abertas.",
    "description": "O Trafficvision.live indexa e transmite feeds públicos de câmeras de monitoramento urbano e rodoviário disponibilizados por órgãos governamentais de trânsito, auxiliando em investigações de rotas e verificação de condições locais.",
    "capabilities": [
      "Acesso organizado a transmissões públicas de câmeras de tráfego municipais",
      "Filtragem por jurisdição, rodovia e coordenadas geográficas",
      "Verificação de condições meteorológicas e fluidez de vias públicas"
    ],
    "useCases": [
      "Verificação visual independente de condições físicas em áreas públicas",
      "Apoio a investigações de mobilidade e logística autorizadas"
    ],
    "requirements": ["Navegador web com suporte a streaming de vídeo"]
  },

  // 10. HORUS
  "horus": {
    "tagline": "Ferramenta de monitoramento e análise de feeds de notícias e inteligência de fontes abertas.",
    "description": "O Horus agrega feeds RSS, canais de alertas públicos e notícias geopolíticas em um painel centralizado para analistas de inteligência de ameaças e segurança corporativa.",
    "capabilities": [
      "Agregação de notícias globais com filtragem por palavras-chave de segurança",
      "Monitoramento contínuo de crises e alertas de interrupção de serviços"
    ],
    "useCases": [
      "Monitoramento de inteligência de ameaças em tempo real (Threat Intel)",
      "Triagem de eventos de crise e impacto para infraestruturas de negócios"
    ],
    "requirements": ["Node.js ou Python (dependendo da versão)", "Acesso à internet"]
  },

  // 11. TORBOT
  "torbot": {
    "tagline": "Rastreador assíncrono de inteligência e busca de links na rede Tor (.onion).",
    "description": "O TorBot é um crawler assíncrono projetado para coletar e categorizar dados em serviços ocultos (.onion) da rede Tor, extraindo títulos de páginas, metadados e endereços de e-mail sem expor o endereço IP do investigador.",
    "capabilities": [
      "Rastreamento assíncrono e recursivo de páginas ocultas .onion via SOCKS5",
      "Extração de títulos de páginas, metadados e links relacionados",
      "Identificação de chaves PGP e endereços de carteiras de criptomoedas",
      "Geração de árvores de visualização de links e nós investigados"
    ],
    "useCases": [
      "Pesquisa autorizada de inteligência de ameaças na Dark Web",
      "Monitoramento de menções a vazamentos corporativos e credenciais expostas"
    ],
    "requirements": ["Python 3.8+", "Serviço Tor ativo (porta SOCKS 9050 ou 9150)"],
    "installationNotes": "O serviço Tor deve estar em execução no sistema para rotear o tráfego via SOCKS5.",
    "quickStartNote": "Inicia o rastreador no domínio .onion especificado via proxy Tor local.",
    "commands": [
      {
        "title": "Rastrear serviço oculto .onion",
        "description": "Executa o crawler coletando links e metadados a partir da página inicial indicada."
      }
    ]
  },

  // 12. MAILACCESS
  "mailaccess": {
    "tagline": "Verificador de configuração de registros SPF, DKIM e DMARC para segurança de e-mail.",
    "description": "O MailAccess avalia as configurações de segurança de transporte e autenticação de domínios de e-mail, verificando registros SPF, chaves DKIM e políticas DMARC para prevenir ataques de falsificação (spoofing) e phishing.",
    "capabilities": [
      "Auditoria automática de conformidade das políticas DMARC e registros SPF",
      "Detecção de configurações permissivas sujeitas a ataques de spoofing"
    ],
    "useCases": [
      "Auditoria de higiene de segurança de e-mail institucional",
      "Verificação defensiva prévia à implementação de políticas DMARC estritas"
    ],
    "requirements": ["Python 3+", "Conectividade de rede DNS"]
  },

  // 13. NEKO
  "neko": {
    "tagline": "Navegador web virtual isolado em container Docker com WebRTC para streaming.",
    "description": "O Neko executa um ambiente de navegador (Chromium/Firefox) totalmente isolado dentro de um container Docker, transmitindo a interface de navegação via WebRTC para o navegador do analista, permitindo inspeção segura de sites suspeitos sem risco para a máquina hospedeira.",
    "capabilities": [
      "Navegação com isolamento total em sandbox para análise de URLs maliciosas",
      "Transmissão de baixa latência baseada em WebRTC diretamente no navegador",
      "Controle de acesso multiusuário com suporte a sessões compartilhadas",
      "Destruição imediata da sessão sem persistência de artefatos maliciosos"
    ],
    "useCases": [
      "Inspeção segura de links suspeitos de phishing e páginas desconhecidas",
      "Navegação OSINT anônima isolada do ambiente de trabalho do pesquisador"
    ],
    "requirements": ["Docker", "Docker Compose"],
    "installationNotes": "Requer Docker Engine e portas configuradas para tráfego UDP WebRTC.",
    "quickStartNote": "Sobe a instância isolada do navegador na porta 8080 local."
  },

  // 14. SESSION
  "session": {
    "tagline": "Mensageiro descentralizado com roteamento onion sem coleta de metadados.",
    "description": "O Session é um aplicativo de mensagens privadas descentralizado e criptografado de ponta a ponta. Ele utiliza uma rede de nós roteados por nós onion (Oxen Service Node Network) sem exigir números de telefone ou e-mails, eliminando a retenção de metadados.",
    "capabilities": [
      "Criptografia de ponta a ponta com esquema de chave pública sem associação a telefone",
      "Roteamento de mensagens por múltiplos nós em cebola (onion routing)",
      "Comunicação descentralizada sem ponto único de falha ou controle central",
      "Grupos criptografados e destruição programada de mensagens"
    ],
    "useCases": [
      "Comunicação operacional segura em operações sensíveis de resposta a incidentes",
      "Canal de contato seguro para denúncias de vulnerabilidades e jornalismo investigativo"
    ],
    "requirements": ["Linux, macOS, Windows, Android ou iOS"]
  },

  // 15. HASHCAT
  "hashcat": {
    "tagline": "O utilitário de recuperação de senhas e quebra de hashes mais rápido do mundo.",
    "description": "O Hashcat é o utilitário líder mundial para recuperação e auditoria de credenciais com aceleração por GPU. Projetado para pesquisadores de segurança, testadores de penetração e peritos forenses, ele suporta centenas de tipos de hashes (NTLM, Kerberos, bcrypt, SHA-512, arquivos compactados e discos criptografados).",
    "capabilities": [
      "Motor altamente otimizado para GPUs (OpenCL, CUDA, Metal)",
      "Suporte a mais de 300 algoritmos de hash e formatos de cifra",
      "Múltiplos modos de ataque: dicionário, combinador, máscaras e regras baseadas em padrões",
      "Recuperação de sessão, checkpoints automáticos e benchmarking integrado"
    ],
    "useCases": [
      "Auditoria de robustez das senhas em ambientes corporativos e Active Directory",
      "Recuperação forense de dados em volumes e arquivos protegidos por senha em investigações judiciais"
    ],
    "requirements": ["Drivers de GPU compatíveis (NVIDIA CUDA / AMD ROCm / Apple Metal)", "OpenCL"],
    "installationNotes": "Certifique-se de que os drivers de GPU proprietários estejam instalados para habilitar a aceleração de hardware.",
    "quickStartNote": "Executa o benchmark integrado de velocidade em todos os tipos de hashes suportados.",
    "commands": [
      {
        "title": "Ataque de dicionário em hashes NTLM",
        "description": "Audita hashes NTLM de computadores Windows usando uma lista de palavras (wordlist)."
      },
      {
        "title": "Ataque por máscara em senhas de 8 caracteres",
        "description": "Gera exaustivamente combinações alfanuméricas com tamanho fixo."
      },
      {
        "title": "Benchmark de desempenho de GPU",
        "description": "Testa a taxa de hashes por segundo para cada algoritmo no hardware local."
      }
    ],
    "outputExplained": "Formato de saída: Hash recuperado seguido da senha decodificada. Códigos de status indicam progresso, taxa de hashes por segundo (H/s) e temperatura da GPU.",
    "troubleshooting": [
      {
        "issue": "Nenhum dispositivo OpenCL/CUDA detectado",
        "resolution": "Instale os drivers proprietários da GPU ou utilize o sinalizador -D 1 para forçar a execução na CPU."
      }
    ]
  },

  // 16. IMPACKET
  "impacket": {
    "tagline": "Coleção de classes Python para trabalhar programaticamente com protocolos de rede.",
    "description": "O Impacket é uma biblioteca Python essencial para engenharia de protocolos de rede e testes autorizados em redes Windows. Ele fornece controle refinado e implementações de baixo nível para SMB, MSRPC, Kerberos, WMI e NTLM.",
    "capabilities": [
      "Implementações de protocolos de rede de baixo nível (SMB1/2/3, MSRPC, NTLM, Kerberos)",
      "Scripts de auditoria de autenticação e delegação de credenciais em Active Directory",
      "Execução de comandos autorizados via WMI (wmiexec) e SMB (smbexec)",
      "Extração segura de segredos de domínio NTDS.dit via protocolo DRSUAPI (secretsdump)"
    ],
    "useCases": [
      "Testes de segurança e auditoria de configurações fracas de autenticação NTLM/Kerberos",
      "Verificação de privilégios de delegação e higiene de contas em ambientes Active Directory"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "quickStartNote": "Executa o script de auditoria de segredos de domínio via protocolo DRSUAPI.",
    "commands": [
      {
        "title": "Auditoria de segredos de domínio (SecretsDump)",
        "description": "Extrai hashes NTLM e chaves Kerberos de um controlador de domínio com credenciais de administrador."
      },
      {
        "title": "Execução remota autorizada via WMI",
        "description": "Executa comandos no host remoto sem depender de uploads de binários para o disco."
      }
    ]
  },

  // 17. NMAP
  "nmap": {
    "tagline": "Network Mapper — a ferramenta definitiva de exploração e auditoria de redes.",
    "description": "O Nmap é um scanner de rede indispensável, projetado para inventariar redes de computadores, detectar serviços ativos e versões de daemons, identificar sistemas operacionais hospedeiros por meio de impressões digitais da pilha TCP/IP e detectar vulnerabilidades com o motor Nmap Scripting Engine (NSE).",
    "capabilities": [
      "Varreduras furtivas SYN (-sS), conexões TCP (-sT), varreduras UDP (-sU) e SCTP",
      "Detecção de sistema operacional remoto por análise de pilha TCP/IP",
      "Identificação precisa de versão de aplicativos (-sV) em milhares de assinaturas de serviço",
      "Mais de 600 scripts automatizados em Lua pelo Nmap Scripting Engine (NSE)"
    ],
    "useCases": [
      "Inventário de ativos corporativos e auditoria de linha de base do perímetro de portas",
      "Validação de políticas de filtragem de entrada e saída em firewalls",
      "Identificação de versões de software sem correção de segurança durante auditorias de conformidade"
    ],
    "requirements": ["Privilégios de socket bruto (root/Administrador para varreduras SYN)"],
    "installationNotes": "Requer privilégios de superusuário para criação de pacotes RAW em varreduras furtivas SYN.",
    "quickStartNote": "Executa detecção de versões e scripts padrão na máquina local (localhost).",
    "commands": [
      {
        "title": "Varredura padrão de serviços e scripts",
        "description": "Verifica as 1000 portas TCP mais comuns com scripts seguros padrão e detecção de versões."
      },
      {
        "title": "Varredura rápida SYN em todas as portas",
        "description": "Inspeciona velozmente todas as 65.535 portas TCP em um host autorizado."
      },
      {
        "title": "Auditoria de scripts de vulnerabilidade",
        "description": "Avalia os serviços HTTP do alvo contra scripts de detecção de vulnerabilidades conhecidas (CVEs)."
      }
    ],
    "outputExplained": "PORT STATE SERVICE VERSION: Indica o número da porta e transporte, estado (open, closed, filtered), nome do serviço e versão. 'Filtered' indica descarte de pacotes por firewall.",
    "troubleshooting": [
      {
        "issue": "Permissão negada ao executar varredura SYN (-sS)",
        "resolution": "Execute o comando com privilégios de administrador (sudo no Linux/macOS) ou utilize a varredura TCP Connect (-sT)."
      }
    ]
  },

  // 18. SHODAN
  "shodan": {
    "tagline": "Mecanismo de busca para dispositivos conectados à internet e inteligência perimetral.",
    "description": "O Shodan é um motor de busca global que varre a internet 24 horas por dia, indexando servidores, roteadores, câmeras, sistemas de controle industrial (ICS/SCADA) e serviços IoT por meio de seus banners de resposta de serviço.",
    "capabilities": [
      "Consultas em telemetria global pré-indexada sem envio de pacotes ativos ao alvo",
      "Filtragem avançada por porta, organização, país, certificado SSL e produto",
      "Monitoramento perimetral automatizado de faixas de IP corporativas",
      "Interface de linha de comando oficial (CLI) e APIs REST completas"
    ],
    "useCases": [
      "Mapeamento passivo de exposição de ativos e portas abertas de uma organização",
      "Pesquisa global de segurança sobre a proliferação de protocolos e vulnerabilidades"
    ],
    "requirements": ["Python 3+", "Chave de API do Shodan"],
    "installationNotes": "Requer uma chave de API obtida em sua conta Shodan para inicialização da CLI.",
    "quickStartNote": "Inicializa a CLI do Shodan com a sua chave de API pessoal.",
    "commands": [
      {
        "title": "Consultar dados de um endereço IP",
        "description": "Exibe as portas abertas, vulnerabilidades conhecidas e certificados SSL indexados para o IP."
      },
      {
        "title": "Buscar serviços expostos por organização",
        "description": "Localiza servidores registrados em nome de uma organização específica."
      }
    ]
  },

  // 19. THEHARVESTER
  "theharvester": {
    "tagline": "Ferramenta de coleta de e-mails, subdomínios, IPs e nomes por fontes abertas.",
    "description": "O theHarvester é uma ferramenta essencial de reconhecimento inicial desenvolvida em Python. Ela coleta e-mails, nomes de colaboradores, subdomínios, endereços IP e URLs a partir de dezenas de fontes públicas (motores de busca, PGP, Shodan, Bing, LinkedIn).",
    "capabilities": [
      "Enumeração passiva de subdomínios e endereços de e-mail institucionais",
      "Integração com dezenas de provedores de busca e inteligência pública",
      "Resolução DNS opcional e exportação para formatos XML e JSON"
    ],
    "useCases": [
      "Fase inicial de reconhecimento de ativos e enumeração de colaboradores em testes autorizados",
      "Auditoria de vazamento de dados de contato e credenciais institucionais"
    ],
    "requirements": ["Python 3.9+", "pip"],
    "quickStartNote": "Coleta e-mails e subdomínios do domínio indicado usando os motores configurados.",
    "commands": [
      {
        "title": "Coleta passiva em domínio alvo",
        "description": "Executa busca de e-mails e subdomínios nos motores de busca especificados."
      }
    ]
  },

  // 20. WAZUH
  "wazuh": {
    "tagline": "Plataforma livre e de código aberto para prevenção, detecção e resposta a ameaças (XDR & SIEM).",
    "description": "O Wazuh é uma plataforma de segurança empresarial que integra recursos de XDR (Extended Detection and Response) e SIEM. Ele monitora endpoints, analisa logs de sistema, detecta invasões, valida conformidade regulatória e responde a incidentes em tempo real.",
    "capabilities": [
      "Monitoramento de integridade de arquivos (FIM) com alerta imediato de alterações",
      "Detecção de anomalias, vulnerabilidades em pacotes e desvios de linha de base de segurança",
      "Agentes leves de telemetria compatíveis com Linux, Windows, macOS, Docker e Kubernetes",
      "Mecanismo de resposta ativa automatizada contra comportamentos maliciosos detectados",
      "Painéis de conformidade regulatória para PCI DSS, HIPAA, GDPR e CIS Benchmarks"
    ],
    "useCases": [
      "SOC centralizado para detecção de incidentes e monitoramento de eventos de segurança",
      "Auditoria contínua de conformidade e integridade de servidores críticos"
    ],
    "requirements": ["Linux (Ubuntu/Debian/RHEL) para o servidor central", "4GB+ de RAM"],
    "quickStartNote": "Executa o instalador assistido para implantar a pilha completa do Wazuh Server.",
    "commands": [
      {
        "title": "Verificar status do agente local",
        "description": "Confirma que o agente Wazuh está conectado e enviando telemetria ao servidor central."
      }
    ]
  },

  // 21. PESTUDIO
  "pestudio": {
    "tagline": "Ferramenta especializada para análise estática e triagem rápida de binários maliciosos executáveis.",
    "description": "O pestudio permite a inspeção estática aprofundada de arquivos executáveis (PE) sem a necessidade de executá-los. Ele analisa cabeçalhos, funções importadas, bibliotecas DLL, strings, recursos e flags de anomalia para classificar potenciais ameaças.",
    "capabilities": [
      "Identificação de funções importadas suspeitas e anomalias de cabeçalho PE",
      "Cálculo de entropia de seções para identificação de packers e criptografia",
      "Extração de indicadores de comprometimento (IoCs) e verificação com hashes conhecidos",
      "Mapeamento automático com técnicas do framework MITRE ATT&CK"
    ],
    "useCases": [
      "Triagem inicial de artefatos suspeitos durante análise forense e resposta a incidentes",
      "Análise preliminar de malware em ambiente de laboratório isolado"
    ],
    "requirements": ["Windows ou Wine no Linux"],
    "quickStartNote": "Inicie o pestudio e arraste o arquivo executável suspeito para análise imediata."
  },

  // 22. MALTEGO
  "maltego": {
    "tagline": "Plataforma interativa de investigação gráfica e análise de vínculos de inteligência.",
    "description": "O Maltego é uma ferramenta líder na indústria para análise de vínculos e representação gráfica de inteligência. Por meio de seu catálogo de transforms, ele correlaciona pessoas, endereços de e-mail, domínios, endereços IP, infraestruturas e perfis sociais em grafos interativos de nós e conexões.",
    "capabilities": [
      "Visualização gráfica de vínculos renderizando milhares de entidades interconectadas",
      "Hub de transforms que integra dezenas de provedores de inteligência (Shodan, VirusTotal, WhoisXML)",
      "Mapeamento de relações entre registros DNS, WHOIS, blocos de IP e carteiras cripto",
      "Geração de relatórios abrangentes para reuniões executivas e processos periciais"
    ],
    "useCases": [
      "Investigações visuais de redes de cibercrime e mapeamento de infraestrutura adversária",
      "Análise aprofundada de superfície de ataque corporativa e relacionamentos de entidades"
    ],
    "requirements": ["Java Runtime Environment (JRE 11+)"],
    "quickStartNote": "Inicia a interface gráfica do Maltego; selecione a edição comunitária ou insira sua licença."
  },

  // 23. SPIDERFOOT
  "spiderfoot": {
    "tagline": "Ferramenta automatizada de OSINT e inteligência contra ameaças perimetrais.",
    "description": "O SpiderFoot automatiza a coleta de inteligência em alvos definidos (endereços IP, domínios, números ASN, e-mails, nomes de usuário), integrando mais de 200 módulos de fontes públicas para criar um mapa de ameaças abrangente.",
    "capabilities": [
      "Mais de 200 módulos automatizados integrando provedores de Threat Intelligence",
      "Identificação de credenciais vazadas, certificados expirados e servidores mal configurados",
      "Visualização interativa baseada em navegador com representação de grafos"
    ],
    "useCases": [
      "Auditorias externas automatizadas de superfície de ataque",
      "Coleta rápida de inteligência prévia a testes de invasão"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "quickStartNote": "Inicia o servidor web local do SpiderFoot na porta 5001.",
    "commands": [
      {
        "title": "Iniciar servidor web do SpiderFoot",
        "description": "Abre o painel web local para configuração de varreduras automatizadas."
      }
    ]
  },

  // 24. RECON-NG
  "recon-ng": {
    "tagline": "Framework completo de reconhecimento e inteligência com arquitetura modular.",
    "description": "O Recon-ng é um framework de reconhecimento de fontes abertas com interface baseada em shell (semelhante ao Metasploit). Ele utiliza um banco de dados relacional interno para correlacionar empresas, contatos, hosts, vulnerabilidades e registros DNS.",
    "capabilities": [
      "Interface de comando modular com sistema de gerenciamento de chaves de API",
      "Banco de dados SQLite interno para correlação estruturada de entidades",
      "Mercado de módulos integrando serviços de inteligência líderes de mercado"
    ],
    "useCases": [
      "Reconhecimento estruturado de grandes organizações em testes autorizados",
      "Consolidação de dados de OSINT em banco de dados centralizado"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "quickStartNote": "Abre o console interativo do Recon-ng.",
    "commands": [
      {
        "title": "Iniciar console do Recon-ng",
        "description": "Carrega o console de gerenciamento de módulos e espaços de trabalho (workspaces)."
      }
    ]
  },

  // 25. AMASS
  "amass": {
    "tagline": "Mapeamento aprofundado de superfície de ataque e descoberta de ativos via grafos.",
    "description": "O OWASP Amass realiza mapeamento de redes e descoberta externa de ativos por meio de técnicas de fontes abertas e resolução ativa de nomes. Ele constrói um grafo de infraestrutura que conecta subdomínios, ASN, faixas de IP e blocos de roteamento.",
    "capabilities": [
      "Integração com dezenas de fontes passivas de DNS e feeds de inteligência de certificados",
      "Enumeração ativa por força bruta com alteração de nomes e permutações de palavras",
      "Construção de grafos de relacionamento de infraestrutura em banco de dados de grafos",
      "Resolução DNS em larga escala com validação estrita de falsos positivos"
    ],
    "useCases": [
      "Mapeamento exaustivo do perímetro de organizações complexas em testes de intrusão",
      "Descoberta de ativos esquecidos e servidores legados expostos à internet"
    ],
    "requirements": ["Go 1.20+ ou binário pré-compilado"],
    "quickStartNote": "Executa enumeração de subdomínios com fontes passivas para o domínio especificado.",
    "commands": [
      {
        "title": "Enumeração passiva de subdomínios",
        "description": "Coleta nomes de subdomínios sem enviar pacotes diretos ao servidor DNS do alvo."
      },
      {
        "title": "Rastreamento completo com mapeamento ASN",
        "description": "Correlaciona subdomínios a endereços IP e sistemas autônomos (ASN)."
      }
    ]
  },

  // 26. SUBFINDER
  "subfinder": {
    "tagline": "Ferramenta de alta velocidade para descoberta passiva de subdomínios.",
    "description": "O Subfinder é uma ferramenta de enumeração passiva de subdomínios escrita em Go, desenvolvida pela ProjectDiscovery. Focada em velocidade e conformidade, ela consulta exclusivamente fontes passivas públicas e logs de certificados sem contatar o alvo.",
    "capabilities": [
      "Descoberta passiva ultrarrápida projetada para pipelines automatizados",
      "Suporte a dezenas de fontes de inteligência públicas e privadas",
      "Formato de saída modular compatível com encadeamento de comandos Unix (pipes)"
    ],
    "useCases": [
      "Triagem inicial de subdomínios em programas de recompensa por vulnerabilidades (Bug Bounty)",
      "Coleta rápida de subdomínios em avaliações de segurança de perímetro"
    ],
    "requirements": ["Go 1.21+ ou binário pré-compilado"],
    "quickStartNote": "Enumera subdomínios passivamente e exibe a lista no terminal.",
    "commands": [
      {
        "title": "Enumeração passiva simples",
        "description": "Descobre subdomínios do domínio fornecido via consultas passivas."
      },
      {
        "title": "Saída silenciosa para encadeamento com outras ferramentas",
        "description": "Emite apenas os nomes de domínio descobertos, facilitando o envio para o Nuclei ou httpx."
      }
    ]
  },

  // 27. MASSCAN
  "masscan": {
    "tagline": "O scanner de portas mais veloz da internet — capaz de varrer toda a rede IPv4 em minutos.",
    "description": "O Masscan é um scanner assíncrono de portas TCP que transmite pacotes SYN brutos de forma independente da pilha de rede do sistema operacional. Com placas de rede e largura de banda suficientes, ele é capaz de varrer toda a internet em minutos.",
    "capabilities": [
      "Transmissão assíncrona de pacotes SYN de altíssimo rendimento",
      "Sintaxe de parâmetros compatível com o Nmap para facilidade de transição",
      "Varreduras randômicas de endereços para distribuição equilibrada de tráfego"
    ],
    "useCases": [
      "Varreduras rápidas em grandes faixas de IP corporativas (ex.: blocos /16 ou /8)",
      "Identificação veloz de portas ativas prévia a testes minuciosos com o Nmap"
    ],
    "requirements": ["libpcap-dev", "Privilégios de superusuário (root)"],
    "installationNotes": "Requer privilégios de root para gerar pacotes SYN brutos via libpcap.",
    "quickStartNote": "Varre as portas 80 e 443 na sub-rede autorizada com taxa de 1000 pacotes por segundo.",
    "commands": [
      {
        "title": "Varredura rápida em sub-rede local",
        "description": "Inspeciona portas web na faixa autorizada com controle de taxa de transmissão."
      }
    ]
  },

  // 28. GOBUSTER
  "gobuster": {
    "tagline": "Ferramenta em Go de alta velocidade para força bruta em URIs, DNS e virtuais hosts.",
    "description": "O Gobuster é uma ferramenta CLI rápida e eficiente desenvolvida em Go. Ela realiza força bruta em diretórios e arquivos em servidores web, nomes de subdomínios DNS, hosts virtuais (vhosts) e baldes de armazenamento em nuvem.",
    "capabilities": [
      "Modos de execução específicos: dir (diretórios), dns (subdomínios), vhost (hosts virtuais), s3 (baldes)",
      "Suporte a conexões concorrentes ajustáveis para máxima velocidade",
      "Filtragem avançada por códigos de status HTTP e comprimento de resposta"
    ],
    "useCases": [
      "Descoberta de arquivos confidenciais esquecidos, painéis de administração e backups",
      "Identificação de hosts virtuais não documentados em servidores corporativos"
    ],
    "requirements": ["Go 1.20+ ou binário pré-compilado"],
    "quickStartNote": "Executa enumeração de diretórios no servidor alvo usando uma lista de palavras.",
    "commands": [
      {
        "title": "Força bruta de diretórios web",
        "description": "Busca páginas e caminhos comuns no servidor web alvo."
      },
      {
        "title": "Enumeração de subdomínios via DNS",
        "description": "Resolve subdomínios potenciais consultando servidores DNS com uma lista de nomes."
      }
    ]
  },

  // 29. RUSTSCAN
  "rustscan": {
    "tagline": "Scanner moderno e ultrarrápido de portas que se integra automaticamente com o Nmap.",
    "description": "O RustScan é um scanner de portas escrito em Rust que utiliza processamento assíncrono para verificar 65.535 portas em segundos, repassando automaticamente as portas abertas encontradas diretamente para o Nmap para detecção aprofundada de serviços.",
    "capabilities": [
      "Varredura completa de 65.535 portas em velocidade extremamente alta",
      "Encaminhamento automático das portas descobertas para o motor de scripts do Nmap",
      "Estratégia adaptativa de sockets para evitar sobrecarga de conexões locais"
    ],
    "useCases": [
      "Enumeração rápida de portas em máquinas de laboratório (CTFs) e ambientes autorizados",
      "Substituição moderna para acelerar varreduras preliminares de rede"
    ],
    "requirements": ["Rust/Cargo ou imagem Docker ou binário pré-compilado"],
    "quickStartNote": "Descobre todas as portas abertas no host alvo e inicia o Nmap com detecção de serviços.",
    "commands": [
      {
        "title": "Varredura rápida com integração Nmap",
        "description": "Escaneia o host alvo e executa scripts padrão do Nmap apenas nas portas abertas identificadas."
      }
    ]
  },

  // 30. NUCLEI
  "nuclei": {
    "tagline": "Scanner de vulnerabilidades rápido e customizável baseado em modelos YAML simples.",
    "description": "O Nuclei é uma ferramenta de avaliação de vulnerabilidades orientada por modelos comunitários (templates YAML). Desenvolvido pela ProjectDiscovery, ele permite varreduras consistentes de falhas conhecidas, desvios de configuração, vulnerabilidades zero-day recém-publicadas e exposições em aplicações web.",
    "capabilities": [
      "Mais de 5.000 modelos YAML desenvolvidos pela comunidade de segurança global",
      "Protocolos suportados: TCP, DNS, HTTP, SSL, File, WHOIS e Websockets",
      "Execução em larga escala com baixíssima taxa de falsos positivos e alto paralelismo",
      "Filtragem por severidade (info, low, medium, high, critical) e tags específicas"
    ],
    "useCases": [
      "Verificação rápida de vulnerabilidades críticas recém-descobertas em todo o parque de servidores",
      "Automação de testes de segurança em pipelines de integração contínua (CI/CD)"
    ],
    "requirements": ["Go 1.21+ ou binário pré-compilado"],
    "quickStartNote": "Atualiza os templates comunitários e executa uma varredura básica no alvo.",
    "commands": [
      {
        "title": "Varredura de vulnerabilidades com templates atualizados",
        "description": "Avalia o endereço alvo contra o catálogo de templates comunitários de vulnerabilidades."
      },
      {
        "title": "Filtrar por severidades alta e crítica",
        "description": "Executa apenas testes de falhas graves para triagem imediata de riscos."
      }
    ]
  },

  // 31. CAIDO
  "caido": {
    "tagline": "Proxy de interceptação web moderno, leve e de alta performance desenvolvido em Rust.",
    "description": "O Caido é uma alternativa moderna e leve a ferramentas como o Burp Suite. Construído em Rust, ele opera como um daemon local rápido acoplado a uma interface gráfica limpa via navegador ou aplicativo desktop, projetado para auditoria e teste de segurança em aplicações web e APIs.",
    "capabilities": [
      "Mecanismo de proxy de alto desempenho com baixo consumo de memória RAM",
      "Interceptação e repetição refinada de requisições HTTP/1.1 e HTTP/2",
      "Automatizador de testes e pesquisa avançada com filtros customizáveis",
      "Suporte a fluxos de trabalho colaborativos e execução em servidores remotos"
    ],
    "useCases": [
      "Auditoria de vulnerabilidades em APIs REST, GraphQL e aplicações web modernas",
      "Testes de controle de acesso (BOLA/IDOR), injeções e lógica de negócios"
    ],
    "requirements": ["Linux, macOS ou Windows"],
    "quickStartNote": "Inicie o Caido; acerte o certificado CA no seu navegador e acesse a interface local."
  },

  // 32. WFUZZ
  "wfuzz": {
    "tagline": "Fuzzer flexível de aplicações web para identificação de parâmetros e injeções.",
    "description": "O Wfuzz é uma ferramenta clássica e versátil para testes de segurança em aplicações web. Ele substitui qualquer ocorrência da palavra-chave FUZZ pelo conteúdo de uma lista de valores, permitindo testar parâmetros ocultos, campos de formulário, cabeçalhos HTTP e caminhos de API.",
    "capabilities": [
      "Fuzzing flexível de múltiplos parâmetros (FUZZ, FUZ2Z) simultaneamente",
      "Filtragem por código de resposta, número de linhas, contagem de palavras e caracteres",
      "Suporte a autenticação básica, NTLM e proxies intermediários"
    ],
    "useCases": [
      "Descoberta de parâmetros ocultos em formulários e APIs (Parameter Mining)",
      "Testes de injeção de caracteres especiais para descoberta de falhas XSS e SQLi"
    ],
    "requirements": ["Python 3+", "pip", "pycurl"],
    "quickStartNote": "Executa fuzzing no caminho de diretório usando a lista de palavras.",
    "commands": [
      {
        "title": "Descobrir parâmetros GET ocultos",
        "description": "Testa nomes de parâmetros em uma página web ocultando códigos de erro 404."
      }
    ]
  },

  // 33. METASPLOIT-FRAMEWORK
  "metasploit-framework": {
    "tagline": "O framework de testes de penetração e validação de segurança mais utilizado no mundo.",
    "description": "O Metasploit Framework fornece um ecossistema completo para validar vulnerabilidades de segurança, desenvolver exploits, testar defesas de rede e executar payloads autorizados em ambientes controlados.",
    "capabilities": [
      "Milhares de módulos verificados de exploits, scanners auxiliares e pós-exploração",
      "Gerador de payloads flexíveis (Meterpreter) com comunicação cifrada",
      "Console interativo (msfconsole) com gerenciamento integrado de espaços de trabalho e bancos de dados",
      "Automação extensível por meio de scripts Ruby e arquivos de recursos (resource files)"
    ],
    "useCases": [
      "Validação prática da explorabilidade de vulnerabilidades críticas em laboratório",
      "Exercícios de simulação de adversários e testes de resposta a incidentes"
    ],
    "requirements": ["Linux, macOS ou Windows", "PostgreSQL (recomendado para banco de dados)"],
    "quickStartNote": "Inicia o console interativo do Metasploit com suporte ao banco de dados.",
    "commands": [
      {
        "title": "Iniciar console do Metasploit",
        "description": "Carrega o ambiente de execução e módulos do Metasploit."
      },
      {
        "title": "Verificar vulnerabilidade com módulo auxiliar",
        "description": "Executa verificação não destrutiva de versão e falhas conhecidas no serviço alvo."
      }
    ]
  },

  // 34. BLOODHOUND
  "bloodhound": {
    "tagline": "Análise de relações e caminhos de ataque em ambientes Active Directory e Azure/Entra ID.",
    "description": "O BloodHound utiliza a teoria dos grafos para mapear e visualizar relacionamentos ocultos em ambientes Active Directory e nuvem (Azure/Entra ID). Ele revela caminhos de ataque não intencionais, delegações excessivas de privilégio e configurações incorretas de controle de acesso (ACLs).",
    "capabilities": [
      "Visualização de grafos de relacionamento entre usuários, grupos, computadores e permissões",
      "Identificação automatizada de caminhos de escalação para privilégios de Administrador de Domínio",
      "Suporte a coletores de dados oficiais (SharpHound e AzureHound)",
      "Ajuda defensores a eliminar configurações de alto risco e caminhos de ataque críticos"
    ],
    "useCases": [
      "Auditoria de segurança de arquitetura e higiene de permissões em Active Directory",
      "Identificação e remediação proativa de permissões excessivas e delegações perigosas"
    ],
    "requirements": ["Banco de dados Neo4j", "Node.js (para frontend legado) ou BloodHound CE"],
    "quickStartNote": "Inicie o serviço do Neo4j e execute o BloodHound para abrir a interface de análise gráfica.",
    "commands": [
      {
        "title": "Iniciar BloodHound",
        "description": "Abre a interface gráfica conectada à base de dados de grafos do Active Directory."
      }
    ]
  },

  // 35. MIMIKATZ
  "mimikatz": {
    "tagline": "Ferramenta de pesquisa de segurança para extração de credenciais em memória no Windows.",
    "description": "Desenvolvido por Benjamin Delpy, o Mimikatz é uma ferramenta de pesquisa de segurança reconhecida mundialmente que demonstra fraquezas de segurança na autenticação do Windows, extraindo senhas em texto puro, hashes NTLM, tickets Kerberos e chaves de certificados diretamente da memória do processo LSASS.",
    "capabilities": [
      "Extração de senhas em memória e hashes NTLM do processo LSASS (sekurlsa::logonpasswords)",
      "Manipulação de tickets Kerberos (Pass-the-Ticket, Golden Ticket, Silver Ticket)",
      "Exportação de certificados e chaves privadas marcadas como não exportáveis",
      "Auditoria do subsistema de segurança e credenciais em estações Windows"
    ],
    "useCases": [
      "Demonstração em laboratório de riscos de permanência de credenciais em memória",
      "Auditoria forense de integridade de autenticação e mitigação de Credential Dumping"
    ],
    "requirements": ["Windows", "Privilégios de Administrador / SYSTEM"],
    "quickStartNote": "Inicia o console interativo do Mimikatz em um prompt elevado de administrador.",
    "commands": [
      {
        "title": "Auditoria de credenciais ativas em memória",
        "description": "Habilita privilégio de depuração e inspeciona credenciais no LSASS em ambiente de teste."
      }
    ]
  },

  // 36. PEASS-NG
  "peass-ng": {
    "tagline": "Scripts para enumeração de caminhos de escalação de privilégios (LinPEAS / WinPEAS).",
    "description": "O PEASS-ng (Privilege Escalation Awesome Scripts Suite) é uma coleção amplamente utilizada de scripts de auditoria local (LinPEAS para Linux/Unix e WinPEAS para Windows). Ele analisa exaustivamente permissões de arquivos, serviços, tarefas agendadas, capacidades e configurações para identificar vulnerabilidades locais.",
    "capabilities": [
      "Detecção automática de arquivos com bits SUID, permissões incorretas de sudo e capacidades perigosas",
      "Inspeção de serviços do Windows com caminhos não cotados (Unquoted Service Paths) e chaves Run",
      "Destaque em cores diferenciadas para facilitar a identificação visual de achados críticos",
      "Execução em memória sem necessidade de instalação permanente no sistema avaliado"
    ],
    "useCases": [
      "Auditoria de conformidade e mitigação de riscos de escalação de privilégios em servidores",
      "Inspeção pós-comprometimento e testes de configuração em ambientes de treinamento"
    ],
    "requirements": ["Shell Bash no Linux ou PowerShell/cmd no Windows"],
    "quickStartNote": "Executa o script de enumeração no Linux e exibe achados destacados por cores.",
    "commands": [
      {
        "title": "Executar auditoria local no Linux",
        "description": "Inspeciona permissões de arquivos, sudoers e configurações de sistema em busca de vulnerabilidades."
      }
    ]
  },

  // 37. LAZAGNE
  "lazagne": {
    "tagline": "Aplicativo de código aberto para recuperação e auditoria de senhas salvas localmente.",
    "description": "O LaZagne é uma ferramenta de pós-exploração e auditoria desenvolvida em Python que recupera senhas armazenadas localmente em navegadores web, clientes de e-mail, clientes de banco de dados, redes Wi-Fi e gerenciadores de senhas no sistema operacional.",
    "capabilities": [
      "Recuperação de credenciais em dezenas de softwares comuns (Chrome, Firefox, Outlook, FileZilla)",
      "Módulos específicos para ambientes Windows, Linux e macOS",
      "Exportação de resultados em texto simples e formatos legíveis por scripts"
    ],
    "useCases": [
      "Auditoria de risco de armazenamento inseguro de credenciais em estações de trabalho corporativas",
      "Exercícios de simulação de ameaças internas em estações de funcionários"
    ],
    "requirements": ["Python 3 ou executável compilado para Windows"],
    "quickStartNote": "Executa todos os módulos de recuperação de senhas no usuário atual.",
    "commands": [
      {
        "title": "Auditar todas as senhas salvas no sistema",
        "description": "Inspeciona navegadores e programas instalados em busca de credenciais em texto claro ou fracamente protegidas."
      }
    ]
  },

  // 38. VOLATILITY-3
  "volatility-3": {
    "tagline": "O framework líder mundial de código aberto para análise forense de memória RAM.",
    "description": "O Volatility 3 é a reescrita completa da plataforma de análise forense de memória mais utilizada no mundo. Desenvolvido em Python 3, ele extrai artefatos de imagens brutas de memória RAM, dumps de falhas e arquivos de hibernação em sistemas Windows, Linux e macOS para investigar malwares avançados e rootkits.",
    "capabilities": [
      "Listagem e reconstrução de processos (pslist, pstree, psscan) identificando processos ocultos ou desvinculados",
      "Reconstrução de conexões de rede ativas (netscan, netstat) associando sockets aos seus PIDs",
      "Detecção de injeção de código em memória (malfind) identificando regiões VAD com permissões RWX",
      "Extração de chaves de registro e hashes de senhas diretamente das estruturas do kernel"
    ],
    "useCases": [
      "Investigações de resposta a incidentes envolvendo malwares 'fileless' e técnicas Living-off-the-Land",
      "Detecção de rootkits de kernel e recuperação de chaves de criptografia em memória volátil"
    ],
    "requirements": ["Python 3.9+", "pip", "Imagem de memória volátil (.raw, .vmem, .dmp)"],
    "quickStartNote": "Lista os processos em execução capturados na imagem de memória do Windows.",
    "commands": [
      {
        "title": "Identificar código injetado oculto",
        "description": "Examina descritores de endereçamento virtual (VAD) de processos em busca de código executável injetado."
      },
      {
        "title": "Reconstruir conexões de rede",
        "description": "Extrai portas TCP/UDP em escuta e conexões remotas ativas no momento da captura."
      }
    ],
    "outputExplained": "Saída windows.pslist: PID, PPID, ImageFileName, Offset(V), Threads, Handles, SessionId, Wow64, CreateTime, ExitTime. Compare o pslist com o psscan para identificar processos ocultos por malwares.",
    "troubleshooting": [
      {
        "issue": "Tabela de símbolos ausente para a versão do kernel",
        "resolution": "Baixe o pacote de símbolos oficial correspondente ao build do sistema ou utilize o repositório de símbolos do Volatility."
      }
    ]
  },

  // 39. AUTOPSY
  "autopsy": {
    "tagline": "Plataforma gráfica de computação forense digital e análise de imagens de disco.",
    "description": "O Autopsy é uma interface gráfica poderosa e consagrada para a biblioteca The Sleuth Kit (TSK). Utilizado por peritos criminais, órgãos policiais e investigadores corporativos, ele realiza análises completas de sistemas de arquivos, imagens de disco e mídias removíveis.",
    "capabilities": [
      "Análise de sistemas de arquivos (NTFS, FAT, ext2/3/4, APFS) e recuperação de arquivos excluídos",
      "Extração automatizada de histórico de navegadores, cookies, e-mails e metadados de mídias",
      "Análise de linha do tempo integrada para reconstituição de ações do usuário",
      "Arquitetura extensível com módulos de inteligência artificial e correspondência de hashes"
    ],
    "useCases": [
      "Perícia computacional criminal e investigações jurídicas autorizadas",
      "Resposta a incidentes com preservação de cadeia de custódia e geração de laudos periciais"
    ],
    "requirements": ["Java 17+", "Windows, Linux ou macOS"],
    "quickStartNote": "Inicie o aplicativo Autopsy e crie um novo caso para importar sua imagem de disco (.e01 ou .dd)."
  },

  // 40. EXIFTOOL
  "exiftool": {
    "tagline": "Biblioteca Perl e CLI independente de plataforma para leitura, gravação e edição de metadados.",
    "description": "O ExifTool, desenvolvido por Phil Harvey, é a ferramenta definitiva para análise de metadados em arquivos. Ele lê, escreve e altera metadados em centenas de formatos de arquivo (EXIF, IPTC, XMP, JFIF, GeoTIFF, ICC Profile, ID3), revelando números de série de câmeras, coordenadas GPS, marcas temporais e versões de softwares.",
    "capabilities": [
      "Processa metadados de imagens (JPEG, TIFF, PNG), documentos (PDF, DOCX), áudios e vídeos",
      "Extrai latitude, longitude, altitude e marcas de tempo de GPS para investigações de geolocalização",
      "Higieniza arquivos removendo todas as marcas de metadados antes de publicações públicas (-all=)",
      "Extrai miniaturas incorporadas e anotações originais de fabricantes de câmeras"
    ],
    "useCases": [
      "Análise pericial de fotografias, documentos e mídias em investigações cibernéticas",
      "Remoção de metadados para segurança operacional (OPSEC) antes da divulgação de relatórios"
    ],
    "requirements": ["Perl 5.004 ou superior (pré-instalado na maioria dos sistemas UNIX)"],
    "quickStartNote": "Exibe todas as tags de metadados EXIF, XMP e IPTC incorporadas no arquivo.",
    "commands": [
      {
        "title": "Extrair coordenadas GPS e modelo da câmera",
        "description": "Recupera dados geográficos e etiquetas de modelo de equipamento na mídia."
      },
      {
        "title": "Remover todos os metadados de imagens no diretório",
        "description": "Remove com segurança todas as tags EXIF para proteger a privacidade do pesquisador."
      }
    ]
  },

  // 41. VELOCIRAPTOR
  "velociraptor": {
    "tagline": "Plataforma avançada de visibilidade de endpoints, busca de ameaças e resposta a incidentes.",
    "description": "O Velociraptor é uma plataforma de triagem digital e monitoramento de endpoints de alta velocidade. Utilizando a linguagem expressiva VQL (Velociraptor Query Language), analistas de DFIR podem interrogar milhares de computadores simultaneamente para coletar artefatos forenses e caçar indicadores de comprometimento.",
    "capabilities": [
      "Linguagem de consulta VQL para criação de artefatos de caça customizados",
      "Coleta rápida de artefatos forenses em frotas distribuídas de computadores",
      "Monitoramento contínuo de eventos do sistema operacional em tempo real",
      "Comunicação criptografada e segura entre clientes e o servidor central"
    ],
    "useCases": [
      "Caça proativa a ameaças (Threat Hunting) em redes empresariais de grande escala",
      "Triagem forense e coleta de evidências em incidentes de intrusão ativos"
    ],
    "requirements": ["Binário standalone para Linux, Windows ou macOS"],
    "quickStartNote": "Inicia a interface de administração local integrada do Velociraptor na porta 8889.",
    "commands": [
      {
        "title": "Iniciar console local com interface gráfica",
        "description": "Abre o console de administração local para teste e desenvolvimento de artefatos VQL."
      }
    ]
  },

  // 42. KAPE
  "kape": {
    "tagline": "Programa de aquisição e processamento ultrarrápido de artefatos forenses digitais.",
    "description": "O KAPE (Kroll Artifact Parser and Extractor) é uma ferramenta essencial de triagem forense para ambientes Windows. Ele localiza, copia e analisa rapidamente os artefatos mais importantes para a investigação (MFT, Registry Hives, Event Logs, Prefetch) em minutos antes da imagem completa de disco.",
    "capabilities": [
      "Coleta direcionada de evidências forenses críticas com proteção de integridade (VSS)",
      "Processamento automatizado de artefatos através de dezenas de ferramentas auxiliares",
      "Geração de relatórios consolidados em formatos CSV e texto para análise imediata"
    ],
    "useCases": [
      "Triagem rápida em resposta a incidentes onde a clonagem de disco seria inviável",
      "Coleta padronizada de evidências forenses em múltiplos computadores de uma empresa"
    ],
    "requirements": ["Windows 7 / Server 2008 R2 ou superior", ".NET Framework 4.5+"],
    "quickStartNote": "Execute o gkape.exe para abrir a interface gráfica ou utilize a linha de comando kape.exe."
  },

  // 43. DOCKER-EXPLOITATION-FRAMEWORK
  "docker-exploitation-framework": {
    "tagline": "Framework de laboratório para auditoria de segurança, contêineres e testes de escape.",
    "description": "O Docker Exploitation Framework é um ambiente de pesquisa e testes para auditoria de segurança em contêineres Docker e Kubernetes. Ele auxilia na verificação de privilégios excessivos, montagens perigosas de sockets (/var/run/docker.sock) e configurações de segurança de contêineres.",
    "capabilities": [
      "Identificação de montagens de volumes de alto risco e configurações inseguras",
      "Testes de auditoria de capacidades do kernel Linux (CAP_SYS_ADMIN, etc.)",
      "Verificação de políticas de isolamento de rede e namespaces de processos"
    ],
    "useCases": [
      "Auditoria de conformidade de segurança e endurecimento (hardening) de clusters de contêineres",
      "Exercícios de laboratório para validação de controles defensivos em contêineres"
    ],
    "requirements": ["Docker Engine", "Linux"],
    "quickStartNote": "Executa o container de diagnóstico para inspecionar configurações do host.",
    "commands": [
      {
        "title": "Auditar capacidades e montagens do container",
        "description": "Inspeciona permissões e volumes montados no ambiente de contêineres."
      }
    ]
  },

  // 44. GATO
  "gato": {
    "tagline": "Ferramenta de auditoria e ataque para segurança de executores auto-hospedados do GitHub (Runners).",
    "description": "O Gato (Github Attack ToolKit) é uma ferramenta de auditoria de segurança desenvolvida pela Praetorian para avaliar ambientes de integração contínua (CI/CD) no GitHub, especificamente identificando runners auto-hospedados vulneráveis a acessos não autorizados e repositórios com permissões excessivas.",
    "capabilities": [
      "Enumeração de runners auto-hospedados em organizações e repositórios do GitHub",
      "Identificação de segredos e permissões de tokens de workflow de CI/CD",
      "Apoio a equipes defensivas na implementação de isolamento seguro de pipelines"
    ],
    "useCases": [
      "Auditoria de postura de segurança em cadeias de suprimentos de software (AppSec / CI/CD)",
      "Verificação de privilégios de automação e segurança de runners de integração contínua"
    ],
    "requirements": ["Python 3.8+", "pip", "Token de acesso pessoal do GitHub"],
    "quickStartNote": "Enumera repositórios e runners associados à organização alvo.",
    "commands": [
      {
        "title": "Auditar runners em uma organização do GitHub",
        "description": "Verifica os repositórios públicos da organização em busca de configurações de runners auto-hospedados."
      }
    ]
  }
};
