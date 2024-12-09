// Function to check for login elements on the page
function isLoginPage() {
    // Check for username/email/phone fields and password fields
    const usernameField = document.querySelector(
      "input[type='text'][name*='user'], input[type='text'][name*='email'], input[type='text'][placeholder*='Email'], input[type='text'][placeholder*='User'], input[type='email']"
    );
  
    const phoneField = document.querySelector(
      "input[type='tel'], input[type='text'][name*='phone'], input[type='text'][placeholder*='Phone'], input[type='text'][placeholder*='Mobile']"
    );
  
    const passwordField = document.querySelector("input[type='password']");
  
    // Return true if any username/email/phone field is present with a password field
    return usernameField || passwordField;
  }
  
  // Send a message to the background script if it's a login page
  if (isLoginPage()) {
    chrome.runtime.sendMessage({ loginPageDetected: true });
  } else {
    chrome.runtime.sendMessage({ loginPageDetected: false });
  }
  