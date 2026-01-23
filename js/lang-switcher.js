document.addEventListener('DOMContentLoaded', () => {
    const langButtonFlag = document.querySelector('.lang-button .fi');
    const langOptions = document.querySelectorAll('.lang-option');
    const langToggle = document.getElementById('lang-toggle');

    if (!langButtonFlag || !langToggle) {
        console.error('Lang-Switcher fehlt!');
        return;
    }

    // Initial
    const savedLang = localStorage.getItem('lang') || 'de';
    updateLangFlag(savedLang);

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const newLang = option.dataset.lang;
            updateLangFlag(newLang);

            localStorage.setItem('lang', newLang);
            langToggle.checked = false;
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
});
