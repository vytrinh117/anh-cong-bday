(() => {
  'use strict';
  document.documentElement.classList.add('has-js');
  const $ = (id) => document.getElementById(id);
  const CONFIG = window.BIRTHDAY_CONFIG || {};
  const KEY = 'birthday-for-cong-v1';
  const initial = () => ({ fish: 0, peanuts: 0, plots: [0, 0, 0, 0], nodes: {compute:false, lustre:false, network:false}, quizIndex:0 });
  let state = initial();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && typeof saved === 'object') {
      state = {
        fish: Number.isFinite(saved.fish) ? Math.max(0, saved.fish) : 0,
        peanuts: Number.isFinite(saved.peanuts) ? Math.max(0, saved.peanuts) : 0,
        plots: Array.isArray(saved.plots) && saved.plots.length === 4 ? saved.plots.map(x => [0,1,2].includes(x) ? x : 0) : [0,0,0,0],
        nodes: {compute: !!saved.nodes?.compute, lustre: !!saved.nodes?.lustre, network: !!saved.nodes?.network},
        quizIndex: Number.isInteger(saved.quizIndex) ? Math.max(0, Math.min(3, saved.quizIndex)) : 0
      };
    }
  } catch (_) { /* The site also works when localStorage is unavailable. */ }
  const saveState = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} };
  let toastTimer;
  function notify(message) {
    const el = $('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
  }

  /* ---------- Easy personalization through config.js ---------- */
  const person = String(CONFIG.boyfriendName || 'Công').trim();
  $('hero-name').textContent = `anh ${person}.`;
  $('envelope-name').textContent = person;
  $('footer-name').textContent = person.toLocaleUpperCase('vi-VN');
  document.title = `Gửi anh ${person} — Một giang hồ chỉ dành cho anh`;
  if (CONFIG.favoriteQuote) $('favorite-quote').textContent = CONFIG.favoriteQuote;
  if (CONFIG.letterTitle) $('letter-title').textContent = CONFIG.letterTitle;
  $('letter-sender').textContent = `${CONFIG.fromName || 'Em'} ♡`;
  if (CONFIG.birthdayDate) $('letter-date').textContent = String(CONFIG.birthdayDate);
  const paragraphs = Array.isArray(CONFIG.letterParagraphs) ? CONFIG.letterParagraphs : [];
  paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.textContent = String(text);
    $('letter-paragraphs').appendChild(p);
  });
  function addOptionalPhoto(url, imgId, hideId) {
    if (!url || typeof url !== 'string') return;
    const img = $(imgId);
    img.onload = () => { img.hidden = false; if (hideId) $(hideId).hidden = true; };
    img.onerror = () => { img.hidden = true; if (hideId) $(hideId).hidden = false; };
    img.src = url;
  }
  addOptionalPhoto(CONFIG.bobPhoto, 'bob-photo', 'bob-illustration');
  addOptionalPhoto(CONFIG.nhaTrangPhoto, 'nha-trang-photo');
  if (CONFIG.couplePhoto) {
    // The couple image can replace the decorative inside the closing letter page,
    // while avoiding any additional blank or broken image placeholders.
    const img = document.createElement('img');
    img.alt = `Một bức ảnh kỷ niệm của anh ${person} và người thương`;
    img.className = 'couple-photo';
    img.onload = () => $('letter-paragraphs').after(img);
    img.src = CONFIG.couplePhoto;
  }

  /* ---------- UI ---------- */
  $('menu-btn').addEventListener('click', () => {
    const open = $('main-nav').classList.toggle('open');
    $('menu-btn').setAttribute('aria-expanded', String(open));
    $('menu-btn').setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
    $('main-nav').classList.remove('open');
    $('menu-btn').setAttribute('aria-expanded', 'false');
  }));
  function onScroll() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    $('reading-progress-fill').style.width = `${available > 0 ? window.scrollY / available * 100 : 0}%`;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold:.10});
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));

  /* ---------- Quests / achievements ---------- */
  const keys = ['coast','farm','cluster','quiz'];
  const isComplete = key => ({
    coast: state.fish >= 2,
    farm: state.peanuts >= 2,
    cluster: Object.values(state.nodes).every(Boolean),
    quiz: state.quizIndex >= 3
  }[key]);
  let lastCompleted = 0;
  function updateQuestProgress(announce = false) {
    let done = 0;
    keys.forEach(key => {
      const completed = isComplete(key);
      $('quest-' + key).classList.toggle('completed', completed);
      $('state-' + key).textContent = completed ? '✓ HOÀN THÀNH' : 'CHƯA HOÀN THÀNH';
      done += completed ? 1 : 0;
    });
    $('quest-count').textContent = String(done);
    $('quest-progress-fill').style.width = `${done * 25}%`;
    $('completion-banner').hidden = done !== 4;
    if (announce && done > lastCompleted) {
      notify(done === 4 ? '✦ Tứ cảnh đã khai mở! Mật thư đang đợi anh.' : `✦ Hoàn thành nhiệm vụ! ${done}/4 cánh cổng đã mở.`);
    }
    lastCompleted = done;
    saveState();
  }
  /* ---------- Nha Trang fishing ---------- */
  const fishNames = ['cá thu', 'cá hồng', 'cá nục', 'cá chim', 'cá mú'];
  $('fish-btn').addEventListener('click', () => {
    if (state.fish >= 2) return;
    const fishName = fishNames[Math.floor(Math.random() * fishNames.length)];
    state.fish++;
    $('fish-count').textContent = String(Math.min(state.fish,2));
    $('fish-feedback').textContent = `✦ Anh câu được một con ${fishName}! Sóng biển vỗ tay cho anh.`;
    $('fish-btn').textContent = state.fish >= 2 ? 'Đã nhận đủ cá ✦' : 'Thả câu thêm lần nữa ↗';
    $('fish-btn').disabled = state.fish >= 2;
    updateQuestProgress(true);
  });
  function renderFish() {
    $('fish-count').textContent = String(Math.min(state.fish,2));
    $('fish-btn').disabled = state.fish >= 2;
    $('fish-btn').textContent = state.fish >= 2 ? 'Đã nhận đủ cá ✦' : 'Thả câu bên bờ biển ↗';
    if (state.fish >= 2) $('fish-feedback').textContent = '✦ Bữa tối bên biển đã có món cá anh thích.';
  }

  /* ---------- Small farming RPG ---------- */
  const plotIcons = ['✚','🌱','🥜'];
  const plotLabels = ['Gieo hạt','Tưới cây','Thu hoạch'];
  function renderPlots() {
    $('farm-plots').replaceChildren();
    state.plots.forEach((stage,index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'farm-plot';
      btn.dataset.stage = String(stage);
      btn.setAttribute('aria-label', `Luống ${index+1}: ${plotLabels[stage]}`);
      const small = document.createElement('span');
      small.className = 'plot-index'; small.textContent = `0${index+1}`;
      const icon = document.createElement('span');
      icon.className = 'stage-icon';
      icon.textContent = plotIcons[stage];
      btn.append(small,icon);
      btn.addEventListener('click', () => {
        if (stage === 0) {state.plots[index] = 1; $('farm-feedback').textContent = `Luống ${index+1}: hạt đậu đã gieo! Nhấn lần nữa để tưới.`;}
        else if (stage === 1) {state.plots[index] = 2; $('farm-feedback').textContent = `Luống ${index+1}: cây lớn xanh tốt. Thu hoạch thôi!`;}
        else {state.plots[index] = 0;state.peanuts++;$('farm-feedback').textContent = `✦ Thu hoạch đậu phộng thành công! Có ${state.peanuts} phần.`;}
        $('peanut-count').textContent = String(Math.min(state.peanuts,2));
        renderPlots();
        updateQuestProgress(true);
      });
      $('farm-plots').appendChild(btn);
    });
  }
  /* ---------- Lustre HPC node puzzle ---------- */
  function renderNodes() {
    document.querySelectorAll('.node-btn').forEach(btn => {
      const active = state.nodes[btn.dataset.node];
      btn.setAttribute('aria-pressed', String(active));
      btn.disabled = active;
    });
    const total = Object.values(state.nodes).filter(Boolean).length;
    $('terminal-result').textContent = total === 3 ? '✓ birthday_cluster: ONLINE ♥' : `active nodes: ${total}/3 _`;
    $('cluster-feedback').textContent = total === 3 ? '✦ Cụm máy sinh nhật đã hoạt động. Đang lưu những điều thật đẹp...' : `Đã kết nối ${total}/3 tinh tú. Hãy kích hoạt toàn bộ.`;
  }
  document.querySelectorAll('.node-btn').forEach(btn => btn.addEventListener('click', () => {
    const node = btn.dataset.node;
    if (!['compute','lustre','network'].includes(node) || state.nodes[node]) return;
    state.nodes[node] = true;
    renderNodes();
    updateQuestProgress(true);
  }));
  /* ---------- Knowledge trial ---------- */
  const questions = [
    {text:'Kinh đô của triều Nguyễn nằm ở thành phố nào?',options:['Hà Nội','Huế','Hội An','Đà Lạt'],answer:1,explanation:'Đúng rồi! Kinh đô triều Nguyễn là Huế.'},
    {text:'8 node HPC, mỗi node xử lý 4 tác vụ/giây. Sau 3 giây, cả cụm xử lý tối đa bao nhiêu tác vụ?',options:['32','64','96','128'],answer:2,explanation:'Chính xác: 8 × 4 × 3 = 96 tác vụ.'},
    {text:'Thành phố biển Nha Trang thuộc tỉnh nào?',options:['Bình Định','Phú Yên','Khánh Hòa','Ninh Thuận'],answer:2,explanation:'Chính xác! Nha Trang thuộc Khánh Hòa.'}
  ];
  let quizAdvancing = false;
  function renderQuiz() {
    const i = state.quizIndex;
    $('quiz-options').replaceChildren();
    $('quiz-counter').textContent = i >= questions.length ? 'HOÀN THÀNH 03 / 03' : `CÂU 0${i+1} / 03`;
    if (i >= questions.length) {
      $('quiz-question').textContent = '✦ Học viện xác nhận: anh đã vượt qua thử thách!';
      $('quiz-feedback').textContent = 'Tri thức +100. May mắn tuổi mới +∞.';
      return;
    }
    $('quiz-question').textContent = questions[i].text;
    $('quiz-feedback').textContent = 'Chọn một câu trả lời.';
    questions[i].options.forEach((option,n) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = `${String.fromCharCode(65+n)}. ${option}`;
      btn.addEventListener('click', () => {
        if (quizAdvancing) return;
        if (n !== questions[i].answer) {
          btn.classList.add('incorrect');
          $('quiz-feedback').textContent = 'Chưa đúng rồi, thử lại nhé!';
          setTimeout(() => btn.classList.remove('incorrect'), 600);
          return;
        }
        quizAdvancing = true;
        btn.classList.add('correct');
        $('quiz-feedback').textContent = questions[i].explanation;
        document.querySelectorAll('.quiz-option').forEach(opt => {opt.disabled = true;});
        setTimeout(() => {
          state.quizIndex++;
          quizAdvancing = false;
          renderQuiz();
          updateQuestProgress(true);
        }, 850);
      });
      $('quiz-options').appendChild(btn);
    });
  }

  /* ---------- Drawing canvas ---------- */
  const canvas = $('drawing-canvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let ink = '#d8bc86';
  if (ctx) {
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ink;
    function point(e) {
      const r = canvas.getBoundingClientRect();
      return {x:(e.clientX-r.left)/r.width*canvas.width,y:(e.clientY-r.top)/r.height*canvas.height};
    }
    canvas.addEventListener('pointerdown',e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      const p = point(e);
      ctx.beginPath(); ctx.moveTo(p.x,p.y);
      ctx.lineTo(p.x+.01,p.y+.01);ctx.stroke();
      document.querySelector('.drawing-wrap').classList.add('has-drawing');
    });
    canvas.addEventListener('pointermove',e => {if (!drawing) return;const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke();});
    ['pointerup','pointercancel','lostpointercapture'].forEach(evt => canvas.addEventListener(evt,() => {drawing=false;}));
    document.querySelectorAll('.color-swatch').forEach(btn => btn.addEventListener('click', () => {
      ink = btn.dataset.color; ctx.strokeStyle = ink;
      document.querySelectorAll('.color-swatch').forEach(b => {b.classList.toggle('active', b === btn);b.setAttribute('aria-pressed',String(b===btn));});
    }));
    $('clear-canvas').addEventListener('click', () => {ctx.clearRect(0,0,canvas.width,canvas.height);document.querySelector('.drawing-wrap').classList.remove('has-drawing');notify('Khung vẽ đã được làm sạch.');});
    $('save-canvas').addEventListener('click', () => {
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width=canvas.width;exportCanvas.height=canvas.height;
      const ex=exportCanvas.getContext('2d');
      ex.fillStyle='#101a20';ex.fillRect(0,0,canvas.width,canvas.height);ex.drawImage(canvas,0,0);
      const anchor=document.createElement('a');anchor.download='ban-ve-cho-anh-cong.png';anchor.href=exportCanvas.toDataURL('image/png');anchor.click();notify('Đã tạo file ảnh từ bức vẽ ✦');
    });
  }

  /* ---------- The birthday letter ---------- */
  function openLetter() {
    $('envelope').hidden=true;
    $('letter-paper').hidden=false;
    $('open-letter').setAttribute('aria-expanded','true');
    $('letter-paper').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
    startConfetti();
  }
  function closeLetter() {
    $('letter-paper').hidden=true;
    $('envelope').hidden=false;
    $('open-letter').setAttribute('aria-expanded','false');
    $('envelope').scrollIntoView({behavior:'smooth',block:'center'});
  }
  $('open-letter').addEventListener('click',openLetter);
  $('close-letter').addEventListener('click',closeLetter);
  $('replay-confetti').addEventListener('click',startConfetti);
  function startConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {notify('✦ Chúc mừng sinh nhật!');return;}
    const cvs=$('confetti-canvas'),c=cvs.getContext('2d');
    if (!c) return;
    const dpr=Math.min(window.devicePixelRatio||1,2),w=window.innerWidth,h=window.innerHeight;
    cvs.width=w*dpr;cvs.height=h*dpr;c.setTransform(dpr,0,0,dpr,0,0);
    const pieces=Array.from({length:105},() => ({x:Math.random()*w,y:-Math.random()*h*.45-10,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,size:3+Math.random()*5,rot:Math.random()*6.3,spin:(Math.random()-.5)*.11,col:['#d8ba7d','#f4e7c8','#8cb4a8','#c38272'][Math.floor(Math.random()*4)]}));
    const started=performance.now();
    function frame(now) {
      c.clearRect(0,0,w,h);
      pieces.forEach(p => {p.x+=p.vx;p.y+=p.vy;p.rot+=p.spin;c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.fillStyle=p.col;c.fillRect(-p.size/2,-p.size/2,p.size,p.size*.55);c.restore();});
      if (now-started<3500) requestAnimationFrame(frame);else c.clearRect(0,0,w,h);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Optional gentle, locally synthesized notes ---------- */
  let audioContext=null, audioInterval=null, noteIndex=0;
  const melody=[329.63,392,440,392,329.63,293.66,261.63,293.66,329.63,440,392,261.63];
  function chime() {
    if (!audioContext || audioContext.state==='closed') return;
    const freq=melody[noteIndex++%melody.length];
    const now=audioContext.currentTime;
    [freq,freq/2].forEach((f,i) => {
      const osc=audioContext.createOscillator(),gain=audioContext.createGain();
      osc.type=i?'sine':'triangle';osc.frequency.value=f;
      gain.gain.setValueAtTime(0.0001,now);
      gain.gain.exponentialRampToValueAtTime(i?.008:.018,now+.05);
      gain.gain.exponentialRampToValueAtTime(.0001,now+1.1);
      osc.connect(gain);gain.connect(audioContext.destination);
      osc.start(now);osc.stop(now+1.12);
    });
  }
  async function toggleMusic() {
    const btn=$('sound-btn');
    if (audioContext) {
      clearInterval(audioInterval);await audioContext.close();audioContext=null;
      btn.setAttribute('aria-pressed','false');btn.querySelector('.sound-label').textContent='Bật âm thanh';btn.title='Bật nhạc nền';return;
    }
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if (!AudioCtx) {notify('Trình duyệt này chưa hỗ trợ âm thanh.');return;}
    try {
      audioContext=new AudioCtx();await audioContext.resume();chime();audioInterval=setInterval(chime,1150);
      btn.setAttribute('aria-pressed','true');btn.querySelector('.sound-label').textContent='Tắt âm thanh';btn.title='Tắt nhạc nền';
    } catch (_) {audioContext=null;notify('Chưa bật được âm thanh trên trình duyệt này.');}
  }
  $('sound-btn').addEventListener('click',toggleMusic);
  document.addEventListener('visibilitychange',() => {
    if (!audioContext) return;
    if (document.hidden) audioContext.suspend(); else audioContext.resume().catch(()=>{});
  });
  $('reset-game').addEventListener('click', () => {
    if (!window.confirm('Anh muốn chơi lại bốn nhiệm vụ từ đầu chứ?')) return;
    state=initial();
    renderAll();
    closeLetter();
    notify('Một hành trình mới đã bắt đầu!');
    document.querySelector('#quests').scrollIntoView({behavior:'smooth'});
  });
  function renderAll() {renderFish();renderPlots();renderNodes();renderQuiz();updateQuestProgress();}
  renderAll();
})();
