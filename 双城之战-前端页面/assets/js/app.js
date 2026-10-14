/* ============================================================
   双城之战 · ARCANE 粉丝致敬站 — Vue 3 应用
   （使用本地 vue.global.prod.js，双击 index.html 即可运行）
   ============================================================ */

const { createApp, nextTick } = Vue;

/* ---------- 聊天通用话题 ---------- */
const COMMON = [
  { k: /你好|嗨|hi|hello|在吗|观众|打个招呼/i, r: [
    "你好呀，观众朋友！欢迎来到杀青派对。",
    "嗨～镜头已经关了，随便聊！",
    "欢迎来到双城！今晚不谈剧本。"
  ] },
  { k: /再见|拜拜|bye|晚安|走了/i, r: [
    "嗯，后会有期。双城的故事，随时欢迎你回来重映。",
    "再见啦！记得常回来片场转转。",
    "晚安。愿明天的双城，比今天亮一点。"
  ] },
  { k: /谢谢|感谢|thx|thank/i, r: [
    "该说谢谢的是我们——谢谢你看完两季。",
    "不客气！这份心意收下了，回头请你喝祖安特调。",
    "谢什么，朋友之间。"
  ] }
];

/* ---------- 头部介绍段落 ---------- */
const INTROS = [
  {
    tag: "WORLD · 双城观",
    title: "双城：光与影的两极",
    text: "皮尔特沃夫，云端之上的进步之城，黄金与蓝水晶构建的乌托邦；祖安，毒雾深处的进步之影，被光明遗弃的人在这里讨生活。同一道峡谷，一边是未来，一边是未来的代价。",
    img: "assets/img/world.jpg", imgTag: "双城 · 世界观"
  },
  {
    tag: "MAGIC · 奥术",
    title: "海克斯与奥术之力",
    text: "一颗残缺的水晶，让科学撞上了魔法。杰斯与维克托点亮了海克斯之门，凡人第一次握住神明的火种——可火种烧起来的时候，没人问过它会照亮谁、又会烧掉谁。",
    img: "assets/img/arcane.jpg", imgTag: "奥术 · 觉醒"
  },
  {
    tag: "BLOOD · 羁绊",
    title: "姐妹：蔚与金克丝",
    text: "拉钩的约定还在，桥上的火光先灭了。从「爆爆」到「金克丝」，一个名字的重量，压了整整两季。她们是彼此唯一的家人，也是双城最锋利的一对敌刃。",
    img: "assets/img/sisters.jpg", imgTag: "拉钩 · 约定"
  },
  {
    tag: "WAR · 两季之战",
    text: "第一季，一记火箭轰碎了双城脆弱的和平；第二季，战争让所有人付出代价，也逼每个人回答：你是谁，你选哪一边？答案是——总有人选妹妹，总有人选信念。",
    title: "两季征程：从爆裂到觉醒",
    img: "assets/img/war.jpg", imgTag: "Season 1 & 2"
  }
];

