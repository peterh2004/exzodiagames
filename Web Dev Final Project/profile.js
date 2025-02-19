//File contains the code required to handle the profile picture settings

document.addEventListener('DOMContentLoaded', function() {
    const profilePic = document.getElementById("changePFP");
    const inputFile = document.getElementById("fileInput");
    const cornerPFP = document.getElementById("pfp");
    const removePFP = document.getElementById("removePFP");
  
    if (profilePic && inputFile) {
      inputFile.addEventListener('change', function(event) {
        const selectedFile = event.target.files[0];
  
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = function() {
            profilePic.src = reader.result;
            cornerPFP.src = reader.result;
            // Store the image data URL in local storage
            localStorage.setItem('profilePicture', reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      });
  
      // Check if profile picture data exists in local storage
      const storedProfilePic = localStorage.getItem('profilePicture');
      if (storedProfilePic) {
        profilePic.src = storedProfilePic;
        cornerPFP.src = storedProfilePic;
      }
    } else {
      console.error("Could not find the necessary elements.");
    }


    removePFP.addEventListener('click', function() {
        profilePic.src = "resources/default-pfp.jpg";
        cornerPFP.src = "resources/default-pfp.jpg";
        localStorage.setItem('profilePicture', "resources/default-pfp.jpg");
    });





  });
  