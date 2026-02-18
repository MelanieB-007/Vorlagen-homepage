(function() {
    // Sofort alle schließen
    var toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(t => t.checked = false);

    // Observer für dynamische Inhalte (React/Next.js)
    const observer = new MutationObserver(() => {
        document.querySelectorAll('.nav-toggle').forEach(t => t.checked = false);
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
