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
