document.addEventListener('DOMContentLoaded', () => {
    // ===== LANG-SWITCHER (CSS-ONLY POSITION + JS LOGIC) =====
    const langButtonFlag = document.querySelector('.lang-button .fi');
    const langOptions = document.querySelectorAll('.lang-option');  // Jetzt <div class="lang-option">
    const langToggle = document.getElementById('lang-toggle');
    const langButton = document.querySelector('.lang-button');

    if (!langButtonFlag || !langToggle || !langButton) {
        console.error('Lang-Switcher Elemente fehlen!');
        return;
    }

    const flagMap = {
        'de': 'de',
        'en': 'gb',
        'fr': 'fr'
    };

    // ===== INITIAL: SPRACHE LADEN =====
    let savedLang = localStorage.getItem('lang') || 'de';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lang')) {
        savedLang = urlParams.get('lang');
        localStorage.setItem('lang', savedLang);
    }
    updateLangFlag(savedLang);

    // ===== TOGGLE EVENT (CSS übernimmt Visibility/Position!) =====
    langToggle.addEventListener('change', () => {
        console.log('Lang-Dropdown:', langToggle.checked ? '✅ OFFEN' : '❌ ZU');
    });

    // ===== OPTION CLICKS (Wechsel + Schließen) =====
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const newLang = option.dataset.lang;
            updateLangFlag(newLang);
            localStorage.setItem('lang', newLang);

            // URL updaten
            urlParams.set('lang', newLang);
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

            langToggle.checked = false; // Schließen
            console.log('🌐 Sprache gewechselt:', newLang);
            // location.reload(); // ← Uncomment für echte i18n
        });
    });

    function updateLangFlag(lang) {
        langButtonFlag.className = `fi fi-${flagMap[lang] || 'de'}`;
        // Active Option markieren
        langOptions.forEach(opt =>
            opt.classList.toggle('active', opt.dataset.lang === lang)
        );
    }

    // ===== CLICK OUTSIDE: SCHLIESSEN =====
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-switcher')) {
            langToggle.checked = false;
        }
    });

    // ===== DROPDOWNS ALLE SCHLIESSEN (Desktop/Mobile) =====
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle, #lang-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            dropdownToggles.forEach(other => {
                if (other !== toggle) other.checked = false;
            });
        });
    });

    // ===== MOBILE NAV: LINK-CLICK SCHLIESSEN =====
    document.querySelectorAll('.nav-list a, .nav-section a').forEach(link => {
        link.addEventListener('click', () => {
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle) navToggle.checked = false;
        });
    });

    console.log('✅ Lang-Switcher CSS-only ready. Sprache:', savedLang);
});
