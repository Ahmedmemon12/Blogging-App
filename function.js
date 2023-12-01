
const startButton = document.getElementById('startButton');
const authenticationBtn = document.getElementById('authentication');
const signOutBtn = document.getElementById('signOut')
const contentDiv = document.querySelector('.container')
const Loader = document.getElementById('loader');
const logInSwitch = document.getElementById('lSwitch');
const signUpSwitch = document.getElementById('sSwitch');
const signUpDiv = document.getElementById('signUp');
const logInDiv = document.getElementById('logIn');
const passwordInputs = document.querySelectorAll('.password');
const addBlog = document.getElementById('addBlog');
const blogForm = document.getElementById('blogForm');
const hideForm = document.getElementById('hideForm');
const clickBtn = document.getElementById('click');



startButton?.addEventListener('click', function loader() {
    contentDiv.style.display = 'none';
    Loader.style.display = 'block';

    setTimeout(function () {
        window.location.href = 'blog.html';
    }, 2000);
});
authenticationBtn?.addEventListener('click', function loader() {
        window.location.href = 'main.html';
});

logInSwitch?.addEventListener('click' , function(){
    logInDiv.style.display = "flex";
    signUpDiv.style.display = "none";
})
signUpSwitch?.addEventListener('click' , function(){
    logInDiv.style.display = "none";
    signUpDiv.style.display = "flex";
})

document.addEventListener('DOMContentLoaded', function () {
    var showPasswordBtn = document.getElementById('showPasswordBtn');
    var ShowPasswordBtn = document.getElementById('ShowPasswordBtn');
    showPasswordBtn?.addEventListener('click', togglePasswords);
    ShowPasswordBtn?.addEventListener('click', togglePasswords);
});

function togglePasswords() {
    var passwordInputs = document.querySelectorAll('.password');
    passwordInputs.forEach(function (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    });
}

// Get references to the file input and file display elements
const fileInput = document.getElementById('fileInput');
const fileDisplay = document.getElementById('fileDisplay');

// Add an event listener to the file input
fileInput?.addEventListener('change', handleFileSelect);

// Function to handle file selection
function handleFileSelect(event) {
  // Get the selected file
  const file = event.target.files[0];

  // Check if a file is selected
  if (file) {
    // Check if the selected file is an image
    if (file.type.startsWith('image/')) {
      // Display the selected image
      displayImage(file);
    } else {
      // If the selected file is not an image, notify the user
      alert('Please select a valid image file.');
      // Clear the file input
      fileInput.value = '';
      // Clear the file display
      fileDisplay.innerHTML = '';
    }
  }
}

// Function to display the selected image
function displayImage(file) {
  // Create a FileReader
  const reader = new FileReader();

  // Set up the FileReader to display the image when loaded
  reader.onload = function (e) {
    // Create an image element
    const imgElement = document.createElement('img');
    // Set the source of the image to the data URL
    imgElement.src = e.target.result;
    // Set other attributes for styling (you can adjust as needed)
    imgElement.style.maxWidth = '100px';
    imgElement.style.height = 'auto';
    // Clear any previous content in the file display
    fileDisplay.innerHTML = '';
    // Append the image to the file display
    fileDisplay.appendChild(imgElement);
  };

  // Read the selected file as a data URL
  reader.readAsDataURL(file);
}

  addBlog?.addEventListener('click',()=>{
    blogForm.style.display = "flex  "
  })

  hideForm?.addEventListener('click',()=>{
    blogForm.style.display = "none"
  })