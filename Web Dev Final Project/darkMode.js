
//Code for dark mode settings

document.addEventListener('DOMContentLoaded', function() {
    const darkModeCheckbox = document.getElementById('darkMode');
    const body = document.body;
    const logo = document.getElementById('logo');

    darkModeCheckbox.addEventListener('change', function() {
        if (darkModeCheckbox.checked) {
            body.classList.add('dark-mode');
            logo.src = 'resources/exzodiaBlack.png';
            localStorage.setItem('toggleDarkMode', 'dark'); // Store as string 'true'
        } else {
            body.classList.remove('dark-mode');
            logo.src = 'resources/exzodiaWhite.png';
            localStorage.removeItem('toggleDarkMode'); // Store as string 'false'
        }
    });

    // Check local storage for dark mode preference on page load
    const isDarkMode = localStorage.getItem('toggleDarkMode');
    if (isDarkMode) {
        darkModeCheckbox.checked = true;
        body.classList.add('dark-mode');
        logo.src = 'resources/exzodiaBlack.png';
    } else {
        darkModeCheckbox.checked = false;
        body.classList.remove('dark-mode');
        logo.src = 'resources/exzodiaWhite.png';
    }
});

(function() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const darkModeCheckbox = document.getElementById('darkMode');

    // Always enable dark mode by default
    body.classList.add('dark-mode');
    if (logo) {
        logo.src = 'resources/exzodiaBlack.png';
    }
    localStorage.setItem('toggleDarkMode', 'dark');

    document.addEventListener('DOMContentLoaded', function() {
        if (darkModeCheckbox) {
            darkModeCheckbox.checked = true; // Ensure checkbox is checked
        }

        // Listen for user toggling dark mode
        darkModeCheckbox?.addEventListener('change', function() {
            if (darkModeCheckbox.checked) {
                body.classList.add('dark-mode');
                if (logo) logo.src = 'resources/exzodiaBlack.png';
                localStorage.setItem('toggleDarkMode', 'dark');
            } else {
                body.classList.remove('dark-mode');
                if (logo) logo.src = 'resources/exzodiaWhite.png';
                localStorage.removeItem('toggleDarkMode');
            }
        });
    });
})();