/* ---------- 全家福角色（banner 悬停） ---------- */
const CHARS = [
  {
    id: "vi", name: "蔚", en: "VI", role: "执法官 · 拳套", color: "#ff4d7d",
    clip: "polygon(0% 1%, 16% 0%, 34% 4%, 43% 10%, 45% 18%, 43% 26%, 45% 33%, 40% 44%, 32% 54%, 24% 58%, 14% 55%, 6% 47%, 0% 38%)",
    sx: 31, sy: 19,
    quote: "「先出拳，再边打边问。」",
    desc: "祖安底层长大的姐姐。一双海克斯拳套，出拳比说话快，却始终为妹妹留着一盏灯。"
  },
  {
    id: "silco", name: "希尔科", en: "SILCO", role: "祖安之王", color: "#ff8a3d",
    clip: "polygon(53% 11%, 61% 8%, 69% 12%, 72% 20%, 71% 29%, 65% 36%, 56% 34%, 51% 26%, 50% 18%)",
    sx: 62, sy: 23,
    quote: "「在我眼里，你一直都很完美。」",
    desc: "祖安的地下之王。用微光与铁腕喂养信仰，把金克丝当成毕生的作品，也当成女儿。"
  },
  {
    id: "mel", name: "梅尔", en: "MEL", role: "议员 · 谋略家", color: "#ffd98a",
    clip: "polygon(74% 1%, 97% 1%, 100% 8%, 99% 20%, 92% 26%, 80% 25%, 74% 16%)",
    sx: 86, sy: 12,
    quote: "「真正的力量，从不需要嘶吼。」",
    desc: "从诺克萨斯流亡而来的议会之花。黄金是她的铠甲，谋略是她的母语。"
  },
  {
    id: "jayce", name: "杰斯", en: "JAYCE", role: "海克斯 · 先锋", color: "#ffc35c",
    clip: "polygon(77% 27%, 90% 25%, 100% 30%, 100% 54%, 92% 60%, 81% 56%, 76% 45%, 75% 35%)",
    sx: 87, sy: 34,
    quote: "「为了更光明的明天。」",
    desc: "「未来缔造者」，海克斯科技的门面。他有改变世界的野心，也有被世界改变的时刻。"
  },
  {
    id: "caitlyn", name: "凯特琳", en: "CAITLYN", role: "执法官 · 神枪", color: "#9a6bff",
    clip: "polygon(36% 24%, 47% 21%, 55% 26%, 57% 35%, 54% 45%, 46% 50%, 38% 47%, 34% 37%)",
    sx: 45, sy: 32,
    quote: "「弹无虚发，是非分明。」",
    desc: "议会千金，褪下礼服从底层一层层爬上来。一把狙击枪，一颗不肯装睡的良心。"
  },
  {
    id: "jinx", name: "金克丝", en: "JINX", role: "祖安 · 混乱本体", color: "#59c2ff",
    clip: "polygon(40% 28%, 50% 24%, 60% 26%, 70% 32%, 78% 40%, 80% 50%, 74% 62%, 64% 70%, 52% 70%, 44% 62%, 38% 50%, 37% 38%)",
    sx: 58, sy: 44,
    quote: "「我以为，就算我变了，你也还是会像从前那样爱我。」",
    desc: "从「爆爆」到「金克丝」——祖安最耀眼的混乱。她只想证明自己不是灾星，却把整座双城点着了。"
  },
  {
    id: "viktor", name: "维克托", en: "VIKTOR", role: "科学家 · 进化", color: "#57f2e5",
    clip: "polygon(27% 52%, 37% 50%, 45% 55%, 46% 63%, 42% 72%, 34% 77%, 27% 74%, 23% 64%)",
    sx: 36, sy: 60,
    quote: "「加入我，见证荣耀的进化。」",
    desc: "祖安出身的科学天才。身体一天天背叛他，理想却一天天清晰——他选择了另一种进化。"
  }
];

