document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            // Alle anderen schließen
            dropdownToggles.forEach(other => {
                if (other !== toggle) other.checked = false;
            });
        });
    });
});

