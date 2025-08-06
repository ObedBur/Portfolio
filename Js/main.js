/**
 * Portfolio - Effets JavaScript Avancés
 * 
 * Ce fichier contient des effets JavaScript spéciaux pour le portfolio,
 * incluant des effets parallax, des animations au survol, et des interactions utilisateur.
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio JavaScript initialized');

    // Initialiser tous les effets
    initNavbarEffects();
    initParallaxEffects();
    initHoverEffects();
    initScrollEffects();
    initCursorEffect();
    initTypingEffect();
    initProjectsFilter();
    initFormEffects();
});

/**
 * Effet de navbar avec changement au scroll
 */
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (navbar) {
        // Effet de changement de la navbar au scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Navigation active
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Menu mobile
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }
}

/**
 * Effets parallax pour différentes sections
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-image, .profile-frame');

    // Effet parallax au scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Parallax pour les éléments avec la classe .parallax-bg
        document.querySelectorAll('.parallax-bg').forEach(element => {
            element.style.transform = `translateY(${scrollY * 0.4}px)`;
        });

        // Effet de profondeur pour les sections
        document.querySelectorAll('section').forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const distanceFromTop = scrollY - sectionTop;

            if (distanceFromTop > -sectionHeight && distanceFromTop < sectionHeight) {
                const intensity = 0.1;
                const translateY = Math.min(Math.max(distanceFromTop * intensity, -20), 20);
                section.style.transform = `translateY(${translateY}px)`;
            }
        });
    });

    // Effet parallax au mouvement de la souris
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        parallaxElements.forEach(element => {
            const depthX = element.getAttribute('data-depth-x') || 20;
            const depthY = element.getAttribute('data-depth-y') || 20;
            const isReverse = element.hasAttribute('data-reverse');
            const factorX = isReverse ? -1 : 1;
            const factorY = isReverse ? -1 : 1;

            element.style.transform = `translate(${mouseX * depthX * factorX}px, ${mouseY * depthY * factorY}px)`;
        });

        // Effet spécial pour les images de profil
        document.querySelectorAll('.profile-image img, .hero-image img').forEach(img => {
            const rotateX = mouseY * 10; // Rotation X limitée à 10 degrés
            const rotateY = mouseX * 10; // Rotation Y limitée à 10 degrés
            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

/**
 * Effets au survol pour divers éléments
 */
function initHoverEffects() {
    // Effet de survol magnétique pour les boutons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .btn, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--x-position', `${x}px`);
            button.style.setProperty('--y-position', `${y}px`);
            button.classList.add('btn-hover');
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('btn-hover');
        });
    });

    // Effet de survol pour les cartes de projets
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const angleX = (mouseY - cardCenterY) / 25;
            const angleY = (cardCenterX - mouseX) / 25;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const angleX = (mouseY - cardCenterY) / 25;
            const angleY = (cardCenterX - mouseX) / 25;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    // Effet de hover sur les liens sociaux
    const socialLinks = document.querySelectorAll('.social-icon, .social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) rotate(360deg)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

/**
 * Effets au défilement
 */
function initScrollEffects() {
    // Révéler les éléments au scroll
    const revealElements = document.querySelectorAll('.reveal-element');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    // Effet de scroll fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuster pour la navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation de la barre de progression en haut de la page
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = scrollPercentage + '%';
    });
}

/**
 * Effet de curseur personnalisé
 */
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Le suiveur a un délai pour créer un effet de traînée
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Changer l'apparence du curseur sur les éléments cliquables
    const clickableElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-icon, .project-card');

    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('follower-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('follower-hover');
        });
    });

    // Effet de clic
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
        cursorFollower.classList.add('follower-click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
        cursorFollower.classList.remove('follower-click');
    });
}

/**
 * Effet de frappe pour les titres
 */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');

    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';

        let charIndex = 0;
        const typingSpeed = element.getAttribute('data-typing-speed') || 100;

        function typeNextChar() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                element.classList.add('typing-done');
                // Ajouter un curseur clignotant à la fin
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.innerHTML = '|';
                element.appendChild(cursor);
            }
        }

        // Démarrer l'effet lorsque l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeNextChar, 500); // Délai avant de commencer
                    observer.unobserve(element);
                }
            });
        });

        observer.observe(element);
    });
}

