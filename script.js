// ==========================================
// SCROLL ANIMATIONS — IntersectionObserver
// ==========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
    '.projet, .contact, .about, .projet-web .poster, .projet-art .poster, .contact .champ, .contacts .contact1'
);
elementsToAnimate.forEach(el => observer.observe(el));


// ==========================================
// EMPLACEMENT DYNAMIQUE — king / projet / contact / à_propos
// ==========================================

const emplacement   = document.getElementById('emplacement');
const sectionProjet  = document.getElementById('section-projet');
const sectionContact = document.getElementById('section-contact');
const sectionAbout   = document.getElementById('section-about');

const LABELS = {
    accueil:   '.king',
    projet:    '.projet',
    contact:   '.contact',
    à_propos:  '.à propos'  // Attention : espace dans le sélecteur
};

let currentLabel = 'accueil';

function setEmplacement(label) {
    if (currentLabel === label) return;
    currentLabel = label;

    emplacement.style.opacity   = '0';
    emplacement.style.transform = 'translateY(-6px)';

    setTimeout(() => {
        emplacement.textContent     = LABELS[label];
        emplacement.style.opacity   = '1';
        emplacement.style.transform = 'translateY(0)';
    }, 200);
}

emplacement.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'section-about')   setEmplacement('à_propos');
            if (entry.target.id === 'section-projet')  setEmplacement('projet');
            if (entry.target.id === 'section-contact') setEmplacement('contact');
        } else {
            const rect = entry.target.getBoundingClientRect();

            if (entry.target.id === 'section-about' && rect.top > 0) {
                setEmplacement('accueil');
            }
            if (entry.target.id === 'section-projet' && rect.top > 0) {
                setEmplacement('à_propos');
            }
            if (entry.target.id === 'section-contact' && rect.top > 0 && currentLabel === 'contact') {
                setEmplacement('projet');
            }
        }
    });
}, { threshold: 0.1 });

// Correction : Ajout des IDs sur les sections si nécessaire
const aboutSection = document.querySelector('.about');
if (aboutSection && !aboutSection.id) aboutSection.id = 'section-about';

const projetSection = document.querySelector('.projet');
if (projetSection && !projetSection.id && !sectionProjet) {
    // Si sectionProjet n'existe pas, utiliser cette section
    sectionObserver.observe(projetSection);
}

if (sectionAbout) sectionObserver.observe(sectionAbout);
if (sectionProjet) sectionObserver.observe(sectionProjet);
if (sectionContact) sectionObserver.observe(sectionContact);

// Observer la section about même si elle n'a pas l'ID
if (aboutSection && !sectionAbout) sectionObserver.observe(aboutSection);


// ==========================================
// FORMULAIRE — validation + bouton ENVOYER
// ==========================================

const nom     = document.getElementById('nom');
const mail    = document.getElementById('mail');
const message = document.getElementById('message');
const envoyer = document.getElementById('share');

// Vérification que les éléments existent
if (nom && mail && message && envoyer) {
    function updateEnvoyer() {
        if (nom.value.trim().length > 0 && mail.value.trim().length > 0 && message.value.trim().length > 0) {
            envoyer.classList.add('active');
        } else {
            envoyer.classList.remove('active');
        }
    }

    nom.addEventListener('input', () => {
        nom.style.borderLeft = nom.value.length > 0 ? '4px solid gold' : '';
        updateEnvoyer();
    });

    mail.addEventListener('input', () => {
        mail.style.borderLeft = mail.value.length > 0 ? '4px solid gold' : '';
        updateEnvoyer();
    });

    message.addEventListener('input', () => {
        message.style.borderLeft = message.value.length > 0 ? '4px solid gold' : '';
        updateEnvoyer();
    });

    // Clic sur ENVOYER → ouvre Gmail avec les champs pré-remplis
    envoyer.addEventListener('click', () => {
        if (!envoyer.classList.contains('active')) return;

        const dest    = 'hasinirinaandrianarivo446@gmail.com';
        const sujet   = encodeURIComponent(`Message de ${nom.value.trim()}`);
        const corps   = encodeURIComponent(`De : ${nom.value.trim()}\nEmail : ${mail.value.trim()}\n\n${message.value.trim()}`);

        window.location.href = `mailto:${dest}?subject=${sujet}&body=${corps}`;
    });
}


// ==========================================
// RÉSEAUX SOCIAUX — liens directs
// ==========================================

const LINKS = {
    WhatsApp:  'https://wa.me/261332424033',
    Github:    'https://github.com/hasinirina-coder',
    X:         'https://x.com/HASINAntsika',
    Facebook:  'https://www.facebook.com/profile.php?id=61564482631022'
};

document.querySelectorAll('.contacts .contact1').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    const alt = img.getAttribute('alt');
    const url = LINKS[alt];
    if (!url) return;

    item.style.cursor = 'pointer';
    item.addEventListener('dblclick', () => window.open(url, '_blank'));
});

const more_contacts = document.querySelector('.social');
const facebook = document.querySelector('.facebook');
const x = document.querySelector('.x');
const whatsapp = document.querySelector('.whatsapp');
const github = document.querySelector('.github');

if (more_contacts) {
    more_contacts.innerHTML = "+261 33 240 33";

    if(facebook){
        facebook.addEventListener('click',() => {
            more_contacts.innerHTML = "Has Ina";
        });
    }

    if(x){
        x.addEventListener('click',() => {
            more_contacts.innerHTML = "HASINIRINA Andrianarivo";
        });
    }

    if(whatsapp){
        whatsapp.addEventListener('click',() => {
            more_contacts.innerHTML = "+261 33 240 33";
        });
    }

    if(github){
        github.addEventListener('click',() => {
            more_contacts.innerHTML = "HSN09HSN";
        });
    }
}

// ==========================================
// GESTION DES SLIDES
// ==========================================

const first = document.getElementById('first');
const second = document.getElementById('second');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

if (first && second && next && prev) {
    // État initial
    next.classList.add('cliquable');
    prev.classList.add('incliquable');
    second.style.display = "none";
    first.style.display = "block";

    if(next) {
        next.addEventListener('click', () => {
            if(!next.classList.contains('cliquable')) return;
            first.style.display = "none";
            second.style.display = "block";
            next.classList.replace('cliquable', 'incliquable');
            prev.classList.replace('incliquable', 'cliquable');
        });
    }

    if(prev) {
        prev.addEventListener('click', () => {
            if(!prev.classList.contains('cliquable')) return;
            second.style.display = "none";
            first.style.display = "block";
            prev.classList.replace('cliquable', 'incliquable');
            next.classList.replace('incliquable', 'cliquable');
        });
    }
}