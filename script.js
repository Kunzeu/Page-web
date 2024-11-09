document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[data-scroll]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-scroll');
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const redirectLinks = document.querySelectorAll('a[data-scroll-redirect]');
    redirectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-scroll-redirect');
            
            sessionStorage.setItem('scrollTo', sectionId);
            
            window.location.href = 'index.html';
        });
    });

    const scrollTo = sessionStorage.getItem('scrollTo');
    if (scrollTo) {
        const element = document.getElementById(scrollTo);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
                sessionStorage.removeItem('scrollTo');
            }, 100);
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Cambiar el ícono entre barras y X
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar el menú cuando se hace clic en un enlace
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});
