/**
 * 🌸 朱嘉晴个人作品集 - 交互脚本
 * 温柔粉色主题 · 简约可爱风格
 */

// ============================================
// 1. 数字动画效果
// ============================================
function animateNumbers() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseFloat(stat.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 缓动函数
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;
      
      if (isDecimal) {
        stat.textContent = current.toFixed(2);
      } else {
        stat.textContent = Math.floor(current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }
    
    requestAnimationFrame(updateNumber);
  });
}

// ============================================
// 2. 滚动动画
// ============================================
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.scroll-animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// ============================================
// 3. 导航高亮
// ============================================
function handleNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// 4. 经验标签切换
// ============================================
function switchTab(tabId) {
  // 更新按钮状态
  const tabs = document.querySelectorAll('.exp-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  event.target.classList.add('active');
  
  // 切换内容
  const contents = document.querySelectorAll('.experience-content');
  contents.forEach(content => content.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
}

// ============================================
// 5. 移动端菜单
// ============================================
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('active');
}

// 点击外部关闭菜单
document.addEventListener('click', (e) => {
  const mobileNav = document.getElementById('mobileNav');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('active');
  }
});

// ============================================
// 6. 滚动进度条
// ============================================
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF9CC2, #E87AAF);
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

// ============================================
// 7. 平滑滚动到锚点
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// 8. 头像悬浮效果增强
// ============================================
function enhanceAvatarEffect() {
  const avatar = document.querySelector('.avatar-circle');
  
  document.addEventListener('mousemove', (e) => {
    if (!avatar) return;
    
    const rect = avatar.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = y / 10;
    const rotateY = -x / 10;
    
    avatar.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  document.addEventListener('mouseleave', () => {
    if (avatar) {
      avatar.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
  });
}

// ============================================
// 9. 技能标签动画
// ============================================
function animateSkillTags() {
  const tags = document.querySelectorAll('.skill-tag');
  
  tags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-5px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ============================================
// 10. 卡片悬浮效果
// ============================================
function enhanceCardEffects() {
  const cards = document.querySelectorAll('.honor-card, .work-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) rotate(1deg)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotate(0deg)';
    });
  });
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // 创建滚动进度条
  createScrollProgress();
  
  // 数字动画（延迟执行，等页面加载完成）
  setTimeout(animateNumbers, 500);
  
  // 滚动动画
  handleScrollAnimation();
  
  // 导航高亮
  handleNavHighlight();
  
  // 增强头像效果
  enhanceAvatarEffect();
  
  // 技能标签动画
  animateSkillTags();
  
  // 卡片悬浮效果
  enhanceCardEffects();
  
  console.log('🌸 朱嘉晴个人作品集已加载');
});

