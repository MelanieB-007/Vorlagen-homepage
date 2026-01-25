document.addEventListener('DOMContentLoaded', () => {
    // ===== LANG-SWITCHER =====
    const langButtonFlag = document.querySelector('.lang-button .fi');
    const langOptions = document.querySelectorAll('.lang-option');
    const langToggle = document.getElementById('lang-toggle');

    if (!langButtonFlag || !langToggle) {
        console.error('Lang-Switcher fehlt!');
        return;
    }

    // Initial: Gespeicherte Sprache laden
    const savedLang = localStorage.getItem('lang') || 'de';
    updateLangFlag(savedLang);

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const newLang = option.dataset.lang;
            updateLangFlag(newLang);
            localStorage.setItem('lang', newLang);
            langToggle.checked = false; // Schließen
        });
    });

    function updateLangFlag(lang) {
        const flagMap = {
            'de': 'de',  // Deutschland
            'en': 'gb',  // UK (England)
            'fr': 'fr'   // Frankreich
        };
        langButtonFlag.className = `fi fi-${flagMap[lang] || 'de'}`;
    }

    // ===== DROPDOWNs (Desktop/Mobile) =====
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            // Alle anderen schließen (exkl. sich selbst)
            dropdownToggles.forEach(other => {
                if (other !== toggle) other.checked = false;
            });
        });
    });

    // ===== MOBILE NAV AUTO-SCHLIESSEN =====
    // Bei Link-Klick: Hamburger schließen
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle) navToggle.checked = false;
        });
    });

    // ===== CLICK OUTSIDE: Alles schließen =====
    document.addEventListener('click', (e) => {
        const navToggle = document.getElementById('nav-toggle');
        const isHeaderOrNav = e.target.closest('.header') || e.target.closest('.nav-section');

        // Mobile Nav schließen (außer in Header/Nav)
        if (navToggle && !isHeaderOrNav) {
            navToggle.checked = false;
        }

        // Dropdowns schließen (außer in Dropdown)
        if (!e.target.closest('.dropdown')) {
            dropdownToggles.forEach(t => t.checked = false);
        }
    });

    console.log('Navigation + Lang-Switcher initialisiert! 🚀');
});
