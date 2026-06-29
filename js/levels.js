/* ========================================
   关卡数据配置 (levels.js)
   包含2大主题 × 5关 = 10个关卡的完整配置
   ======================================== */

const GAME_CONFIG = {
  // 游戏规则配置
  rules: {
    scorePerFound: 100,     // 每找到一个隐患的得分
    penaltyPerWrong: -20,   // 点错的扣分
    passThreshold: 0.7,     // 通关阈值（找到70%以上）
    starThresholds: [0.6, 0.75, 0.9, 1.0], // 星级阈值
    timeBonusPerSecond: 5   // 每秒剩余时间奖励分数
  },

  // 主题配置
  themes: {
    info_sec: {
      id: 'info_sec',
      name: '信息安全',
      icon: '💻',
      color: '#6366F1',
      description: '识别信息安全隐患，守护数据安全防线',
      
      levels: {
        1: {
          id: 'info_1',
          name: '办公桌隐患',
          image: 'assets/images/info/level1.jpg',
          timeLimit: 70,
          hintCount: 3,
          
          hazards: [
            {
              id: 'info_1_01',
              name: '人离开工位未锁屏',
              shape: 'circle',
              position: { xPercent: 30.36, yPercent: 29.54, radiusPercent: 19.01 },
              correctAction: '离开工位时应立即锁屏（Win+L），防止他人操作电脑或查看敏感信息',
              riskLevel: 'high',
              category: '账号安全',
              tip: '未锁屏的电脑等于敞开的大门，任何人都能访问'
            },
            {
              id: 'info_1_02',
              name: '便签贴明文密码(123456)',
              shape: 'circle',
              position: { xPercent: 16.03, yPercent: 46.55, radiusPercent: 7.08 },
              correctAction: '密码绝对不能写在便签上贴在显示器旁，应使用密码管理器安全存储',
              riskLevel: 'high',
              category: '账号安全',
              tip: '写在便签上的密码任何人经过都能看到'
            },
            {
              id: 'info_1_03',
              name: '敏感文件随意摆放',
              shape: 'circle',
              position: { xPercent: 8.43, yPercent: 60.88, radiusPercent: 10.3 },
              correctAction: '含有敏感信息的纸质文件应锁入文件柜，电子文件应加密存储',
              riskLevel: 'medium',
              category: '文档安全',
              tip: '随意摆放的敏感文件可能被拍照或拿走'
            },
            {
              id: 'info_1_04',
              name: '手机连接公共WiFi',
              shape: 'circle',
              position: { xPercent: 24.22, yPercent: 72.27, radiusPercent: 9.72 },
              correctAction: '公共WiFi不安全，处理敏感信息应使用公司VPN或移动热点，手机不应显示"公共WiFi"',
              riskLevel: 'high',
              category: '网络安全',
              tip: '公共WiFi易遭中间人攻击，数据可能被截获'
            },
            {
              id: 'info_1_05',
              name: 'USB设备随意插入主机',
              shape: 'circle',
              position: { xPercent: 85.33, yPercent: 35.65, radiusPercent: 7.95 },
              correctAction: '不明的USB设备可能携带病毒，禁止随意插入工作电脑',
              riskLevel: 'high',
              category: '设备安全',
              tip: 'USB病毒可导致整个内网感染和数据泄露'
            }
          ]
        },

        2: {
          id: 'info_2',
          name: '文件与设备安全',
          image: 'assets/images/info/level2.jpg',
          timeLimit: 70,
          hintCount: 3,
          
          hazards: [
            {
              id: 'info_2_01',
              name: '废弃文件未粉碎',
              position: { xPercent: 15, yPercent: 55, radiusPercent: 5 },
              correctAction: '含敏感信息的废弃文件应使用碎纸机销毁，不可直接丢弃',
              riskLevel: 'medium',
              category: '文档安全',
              tip: '废弃文件是信息泄露的重要渠道之一'
            },
            {
              id: 'info_2_02',
              name: '共享账号密码',
              position: { xPercent: 55, yPercent: 30, radiusPercent: 5 },
              correctAction: '账号密码不得多人共享，每人应有独立账号并定期更换密码',
              riskLevel: 'high',
              category: '账号安全',
              tip: '共享账号无法追溯操作责任，增加安全风险'
            },
            {
              id: 'info_2_03',
              name: '手机放置桌面无保护',
              position: { xPercent: 82, yPercent: 42, radiusPercent: 5 },
              correctAction: '手机应设置锁屏密码，离开时随身携带或锁入抽屉',
              riskLevel: 'medium',
              category: '移动设备安全',
              tip: '手机存储大量工作信息，丢失后果严重'
            },
            {
              id: 'info_2_04',
              name: '打印机输出未及时取走',
              position: { xPercent: 28, yPercent: 78, radiusPercent: 5 },
              correctAction: '打印后应立即取回文件，敏感信息建议使用安全打印功能',
              riskLevel: 'medium',
              category: '文档安全',
              tip: '打印机旁的文件常被遗忘或误取'
            },
            {
              id: 'info_2_05',
              name: '软件自动记住密码',
              position: { xPercent: 62, yPercent: 58, radiusPercent: 4 },
              correctAction: '浏览器/软件不应勾选"记住密码"，重要账号使用独立密码管理器',
              riskLevel: 'medium',
              category: '账号安全',
              tip: '自动保存的密码容易被他人获取'
            },
            {
              id: 'info_2_06',
              name: '工作电脑安装游戏软件',
              position: { xPercent: 40, yPercent: 18, radiusPercent: 5 },
              correctAction: '工作电脑应只安装工作必需软件，避免来源不明的游戏或破解软件',
              riskLevel: 'high',
              category: '终端安全',
              tip: '非正规软件可能捆绑恶意代码'
            }
          ]
        },

        3: {
          id: 'info_3',
          name: '会议泄密风险',
          image: 'assets/images/info/level3.jpg',
          timeLimit: 60,
          hintCount: 2,
          
          hazards: [
            {
              id: 'info_3_01',
              name: '会议室白板内容未擦除',
              position: { xPercent: 50, yPercent: 35, radiusPercent: 6 },
              correctAction: '会议结束后应及时擦除白板内容，重要信息不应长时间保留',
              riskLevel: 'medium',
              category: '信息安全意识',
              tip: '白板上的敏感信息可能被后来者看到'
            },
            {
              id: 'info_3_02',
              name: '会议中拍摄屏幕内容',
              position: { xPercent: 75, yPercent: 52, radiusPercent: 5 },
              correctAction: '未经许可不得对会议屏幕、文档进行拍照，防止信息外泄',
              riskLevel: 'high',
              category: '信息安全意识',
              tip: '照片容易通过网络快速传播'
            },
            {
              id: 'info_3_03',
              name: '讨论敏感话题声音过大',
              position: { xPercent: 25, yPercent: 60, radiusPercent: 5 },
              correctAction: '在公共区域讨论敏感信息时应降低音量，或移至私密空间',
              riskLevel: 'medium',
              category: '信息安全意识',
              tip: '隔墙有耳，公共区域谈话需谨慎'
            },
            {
              id: 'info_3_04',
              name: '会议材料散落桌面',
              position: { xPercent: 38, yPercent: 78, radiusPercent: 5 },
              correctAction: '会议结束后应回收所有材料，特别是含数据的纸质文档',
              riskLevel: 'medium',
              category: '文档安全',
              tip: '散落的材料最容易被遗忘带走'
            },
            {
              id: 'info_3_05',
              name: '视频会议背景暴露信息',
              position: { xPercent: 65, yPercent: 25, radiusPercent: 5 },
              correctAction: '视频会议应使用虚拟背景或确保身后无敏感信息展示',
              riskLevel: 'medium',
              category: '远程办公安全',
              tip: '摄像头可能拍到不该公开的内容'
            },
            {
              id: 'info_3_06',
              name: '访客无人陪同进入',
              position: { xPercent: 18, yPercent: 40, radiusPercent: 5 },
              correctAction: '外部访客进入办公区应有专人全程陪同，防止接触敏感区域',
              riskLevel: 'high',
              category: '物理安全',
              tip: '社会工程攻击常利用访客身份'
            },
            {
              id: 'info_3_07',
              name: '会议记录通过个人邮箱发送',
              position: { xPercent: 58, yPercent: 72, radiusPercent: 5 },
              correctAction: '工作文件应通过企业邮箱或内部系统发送，禁用个人邮箱传输工作信息',
              riskLevel: 'high',
              category: '数据传输安全',
              tip: '个人邮箱安全性低，且不受公司管控'
            }
          ]
        },

        4: {
          id: 'info_4',
          name: '网络钓鱼陷阱',
          image: 'assets/images/info/level4.jpg',
          timeLimit: 60,
          hintCount: 2,
          
          hazards: [
            {
              id: 'info_4_01',
              name: '可疑邮件点击链接',
              position: { xPercent: 45, yPercent: 28, radiusPercent: 5 },
              correctAction: '收到可疑邮件不点击链接、不下载附件，应报告给IT安全部门',
              riskLevel: 'high',
              category: '钓鱼防范',
              tip: '钓鱼邮件是最常见的网络攻击手段'
            },
            {
              id: 'info_4_02',
              name: '仿冒网站输入账号',
              position: { xPercent: 58, yPercent: 55, radiusPercent: 5 },
              correctAction: '登录前仔细检查网址是否正确，警惕仿冒网站的细微差别',
              riskLevel: 'high',
              category: '钓鱼防范',
              tip: '钓鱼网站常模仿知名网站骗取账号'
            },
            {
              id: 'info_4_03',
              name: '紧急转账要求未核实',
              position: { xPercent: 32, yPercent: 68, radiusPercent: 5 },
              correctAction: '任何涉及资金转账的要求都应通过电话等第二渠道核实对方身份',
              riskLevel: 'critical',
              category: '社会工程学',
              tip: '冒充领导诈骗损失巨大，务必核实'
            },
            {
              id: 'info_4_04',
              name: '下载不明附件',
              position: { xPercent: 72, yPercent: 40, radiusPercent: 5 },
              correctAction: '不明的邮件附件可能含勒索病毒，打开前应先进行安全扫描',
              riskLevel: 'critical',
              category: '恶意软件防范',
              tip: '勒索病毒可导致全部数据被加密'
            },
            {
              id: 'info_4_05',
              name: '二维码扫码无确认',
              position: { xPercent: 22, yPercent: 48, radiusPercent: 5 },
              correctAction: '扫描二维码前确认来源可靠，不扫来历不明的二维码',
              riskLevel: 'high',
              category: '移动安全',
              tip: '恶意二维码可能引导至钓鱼网站或下载病毒'
            },
            {
              id: 'info_4_06',
              name: '使用相同密码多平台',
              position: { xPercent: 78, yPercent: 75, radiusPercent: 5 },
              correctAction: '不同平台应使用不同密码，重要账户启用双因素认证(2FA)',
              riskLevel: 'high',
              category: '账号安全',
              tip: '撞库攻击利用相同密码批量尝试'
            },
            {
              id: 'info_4_07',
              name: '系统提示忽略更新',
              position: { xPercent: 15, yPercent: 22, radiusPercent: 5 },
              correctAction: '系统和软件更新包含安全补丁，应及时安装，不要长期忽略更新提醒',
              riskLevel: 'medium',
              category: '终端安全',
              tip: '已知漏洞会被黑客利用攻击未更新系统'
            },
            {
              id: 'info_4_08',
              name: 'U盘来源不明即使用',
              position: { xPercent: 48, yPercent: 82, radiusPercent: 5 },
              correctAction: '捡到或收到的U盘不要插入电脑，可能预装了自动运行的恶意程序',
              riskLevel: 'critical',
              category: '设备安全',
              tip: '投放恶意U盘是常见的渗透测试手段'
            }
          ]
        },

        5: {
          id: 'info_5',
          name: '信息安全综合演练',
          image: 'assets/images/info/level5.jpg',
          timeLimit: 55,
          hintCount: 1,
          
          hazards: [
            {
              id: 'info_5_01',
              name: '弱密码（123456）',
              position: { xPercent: 25, yPercent: 18, radiusPercent: 4 },
              correctAction: '密码应至少8位，包含大小写字母、数字和特殊字符，避免常见弱密码',
              riskLevel: 'high',
              category: '账号安全',
              tip: '123456是最常用的弱密码，秒破'
            },
            {
              id: 'info_5_02',
              name: '将密码写在便签贴显示器',
              position: { xPercent: 70, yPercent: 15, radiusPercent: 4 },
              correctAction: '密码绝对不能写在可见位置，应使用密码管理器加密存储',
              riskLevel: 'critical',
              category: '账号安全',
              tip: '这是最常见的密码泄露方式'
            },
            {
              id: 'info_5_03',
              name: '工作电脑无杀毒软件',
              position: { xPercent: 42, yPercent: 35, radiusPercent: 5 },
              correctAction: '所有工作电脑必须安装企业级杀毒软件并及时更新病毒库',
              riskLevel: 'high',
              category: '终端安全',
              tip: '无防护的电脑是黑客的突破口'
            },
            {
              id: 'info_5_04',
              name: '敏感数据存于个人云盘',
              position: { xPercent: 18, yPercent: 55, radiusPercent: 5 },
              correctAction: '公司数据只能存储在公司批准的系统或服务器，禁止上传个人云盘',
              riskLevel: 'critical',
              category: '数据安全',
              tip: '个人云盘不符合企业安全合规要求'
            },
            {
              id: 'info_5_05',
              name: '离职员工账号未注销',
              position: { xPercent: 82, yPercent: 42, radiusPercent: 5 },
              correctAction: '员工离职时应立即注销其所有系统访问权限，防止权限滥用',
              riskLevel: 'high',
              category: '权限管理',
              tip: '幽灵账号是严重的安全隐患'
            },
            {
              id: 'info_5_06',
              name: '垃圾桶未销毁敏感纸',
              position: { xPercent: 35, yPercent: 75, radiusPercent: 5 },
              correctAction: '含客户信息、财务数据等的纸张必须碎纸后丢弃',
              riskLevel: 'medium',
              category: '文档安全',
              tip: '翻找垃圾桶是获取信息的老手段'
            },
            {
              id: 'info_5_07',
              name: '微信/QQ传工作文件',
              position: { xPercent: 62, yPercent: 62, radiusPercent: 5 },
              correctAction: '工作文件应通过企业IM或内部系统传输，社交软件存在泄露风险',
              riskLevel: 'high',
              category: '数据传输安全',
              tip: '即时通讯工具聊天记录可能被同步云端'
            },
            {
              id: 'info_5_08',
              name: '开放远程桌面端口',
              position: { xPercent: 55, yPercent: 85, radiusPercent: 5 },
              correctAction: '不必要时不开放远程端口，如需开启应限制IP范围并使用强密码',
              riskLevel: 'critical',
              category: '网络安全',
              tip: '开放的3389端口是勒索病毒的常用入口'
            },
            {
              id: 'info_5_09',
              name: '备份策略缺失',
              position: { xPercent: 12, yPercent: 88, radiusPercent: 5 },
              correctAction: '重要数据应实施3-2-1备份策略：3份副本、2种介质、1个异地',
              riskLevel: 'high',
              category: '业务连续性',
              tip: '无备份的数据一旦丢失无法恢复'
            }
          ]
        }
      }
    },

    ground_sec: {
      id: 'ground_sec',
      name: '地面安全',
      icon: '🚧',
      color: '#EF4444',
      description: '排查地面作业隐患，保障运行安全',
      
      levels: {
        1: {
          id: 'ground_1',
          name: '办公室消防安全',
          image: 'assets/images/ground/level1.jpg',
          timeLimit: 70,
          hintCount: 3,
          
          hazards: [
            {
              id: 'ground_1_01',
              name: '插座串联（排插接排插）',
              shape: 'circle',
              position: { xPercent: 20.94, yPercent: 66.65, radiusPercent: 7.85 },
              correctAction: '严禁插座串联使用，一个固定插座只能连接一个合格排插，避免过载引发火灾',
              riskLevel: 'high',
              category: '用电安全',
              tip: '串联插座导致电流超负荷，是办公室火灾主因之一'
            },
            {
              id: 'ground_1_02',
              name: '办公室内吸烟（烟头未灭）',
              shape: 'circle',
              position: { xPercent: 25.85, yPercent: 47.03, radiusPercent: 6.51 },
              correctAction: '办公区域全面禁烟，烟头必须完全熄灭后投入专用烟灰缸，禁止随手丢弃',
              riskLevel: 'critical',
              category: '消防安全',
              tip: '烟头中心温度高达800°C，引燃纸张仅需数秒'
            },
            {
              id: 'ground_1_03',
              name: '消防通道堆放杂物',
              shape: 'circle',
              position: { xPercent: 54.53, yPercent: 49.83, radiusPercent: 8.16 },
              correctAction: '消防通道必须保持畅通无阻，宽度不少于1.2米，严禁堆放纸箱、桌椅等任何物品',
              riskLevel: 'critical',
              category: '消防安全',
              tip: '堵塞通道会延误逃生和救援时间，曾造成重大伤亡'
            },
            {
              id: 'ground_1_04',
              name: '安全出口门上锁',
              shape: 'circle',
              position: { xPercent: 76.42, yPercent: 51.92, radiusPercent: 7.06 },
              correctAction: '安全出口门在任何时候都应能从内部轻易推开打开，禁止上锁或用物品堵住',
              riskLevel: 'critical',
              category: '消防安全',
              tip: '锁闭的安全出口曾导致多起群死群伤事故'
            },
            {
              id: 'ground_1_05',
              name: '灭火器过期且被杂物遮挡',
              shape: 'circle',
              position: { xPercent: 86.98, yPercent: 81.74, radiusPercent: 15.76 },
              correctAction: '灭火器应每月检查压力表是否在绿色区域，定期更换，且周围0.5米内不得有遮挡物',
              riskLevel: 'high',
              category: '消防安全',
              tip: '过期或被遮挡的灭火器等于形同虚设'
            },
            {
              id: 'ground_1_06',
              name: '电线老化破损裸露',
              shape: 'circle',
              position: { xPercent: 71.7, yPercent: 13.39, radiusPercent: 21.08 },
              correctAction: '发现电线绝缘层老化、开裂、裸露应立即停止使用并报电工更换，禁止用胶带临时缠绕',
              riskLevel: 'high',
              category: '用电安全',
              tip: '裸露电线可能触电伤人，也可能短路起火'
            }
          ]
        },

        2: {
          id: 'ground_2',
          name: '装卸作业规范',
          image: 'assets/images/ground/level2.jpg',
          timeLimit: 70,
          hintCount: 3,
          
          hazards: [
            {
              id: 'ground_2_01',
              name: '搬运重物姿势不当',
              position: { xPercent: 45, yPercent: 55, radiusPercent: 5 },
              correctAction: '搬运重物应屈膝下蹲，背部挺直，利用腿部力量而非腰部力量',
              riskLevel: 'medium',
              category: '人体工学',
              tip: '腰伤是长期累积的职业病'
            },
            {
              id: 'ground_2_02',
              name: '货物堆放超高不稳',
              position: { xPercent: 68, yPercent: 35, radiusPercent: 5 },
              correctAction: '货物堆放高度不得超过规定限高，重物放下层，保持重心稳定',
              riskLevel: 'high',
              category: '货物安全',
              tip: '倒塌的货物可造成严重伤害'
            },
            {
              id: 'ground_2_03',
              name: '叉车行驶区域人车混行',
              position: { xPercent: 28, yPercent: 68, radiusPercent: 5 },
              correctAction: '叉车作业区域应划定专用通道，行人与车辆分道，设置警示标识',
              riskLevel: 'high',
              category: '车辆安全',
              tip: '叉车盲区大，碰撞事故多发'
            },
            {
              id: 'ground_2_04',
              name: '劳保用品穿戴不全',
              position: { xPercent: 75, yPercent: 62, radiusPercent: 5 },
              correctAction: '作业区域必须按规定穿戴安全帽、反光背心、防护鞋等劳动防护用品',
              riskLevel: 'high',
              category: 'PPE使用',
              tip: '90%的伤害可通过正确佩戴PPE避免'
            },
            {
              id: 'ground_2_05',
              name: '托盘破损仍使用',
              position: { xPercent: 18, yPercent: 42, radiusPercent: 5 },
              correctAction: '破损、开裂的托盘应立即报废，禁止继续使用以防货物坠落伤人',
              riskLevel: 'medium',
              category: '设备安全',
              tip: '超期使用的托盘随时可能断裂'
            },
            {
              id: 'ground_2_06',
              name: '夜间作业照明不足',
              position: { xPercent: 55, yPercent: 82, radiusPercent: 5 },
              correctAction: '夜间或光线不足区域作业应增设临时照明，确保作业面照度达标',
              riskLevel: 'medium',
              category: '环境安全',
              tip: '视线不良是事故的高发因素'
            }
          ]
        },

        3: {
          id: 'ground_3',
          name: '设备操作防护',
          image: 'assets/images/ground/level3.jpg',
          timeLimit: 60,
          hintCount: 2,
          
          hazards: [
            {
              id: 'ground_3_01',
              name: '设备旋转部位无防护罩',
              position: { xPercent: 52, yPercent: 40, radiusPercent: 5 },
              correctAction: '传送带、齿轮等旋转部件必须安装牢固的防护罩，防止衣物卷入',
              riskLevel: 'critical',
              category: '机械安全',
              tip: '机械伤害往往造成肢体残缺'
            },
            {
              id: 'ground_3_02',
              name: '操作设备时戴手套',
              position: { xPercent: 35, yPercent: 58, radiusPercent: 5 },
              correctAction: '操作旋转设备时严禁戴手套，手套可能被卷入造成严重伤害',
              riskLevel: 'critical',
              category: '操作规范',
              tip: '手套卷入比徒手更危险'
            },
            {
              id: 'ground_3_03',
              name: '设备运行中维修保养',
              position: { xPercent: 72, yPercent: 52, radiusPercent: 5 },
              correctAction: '设备维修必须执行"挂牌上锁"(LOTO)程序，切断能源后方可作业',
              riskLevel: 'critical',
              category: '维修安全',
              tip: '带电/带压作业是致命违规行为'
            },
            {
              id: 'ground_3_04',
              name: '急停按钮被遮挡',
              position: { xPercent: 22, yPercent: 72, radiusPercent: 4 },
              correctAction: '急停按钮位置应醒目可达，周围0.5米内不得有任何遮挡物',
              riskLevel: 'high',
              category: '应急设施',
              tip: '紧急情况找不到急停按钮后果严重'
            },
            {
              id: 'ground_3_05',
              name: '电气线路裸露老化',
              position: { xPercent: 62, yPercent: 78, radiusPercent: 5 },
              correctAction: '发现电线绝缘层破损、老化应立即停用并报电工更换，禁止临时接线',
              riskLevel: 'high',
              category: '用电安全',
              tip: '漏电可致命，触电事故死亡率极高'
            },
            {
              id: 'ground_3_06',
              name: '压力容器安全阀失效',
              position: { xPercent: 15, yPercent: 35, radiusPercent: 5 },
              correctAction: '压力容器的安全阀、压力表应定期校验，发现异常立即停止使用',
              riskLevel: 'critical',
              category: '特种设备',
              tip: '压力容器爆炸威力巨大'
            },
            {
              id: 'ground_3_07',
              name: '噪音超标未佩戴耳塞',
              position: { xPercent: 80, yPercent: 68, radiusPercent: 5 },
              correctAction: '噪音超过85分贝的区域必须佩戴听力防护用品，防止永久性听力损伤',
              riskLevel: 'medium',
              category: '职业健康',
              tip: '噪声性耳聋是不可逆的损伤'
            }
          ]
        },

        4: {
          id: 'ground_4',
          name: '特种作业高风险',
          image: 'assets/images/ground/level4.jpg',
          timeLimit: 60,
          hintCount: 2,
          
          hazards: [
            {
              id: 'ground_4_01',
              name: '高空作业未系安全带',
              position: { xPercent: 48, yPercent: 25, radiusPercent: 5 },
              correctAction: '2米以上高处作业必须系挂安全带，高挂低用，挂在牢固构件上',
              riskLevel: 'critical',
              category: '高处作业',
              tip: '坠落是建筑行业第一杀手'
            },
            {
              id: 'ground_4_02',
              name: '动火作业无监护人在场',
              position: { xPercent: 65, yPercent: 55, radiusPercent: 5 },
              correctAction: '焊接切割等动火作业必须有专人监护，配备灭火器材，清理周边可燃物',
              riskLevel: 'critical',
              category: '动火作业',
              tip: '火花飞溅可引燃远处可燃物'
            },
            {
              id: 'ground_4_03',
              name: '有限空间未检测即进入',
              position: { xPercent: 28, yPercent: 65, radiusPercent: 5 },
              correctAction: '进入储罐、管道等有限空间前必须检测氧气和有害气体浓度，通风合格方可进入',
              riskLevel: 'critical',
              category: '有限空间',
              tip: '有限空间事故死亡率超过50%'
            },
            {
              id: 'ground_4_04',
              name: '起重作业站在吊物下方',
              position: { xPercent: 55, yPercent: 78, radiusPercent: 5 },
              correctAction: '起重吊装时严禁人员站在吊物下方或吊物移动路径上，设立警戒区',
              riskLevel: 'critical',
              category: '起重安全',
              tip: '吊物坠落冲击力足以致命'
            },
            {
              id: 'ground_4_05',
              name: '临时用电私拉乱接',
              position: { xPercent: 18, yPercent: 42, radiusPercent: 5 },
              correctAction: '临时用电须经审批，使用合格配电箱，一机一闸一漏保，禁止私拉乱接',
              riskLevel: 'high',
              category: '用电安全',
              tip: '违章用电是火灾的主要原因'
            },
            {
              id: 'ground_4_06',
              name: '化学品存放无MSDS',
              position: { xPercent: 78, yPercent: 35, radiusPercent: 5 },
              correctAction: '危险化学品存放处应张贴安全技术说明书(MSDS)，告知危害和应急措施',
              riskLevel: 'high',
              category: '危化品管理',
              tip: '不了解化学品性质就无法正确应对泄漏'
            },
            {
              id: 'ground_4_07',
              name: '挖掘作业未探明管线',
              position: { xPercent: 38, yPercent: 85, radiusPercent: 5 },
              correctAction: '土方开挖前必须探明地下管线位置，人工开挖确认，防止破坏电缆燃气管道',
              riskLevel: 'high',
              category: '土建安全',
              tip: '挖断燃气管道可引发爆炸'
            },
            {
              id: 'ground_4_08',
              name: '疲劳驾驶车辆',
              position: { xPercent: 12, yPercent: 58, radiusPercent: 5 },
              correctAction: '驾驶员连续驾驶不超过4小时，疲劳时应停车休息，杜绝疲劳驾驶',
              riskLevel: 'high',
              category: '交通安全',
              tip: '疲劳驾驶反应能力下降等同于酒驾'
            }
          ]
        },

        5: {
          id: 'ground_5',
          name: '地面安全综合考核',
          image: 'assets/images/ground/level5.jpg',
          timeLimit: 55,
          hintCount: 1,
          
          hazards: [
            {
              id: 'ground_5_01',
              name: '安全培训记录缺失',
              position: { xPercent: 22, yPercent: 20, radiusPercent: 5 },
              correctAction: '所有从业人员必须经过三级安全教育培训并考核合格，建立培训档案',
              riskLevel: 'high',
              category: '安全管理',
              tip: '未经培训上岗是违法的'
            },
            {
              id: 'ground_5_02',
              name: '应急预案未演练',
              position: { xPercent: 58, yPercent: 28, radiusPercent: 5 },
              correctAction: '应急预案每年至少组织一次综合演练，确保全员熟悉应急流程',
              riskLevel: 'medium',
              category: '应急管理',
              tip: '纸上预案不如一次实战演练'
            },
            {
              id: 'ground_5_03',
              name: '隐患整改逾期未闭环',
              position: { xPercent: 75, yPercent: 48, radiusPercent: 5 },
              correctAction: '发现的隐患应在规定期限内完成整改，实行闭环管理：发现-整改-验收-销号',
              riskLevel: 'high',
              category: '隐患治理',
              tip: '未整改的隐患就是定时炸弹'
            },
            {
              id: 'ground_5_04',
              name: '特种设备超期未检',
              position: { xPercent: 32, yPercent: 55, radiusPercent: 5 },
              correctAction: '电梯、锅炉、压力容器等特种设备必须在检验有效期内使用，到期前申报检验',
              riskLevel: 'critical',
              category: '特种设备',
              tip: '超期设备发生事故责任加重'
            },
            {
              id: 'ground_5_05',
              name: '外包单位监管不到位',
              position: { xPercent: 48, yPercent: 72, radiusPercent: 5 },
              correctAction: '外包队伍纳入本单位安全管理体系，签订安全协议，进行入场教育和过程监督',
              riskLevel: 'high',
              category: '承包商管理',
              tip: '外包事故占工业事故的较大比例'
            },
            {
              id: 'ground_5_06',
              name: '职业健康体检未落实',
              position: { xPercent: 15, yPercent: 82, radiusPercent: 5 },
              correctAction: '接触职业病危害因素的员工应定期进行职业健康体检，建立健康监护档案',
              riskLevel: 'medium',
              category: '职业健康',
              tip: '早发现早治疗，预防职业病发生'
            },
            {
              id: 'ground_5_07',
              name: '安全投入不足',
              position: { xPercent: 68, yPercent: 68, radiusPercent: 5 },
              correctAction: '必须按规定提取和使用安全生产费用，保障安全设施和个人防护装备投入',
              riskLevel: 'high',
              category: '安全投入',
              tip: '省安全投入等于拿生命赌博'
            },
            {
              id: 'ground_5_08',
              name: '违章指挥强令冒险作业',
              position: { xPercent: 82, yPercent: 18, radiusPercent: 5 },
              correctAction: '管理人员不得强令员工违章冒险作业，员工有权拒绝违章指挥并举报',
              riskLevel: 'critical',
              category: '安全文化',
              tip: '违章指挥是犯罪行为'
            },
            {
              id: 'ground_5_09',
              name: '事故瞒报迟报',
              position: { xPercent: 40, yPercent: 92, radiusPercent: 5 },
              correctAction: '发生事故应立即上报，不得瞒报、谎报或迟报，"四不放过"原则处理',
              riskLevel: 'critical',
              category: '事故管理',
              tip: '瞒报事故将面临严厉处罚'
            }
          ]
        }
      }
    },

    aviation_sec: {
      id: 'aviation_sec',
      name: '航空安全',
      icon: '✈️',
      color: '#0EA5E9',
      description: '掌握航空安全规范，守护每一次起落平安',

      levels: {
        1: {
          id: 'aviation_1',
          name: '机坪作业规范',
          image: '',
          timeLimit: 70,
          hintCount: 3,
          hazards: []
        },
        2: {
          id: 'aviation_2',
          name: '客舱安全检查',
          image: '',
          timeLimit: 70,
          hintCount: 3,
          hazards: []
        },
        3: {
          id: 'aviation_3',
          name: '维修作业标准',
          image: '',
          timeLimit: 60,
          hintCount: 2,
          hazards: []
        },
        4: {
          id: 'aviation_4',
          name: '危险品运输',
          image: '',
          timeLimit: 60,
          hintCount: 2,
          hazards: []
        },
        5: {
          id: 'aviation_5',
          name: '应急撤离演练',
          image: '',
          timeLimit: 55,
          hintCount: 1,
          hazards: []
        }
      }
    }
  }
};
