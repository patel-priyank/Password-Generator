const passwordLength = document.querySelector('#password-length');
const checkSymbols = document.querySelector('#check-symbols');
const checkNumbers = document.querySelector('#check-numbers');
const checkLowercase = document.querySelector('#check-lowercase');
const checkUppercase = document.querySelector('#check-uppercase');
const checkSimilar = document.querySelector('#check-similar');

const passwordText = document.querySelector('#password-text');

const generateBtn = document.querySelector('#generate-btn');
const copyBtn = document.querySelector('#copy-btn');

generateBtn.addEventListener('click', () => {
  generatePassword();
});

copyBtn.addEventListener('click', () => {
  copyPassword();
});

const generatePassword = () => {
  var password = '';

  for (let i = 0; i < passwordLength.value; ++i) {
    password += generateRandomCharacter();
  }

  if (password === '') {
    passwordText.value = 'Select something!';
    disableButtons();
  } else {
    passwordText.value = password;
    enableButtons();
  }
};

const disableButtons = () => {
  generateBtn.disabled = true;
  copyBtn.disabled = true;
};

const enableButtons = () => {
  generateBtn.disabled = false;
  copyBtn.disabled = false;
};

const generateRandomCharacter = () => {
  var pwdString = '';

  if (checkSymbols.checked) {
    pwdString += '@#$%^&*(){}[]<>?';

    if (checkSimilar.checked) {
      pwdString += '!:;,./\\';
    }
  }

  if (checkNumbers.checked) {
    pwdString += '23456789';

    if (checkSimilar.checked) {
      pwdString += '01';
    }
  }

  if (checkLowercase.checked) {
    pwdString += 'abcdefghjkmnopqrstuvwxyz';

    if (checkSimilar.checked) {
      pwdString += 'il';
    }
  }

  if (checkUppercase.checked) {
    pwdString += 'ABCDEFGHJKLMNPQRSTUVWXYZ';

    if (checkSimilar.checked) {
      pwdString += 'IO';
    }
  }

  return pwdString === '' ? '' : pwdString[Math.floor(Math.random() * pwdString.length)];
};

const copyPassword = () => {
  passwordText.disabled = false;

  passwordText.select();
  passwordText.setSelectionRange(0, 99999); // for mobile devices

  document.execCommand('copy');

  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }

  passwordText.disabled = true;

  copyBtn.innerHTML = 'Copied!';

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    copyBtn.style.background = 'green';
    copyBtn.style.color = 'white';
  } else {
    copyBtn.style.background = 'springgreen';
    copyBtn.style.color = 'black';
  }

  setTimeout(() => {
    copyBtn.innerHTML = 'Copy';
    copyBtn.style.background = '#333';
    copyBtn.style.color = 'white';
  }, 1000);
};

generatePassword();
