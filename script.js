// スムーススクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-menu a, .cta-button, .detail-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 内部リンクの場合のみスムーススクロールを適用
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // スクロール時のヘッダー効果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール時はヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール時はヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // スクロール時のアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('.journey-card, .spot-card, .packing-category, .budget-item, .tip-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // パララックス効果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ローディングアニメーション
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // モバイルメニューの処理（必要に応じて）
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 予算計算機能
    const budgetItems = document.querySelectorAll('.budget-item p');
    let total = 0;
    
    budgetItems.forEach(item => {
        const amount = parseInt(item.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(amount)) {
            total += amount;
        }
    });
    
    // カウントアップアニメーション
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = '¥' + Math.floor(current).toLocaleString();
        }, 20);
    }
    
    // 予算セクションが表示されたときにアニメーション開始
    const budgetSection = document.querySelector('.budget');
    if (budgetSection) {
        const budgetObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const totalElement = document.querySelector('.budget-total p');
                    if (totalElement) {
                        animateCounter(totalElement, 210000);
                    }
                    budgetObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        budgetObserver.observe(budgetSection);
    }
});

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 現在のページセクションをハイライト
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection(); // 初期実行
});

