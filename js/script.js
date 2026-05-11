document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('form-nome').value;
            const telefone = document.getElementById('form-telefone').value;
            const email = document.getElementById('form-email').value;
            const mensagem = document.getElementById('form-mensagem').value;

            let texto = `*Olá, vim pelo site Lojas AMEL!*\n\n`;
            texto += `*Nome:* ${nome}\n`;
            texto += `*Telefone:* ${telefone}\n`;
            if(email) texto += `*E-mail:* ${email}\n`;
            texto += `*Mensagem:* ${mensagem}`;

            const url = `https://wa.me/5531999707536?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        });
    }
});