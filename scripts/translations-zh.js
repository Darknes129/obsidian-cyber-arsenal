// Simplified Chinese Translations for 44 Cybersecurity Tools
module.exports = {
  // 1. OSINTGRAM
  "osintgram": {
    "tagline": "模块化Instagram开源情报与个人资料分析命令行工具。",
    "description": "Osintgram提供模块化Shell交互界面，通过合法的API交互对目标Instagram账户进行经授权的开源情报（OSINT）分析，提取粉丝关系、元数据、地理位置与互动活跃度指标。",
    "capabilities": [
      "提取目标主页简介、用户ID及基础元数据",
      "分析粉丝与关注网络以及共同好友关联",
      "收集照片文案、发布时间戳及被标记的用户信息",
      "汇总并分析公开帖子中附带的地理位置标签"
    ],
    "useCases": [
      "针对网络欺诈与身份验证的开源情报调查",
      "高管与关键人员的数字足迹安全审计",
      "社交网络拓扑关系的学术与安全研究"
    ],
    "requirements": ["Python 3.8+", "pip", "Instagram 会话凭据"],
    "installationNotes": "在启动交互式Shell之前，需在 config/credentials.ini 文件中配置有效的登录凭据。",
    "quickStartNote": "启动交互式命令行终端，支持 'info'、'photodes'、'captions' 等内置子命令。",
    "commands": [
      {
        "title": "启动交互式会话",
        "description": "初始化已认证会话并进入交互式命令行界面。"
      },
      {
        "title": "导出粉丝列表",
        "description": "收集目标账户的全部粉丝并保存至输出目录。"
      }
    ]
  },

  // 2. OSINTSEARCH
  "osintsearch": {
    "tagline": "面向公开记录与开源情报的多引擎聚合搜索平台。",
    "description": "OSINTSearch将域名注册信息、用户名索引、公开泄露数据以及企业登记档案等多源检索能力聚合于统一的查询界面中。",
    "capabilities": [
      "聚合跨多个公开数据库与注册中心的联合检索",
      "域名Whois、历史DNS记录与自治系统号（ASN）交叉关联",
      "用户名可用性检测与在线档案存在性核查"
    ],
    "useCases": [
      "调查初期的背景信息收集与侦察分类",
      "企业隶属关系及公共实体登记情况验证"
    ],
    "requirements": ["现代主流Web浏览器"]
  },

  // 3. REVEALER
  "revealer": {
    "tagline": "在线身份关联与网络数字足迹发现服务。",
    "description": "Revealer帮助安全研究人员在公开发布的数据集与索引中追踪数字身份、电话号码及常用别名，为网络犯罪归因及防欺诈分析提供支撑。",
    "capabilities": [
      "电话号码所属运营商及线路类型解析",
      "基于身份特征的公开档案数据交叉关联",
      "跨主流社交平台的关联账户线索发现"
    ],
    "useCases": [
      "授权调查中的联系方式与虚拟身份溯源",
      "个人暴露面与公开数字足迹安全评估"
    ],
    "requirements": ["现代主流Web浏览器"]
  },

  // 4. TOOKIE-OSINT
  "tookie-osint": {
    "tagline": "自动化用户名枚举与多平台数字身份侦察框架。",
    "description": "tookie-osint用于自动化检索目标别名在数百个主流网站及网络服务上的注册情况，快速定位关联账户并建立公开数字足迹拓扑。",
    "capabilities": [
      "跨数十个社交与开发者平台的高并发用户名扫描",
      "HTTP响应校验与误报智能过滤机制",
      "导出结构化侦察结果以供案卷归档"
    ],
    "useCases": [
      "授权测试中的开源身份信息侦察",
      "个人资产暴露面与废弃账户安全审计"
    ],
    "requirements": ["Python 3.8+", "pip", "Git"],
    "installationNotes": "建议在独立的Python虚拟环境中运行以避免系统依赖冲突。",
    "quickStartNote": "对指定用户名发起跨所有已适配服务的并发枚举查询。",
    "commands": [
      {
        "title": "跨平台检测用户名",
        "description": "检索目标用户名在已知网站及论坛上的存在情况。"
      }
    ]
  },

  // 5. SMARTIMAGE
  "smartimage": {
    "tagline": "基于多图源的法医级图片反向搜索与真伪核查工具。",
    "description": "SmartImage可自动化调用多个全球主流视觉搜索引擎（Google、Yandex、Bing、TinEye）进行并发反向图像检索，协助分析人员迅速追溯图片初始来源并辨别篡改伪造痕迹。",
    "capabilities": [
      "多引擎并发反向图像搜索与跨平台结果对比",
      "图像初步元数据提取与感知哈希比对",
      "辅助事实核查与媒体真实性验证"
    ],
    "useCases": [
      "开源情报调查中的图片来源与真实性验证",
      "识别伪造资料中复用他人头像的虚假账号"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "installationNotes": "部分外部搜索引擎可能需要配置可选的API密钥以规避速率限制。",
    "quickStartNote": "加载目标图片并向支持的反向图像检索引擎发起并发查询。",
    "commands": [
      {
        "title": "执行反向图片搜索",
        "description": "启动针对目标图像的多图源批量反向检索。"
      }
    ]
  },

  // 6. BBOT
  "bbot": {
    "tagline": "递归式攻击面映射与模块化开源情报扫描器。",
    "description": "BBOT（Bighuge BLT OSINT Tool）是一款面向安全攻防团队的递归式资产发现与攻击面测绘工具，能够自动化关联子域名、SSL证书、开放端口、Web应用及云端对象存储。",
    "capabilities": [
      "基于事件驱动的递归式外网资产测绘机制",
      "涵盖DNS、端口、证书、S3存储桶及开放重定向的丰富模块",
      "支持机器可读格式导出与Neo4j知识图谱可视化",
      "内置严格的测试范围限制机制以规避越界风险"
    ],
    "useCases": [
      "企业外部攻击面持续管理（EASM）",
      "授权红蓝对抗演习前期的资产深度摸排",
      "面向互联网暴露资产的全面清单梳理"
    ],
    "requirements": ["Python 3.9+", "pipx 或 pip", "Linux/macOS 环境"],
    "installationNotes": "强烈建议使用pipx进行安装以实现环境依赖的有效隔离。",
    "quickStartNote": "在指定的目标域名上启动包含被动模块与子域名扫描的任务。",
    "commands": [
      {
        "title": "基础子域名侦察",
        "description": "利用公开日志与证书透明度记录被动收集子域名。"
      },
      {
        "title": "全功能攻击面映射",
        "description": "执行深度递归探测，结合活跃DNS解析与Web服务指纹识别。"
      }
    ]
  },

  // 7. GEOAXIS
  "geoaxis": {
    "tagline": "地理空间开源情报与数字高程地形综合分析平台。",
    "description": "GeoAxis将地理空间图层、高分辨率卫星遥感图、高程模型以及开放数据集融为一体，为基于物理坐标的地理空间情报（GEOINT）分析提供专业支撑。",
    "capabilities": [
      "高精度多源卫星遥感影像与电子地图叠加分析",
      "通视视线分析与数字高程模型（DEM）地形演算",
      "多媒体元数据、时间戳与地理坐标的事件关联"
    ],
    "useCases": [
      "开源调查中照片与视频拍摄地的空间精确定位",
      "重要物理基础设施与敏感设施的外围态势研判"
    ],
    "requirements": ["支持WebGL硬件加速的现代主流浏览器"]
  },

  // 8. GODS-EYE-VIEW
  "gods-eye-view": {
    "tagline": "全球态势感知三维地球与轨道卫星实时追踪系统。",
    "description": "God's Eye View提供高拟真度的三维地球可视化界面，实时追踪在轨卫星运行轨迹、民航客机飞行动态（ADS-B）以及海事船舶航行数据，赋能宏观态势感知。",
    "capabilities": [
      "空间卫星轨道实时推算与重点区域过境窗口预报",
      "无缝接入全球民航与船舶位置开源遥测数据流",
      "模拟全球光照阴影变化与卫星对地观测传感器覆盖面"
    ],
    "useCases": [
      "实地安保与行动前评估卫星过顶与光学观测窗口",
      "全球海空航运态势及关键物流枢纽宏观监控"
    ],
    "requirements": ["现代主流Web浏览器", "支持WebGL加速的独立或集成GPU"],
    "quickStartNote": "在本地默认端口加载运行交互式三维地球态势界面。"
  },

  // 9. TRAFFICVISION-LIVE
  "trafficvision-live": {
    "tagline": "市政公开交通监控视频流与开放摄像头态势监测。",
    "description": "Trafficvision.live汇聚并整理各级交通管理部门依法公开的城市干道与高速公路监控视频流，支持即时查验道路实况、气象条件及突发交通拥堵。",
    "capabilities": [
      "系统化分类接入合法公开的城市交通监控视频",
      "支持按行政区划、主要公路干线及经纬度筛选",
      "实时核查现场天候状况、通行能力与道路动态"
    ],
    "useCases": [
      "针对公共区域物理环境与天气状况的独立视觉核验",
      "经授权的物流通行与现场路线调度辅助评估"
    ],
    "requirements": ["支持主流视频流媒体播放的Web浏览器"]
  },

  // 10. HORUS
  "horus": {
    "tagline": "新闻资讯与开源网络安全威胁情报综合监控面板。",
    "description": "Horus聚合多渠道RSS订阅源、官方预警公告及地缘政治要闻，为威胁情报（Threat Intel）分析师和安全运维人员提供统一的态势感知面板。",
    "capabilities": [
      "汇聚全球安全事件动态并支持基于关键词的定向过滤",
      "关键系统服务中断与网络安全突发事件实时预警"
    ],
    "useCases": [
      "针对新型网络攻击态势与勒索软件动向的实时监测",
      "评估突发安全事件对企业业务供应链的波及影响"
    ],
    "requirements": ["Node.js 或 Python 环境", "互联网访问连接"]
  },

  // 11. TORBOT
  "torbot": {
    "tagline": "Tor暗网（.onion）异步情报爬虫与拓扑链接分析工具。",
    "description": "TorBot是一款基于异步架构的网络爬虫，专门用于抓取和分类Tor洋葱路由网络中的.onion隐藏服务，在不暴露研究人员真实公网IP的前提下提取页面标题、元数据及邮箱线索。",
    "capabilities": [
      "基于SOCKS5代理的.onion隐藏服务高并发异步深度爬取",
      "提取网页标题、正文关键词、电子邮件与关联跳转链接",
      "自动识别PGP公开密钥与主流加密货币钱包收款地址",
      "构建暗网站点间的引用链接拓扑树形图"
    ],
    "useCases": [
      "经授权的暗网威胁情报监控与涉案黑产线索调查",
      "监测企业核心机密凭据与数据资产在地下论坛的泄露情况"
    ],
    "requirements": ["Python 3.8+", "本地运行的Tor服务（SOCKS端口9050或9150）"],
    "installationNotes": "系统后台必须保持Tor服务正常运行以提供SOCKS5网络隧道。",
    "quickStartNote": "通过本地Tor代理针对目标.onion站点发起自动化递归抓取。",
    "commands": [
      {
        "title": "抓取.onion隐藏服务",
        "description": "从指定根地址出发深度检索暗网网页并记录元数据。"
      }
    ]
  },

  // 12. MAILACCESS
  "mailaccess": {
    "tagline": "SPF、DKIM与DMARC邮件认证体系安全配置审计工具。",
    "description": "MailAccess针对企事业单位域名的邮件传输安全体系开展自动化评估，深度排查SPF发信白名单、DKIM数字签名和DMARC策略是否存在防护缺陷，防范冒名伪造与钓鱼攻击。",
    "capabilities": [
      "自动化核验DMARC防伪策略强度与SPF记录语法合规性",
      "智能发现宽松通配符等可能引发伪造邮件攻击的薄弱配置"
    ],
    "useCases": [
      "机构电子邮箱通信安全基线与传输凭据合规审计",
      "实施严格防钓鱼策略前的防伪机制预检"
    ],
    "requirements": ["Python 3+", "网络DNS解析能力"]
  },

  // 13. NEKO
  "neko": {
    "tagline": "基于Docker容器与WebRTC流媒体的完全隔离虚拟浏览器。",
    "description": "Neko在轻量级Docker容器中运行全功能的Chromium或Firefox浏览器，利用超低延迟的WebRTC协议将画面实时投射至宿主机网页，实现对未知可疑网址的沙箱化隔离审查，杜绝恶意代码逃逸风险。",
    "capabilities": [
      "完全沙盒隔离的浏览环境，安全排查钓鱼木马与挂马网站",
      "基于WebRTC的超低延迟高帧率网页交互流媒体传输",
      "支持多用户协同访问与屏幕控制权限交替机制",
      "容器销毁后瞬时清除所有会话痕迹，不遗留持久化威胁"
    ],
    "useCases": [
      "安全查验涉嫌钓鱼诈骗的可疑URL与未知附件链接",
      "与日常工作机完全物理隔离的开源情报匿名取证"
    ],
    "requirements": ["Docker", "Docker Compose"],
    "installationNotes": "需预先安装Docker Engine并开放用于WebRTC通信的UDP端口范围。",
    "quickStartNote": "在本地8080端口拉起隔离的沙箱浏览器实例。"
  },

  // 14. SESSION
  "session": {
    "tagline": "基于洋葱路由与零元数据收集的去中心化端到端加密即时通讯软件。",
    "description": "Session是一款去中心化端对端加密即时通讯工具。其底层架构依托Oxen服务节点网络的多跳洋葱路由，注册完全不需要绑定手机号码或电子邮箱，从架构根源上杜绝了通信元数据的留存泄露。",
    "capabilities": [
      "基于非对称公钥机制的端到端强加密通信，无需绑定手机号",
      "通过多跳洋葱节点（Onion Routing）隐匿发信人真实网络地址",
      "完全去中心化的架构设计，无中心服务器监控风险与单点故障",
      "支持阅后即焚倒计时、群组加密广播以及离线消息投递"
    ],
    "useCases": [
      "关键应急响应行动中敏感情报的高安全性机密通信通道",
      "安全漏洞负责任披露对接与匿名线索提报安全联络"
    ],
    "requirements": ["Linux、macOS、Windows、Android 或 iOS 客户端"]
  },

  // 15. HASHCAT
  "hashcat": {
    "tagline": "全球性能领先的高速密码恢复与哈希逆向审计工具。",
    "description": "Hashcat是业界领先的GPU加速密码恢复与认证安全性审计工具。专为安全研究员、渗透测试工程师及司法取证人员打造，全面支持NTLM、Kerberos、bcrypt、SHA-512、压缩包与全盘加密卷等数百种加密算法。",
    "capabilities": [
      "针对主流独立显卡（OpenCL、CUDA、Metal）深度定制的高性能计算核心",
      "支持超过300种主流哈希算法与各类加密容器格式",
      "多样化的密码审计模式：字典、排列组合、高阶掩码与自定义变形规则",
      "具备断点续传、自动保存检查点机制与硬件性能基准测试功能"
    ],
    "useCases": [
      "企业内部活动目录（Active Directory）域密码强度合规抽检",
      "司法电子数据取证中加密文件与被保护容器的依法恢复"
    ],
    "requirements": ["兼容的GPU显卡驱动程序（NVIDIA CUDA / AMD ROCm / Apple Metal）", "OpenCL 环境"],
    "installationNotes": "必须安装显卡官方专有驱动程序以开启底层GPU硬件计算加速。",
    "quickStartNote": "对当前硬件所支持的所有哈希算法发起全面运算性能基准测试。",
    "commands": [
      {
        "title": "针对NTLM哈希的字典破解审计",
        "description": "使用专业字典对提取自Windows系统的NTLM密码哈希进行强度碰撞测试。"
      },
      {
        "title": "8位定长密码的掩码穷举攻击",
        "description": "对固定长度的字母与数字组合发起全空间穷举审计。"
      },
      {
        "title": "GPU硬件算力基准测试",
        "description": "测算本机显卡在各主流算法下的每秒哈希计算速率（H/s）。"
      }
    ],
    "outputExplained": "标准输出：显示成功碰撞出的原始哈希及对应的明文密码。状态看板中提供运算进度、实时哈希速率（H/s）以及核心温度等遥测指标。",
    "troubleshooting": [
      {
        "issue": "系统未检测到有效的OpenCL或CUDA硬件设备",
        "resolution": "请重新安装显卡官方专属驱动程序，或在命令行中指定 -D 1 参数强制改用CPU进行运算。"
      }
    ]
  },

  // 16. IMPACKET
  "impacket": {
    "tagline": "用于底层网络协议构造与程序化交互的经典Python类库。",
    "description": "Impacket是网络协议分析与Windows内网渗透审计中不可或缺的Python基础类库。它提供了对底层网络数据包的精细控制，涵盖SMB、MSRPC、Kerberos、WMI及NTLM协议的高质量实现。",
    "capabilities": [
      "底层网络协议的纯Python完整实现（SMB1/2/3、MSRPC、NTLM、Kerberos）",
      "提供针对活动目录认证委托与凭据滥用的系列审计实用脚本",
      "基于WMI（wmiexec）与SMB（smbexec）实现经授权的无文件远程命令调用",
      "利用DRSUAPI协议从域控制器导出NTDS.dit凭据哈希（secretsdump）"
    ],
    "useCases": [
      "内网环境中弱NTLM认证与Kerberos票据委托机制的安全性审计",
      "企业活动目录架构中特权账户残留与权限滥用风险排查"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "quickStartNote": "调用secretsdump脚本利用DRSUAPI协议审计域内凭据安全性。",
    "commands": [
      {
        "title": "域凭据转储审计（SecretsDump）",
        "description": "以域管权限利用DRSUAPI机制从域控远程导出NTLM哈希与Kerberos密钥。"
      },
      {
        "title": "基于WMI协议的免落地远程执行",
        "description": "无需向远程目标主机磁盘写入任何执行文件，通过WMI安全执行指令。"
      }
    ]
  },

  // 17. NMAP
  "nmap": {
    "tagline": "Network Mapper — 全球网络探索与安全审计领域的行业标杆工具。",
    "description": "Nmap是网络安全领域无可替代的基础扫描器，专为网络资产测绘、存活服务与守护进程版本检测、基于TCP/IP协议栈指纹的操作系统识别以及借助Nmap脚本引擎（NSE）进行脆弱性排查而设计。",
    "capabilities": [
      "支持SYN半开隐蔽扫描（-sS）、TCP全连接扫描（-sT）、UDP探测（-sU）及SCTP",
      "依据庞大的TCP/IP协议栈指纹特征库进行高精度远程操作系统推断",
      "依托数千种协议指纹签名深入识别开放端口的具体应用名称与版本号（-sV）",
      "通过Nmap脚本引擎（NSE）提供超过600个功能完备的自动化Lua探测脚本"
    ],
    "useCases": [
      "企业网络IT资产测绘梳理与外网开放端口基线合规审计",
      "验证内外网边界防火墙策略的包过滤与访问控制有效性",
      "在合规检查中快速定位未修补高危漏洞的陈旧服务版本"
    ],
    "requirements": ["原始套接字权限（执行SYN半开隐蔽扫描需具备root/Administrator特权）"],
    "installationNotes": "发送原始SYN数据包需要系统管理员权限（Linux下使用sudo）。",
    "quickStartNote": "对本地回环地址（localhost）执行服务版本指纹识别与NSE默认安全脚本探测。",
    "commands": [
      {
        "title": "常规服务版本与默认脚本扫描",
        "description": "针对前1000个常用TCP端口执行安全脚本检查并深度指纹识别运行版本。"
      },
      {
        "title": "全端口高速SYN半开扫描",
        "description": "对授权测试主机的所有65535个TCP端口进行高速率存活排查。"
      },
      {
        "title": "已知漏洞脚本批量探测",
        "description": "调用NSE脚本库中的vuln分类规则，对目标Web服务进行CVE漏洞初筛。"
      }
    ],
    "outputExplained": "PORT STATE SERVICE VERSION 输出说明：分别展示端口号/协议、状态（open开放、closed关闭、filtered被防火墙过滤）、识别出的服务名称及应用版本信息。'filtered'表示数据包被防火墙策略丢弃。",
    "troubleshooting": [
      {
        "issue": "执行SYN半开扫描（-sS）时提示权限不足（Permission denied）",
        "resolution": "请使用sudo提升为root管理员权限运行，或改用无需特权的TCP连接扫描方式（-sT）。"
      }
    ]
  },

  // 18. SHODAN
  "shodan": {
    "tagline": "面向互联网联网设备与外网暴露面的空间指纹搜索引擎。",
    "description": "Shodan是全球公认的互联设备资产搜索引擎，通过遍布全球的探测集群对公网地址进行持续轮询，收集服务器、工业控制系统（ICS/SCADA）、物联网设备及网络边界的响应指纹（Banner）。",
    "capabilities": [
      "直接调取全球预先索引的遥测档案，无需向目标资产直接发送数据包",
      "支持按端口、企业组织名称、地理区域、SSL证书序列号与设备型号精细过滤",
      "支持对企业所有的公网IP段开展长效暴露面自动化监控",
      "提供功能完备的官方命令行工具（CLI）与丰富的RESTful开发接口"
    ],
    "useCases": [
      "被动式摸排企事业单位在互联网上的资产分布与违规开放端口",
      "评估全球范围内特定高危服务、老旧协议及漏洞组件的泛滥程度"
    ],
    "requirements": ["Python 3+", "有效的Shodan个人API密钥"],
    "installationNotes": "使用CLI命令行工具前，请从个人Shodan账户中获取专属API密钥进行激活。",
    "quickStartNote": "使用个人API密钥初始化Shodan本地命令行环境。",
    "commands": [
      {
        "title": "查询指定IP的公网指纹",
        "description": "查看该公网IP已被索引的开放端口、SSL证书及历史CVE风险信息。"
      },
      {
        "title": "检索特定机构名下的联网设备",
        "description": "按所属企业名称查找其向公网开放的所有联网服务及对应主机。"
      }
    ]
  },

  // 19. THEHARVESTER
  "theharvester": {
    "tagline": "基于多源开源情报的邮箱、子域名、IP及员工姓名信息收集工具。",
    "description": "theHarvester是信息收集阶段不可或缺的Python基础工具，通过综合查询搜索引擎、PGP公钥库、Shodan、Bing等数十个公开信息源，快速收集目标组织的域名、邮箱账号、员工姓名与网络节点。",
    "capabilities": [
      "被动收集企事业单位的子域名及关联内部邮箱命名规则",
      "无缝整合数十个全球主流公开情报库与搜索引擎接口",
      "具备可选的活跃DNS递归解析能力，并支持导出为XML和JSON格式"
    ],
    "useCases": [
      "渗透测试前期的外部资产测绘与组织架构信息侦察",
      "检查企业内部员工账号与联系方式在互联网上的无意泄露情况"
    ],
    "requirements": ["Python 3.9+", "pip"],
    "quickStartNote": "调用配置好的检索源批量采集目标域名的关联邮箱与子域名。",
    "commands": [
      {
        "title": "针对目标域名的被动信息收集",
        "description": "在指定搜索引擎与数据平台上收集该域名的公开邮箱和子域名清单。"
      }
    ]
  },

  // 20. WAZUH
  "wazuh": {
    "tagline": "开源企业级安全防范、威胁检测与事件响应平台（XDR与SIEM）。",
    "description": "Wazuh是一款将扩展检测与响应（XDR）和安全信息与事件管理（SIEM）深度融合的企业级开源平台。它通过在终端部署轻量代理收集系统日志、检测入侵行为、监控文件完整性、核查合规性并实现实时阻断。",
    "capabilities": [
      "文件完整性实时监控（FIM），对关键系统文件被修改瞬时触发告警",
      "终端入侵检测、系统漏洞扫描以及异常安全基线偏差审计",
      "轻量级探针全面覆盖Linux、Windows、macOS、Docker及Kubernetes集群",
      "具备自动化主动防御联动响应机制，及时阻断被识别的恶意行为",
      "内置涵盖PCI DSS、HIPAA、GDPR以及CIS安全基准的权威合规看板"
    ],
    "useCases": [
      "企业安全运营中心（SOC）的日常安全态势大屏与入侵事件研判响应",
      "关键服务器群集的文件完整性合规监管与配置加固长效基线管理"
    ],
    "requirements": ["服务端推荐配置Linux系统（Ubuntu/Debian/RHEL）", "至少4GB运行内存"],
    "quickStartNote": "执行官方一键式快速安装脚本部署Wazuh Server全套中心服务。",
    "commands": [
      {
        "title": "检查本地探针服务连接状态",
        "description": "确认本机Wazuh Agent探针已正常联通服务端并持续传输遥测日志。"
      }
    ]
  },

  // 21. PESTUDIO
  "pestudio": {
    "tagline": "专用于Windows可执行程序深度静态分析与快速风险初筛的法医工具。",
    "description": "pestudio能够在无需实际执行目标文件的前提下，对Windows PE可执行程序进行全方位深度静态解析。细致分析文件头部、导入导出函数、动态链接库依赖、可疑字符串、资源节区及结构异常，快速评定恶意风险。",
    "capabilities": [
      "自动标注可疑API函数调用并指出PE文件头部的反常标记",
      "计算各节区信息熵值（Entropy），精准识别壳保护与数据混淆加密",
      "快速提取失陷威胁特征（IoCs）并自动比对已知威胁指纹库",
      "将提取出的可疑特征智能映射至MITRE ATT&CK战术与技术矩阵"
    ],
    "useCases": [
      "安全事件调查中对涉案可疑落地文件的初筛与安全评级",
      "安全实验室中对恶意载荷样本进行安全隔离状态下的静态代码解构"
    ],
    "requirements": ["Windows操作系统，或在Linux下通过Wine环境加载"],
    "quickStartNote": "启动pestudio图形界面，直接将待检测的PE可执行文件拖放至窗口中即可。"
  },

  // 22. MALTEGO
  "maltego": {
    "tagline": "面向网络威胁与开源情报调查的交互式图关联与可视化分析平台。",
    "description": "Maltego是全球广受认可的开源情报图形化关联分析系统。通过其庞大的实体转换库（Transforms），能够将人物、电子邮箱、域名、IP地址、基础设施与社交网络等离散情报直观转化为交互式关联图谱。",
    "capabilities": [
      "支持绘制呈现成千上万个关联节点的交互式图论网络模型",
      "聚合接入Shodan、VirusTotal、WhoisXML等数十个权威情报服务商",
      "深入剖析DNS解析、域名注册者、BGP路由宣告及区块链钱包间的隐秘关联",
      "快速生成适于呈报高管决策或用于法律司法举证的详细研判报告"
    ],
    "useCases": [
      "跨国网络犯罪组织、诈骗链路及黑产团伙基础设施图谱溯源",
      "大型企事业单位多维攻击面透视与关联资产拓扑调查"
    ],
    "requirements": ["Java运行环境（JRE 11+）"],
    "quickStartNote": "启动Maltego图形客户端，可自由选择Community社区版或授权企业版凭证。"
  },

  // 23. SPIDERFOOT
  "spiderfoot": {
    "tagline": "面向网络外围威胁情报与攻击面梳理的自动化开源情报搜集平台。",
    "description": "SpiderFoot能够对指定的调查目标（包括IP、域名、CIDR网段、电子邮箱、用户名等）自动开展情报搜集，集成200多个公开情报数据模块，全方位勾勒目标的潜在风险画像。",
    "capabilities": [
      "内置200多个情报自动化模块，覆盖权威威胁情报（Threat Intel）源",
      "自动排查泄露凭据、过期证书、错误配置的开发资产及暗网提及记录",
      "提供基于Web的交互式大屏展示与图谱网络可视化探索"
    ],
    "useCases": [
      "企事业单位互联网暴露攻击面的全周期自动化摸排与监控",
      "渗透测试前期针对目标资产网络画像的无人值守快速梳理"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "quickStartNote": "在本地5001端口拉起SpiderFoot的管理控制台服务。",
    "commands": [
      {
        "title": "启动SpiderFoot内置Web服务",
        "description": "开启本地Web交互界面，以便配置和执行各类自动化扫描方案。"
      }
    ]
  },

  // 24. RECON-NG
  "recon-ng": {
    "tagline": "具备高度可扩展模块化架构的全面网络侦察与情报分析框架。",
    "description": "Recon-ng是一款交互式开源侦察框架，其操作命令行设计与Metasploit高度相似。框架依托内部嵌入式SQLite关系型数据库，对企业、人员、主机、安全缺陷与DNS记录进行结构化关联存储。",
    "capabilities": [
      "模块化命令行控制台设计，提供标准化的API密钥中心化配置管理",
      "内置轻量级SQLite数据库，对调查中所获各项实体建立严密的关系模型",
      "拥有丰富的扩展插件库，无缝接入全球各类商业级与开源情报API接口"
    ],
    "useCases": [
      "针对大型组织网络空间拓扑开展结构化、工程化的情报调研",
      "把零散的多源侦察线索持久化沉淀至结构化关系数据库中统一分析"
    ],
    "requirements": ["Python 3.8+", "pip"],
    "quickStartNote": "进入Recon-ng交互式命令行控制台。",
    "commands": [
      {
        "title": "启动Recon-ng控制台",
        "description": "载入模块化运行环境并支持管理各个独立的侦察工作区（Workspace）。"
      }
    ]
  },

  // 25. AMASS
  "amass": {
    "tagline": "基于知识图谱的深度外部攻击面测绘与资产发现引擎。",
    "description": "OWASP Amass采用开源情报收集与主动解析技术，全面探测组织机构的外部网络空间资产。它通过构建严密的网络图谱模型，系统性关联子域名、自治系统号（ASN）、网络段及路由边界。",
    "capabilities": [
      "无缝整合数十种被动DNS记录源与证书透明度（CT）公开日志库",
      "提供主动字典爆破、智能名称变体置换以及多通道并发DNS解析校验",
      "将网络基础设施逻辑拓扑持久化存放于专用图数据库以供深度关联",
      "内置严格的泛解析检测机制，最大限度滤除由于通配符引发的虚假记录"
    ],
    "useCases": [
      "在大型合规红蓝演练中对超大规模跨国资产进行拉网式全景测绘",
      "深度挖掘业务更迭遗漏、未纳入统一运维监控的各类公网暴露资产"
    ],
    "requirements": ["Go 1.20+ 或对应平台预编译二进制程序"],
    "quickStartNote": "针对指定主域名执行基于纯被动源的子域名资产梳理任务。",
    "commands": [
      {
        "title": "纯被动子域名探测",
        "description": "完全不向目标授权DNS服务器直发请求的前提下静默梳理子域名资产。"
      },
      {
        "title": "包含ASN网络映射的深度测绘",
        "description": "全面查明子域名所归属的实际公网IP段与对应自治系统号（ASN）。"
      }
    ]
  },

  // 26. SUBFINDER
  "subfinder": {
    "tagline": "专为自动化安全流水线打造的高速被动子域名枚举利器。",
    "description": "Subfinder是ProjectDiscovery团队采用Go语言研发的现代化被动子域名枚举工具。设计上坚持极致速度与规避越界的理念，其运作完全依托公开被动源与证书透明度记录，不直接向目标基础设施发包。",
    "capabilities": [
      "专为集成进DevSecOps自动化安全测试流水线而优化的高性能设计",
      "开箱支持数十个权威被动情报平台与公共数据池接入",
      "标准化的输入输出协议，天然适配类Unix系统的管道（Pipeline）串联"
    ],
    "useCases": [
      "安全众测（Bug Bounty）与红队行动初期针对资产池的疾速预处理",
      "网络空间边界防御巡检中针对新增暴露子域名的轻量化快速普查"
    ],
    "requirements": ["Go 1.21+ 或对应平台预编译二进制程序"],
    "quickStartNote": "采用纯被动模式探测指定目标域名的子域，并在终端屏幕即时呈现。",
    "commands": [
      {
        "title": "标准被动子域名收集",
        "description": "调用所有可用被动通道枚举指定域名归属下的子域列表。"
      },
      {
        "title": "静默纯净模式（适合管道传参）",
        "description": "只输出纯文本域名清单，便于通过管道直接对接给Nuclei或httpx做后续处理。"
      }
    ]
  },

  // 27. MASSCAN
  "masscan": {
    "tagline": "互联网超高速端口扫描器 — 具备数分钟内遍历整个IPv4地址空间的能力。",
    "description": "Masscan是一款采用异步架构设计的TCP端口扫描软件，能够彻底绕过主机操作系统网络栈直接驱动网卡发送原始SYN数据包。在匹配的千兆/万兆带宽下，具备在数分钟内遍历整个公网IPv4的惊人吞吐力。",
    "capabilities": [
      "基于异步事件驱动的原始SYN半开探测技术，提供突破常规的吞吐表现",
      "命令选项语法与Nmap保持高度兼容，方便安全运维人员无门槛上手",
      "支持全局伪随机地址派发序列算法，避免瞬时流量集中引发单点网络拥塞"
    ],
    "useCases": [
      "对企事业单位所拥有的超大B段（/16）甚至A段（/8）IP池开展快速端口普查",
      "在大规模扫描作业中快速排查出存活端口，再交给Nmap展开精细探测"
    ],
    "requirements": ["libpcap-dev 类库", "系统超级管理员权限（root）"],
    "installationNotes": "借助libpcap构造原始SYN数据包时必须赋予root系统管理员特权。",
    "quickStartNote": "以每秒1000个数据包的安全速率对已获授权的局域网段探测80和443端口。",
    "commands": [
      {
        "title": "授权内网网段快速扫描",
        "description": "在可控的发包速率限制下快速排查指定IP网段的Web服务开放情况。"
      }
    ]
  },

  // 28. GOBUSTER
  "gobuster": {
    "tagline": "基于Go语言开发的高并发Web目录、DNS解析与虚拟主机爆破工具。",
    "description": "Gobuster是一款广受推崇的Go语言高并发命令行工具。专门利用字典爆破技术对Web服务器目录和文件路径、DNS解析子域名、HTTP头虚拟主机（vhost）以及云端存储桶进行穷举探测。",
    "capabilities": [
      "内置专精作业模式：dir（路径穷举）、dns（子域解析）、vhost（主机头）、s3（云存储）",
      "支持细粒度调节Goroutine并发协程数，最大化网络利用效率",
      "提供详尽的HTTP响应状态码及内容长度（Content-Length）过滤剔除规则"
    ],
    "useCases": [
      "排查Web站点根目录下遗留的备份文件、未受保护的管理后台与敏感接口",
      "识别共享Web服务器上配置不当但未在公共DNS公布的内部虚拟主机"
    ],
    "requirements": ["Go 1.20+ 或对应平台预编译二进制程序"],
    "quickStartNote": "依据本地预置字典对目标Web站点开展自动化敏感路径穷举扫描。",
    "commands": [
      {
        "title": "Web网站路径字典爆破",
        "description": "调用字典尝试猜解目标站点上隐藏或未列出的接口与内部目录。"
      },
      {
        "title": "DNS子域名字典解析",
        "description": "利用预置单词字典逐一向DNS服务器查询可能存在的子域名记录。"
      }
    ]
  },

  // 29. RUSTSCAN
  "rustscan": {
    "tagline": "采用Rust打造的现代化超高速端口扫描器，支持与Nmap无缝联动。",
    "description": "RustScan利用Rust语言成熟的异步I/O架构，能在数秒内瞬时扫完单机全部65535个TCP端口，并将排查出的全部开放端口自动无缝传递给Nmap，直接触发NSE深度指纹与版本探测。",
    "capabilities": [
      "借助现代化异步I/O机制，在极短时间内完成全量65535个端口快速排查",
      "检测完成后自动唤醒Nmap，仅针对开放端口发起定向精细脚本扫描",
      "具备自适应套接字并发调节能力，防止本地网络环境或系统文件句柄耗尽"
    ],
    "useCases": [
      "在安全攻防夺旗赛（CTF）及授权靶场环境下快速锁定全部开放端口",
      "替代传统耗时漫长的全端口初筛流程，大幅提速端口排查阶段"
    ],
    "requirements": ["Rust/Cargo 环境，或Docker镜像，或官方预编译二进制程序"],
    "quickStartNote": "全速检索目标主机的全量开放端口，并自动衔接Nmap启动服务识别。",
    "commands": [
      {
        "title": "RustScan高速探测并联动Nmap",
        "description": "先快速捕获存活开放端口，随后自动调用Nmap默认脚本进行版本深度识别。"
      }
    ]
  },

  // 30. NUCLEI
  "nuclei": {
    "tagline": "基于简明YAML模板构建的高速、可扩展、全自动化漏洞检测引擎。",
    "description": "Nuclei是由ProjectDiscovery推出的一款颠覆性的模板驱动型漏洞扫描平台。其基于极简易懂的社区开源YAML模板规则，能以极高并发与低误报率，快速排查已知高危CVE、配置失误及Web应用逻辑缺陷。",
    "capabilities": [
      "依托全球开源安全社区维护的超过5000份高质量YAML漏洞探测模板",
      "原生支持覆盖TCP、DNS、HTTP、SSL、File、WHOIS以及Websockets协议",
      "兼具超高并发吞吐能力与极佳的低误报率表现，非常契合资产扫描场景",
      "支持按危急程度级别（info、low、medium、high、critical）及标签定向过滤"
    ],
    "useCases": [
      "在突发披露高危0day/1day漏洞时，针对全网资产进行瞬时排查处置",
      "将全自动化安全测试无缝植入持续集成与交付（CI/CD）研发生命周期"
    ],
    "requirements": ["Go 1.21+ 或对应平台预编译二进制程序"],
    "quickStartNote": "自动联网同步更新最新社区模板库，并针对目标主机启动漏洞核查。",
    "commands": [
      {
        "title": "调用最新模板执行漏洞排查",
        "description": "对照官方维护的社区安全规则库，排查目标系统是否存在已知漏洞隐患。"
      },
      {
        "title": "仅筛选高危与严重级别规则",
        "description": "仅运行high和critical等级别的测试规则，便于应急响应时聚焦致命风险。"
      }
    ]
  },

  // 31. CAIDO
  "caido": {
    "tagline": "采用Rust全新重构打造的现代化、轻量化、高性能Web安全抓包代理工具。",
    "description": "Caido被视作新一代Web安全抓包工具中对标Burp Suite的现代化轻量级替代方案。其采用Rust打造高效后台服务，辅以美观现代的跨平台前端界面，专为现代化Web系统、微服务架构与REST/GraphQL API安全审计而设计。",
    "capabilities": [
      "底层依托Rust驱动的高效网络代理核心，CPU与运行内存开销远低于传统Java工具",
      "深度支持对HTTP/1.1及HTTP/2网络请求进行毫秒级精确拦截、篡改与重放",
      "内置易用的自动化安全检查工作流与支持高级逻辑过滤的搜索模块",
      "原生支持团队协同审计，并支持将核心扫描节点远程托管在服务器端"
    ],
    "useCases": [
      "现代Web系统、微服务体系及REST/GraphQL应用接口的深度安全审计",
      "越权访问漏洞（BOLA/IDOR）、业务逻辑缺陷与数据注入风险的抓包测试"
    ],
    "requirements": ["Linux、macOS 或 Windows 系统"],
    "quickStartNote": "启动Caido本地代理后台，在浏览器端信任其根证书后即可开始安全测试。"
  },

  // 32. WFUZZ
  "wfuzz": {
    "tagline": "适用于Web应用注入测试与隐藏参数暴力挖掘的灵巧Fuzzer工具。",
    "description": "Wfuzz是Web应用渗透测试中的经典模糊测试工具。它能够把请求报文中的FUZZ占位符动态替换为字典词条，协助安全分析人员挖掘未公开的隐藏API参数、测试表单字段、排查HTTP头注入与逻辑缺陷。",
    "capabilities": [
      "支持在单个HTTP请求中注入多个独立的模糊测试占位符（FUZZ、FUZ2Z）",
      "支持按HTTP状态码、响应行数、词数（Word Count）及字符数精细过滤结果",
      "原生支持HTTP基础认证、NTLM认证协议以及多级上游代理转发链"
    ],
    "useCases": [
      "挖掘Web接口与表单中隐藏的未公开参数名（Parameter Mining）",
      "注入特殊测试字符集以探查XSS跨站脚本与SQL结构性注入脆弱点"
    ],
    "requirements": ["Python 3+", "pip", "pycurl 依赖环境"],
    "quickStartNote": "结合本地字典对目标URL路径发起多线程模糊测试爆破。",
    "commands": [
      {
        "title": "挖掘未公开的隐藏GET参数",
        "description": "在网页URL中批量测试参数名称，并自动屏蔽返回404的无关响应。"
      }
    ]
  },

  // 33. METASPLOIT-FRAMEWORK
  "metasploit-framework": {
    "tagline": "全球应用最为广泛的渗透测试、漏洞实证与安全攻防验证框架。",
    "description": "Metasploit Framework为安全人员提供了完整的漏洞验证与利用生态。能够以负责任的态度在受控受限的环境中测试网络防护有效性、复现高危CVE漏洞并执行经验证的安全测试载荷。",
    "capabilities": [
      "囊括数千个经过权威工程验证的漏洞验证脚本、辅助扫描及后渗透功能模块",
      "提供功能强大且通信加密的Meterpreter交互式内存常驻安全载荷",
      "msfconsole集成统一的漏洞验证控制台、多工作区管理与关系型数据库支持",
      "支持通过编写Ruby脚本与资源自动化配置文件（.rc）进行无缝扩展定制"
    ],
    "useCases": [
      "在受控安全靶场与隔离演练环境中实证高危漏洞的可利用性与危害程度",
      "对抗演习中协助防守蓝队检验检测告警规则的有效性与应急响应预案"
    ],
    "requirements": ["Linux、macOS 或 Windows", "PostgreSQL（用于数据库加速支持）"],
    "quickStartNote": "进入Metasploit集成交互式管理控制台并连结本地数据库。",
    "commands": [
      {
        "title": "启动Metasploit集成控制台",
        "description": "加载MSF运行时执行环境及全部已集成的漏洞验证模块库。"
      },
      {
        "title": "调用辅助模块开展非侵入式核验",
        "description": "运行非破坏性检测脚本，精准核实目标系统所部署组件的版本及风险暴露。"
      }
    ]
  },

  // 34. BLOODHOUND
  "bloodhound": {
    "tagline": "基于图论算法揭示Active Directory及Azure/Entra ID攻击路径的拓扑分析工具。",
    "description": "BloodHound将图论数学模型引入网络安全分析，直观可视化呈现微软Active Directory（活动目录）及Azure/Entra ID云环境中的隐蔽权限关系，揭示看似毫无关联的ACL权限配置所串联出的越权攻击路径。",
    "capabilities": [
      "通过图形化拓扑图呈现域用户、安全组、域成员计算机及GPO权限间的关联链条",
      "自动化分析计算由低特权账户逐级越权跃升至域管（Domain Admin）的最短路径",
      "配套官方维护的高性能域内数据收集探针（SharpHound与AzureHound）",
      "协助企业防守运维人员精准铲除过度授权节点与高危ACL越权攻击路径"
    ],
    "useCases": [
      "企业活动目录架构深层安全审计与越权继承路径专项治理",
      "先于外部威胁发现并切断内部过宽授权与危险访问控制列表配置"
    ],
    "requirements": ["Neo4j 图数据库", "Node.js 环境（经典版）或 BloodHound CE 社区版"],
    "quickStartNote": "启动Neo4j后台数据库服务，随后运行BloodHound进入图形化分析大屏。",
    "commands": [
      {
        "title": "启动BloodHound客户端",
        "description": "打开分析界面并连接到已导入域拓扑数据的Neo4j图数据库后台。"
      }
    ]
  },

  // 35. MIMIKATZ
  "mimikatz": {
    "tagline": "专注于Windows内存凭据提取与认证机制安全性研究的经典探针工具。",
    "description": "由Benjamin Delpy倾力开发的Mimikatz是安全研究领域的划时代成果。它直观揭示了Windows认证体系在内存处理上的机制缺陷，支持从LSASS进程内存中提取明文密码、NTLM哈希、Kerberos票据以及数字证书密钥。",
    "capabilities": [
      "从LSASS进程内存中直接抓取当前会话凭据与NTLM哈希（sekurlsa::logonpasswords）",
      "实现Kerberos票据重放与伪造技术（Pass-the-Ticket、黄金票据、白银票据实证）",
      "将标记为不可导出的系统内部数字证书私钥完整导出以备核验",
      "为微软官方加固Windows凭据保护机制（如Credential Guard）提供重要研究依据"
    ],
    "useCases": [
      "在封闭安全实验室中演示凭据在系统内存中驻留所引发的安全风险",
      "开展主机身份认证防线审计，验证各类防凭据转储（Credential Dumping）机制的有效性"
    ],
    "requirements": ["Windows操作系统", "Administrator / SYSTEM 超级管理员权限"],
    "quickStartNote": "在已提升至管理员特权的命令提示符窗口中加载Mimikatz交互终端。",
    "commands": [
      {
        "title": "内存中活动凭据安全审计",
        "description": "开启调试特权并对测试机LSASS内存驻留凭据执行合规性安全抽检。"
      }
    ]
  },

  // 36. PEASS-NG
  "peass-ng": {
    "tagline": "多操作系统本地提权路径与安全缺陷自动化枚举工具集（LinPEAS/WinPEAS）。",
    "description": "PEASS-ng（Privilege Escalation Awesome Scripts Suite）是业界广受推崇的系统本地提权排查脚本套件。涵盖面向Linux/Unix系统的LinPEAS以及面向Windows系统的WinPEAS，深入排查文件权限、服务项、定时任务及系统错误配置。",
    "capabilities": [
      "自动化排查带有SUID特权位的文件、不安全的sudoers规则及危险的Linux Capabilities",
      "全盘检测Windows下未加引号的服务路径（Unquoted Paths）与高危自启动注册表项",
      "基于醒目多色高亮呈现检测结果，第一眼直接锁定极高危缺陷",
      "纯内存脚本运行方式，不强制向受评估的主机磁盘安装任何外部第三方软件"
    ],
    "useCases": [
      "服务器本地安全基线加固与配置漂移风险专项排查",
      "应急响应调查中对被入侵宿主机的本地缺陷进行快速回溯梳理"
    ],
    "requirements": ["Linux下的Bash环境，或Windows下的PowerShell/CMD环境"],
    "quickStartNote": "在Linux测试机上执行巡检脚本，根据终端颜色标识辨识高危安全风险。",
    "commands": [
      {
        "title": "执行Linux本地安全缺陷巡检",
        "description": "全面排查文件系统读写权限、sudo特权配置与内核安全参数的薄弱环节。"
      }
    ]
  },

  // 37. LAZAGNE
  "lazagne": {
    "tagline": "用于恢复并审计本地各软件所存储凭据的开源安全实用工具。",
    "description": "LaZagne是一款基于Python打造的后渗透阶段凭据审计工具。专门用于快速找回并检查存放在本地主流Web浏览器、邮件客户端、数据库管理工具、无线网络WiFi配置文件及常用通讯软件中的明文或可逆密码。",
    "capabilities": [
      "支持对数十款主流应用软件（Chrome、Firefox、Outlook、FileZilla等）提取保存的密码",
      "针对Windows、Linux及macOS平台分别提供定制化的专属凭据解析提取模块",
      "支持将审计排查出的密码列表规范导出为纯文本或结构化数据格式"
    ],
    "useCases": [
      "排查企业终端上因员工随手存储明文密码所带来的凭据失窃隐患",
      "在红蓝实战检验演练中对办公电脑面临的本地密码泄露面做实战评估"
    ],
    "requirements": ["Python 3 环境，或适用于Windows平台的单文件预编译可执行文件"],
    "quickStartNote": "启动所有内建密码检索模块，全面排查当前用户所存储的各类软件密码。",
    "commands": [
      {
        "title": "一键扫描审计本地保存的所有密码",
        "description": "对本机已安装的主流浏览器与常用工具执行全量已存密码安全提取检测。"
      }
    ]
  },

  // 38. VOLATILITY-3
  "volatility-3": {
    "tagline": "全球广受信赖的专业级开源物理内存取证与深入分析框架。",
    "description": "Volatility 3是对享誉全球的内存取证平台的一次彻底现代化重构。其全盘基于Python 3开发，能精准解析Windows、Linux及macOS系统在崩溃转储、休眠文件及物理内存镜像中的瞬态残留，排查复杂高级隐蔽木马与内核Rootkit。",
    "capabilities": [
      "重构进程生命周期树（pslist、pstree、psscan），识别断链隐匿进程",
      "逆向重建内存中残留的活跃网络套接字（netscan、netstat），精准归因对应PID",
      "检测复杂内存代码注入行为（malfind），精确定位具备RWX可执行属性的VAD内存段",
      "直接从内核原始数据结构中剥离注册表配置单元与SAM口令哈希"
    ],
    "useCases": [
      "针对无文件内存马（Fileless Malware）与LotL攻击的专业应急取证处置",
      "逆向取证内核级Rootkit潜伏隐患并从易失性RAM中恢复勒索软件解密密钥"
    ],
    "requirements": ["Python 3.9+", "pip", "已采集的物理内存镜像文件（.raw、.vmem、.dmp）"],
    "quickStartNote": "从采集的Windows内存镜像中还原并输出系统运行时的进程列表清单。",
    "commands": [
      {
        "title": "排查隐秘注入的异常代码段",
        "description": "扫描可疑进程的虚拟地址描述符（VAD），排查被恶意注入的未知可执行代码。"
      },
      {
        "title": "回溯取证瞬态网络连接状态",
        "description": "从内存数据池中提取转储瞬间处于监听中或已建立的网络TCP/UDP连接记录。"
      }
    ],
    "outputExplained": "windows.pslist标准输出涵盖：PID、PPID、ImageFileName映像名、Offset(V)内存偏移量、Threads线程数、Handles句柄数、SessionId会话ID、Wow64、CreateTime启动时间等。建议与psscan结果交叉比对，揪出被Rootkit断链伪装的恶意进程。",
    "troubleshooting": [
      {
        "issue": "提示对应系统内核版本的符号表文件缺失（Symbol table not found）",
        "resolution": "请从Volatility官方符号表仓库下载匹配系统具体构建版本号（Build Number）的JSON符号包放入symbols目录。"
      }
    ]
  },

  // 39. AUTOPSY
  "autopsy": {
    "tagline": "图形化专业数字电子数据司法鉴定取证与全盘镜像勘验平台。",
    "description": "Autopsy是建立在底层的The Sleuth Kit（TSK）取证核心之上的工业级电子数据鉴定图形分析软件。广泛配备于执法机关、司法鉴定中心及大型企业取证实验室，全面用于硬盘镜像、移动介质与文件系统结构勘查。",
    "capabilities": [
      "支持深度解析NTFS、FAT、ext2/3/4、APFS文件系统并有效还原已被删除的碎片文件",
      "自动提取浏览器历史记录、Cookie、电子邮件、聊天记录与多媒体EXIF拍摄信息",
      "提供图形化活动时间线（Timeline），将用户在计算机上的各项操作无缝串联还原",
      "具备模块化插件架构，支持机器学习辅助分类以及已知哈希数据库比对"
    ],
    "useCases": [
      "依照法定司法证据链规范开展计算机涉案介质勘验与电子数据司法鉴定",
      "安全事件调查溯源，确立不可抵赖的完整证据链条并出具专业审计报告"
    ],
    "requirements": ["Java 17+", "Windows、Linux 或 macOS 操作系统"],
    "quickStartNote": "启动Autopsy取证软件，新建一个案件并导入涉案电子证据镜像（.e01或.dd）。"
  },

  // 40. EXIFTOOL
  "exiftool": {
    "tagline": "跨平台的专业Perl脚本库与命令行工具，支持读写编辑各类多媒体元数据。",
    "description": "由Phil Harvey研发的ExifTool是多媒体元数据分析领域的权威工具。它能够高效读取、修改和擦除数百种文件格式（EXIF、IPTC、XMP、JFIF、GeoTIFF、ICC、ID3）内部潜藏的相机硬件序列号、GPS地理坐标、拍摄时间戳及修图软件版本痕迹。",
    "capabilities": [
      "解析图片（JPEG、TIFF、PNG）、办公文档（PDF、DOCX）、音视频的全部内嵌元数据",
      "提取照片中附带的精准GPS经度、纬度、海拔及精确时间戳，用于空间地理溯源",
      "在公开发布敏感文件前一键无损剥除所有内部元数据（-all=），杜绝隐私泄露",
      "无损导出相机原始固件制造商独有备注（MakerNotes）及内嵌缩略图"
    ],
    "useCases": [
      "涉案数字证据照片、多媒体素材与电子文档的司法真伪鉴定与源头推断",
      "安全研究人员公开发表分析成果前，彻底净化文件元数据以保障自身安全（OPSEC）"
    ],
    "requirements": ["Perl 5.004 或更高版本（绝大多数UNIX/Linux发行版已预装）"],
    "quickStartNote": "全面读取并打印输出目标图片或文件内部所嵌入的全部EXIF、XMP及IPTC标签。",
    "commands": [
      {
        "title": "精准提取GPS定位与拍摄器材信息",
        "description": "提取照片中记录的GPS经纬度地理坐标以及相机品牌与具体机型标识。"
      },
      {
        "title": "彻底清除当前目录下所有图片的元数据",
        "description": "一键抹除全部EXIF元数据标签以保护调查研究人员的自身隐私安全。"
      }
    ]
  },

  // 41. VELOCIRAPTOR
  "velociraptor": {
    "tagline": "集大规模终端能见度、威胁狩猎与即时应急响应于一体的现代化DFIR平台。",
    "description": "Velociraptor是一款具备超凡性能的企业级终端数字化巡检与取证平台。凭借其高度表达力的VQL（Velociraptor查询语言），数字取证与应急响应（DFIR）专家可以像查询关系型数据库一样，同时向数以万计的在线终端并发下发复杂取证指令。",
    "capabilities": [
      "采用灵活的VQL声明式语言，支持按需快速定制高度灵活的威胁狩猎探测规则",
      "面向跨地域大规模终端集群实现秒级的取证调查与关键特征即时收集",
      "对操作系统底层内核事件与进程异动实施低开销的全天候实时监控",
      "通信全流程通过高强度公钥证书实现端对端双向加密与受控传输"
    ],
    "useCases": [
      "大型跨国企业级网络环境下的全网主动式高级持续性威胁狩猎（Threat Hunting）",
      "严重网络安全入侵事件中，对涉事的大批终端设备开展第一时间的快速应急取证"
    ],
    "requirements": ["适用于Linux、Windows或macOS的单文件独立运行程序"],
    "quickStartNote": "在本地8889端口启动内置图形化管理控制台以供调试VQL规则。",
    "commands": [
      {
        "title": "启动本地图形化管理控制台",
        "description": "进入本地Web交互管理界面，开展VQL语法测试并编写定制化取证组件。"
      }
    ]
  },

  // 42. KAPE
  "kape": {
    "tagline": "面向Windows系统的高速数字化取证痕迹定向采集与自动化解析工具。",
    "description": "KAPE（Kroll Artifact Parser and Extractor）是Windows取证领域广受推崇的快速分流（Triage）利器。能够在耗时数小时进行全盘镜像之前，在数分钟之内精准锁定、提取并解析价值最高的关键取证痕迹（如MFT、注册表、系统事件日志、Prefetch等）。",
    "capabilities": [
      "通过卷影副本技术（VSS）绕过系统锁定，安全提取被占用的核心取证痕迹文件",
      "自动化将采集到的二进制证据转交数十个专业取证模块展开链式解析",
      "快速输出结构化CSV报表与纯文本报告，供调查人员第一时间研判"
    ],
    "useCases": [
      "应急响应黄金窗口期，对数十台涉案主机无法做全盘克隆时的极速取证分流",
      "统一标准化跨部门、多终端安全事件取证证据搜集作业流程"
    ],
    "requirements": ["Windows 7 / Server 2008 R2 或更高版本", ".NET Framework 4.5+"],
    "quickStartNote": "双击运行gkape.exe调出图形界面，或在终端中以命令行模式直接执行kape.exe。"
  },

  // 43. DOCKER-EXPLOITATION-FRAMEWORK
  "docker-exploitation-framework": {
    "tagline": "专用于容器环境安全加固、特权审计与逃逸防护验证的实验靶场框架。",
    "description": "Docker Exploitation Framework是一个面向容器安全研究与防御加固的体系化评估平台。专门用于协助安全团队核查Docker与Kubernetes环境中的过宽特权配置、危险的宿主机套接字挂载（/var/run/docker.sock）以及容器隔离缺陷。",
    "capabilities": [
      "自动化识别宿主机敏感卷挂载、危险端口暴露与不可靠的环境配置",
      "排查容器被赋予的Linux高危内核Capabilities能力（如CAP_SYS_ADMIN）",
      "检测网络命名空间（Namespace）隔离以及cgroups资源限制防护水准"
    ],
    "useCases": [
      "企业生产级容器集群上线前合规安全基线审计与容器加固（Hardening）",
      "在受控封闭环境中验证容器沙箱隔离强度与纵深防御措施的有效性"
    ],
    "requirements": ["Docker Engine 运行环境", "Linux 操作系统"],
    "quickStartNote": "启动诊断评估容器以检测当前容器运行环境及宿主机安全基线配置。",
    "commands": [
      {
        "title": "审计容器内部特权能力与挂载状态",
        "description": "检测容器环境被赋予的底层内核Capability特权与宿主机卷挂载安全性。"
      }
    ]
  },

  // 44. GATO
  "gato": {
    "tagline": "针对GitHub自托管运行器（Runners）与CI/CD流水线的安全审计工具。",
    "description": "Gato（Github Attack ToolKit）由知名安全机构Praetorian团队开发，专用于评估GitHub Actions及CI/CD持续集成流水线的防护态势。它能系统性发现配置不当、面临潜在非受控执行风险的自托管Runner，以及存在权限溢出隐患的仓库配置。",
    "capabilities": [
      "自动化枚举目标GitHub组织及指定代码仓库下挂载的自托管Runner运行器",
      "检测流水线中泄露的敏感凭据以及存在过度授权风险的CI/CD自动化Token",
      "为防守蓝队提供针对软件构建环境和流水线工作流隔离的切实加固建议"
    ],
    "useCases": [
      "企业软件供应链安全（DevSecOps/CI/CD）防线巡检与配置基线审计",
      "排查公共开源仓库中因挂载自托管构建机而引发的越权执行安全漏洞"
    ],
    "requirements": ["Python 3.8+", "pip", "有效的GitHub个人访问令牌（PAT）"],
    "quickStartNote": "枚举并评估指定GitHub组织下关联的全部代码仓库与Runner运行器状态。",
    "commands": [
      {
        "title": "审计特定GitHub组织下的Runner配置",
        "description": "全面扫描指定企业组织下的公共代码仓库，梳理自托管Runner的配置风险。"
      }
    ]
  }
};