/**
 * Filtrage des projets
 */
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Mise à jour des boutons actifs
                filterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filtrage des projets avec animation
                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    card.style.transition = 'all 0.4s ease-out';

                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';

                        setTimeout(() => {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        }, 300);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';

                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Effets pour les formulaires
 */
function initFormEffects() {
    // Animation des champs du formulaire au focus
    const formInputs = document.querySelectorAll('.input-with-icon input, .input-with-icon textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });

        // Animer les labels
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // Validation du formulaire avec animation
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Animation de validation
            const formElements = contactForm.elements;
            let isValid = true;

            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];

                if (element.hasAttribute('required') && element.value.trim() === '') {
                    isValid = false;

                    // Ajouter une animation de secousse
                    element.parentElement.classList.add('shake');
                    setTimeout(() => {
                        element.parentElement.classList.remove('shake');
                    }, 600);
                }
            }

            if (isValid) {
                // Animation de succès
                contactForm.classList.add('form-success');

                // Simulation d'envoi
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';

                    // Réinitialiser le formulaire après un délai
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        contactForm.classList.remove('form-success');

                        // Réinitialiser les états focused
                        document.querySelectorAll('.input-with-icon').forEach(input => {
                            input.classList.remove('focused');
                        });
                    }, 3000);
                }, 2000);
            }
        });
    }
}

// Exporter les fonctions pour les rendre disponibles globalement
window.portfolioEffects = {
    initNavbarEffects,
    initParallaxEffects,
    initHoverEffects,
    initScrollEffects,
    initCursorEffect,
    initTypingEffect,
    initProjectsFilter,
    initFormEffects
}; 
// Ajouter après les fonctions existantes, avant l'export

// Update the skillsData object
// Mettre à jour l'objet skillsData avec les nouveaux pourcentages
const skillsData = {
    skills: [
        {
            name: "Frontend",
            percentage: 80, // Mis à jour à 80%
            color: "#4CAF50",
            technologies: [
                { name: "HTML5", icon: "fab fa-html5", level: "Expert" },
                { name: "CSS3/SASS", icon: "fab fa-css3-alt", level: "Expert" },
                { name: "JavaScript", icon: "fab fa-js", level: "Expert" },
                { name: "React.js", icon: "fab fa-react", level: "Advanced" },
            ]
        },
        {
            name: "Backend",
            percentage: 60, // Mis à jour à 60%
            color: "#2196F3",
            technologies: [
                { name: "Node.js", icon: "fab fa-node-js", level: "Advanced" },
                { name: "PHP", icon: "fab fa-php", level: "Intermediate" },
                { name: "MySQL", icon: "fas fa-database", level: "Advanced" },
                { name: "MongoDB", icon: "fas fa-server", level: "Intermediate" }
            ]
        },
        {
            name: "UI/UX Design",
            percentage: 85, // Mis à jour à 85%
            color: "#9C27B0",
            technologies: [
                { name: "Figma", icon: "fab fa-figma", level: "Advanced" },
                { name: "Adobe XD", icon: "fab fa-adobe", level: "Advanced" },
                { name: "Responsive Design", icon: "fas fa-mobile-alt", level: "Expert" },
                { name: "User Research", icon: "fas fa-users", level: "Advanced" }
            ]
        }
    ]
};


// Fonction pour initialiser les barres de progression
function initSkillsBars() {
    const skillsContainer = document.querySelector('.skills-progress');
    if (!skillsContainer) return;

    // Vider le conteneur existant
    skillsContainer.innerHTML = '';

    // Ajouter chaque compétence
    skillsData.skills.forEach(skill => {
        const skillHTML = `
            <div class="progress-item" data-aos="fade-right">
                <div class="progress-info">
                    <span>${skill.name}</span>
                    <span>${skill.percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-level" style="width: 0%"></div>
                </div>
            </div>
        `;
        skillsContainer.insertAdjacentHTML('beforeend', skillHTML);
    });

    // Animation des barres de progression
    const progressBars = document.querySelectorAll('.progress-level');
    setTimeout(() => {
        progressBars.forEach((bar, index) => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = `${skillsData.skills[index].percentage}%`;
        });
    }, 500);
}

// Ajouter initSkillsBars à l'objet portfolioEffects
window.portfolioEffects = {
    ...window.portfolioEffects,
    initSkillsBars
};
