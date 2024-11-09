document.addEventListener('DOMContentLoaded', () => {
    // Navegación mejorada
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: "-50% 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));

    // Animaciones de scroll mejoradas
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    document.querySelectorAll('.feature-card, .command').forEach(el => {
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Menú móvil mejorado
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
            
            // Animación del ícono
            const icon = menuButton.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Efecto parallax suavizado
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const hero = document.querySelector('.hero');
                const scrolled = window.pageYOffset;
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Copiar comandos al portapapeles
    document.querySelectorAll('.command code').forEach(cmd => {
        cmd.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(cmd.textContent);
                
                // Feedback visual
                const originalText = cmd.textContent;
                cmd.textContent = '¡Copiado!';
                cmd.style.background = 'rgba(114, 137, 218, 0.2)';
                
                setTimeout(() => {
                    cmd.textContent = originalText;
                    cmd.style.background = 'rgba(0, 0, 0, 0.2)';
                }, 1500);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        });
        
        // Indicador visual de que es copiable
        cmd.title = 'Click para copiar';
        cmd.style.cursor = 'pointer';
    });

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Verificar tema guardado o usar oscuro por defecto
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Manejar cambio de tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Manejar clicks en enlaces con data-scroll
    document.querySelectorAll('a[data-scroll]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-scroll');
            
            // Si estamos en la página index.html
            if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Si estamos en otra página, redirigir a index.html con el scroll después de cargar
                window.location.href = `/index.html?scroll=${sectionId}`;
            }
        });
    });

    // Verificar si hay un parámetro de scroll al cargar la página
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scroll');
    if (scrollTo) {
        const element = document.getElementById(scrollTo);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Añadir clases de animación
const styles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-link.active {
        color: var(--primary-color);
    }

    @media (max-width: 768px) {
        nav ul.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .menu-toggle.active {
            color: var(--primary-color);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