/* ---------- 聊天角色（杀青群聊） ---------- */
const CHAT_CHARS = [
  {
    id: "vi", name: "蔚", role: "拳套 · 执法官", color: "#ff4d7d", fx: 0.31, fy: 0.19,
    open: "杀青啦！整整两季拳头没停过，现在镜头关了——说吧，想跟蔚聊点什么？",
    kw: [
      { k: /金克丝|爆爆|妹妹|jinx/i, r: [
        "她是我妹妹。不管她现在管自己叫什么，这一点永远不会变。",
        "「爆爆」……这个名字我很久没敢提了。但她一直在。",
        "如果她肯回头，我的手永远先伸出去，拳头永远最后出。"
      ] },
      { k: /凯特琳|caitlyn|警长/, r: [
        "凯特琳？她是我见过最固执的上城人……哼，也是最好的搭档。",
        "别八卦，我们只是搭档。好，非常好的那种搭档。"
      ] },
      { k: /拳|打|战斗力|拳头/, r: [
        "先出拳，边打边问——祖安教的，很好用。",
        "这对拳套重得像责任，抡起来倒是很顺手。"
      ] },
      { k: /祖安|底城/, r: "我在那儿长大。它伤过我也养过我，所以我总得为它做点什么。".split("|") },
      { k: /搭档/, r: [ "搭档就是在你冲出去时，会先替你把门打开的人。", "我的搭档名单很短，但每一个都拿命处过。" ] },
      { k: /杀青|收工|拍完|结束/, r: [ "杀青那天我第一时间去找了她。有些戏里没打完的架，戏外也不用打了。", "戏杀青了，姐姐这个角色，我可没杀青。" ] },
      { k: /你好|嗨|hi|hello|在吗|观众/, r: [ "嘿，来了？坐，今天不打人。", "嗨，欢迎来片场——小心地上的道具拳套。" ] },
      { k: /再见|拜拜|bye|晚安/, r: [ "走了？照顾好自己。我们桥上见。", "后会有期。别让上城人把你教得文绉绉的。" ] },
      { k: /难忘/, r: [ "最难忘的一幕……大概是我第一次把拳套合在手上的那一下。也可能不是。", "两季里最难忘的？她朝我开炮的那一炮。扎心，但记得牢。" ] }
    ],
    fb: [ "嗯，说下去，我在听。", "这个问题，两季都没答案——你觉得呢？", "上城人喜欢绕圈子，你直接点，我也直接点。" ]
  },
  {
    id: "jinx", name: "金克丝", role: "混乱本体 · 火箭炮", color: "#59c2ff", fx: 0.58, fy: 0.44,
    open: "咔！杀青了～摄像机一停我就把剧本炸了（骗你的，我早背下来了）。想跟祖安最可爱的混乱聊什么？",
    kw: [
      { k: /蔚|姐姐|vi/i, r: [
        "她总说我是她的妹妹……可她看我的眼神，像在看一个陌生人。",
        "蔚啊？下一个问题！再问我要炸毛了哦。",
        "她说会陪我到最后。你看，大人说话都不算数的。"
      ] },
      { k: /希尔科|爸爸|silco/i, r: [
        "他说过，我在他眼里一直都很完美。……我说完了，别那样看我。",
        "爸爸给的枪，比谁都漂亮。这句不许告诉别人。"
      ] },
      { k: /炸|爆|武器|枪/, r: [
        "鱼骨头是我的宝贝，亲手造的哦！想看它飞吗？嘿嘿。",
        "爆炸是艺术！懂？"
      ] },
      { k: /搭档/, r: [ "搭档？我有猴子、有鱼骨头、有一屋子会响的宝贝，够热闹了。", "以前的搭档……不说这个，聊点开心的！" ] },
      { k: /杀青|收工|拍完|结束/, r: [ "杀青最好玩的是：不用再演疯子了——因为我本来就是！哈哈！", "杀青仪式？我来点火，保证隆重。" ] },
      { k: /无聊|难过|害怕|哭/, r: [ "喂，别用那种眼神看我。热闹一点嘛，不然我给你唱首歌？", "难过就挠墙，害怕就炸墙，我这个方法很有效的。" ] },
      { k: /你好|嗨|hi|hello|在吗|观众/, r: [ "你来啦你来啦！是不是特别喜欢我？答「是」就对了。", "嗨嗨嗨！观众朋友，今晚的祖安由我承包。" ] },
      { k: /再见|拜拜|bye|晚安/, r: [ "这就走啦？好吧……下次记得带糖，不带糖我就捣蛋。", "拜拜啦！我会想你的——大概三秒半。" ] },
      { k: /难忘/, r: [ "最难忘的一幕？唔……那一炮。发射之前，全世界都安静了。", "两季最难忘的……是有人在满地狼藉里，还想拉我的手。" ] }
    ],
    fb: [ "咦，这个问题好无聊——换个好玩点的！", "嘿嘿，我听见了，但我装没听见。再问一次！", "要不我们聊点刺激的？比如……爆炸的半径？" ]
  },
  {
    id: "caitlyn", name: "凯特琳", role: "神枪 · 执法官", color: "#9a6bff", fx: 0.45, fy: 0.32,
    open: "杀青了，礼帽可以摘了。两季追凶，眼睛都没眨过——现在，随你问。",
    kw: [
      { k: /蔚|vi/i, r: [
        "她粗鲁、莽撞、不讲理……却是我最信任的人。别告诉她，会脸红。",
        "我们的案卷里，一半是她的拳头，一半是她的直觉。"
      ] },
      { k: /枪|狙击|神枪/, r: [ "弹无虚发不是天赋，是耐心。瞄准之前，先学会等。", "枪响了就没有回头路，所以我从不轻易扣扳机。" ] },
      { k: /母亲|妈妈|议会|家族/, r: [ "家族给了我看世界的高度，也给了我想亲手改变它的理由。", "母亲教会我体面，可这座城市的真相，从来不体面。" ] },
      { k: /搭档/, r: [ "好的搭档不是不吵架，是吵完架还敢把后背交给对方。", "我的搭档教会我：规则之外，还有良心。" ] },
      { k: /杀青|收工|拍完|结束/, r: [ "杀青像结案。可惜这座城市真正的大案，才刚刚开始。", "戏可以杀青，正义不行。" ] },
      { k: /你好|嗨|hi|hello|在吗|观众/, r: [ "你好。请坐——别碰桌上的证物，开玩笑的，那是道具。", "晚上好。今晚不做笔录，随便聊。" ] },
      { k: /再见|拜拜|bye|晚安/, r: [ "路上小心。这座城的夜，比你想象的深。", "再见。保持好奇，也保持警惕。" ] },
      { k: /难忘/, r: [ "最难忘的一幕……是灰烬里的那个眼神。有些案子，破不了也放不下。", "两季最难忘的？地道里第一次并肩作战的那个转身。" ] }
    ],
    fb: [ "这个问题需要档案支持，说详细一点？", "嗯……记下了。还有什么线索？", "换个话题也行，今晚不做笔录。" ]
  },
  {
    id: "jayce", name: "杰斯", role: "海克斯 · 先锋", color: "#ffc35c", fx: 0.87, fy: 0.34,
    open: "为了更光明的明天——啊停了停了，镜头早停了！抱歉，职业病。你想聊什么？",
    kw: [
      { k: /维克托|viktor/i, r: [
        "他是我最好的搭档，也可能是……最遗憾的那个。有些实验，输了才知道代价。",
        "我们一起推开过那扇门。门后面是什么，我们到现在都没说清楚。"
      ] },
      { k: /锤|武器|发明|海克斯|水晶|科技/, r: [
        "海克斯科技是把钥匙。开哪扇门，取决于握钥匙的手。",
        "这把锤子很重，但最重的从来不是它。"
      ] },
      { k: /梅尔|mel|议会/, r: [ "梅尔教会我一件事：真正的棋局，在桌子底下。", "议会里聪明人很多，清醒的不多。她是清醒的。" ] },
      { k: /搭档/, r: [ "最好的搭档会跟你抢方向盘——因为他也想开向未来。", "发明是把两人脑子装进同一颗水晶里。我们试过，很响。" ] },
      { k: /杀青|收工|拍完|结束/, r: [ "杀青了才发现：戏里我在造未来，戏外未来已经把我们造完了。", "台词可以杀青，誓言不行。" ] },
      { k: /你好|嗨|hi|hello|在吗|观众/, r: [ "欢迎欢迎！要不要参观海克斯工坊？——好了不逗了，问吧。", "你好！今天不上讲台，随意聊。" ] },
      { k: /再见|拜拜|bye|晚安/, r: [ "愿明天更光明。这句话，现在是说给你听的。", "再见！记得——进步，要带着人一起。" ] },
      { k: /难忘/, r: [ "最难忘的一幕？那晚雪地里的对峙。有些选择，选完才知道是悬崖。", "两季最难忘的……是我第一次意识到，天赋也会伤人。" ] }
    ],
    fb: [ "嗯，让我想想怎么用一句话回答你……", "好问题。海克斯水晶都没这么难算。", "你说，我记。也许能写进下一版论文里。" ]
  },
  {
    id: "viktor", name: "维克托", role: "科学家 · 荣耀进化", color: "#57f2e5", fx: 0.36, fy: 0.60,
    open: "杀青，也是一种进化。……请讲，今晚我不只讲方程式。",
    kw: [
      { k: /杰斯|jayce/i, r: [
        "他曾是我的同伴。我们朝着同一个方向走，却在岔路口谁也没回头。",
        "荣耀进化不恨任何人。包括他。"
      ] },
      { k: /进化|机器|身体|腿|病/, r: [
        "身体是易朽的容器。我只是在寻找不会腐朽的形状。",
        "疼痛提醒我活着。进化提醒我——仅仅活着，不够。"
      ] },
      { k: /祖安|底城/, r: [ "我来自祖安。那里的天才，从出生起就在和时间赛跑。", "祖安教会我：等不起的东西，就要亲手去造。" ] },
      { k: /搭档/, r: [ "理想的搭档，是把同一颗水晶的两半，分别握在手里的两个人。", "我和他分享过同一块黑板。后来黑板擦干净了。" ] },
      { k: /杀青|收工|拍完|结束/, r: [ "杀青……有趣的说法。像蜕壳：壳留在原地，我继续走。", "一幕落幕，进化不会落幕。" ] },
      { k: /你好|嗨|hi|hello|在吗|观众/, r: [ "你好。请讲——今晚我不只讲方程式。", "你好。今夜的变量由你来定。" ] },
      { k: /再见|拜拜|bye|晚安/, r: [ "去吧。进化的路上，你会看到我的痕迹。", "再见。愿你保留那颗未被打磨的天赋。" ] },
      { k: /难忘/, r: [ "最难忘的一幕……那颗滑落的粉笔头。它改写的不只是黑板。", "两季最难忘的：有人对我说「我们本可以改变一切」。可以，本可以。" ] }
    ],
    fb: [ "让我把这个问题，纳入进化的变量。", "有趣。你的思路里有一种未经打磨的天赋。", "继续说。计算正在进行。" ]
  },
  {
    id: "silco", name: "希尔科", role: "祖安之王", color: "#ff8a3d", fx: 0.62, fy: 0.23,
    open: "戏杀青了，祖安的夜还长。……说吧，我听着。",
    kw: [
      { k: /金克丝|女儿|jinx/i, r: [
        "在我眼里，她一直都很完美。……不必重复，我说的是事实。",
        "我的女儿不需要被理解，只需要被敬畏。"
      ] },
      { k: /微光|shimmer|药/, r: [ "微光是把刀。握稳了是力量，握不稳是深渊——而祖安人别无选择。", "微光给了我第二只眼睛，也给了我半条命的代价。" ] },
      { k: /祖安|底城/, r: [ "祖安会重获新生。为了这一天，我什么都肯做。", "上城人把我们的名字写在水里，我要把它刻进石头里。" ] },
      { k: /范德尔|vander/i, r: [ "范德尔……是个好人。好人建立了和平，也埋下了祸根。戏外，不谈这个。", "他是我的兄弟。兄弟这两个字，比刀还重。" ] },
      { k: /搭档/, r: [ "搭档？我有过一个。后来他把理想放在我们中间，理想赢了。", "信任是奢侈品，我只买得起一次。" ] },
      { k: /杀青|收工|拍完|结束/, r: [ "杀青？呵，我的戏份早就该结束了。可有些角色，下不了戏。", "镜头会停，野心不会。" ] },
      { k: /你好|嗨|hi|hello|在吗|观众/, r: [ "……坐。敢来找我聊天的人，不多了。", "晚上好。今晚的祖安难得安静，趁现在。" ] },
      { k: /再见|拜拜|bye|晚安/, r: [ "路上小心。祖安的夜路和人生一样——别回头。", "走吧。记住：力量，才配拥有明天。" ] },
      { k: /难忘/, r: [ "最难忘的一幕？桌上那顿饭。烛光很好，谎言更好。", "两季最难忘的……是她第一次戴上那些小玩意的眼神。痛，且亮。" ] }
    ],
    fb: [ "继续说。你的胆量，值得一次倾听。", "呵，有意思的问题。", "祖安人不爱绕弯子——你也是？" ]
  }
];

