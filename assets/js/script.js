document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Command category tabs
    const commandCategories = document.querySelectorAll('.command-category');
    
    commandCategories.forEach(category => {
        const title = category.querySelector('h3');
        const commands = category.querySelectorAll('.command');
        
        title.addEventListener('click', () => {
            category.classList.toggle('expanded');
            commands.forEach(cmd => {
                cmd.style.maxHeight = category.classList.contains('expanded') ? 
                    cmd.scrollHeight + 'px' : '0';
            });
        });
    });

    // Support banner interaction
    const supportBanner = document.querySelector('.support-banner');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            supportBanner.style.transform = 'translateY(150%)';
        } else {
            // Scrolling up
            supportBanner.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Initialize command categories as expanded
    commandCategories.forEach(category => {
        category.classList.add('expanded');
        const commands = category.querySelectorAll('.command');
        commands.forEach(cmd => {
            cmd.style.maxHeight = cmd.scrollHeight + 'px';
        });
    });
});