// ============================================
// 11. 自助编辑模式（Judy 可在线修改文字，提交回 GitHub）
// ============================================
(function(){
  const REPO = 'Judy-135/portfolio';
  const FILE = 'index.html';
  const BRANCH = 'main';
  const EDIT_PASSWORD = 'judy';        // ← Judy 可自行修改这个编辑口令
  const TOKEN_KEY = 'judy_portfolio_gh_token';

  // 需要可编辑的文字块（顺序无所谓，live 与原始文件按选择器一一对应）
  const EDITABLE = [
    '.hero-badge', '.hero-title', '.hero-subtitle',
    '.hero-university h3', '.hero-university p',
    '.stat-label',
    '.section-title h2', '.section-title p', '.section-doc-link',
    '.about-intro', '.skill-tag',
    '.timeline-date', '.timeline-title', '.timeline-subtitle', '.timeline-desc',
    '.edu-highlight h4', '.edu-highlight li',
    '.honor-title', '.honor-level', '.honor-year',
    '.exp-tab',
    '.work-category', '.work-title', '.work-desc',
    '.cert-title', '.cert-org',
    '.life-header h3', '.life-desc',
    '.contact-title', '.contact-subtitle', '.contact-item',
    '.doc-link', '.footer p'
  ];

  let editing = false;
  let tokenCache = localStorage.getItem(TOKEN_KEY) || '';

  // 注入编辑相关样式
  const style = document.createElement('style');
  style.textContent = `
    .pf-edit-fab{position:fixed;right:18px;bottom:18px;z-index:2000;width:52px;height:52px;border:none;border-radius:50%;
      background:linear-gradient(135deg,#FF9CC2,#E87AAF);color:#fff;font-size:22px;cursor:pointer;box-shadow:0 6px 20px rgba(232,122,175,.45);transition:transform .2s;}
    .pf-edit-fab:hover{transform:scale(1.08);}
    body.pf-editing *{cursor:text!important;}
    body.pf-editing .skill-tag,body.pf-editing .honor-card,body.pf-editing .work-card{transform:none!important;}
    [contenteditable="true"]{outline:2px dashed #E87AAF;outline-offset:3px;border-radius:6px;background:rgba(255,245,247,.6);}
    .pf-toolbar{position:fixed;top:0;left:0;right:0;z-index:2001;display:none;gap:10px;align-items:center;justify-content:center;
      padding:10px 16px;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);box-shadow:0 2px 16px rgba(232,122,175,.3);font-family:'Noto Sans SC',sans-serif;}
    body.pf-editing .pf-toolbar{display:flex;}
    .pf-toolbar button{border:none;border-radius:20px;padding:8px 18px;font-size:14px;cursor:pointer;font-weight:600;}
    .pf-save{background:#E87AAF;color:#fff;}
    .pf-cancel{background:#eee;color:#666;}
    .pf-tip{font-size:12px;color:#8B7B8E;margin-left:6px;}
    .pf-modal{position:fixed;inset:0;z-index:2002;display:none;align-items:center;justify-content:center;background:rgba(93,78,90,.45);}
    .pf-modal.show{display:flex;}
    .pf-card{background:#fff;border-radius:16px;padding:24px;width:min(420px,90vw);box-shadow:0 20px 60px rgba(0,0,0,.25);}
    .pf-card h3{margin-bottom:6px;color:#E87AAF;font-size:17px;}
    .pf-card p{font-size:12px;color:#8B7B8E;line-height:1.6;margin-bottom:12px;}
    .pf-card input[type=password]{width:100%;padding:10px 12px;border:1px solid #FFD6E4;border-radius:10px;font-size:14px;margin-bottom:10px;box-sizing:border-box;}
    .pf-card label{font-size:12px;color:#5D4E5A;display:flex;align-items:center;gap:6px;margin-bottom:14px;}
    .pf-card .pf-row{display:flex;gap:10px;justify-content:flex-end;}
    .pf-card .pf-row button{border:none;border-radius:10px;padding:9px 18px;cursor:pointer;font-weight:600;font-size:14px;}
    .pf-ok{background:#E87AAF;color:#fff;}
    .pf-no{background:#f0f0f0;color:#666;}
    .pf-status{font-size:12px;margin-top:8px;min-height:16px;}
    .pf-status.err{color:#E74c3c;}
    .pf-status.ok{color:#27ae60;}
  `;
  document.head.appendChild(style);

  // 悬浮按钮 + 顶部工具栏 + Token 弹窗
  const fab = document.createElement('button');
  fab.className = 'pf-edit-fab';
  fab.title = '编辑网页内容';
  fab.textContent = '✏️';
  document.body.appendChild(fab);

  const bar = document.createElement('div');
  bar.className = 'pf-toolbar';
  bar.innerHTML = `<span class="pf-tip">编辑模式：直接点击文字修改，完成后保存</span>
    <button class="pf-save">💾 保存修改</button>
    <button class="pf-cancel">❌ 退出</button>`;
  document.body.appendChild(bar);

  const modal = document.createElement('div');
  modal.className = 'pf-modal';
  modal.innerHTML = `<div class="pf-card">
    <h3>🔑 GitHub 访问令牌</h3>
    <p>用于把修改提交到你的 GitHub 仓库并更新线上网站。建议使用<strong>仅限本仓库、Contents 读写的 Fine-grained Token</strong>。令牌只保存在你本机浏览器，不会上传到任何服务器。</p>
    <input type="password" class="pf-token" placeholder="粘贴 GitHub Token（ghp_... 或 fine-grained）">
    <label><input type="checkbox" class="pf-remember"> 记住令牌（仅本机浏览器）</label>
    <div class="pf-status"></div>
    <div class="pf-row"><button class="pf-no">取消</button><button class="pf-ok">确认保存</button></div>
  </div>`;
  document.body.appendChild(modal);

  const statusEl = modal.querySelector('.pf-status');
  function setStatus(msg, cls){ statusEl.textContent = msg; statusEl.className = 'pf-status ' + (cls || ''); }

  function enterEdit(){
    editing = true;
    document.body.classList.add('pf-editing');
    EDITABLE.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.style.transform = '';
      });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function exitEdit(){
    editing = false;
    document.body.classList.remove('pf-editing');
    document.querySelectorAll('[contenteditable="true"]').forEach(el => el.removeAttribute('contenteditable'));
  }

  fab.addEventListener('click', () => {
    if(editing){ exitEdit(); return; }
    const pwd = prompt('请输入编辑口令：');
    if(pwd === null) return;
    if(pwd !== EDIT_PASSWORD){ alert('口令错误，无法进入编辑模式。'); return; }
    enterEdit();
  });
  bar.querySelector('.pf-cancel').addEventListener('click', exitEdit);

  function b64encode(str){
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin);
  }
  function b64decode(b64){
    const bin = atob(b64.replace(/\s/g, ''));
    const bytes = new Uint8Array(bin.length);
    for(let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }

  async function save(){
    const token = tokenCache || localStorage.getItem(TOKEN_KEY) || '';
    if(!token){ modal.classList.add('show'); setStatus('', ''); return; }
    setStatus('正在保存…');
    try{
      const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}?ref=${BRANCH}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
      });
      if(!getRes.ok) throw new Error('读取仓库失败：' + getRes.status);
      const data = await getRes.json();
      const sha = data.sha;
      const original = b64decode(data.content);

      const bodyMatch = original.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if(!bodyMatch) throw new Error('未找到 body');
      const bodyOrig = bodyMatch[1];
      const tmp = new DOMParser().parseFromString('<body>' + bodyOrig + '</body>', 'text/html');
      const pBody = tmp.body;
      EDITABLE.forEach(sel => {
        const liveNodes = [...document.querySelectorAll(sel)];
        const pNodes = [...pBody.querySelectorAll(sel)];
        liveNodes.forEach((ln, i) => {
          if(pNodes[i]){ ln.style.transform = ''; pNodes[i].innerHTML = ln.innerHTML; }
        });
      });
      const newBody = pBody.innerHTML;
      const newFile = original.replace(bodyOrig, newBody);

      const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: '✏️ 自助更新作品集文字内容',
          content: b64encode(newFile),
          sha: sha,
          branch: BRANCH
        })
      });
      if(!putRes.ok){
        const e = await putRes.json().catch(() => ({}));
        if(putRes.status === 401) throw new Error('Token 无效或无权限，请用有 Contents 写权限的 Token');
        throw new Error(e.message || ('提交失败：' + putRes.status));
      }
      setStatus('✅ 已保存，正在刷新…', 'ok');
      setTimeout(() => location.reload(), 900);
    }catch(err){
      setStatus('❌ ' + err.message, 'err');
    }
  }

  bar.querySelector('.pf-save').addEventListener('click', save);

  modal.querySelector('.pf-no').addEventListener('click', () => { modal.classList.remove('show'); });
  modal.querySelector('.pf-ok').addEventListener('click', () => {
    const t = modal.querySelector('.pf-token').value.trim();
    if(!t){ setStatus('请先粘贴 GitHub Token', 'err'); return; }
    tokenCache = t;
    if(modal.querySelector('.pf-remember').checked) localStorage.setItem(TOKEN_KEY, t);
    modal.classList.remove('show');
    save();
  });
})();