/* ---------- Vue 应用 ---------- */
createApp({
  data() {
    return {
      intros: INTROS,
      chars: CHARS,
      chatChars: CHAT_CHARS,
      hexes: [],
      hovered: null,
      card: null,
      chatOpen: false,
      chatId: null,
      messages: [],
      typing: false,
      draft: "",
      toast: "",
      quicks: ["杀青感受如何？", "最想对搭档说什么？", "两季里最难忘的一幕", "和观众打个招呼吧"]
    };
  },
  computed: {
    cardChar() { return this.chars.find(c => c.id === this.card.id); },
    chatChar() { return this.chatChars.find(c => c.id === this.chatId); },
    cardStyle() {
      return {
        left: this.card.x + "px",
        top: this.card.y + "px",
        "--glow": this.cardChar.color
      };
    }
  },
  methods: {
    goTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    openChat() {
      this.chatOpen = true;
      if (!this.chatId) this.selectChar(this.chatChars[1]); // 默认金克丝
    },
    closeChat() {
      if (!this.chatOpen) return;
      this.chatOpen = false;
      this.showToast("后会无期……才怪，随时回来 ♪");
    },
    selectChar(c) {
      clearTimeout(this._rt);
      this.typing = false;
      this.chatId = c.id;
      this.messages = [{ text: c.open, stamp: this.stamp() }];
      nextTick(this.scrollMsgs);
    },
    send(txt) {
      const t = (txt !== undefined ? txt : this.draft).trim();
      if (!t || !this.chatChar) return;
      this.messages.push({ text: t, stamp: this.stamp() });
      this.draft = "";
      this.scrollMsgs();
      this.typing = true;
      const c = this.chatChar;
      clearTimeout(this._rt);
      this._rt = setTimeout(() => {
        this.typing = false;
        this.messages.push({ text: this.pickReply(c, t), stamp: this.stamp() });
        this.scrollMsgs();
      }, 800 + Math.random() * 900);
    },
    pickReply(c, t) {
      for (const kw of c.kw) {
        if (kw.k.test(t)) return kw.r[Math.floor(Math.random() * kw.r.length)];
      }
      for (const kw of COMMON) {
        if (kw.k.test(t)) return kw.r[Math.floor(Math.random() * kw.r.length)];
      }
      return c.fb[Math.floor(Math.random() * c.fb.length)];
    },
    scrollMsgs() {
      const el = this.$refs.msgs;
      if (el) el.scrollTop = el.scrollHeight;
    },
    stamp() {
      return "双城时间 · " + new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    },
    showToast(t) {
      this.toast = t;
      clearTimeout(this._tt);
      this._tt = setTimeout(() => (this.toast = ""), 2200);
    },

    /* --- banner 悬停发光 + 卡片 --- */
    hsStyle(c) {
      return {
        "--clip": c.clip, "--glow": c.color, "--sx": c.sx + "%", "--sy": c.sy + "%",
        "--glow-soft": this.hexToRgba(c.color, 0.5)
      };
    },
    glowStyle(color) { return { "--glow": color }; },
    hexToRgba(hex, a) {
      const n = parseInt(hex.slice(1), 16);
      return "rgba(" + (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
    },
    onEnter(c) {
      clearTimeout(this._t);
      // 悬停到别的角色：先收起旧卡片，再按节奏弹新卡
      if (this.card && this.card.id !== c.id) this.card = null;
      this.hovered = c.id;
      if (!this.card || this.card.id !== c.id) {
        this._t = setTimeout(() => this.showCard(c), 500);
      }
    },
    onLeave(c) {
      // 只熄灭发光；卡片按需求由叉号 / 点击外部 / 切换角色关闭
      clearTimeout(this._t);
      if (this.hovered === c.id) this.hovered = null;
    },
    onTap(c) {
      if (this.card && this.card.id === c.id) {
        this.closeCard();
      } else {
        clearTimeout(this._t);
        this.hovered = c.id;
        this._t = setTimeout(() => this.showCard(c), 250);
      }
    },
    closeCard() {
      clearTimeout(this._t);
      this.hovered = null;
      this.card = null;
    },
    showCard(c) {
      const b = this.$refs.banner.getBoundingClientRect();
      const s = this.$refs.stage.getBoundingClientRect();
      const ox = s.left - b.left + s.width * c.sx / 100;
      const oy = s.top - b.top + s.height * c.sy / 100;
      // 卡片弹在发光点的侧下方，不挡住发光的人物
      const side = ox < b.width / 2 ? 1 : -1;
      let x = ox + side * 215;
      let y = oy + 150;
      x = Math.max(190, Math.min(x, b.width - 190));
      y = Math.max(200, Math.min(y, b.height - 185));
      this.card = { id: c.id, x: Math.round(x), y: Math.round(y) };
    },

    /* --- 聊天头像：从全家福裁切 --- */
    avatarStyle(c) {
      const s = 3, H = s * 1.5;
      let px = (c.fx * s - 0.5) / (s - 1);
      let py = (c.fy * H - 0.5) / (H - 1);
      px = Math.max(0, Math.min(1, px));
      py = Math.max(0, Math.min(1, py));
      return {
        backgroundImage: "url(assets/img/poster.jpg)",
        backgroundSize: s * 100 + "%",
        backgroundPosition: (px * 100).toFixed(1) + "% " + (py * 100).toFixed(1) + "%"
      };
    }
  },
  mounted() {
    /* 六边形漂浮粒子 */
    const colors = ["#5cc8ff", "#ff5c8a", "#9a6bff", "#ffc35c", "#57f2e5"];
    for (let i = 0; i < 14; i++) {
      this.hexes.push({
        left: (Math.random() * 100).toFixed(1),
        size: 8 + Math.round(Math.random() * 18),
        dur: 16 + Math.random() * 26,
        delay: -Math.random() * 30,
        color: colors[i % colors.length]
      });
    }
    this._esc = (e) => {
      if (e.key === "Escape") {
        if (this.chatOpen) this.chatOpen = false;
        else if (this.card) this.card = null;
      }
    };
    this._doc = (e) => {
      if (this.card && this.$refs.banner && !this.$refs.banner.contains(e.target)) this.card = null;
    };
    document.addEventListener("keydown", this._esc);
    document.addEventListener("click", this._doc);
    window.addEventListener("resize", this._rs = () => { this.card = null; });
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this._esc);
    document.removeEventListener("click", this._doc);
    window.removeEventListener("resize", this._rs);
  }
}).mount("#app");
