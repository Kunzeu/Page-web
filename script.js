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
});
