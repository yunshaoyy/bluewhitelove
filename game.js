const script = [
  { type: 'bg', bg: 'url(assets/background.png)' },
  { type: 'text', speaker: '我', text: '我瞪大眼睛盯着屏幕，上面满是刺眼的红色报错信息，它们像恶魔一样嘲笑着我。' },
  { type: 'text', speaker: '我', text: '我的心跳愈发剧烈，太阳穴开始突突直跳，手指悬在键盘上却迟迟无法按下。' },
  { type: 'text', speaker: '我', text: '现实残酷无情，幻想却悄然袭来：如果有一个温柔可爱的男孩子此刻能出现在我身旁该多好。' },
  { type: 'text', speaker: '我', text: '就在这绝望时刻，一股淡淡的清香悄然钻入鼻中。' },
  { type: 'text', speaker: '我', text: '我本能地转头，看见他嘴角轻扬，那笑容温柔如同天边初升的月牙儿。' },
  { type: 'text', speaker: 'Nan Liang', text: '这个难道你居然也不懂嘛？没关系啦！就让我来教教你吧~' },
  { type: 'text', speaker: '我', text: '他的手指轻触我的指尖，仿佛触电一般，他微微一颤，脸颊与耳朵都染上了红晕。' },
  { type: 'text', speaker: '我', text: '他装作专注操作，却在键盘上宛如舞者般优雅地敲击——几分钟内解决了所有技术难题。' },
  { type: 'text', speaker: '我', text: '屏幕弹出"OK"，我的设备终于复活。他略带期待地看向我，等待我的回应。' },
  { type: 'choice', choices: [
    { text: '真厉害，谢谢你！', target: 11 },
    { text: '（羞涩点头）', target: 13 }
  ] },
  { type: 'text', speaker: 'Nan Liang', text: '没什么啦，互帮互助很正常！' },
  { type: 'jump', target: 15 },
  { type: 'text', speaker: 'Nan Liang', text: '不用谢，下次有问题还可以找我。' },
  { type: 'bg', bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)' },
  { type: 'text', speaker: '我', text: '他走到我身边，白皙如雪的皮肤与精致的脸庞仿佛时间都为之一静。' },
  { type: 'text', speaker: '我', text: '突然，对方以低沉而磁性的嗓音打断了我的呆愣：' },
  { type: 'text', speaker: 'Nan Liang', text: '喂，你打算一直这么傻乎乎地望着我吗？' },
  { type: 'text', speaker: '我', text: '我手忙脚乱地道歉，他没计较，只微笑示意离开。' },
  { type: 'text', speaker: '我', text: '“嗯，拜拜，还有……谢谢。”我终于挤出一句话，看着他渐行渐远的身影，不舍又失落。' },
  { type: 'bg', bg: 'linear-gradient(135deg,#a8edea,#fed6e3)' },
  { type: 'text', speaker: '我', text: '回到寝室，他的身影仍缠绕在我心头。可理智提醒我别再沉溺，他或许只是随便帮忙。' },
  { type: 'text', speaker: '我', text: '无论如何，那晚我带着心跳和愉悦入眠。' },
  { type: 'bg', bg: 'linear-gradient(135deg,#d299c2,#fef9d7)' },
  { type: 'text', speaker: '我', text: '次日清晨，阳光明媚但我心情沉重。来到实验室，却又遇见了他。' },
  { type: 'text', speaker: '导师', text: '大家先停下手里的活，这位是你们的学长Nan Liang，刚从国外回来。' },
  { type: 'text', speaker: 'Nan Liang', text: '大家好，我是Nan Liang。希望在接下来的日子里能和大家和睦相处。' },
  { type: 'text', speaker: '导师', text: '去执行我昨天给你安排的任务吧，你的位置在机电楼旁边。' },
  { type: 'text', speaker: 'Nan Liang', text: '你好呀，又见面了——哦不，是初次相识，请多多指教。' },
  { type: 'text', speaker: '你', text: '你好呀。' },
  { type: 'text', speaker: 'Nan Liang', text: '好的，那我们先工作吧。' },
  { type: 'bg', bg: 'linear-gradient(135deg,#ff9a9e,#fecfef)' },
  { type: 'end', text: '故事到这里结束啦，感谢体验！' }
];

let current = 0;
let started = false;
let typing = false;
let typeTimer = null;
let fullText = '';
let typeIdx = 0;

const els = {};
function initEls() {
  els.startScreen = document.getElementById('start-screen');
  els.startBtn = document.getElementById('start-btn');
  els.bg = document.getElementById('background');
  els.char = document.getElementById('character-sprite');
  els.speaker = document.getElementById('speaker-name');
  els.text = document.getElementById('dialogue-text');
  els.choices = document.getElementById('choices-container');
  els.dlgBox = document.getElementById('dialogue-box');
  els.funcBar = document.getElementById('function-bar');
  els.saveLoad = document.getElementById('save-load-screen');
  els.saveTitle = document.getElementById('save-load-title');
  els.saveSlots = document.getElementById('save-slots');
  els.saveClose = document.getElementById('save-load-close');
  els.savBtn = document.getElementById('save-btn');
  els.loadBtn = document.getElementById('load-btn');
  els.musicBtn = document.getElementById('music-btn');
  els.fsBtn = document.getElementById('fullscreen-btn');
  els.sakura = document.getElementById('sakura-container');
}

