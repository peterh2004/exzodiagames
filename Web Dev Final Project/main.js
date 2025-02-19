// const logo = document.getElementById('logo');
// const pfp = document.getElementById('pfp');
// const about = document.getElementById('about');


window.addEventListener('load', function() {

    //Sets profile picture
    const pfp = document.getElementById("pfp");
    const storedProfilePic = localStorage.getItem('profilePicture');
    if (storedProfilePic) {
        pfp.src = storedProfilePic;
    }

    //Sets dark mode if enabled
    const body = document.body;
    const storedTheme = localStorage.getItem('toggleDarkMode');
    const logo = document.getElementById('logo');
    if (storedTheme) {
        body.classList.add('dark-mode');
        logo.src = 'resources/exzodiaBlack.png';
    }




});