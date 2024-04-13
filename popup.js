// Function to generate a random password
function generatePassword(length, includeNumbers, includeCharacters, includeSpecial) {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Default to letters only

  if (includeNumbers) charset += '0123456789';
  if (includeCharacters) charset += '!@#$%^&*()-_=+';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Function to update the password input with a random password
function updatePassword() {
  const passwordLength = document.getElementById('length').value;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeCharacters = document.getElementById('characters').checked;
  const includeSpecial = document.getElementById('special').checked;

  const passwordInput = document.getElementById('password');
  const generatedPassword = generatePassword(passwordLength, includeNumbers, includeCharacters, includeSpecial);
  passwordInput.value = generatedPassword;
}

// Function to show the copy success message
function showCopySuccess() {
  const copySuccess = document.getElementById('copy-success');
  copySuccess.style.display = 'block';
  setTimeout(() => {
    copySuccess.style.display = 'none';
  }, 2000); // Hide after 2 seconds
}

// Event listener for the "Generate Password" button
document.getElementById('generate-btn').addEventListener('click', () => {
  updatePassword();
});

// Event listener for the "Copy" button
document.getElementById('copy-btn').addEventListener('click', () => {
  const passwordInput = document.getElementById('password');
  passwordInput.select();
  document.execCommand('copy');
  showCopySuccess();
});

// Initial generation of a password when the extension popup is opened
updatePassword();

