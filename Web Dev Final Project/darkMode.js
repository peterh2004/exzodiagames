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