function run(idx) {
  if (idx >= script.length) idx = 0;
  current = idx;
  const s = script[current];
  els.choices.innerHTML = '';
  switch(s.type) {
    case 'bg':
      if (s.bg.startsWith('url(') || s.bg.startsWith('http')) {
        els.bg.style.backgroundImage = s.bg.startsWith('url(') ? s.bg : `url(${s.bg})`;
      } else {
        els.bg.style.background = s.bg;
        els.bg.style.backgroundImage = '';
      }
      run(current + 1);
      break;
    case 'text':
      els.speaker.textContent = s.speaker;
      typeText(s.text);
      break;
    case 'choice':
      els.text.textContent = '请选择：';
      els.speaker.textContent = '';
      stopType();
      s.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = c.text;
        btn.onclick = (e) => { e.stopPropagation(); run(c.target); };
        els.choices.appendChild(btn);
      });
      break;
    case 'jump':
      run(s.target);
      break;
    case 'end':
      els.speaker.textContent = '';
      typeText(s.text);
      els.choices.innerHTML = '';
      const rst = document.createElement('button');
      rst.className = 'choice-btn';
      rst.textContent = '重新开始';
      rst.onclick = (e) => { e.stopPropagation(); current = 0; run(0); };
      els.choices.appendChild(rst);
      break;
  }
}

function typeText(txt) {
  stopType();
  fullText = txt;
  typeIdx = 0;
  els.text.textContent = '';
  typing = true;
  typeTimer = setInterval(() => {
    if (typeIdx < fullText.length) {
      els.text.textContent += fullText[typeIdx++];
    } else {
      stopType();
    }
  }, 30);
}

function stopType() {
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }
  typing = false;
}

function next() {
  if (!started) return;
  const s = script[current];
  if (typing) {
    stopType();
    els.text.textContent = fullText;
    return;
  }
  if (s && s.type === 'text') {
    run(current + 1);
  }
}

function start() {
  els.startScreen.classList.add('hidden');
  els.funcBar.classList.remove('hidden');
  els.dlgBox.classList.remove('hidden');
  started = true;
  run(0);
  sakura();
}

function init() {
  initEls();
  els.startBtn.onclick = start;
  els.dlgBox.onclick = next;
  if(els.savBtn) els.savBtn.onclick = () => { els.saveTitle.textContent = '存档'; els.saveLoad.classList.add('active'); };
  if(els.loadBtn) els.loadBtn.onclick = () => { els.saveTitle.textContent = '读档'; els.saveLoad.classList.add('active'); };
  if(els.saveClose) els.saveClose.onclick = () => els.saveLoad.classList.remove('active');
  if(els.musicBtn) els.musicBtn.onclick = () => { els.musicBtn.textContent = els.musicBtn.textContent === '🎵' ? '🔇' : '🎵'; };
  if(els.fsBtn) els.fsBtn.onclick = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };
  document.onkeydown = (e) => {
    if (started && (e.code === 'Space' || e.code === 'Enter')) {
      e.preventDefault();
      next();
    }
  };
  console.log('[Galgame] 游戏初始化完成，剧本共',script.length,'段');
}

(function() {
  function robustInit() {
    try {
      if (typeof init === 'function') {
        init();
        console.log('[Galgame] 游戏初始化完成');
      } else {
        alert('init 函数未定义，脚本加载异常！');
      }
    } catch (e) {
      alert('游戏启动失败：' + e.message);
      console.error(e);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', robustInit);
  } else {
    setTimeout(robustInit, 20);
  }
})();

function sakura() {
  const container = document.getElementById('sakura-container');
  if (!container) return;
  let count = 32;
  for (let i = 0; i < count; i++) {
    createSakura(container);
  }
}
function createSakura(container) {
  const sakura = document.createElement('div');
  sakura.className = 'sakura';
  sakura.style.left = Math.random() * 100 + '%';
  sakura.style.opacity = (0.7 + Math.random() * 0.3).toFixed(2);
  sakura.style.animationDuration = (6 + Math.random() * 6).toFixed(1) + 's';
  // 随机尺寸和旋转角度
  const sz = 7 + Math.random() * 10;
  sakura.style.width = sz + 'px';
  sakura.style.height = sz + 'px';
  sakura.style.transform = `rotate(${Math.random()*360}deg)`;
  container.appendChild(sakura);
  sakura.addEventListener('animationiteration', () => {
    // 落到底部再复位
    sakura.style.left = Math.random() * 100 + '%';
    sakura.style.opacity = (0.7 + Math.random() * 0.3).toFixed(2);
    sakura.style.animationDuration = (6 + Math.random() * 6).toFixed(1) + 's';
    const sz2 = 7 + Math.random() * 10;
    sakura.style.width = sz2 + 'px';
    sakura.style.height = sz2 + 'px';
    sakura.style.transform = `rotate(${Math.random()*360}deg)`;
  });
}
