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

  passwordText.value = password;
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

  return pwdString[Math.floor(Math.random() * pwdString.length)];
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

  document.querySelector('#tooltiptext').style.visibility = 'visible';
  generateBtn.disabled = true;
  copyBtn.disabled = true;

  setTimeout(() => {
    document.querySelector('#tooltiptext').style.visibility = 'hidden';
    generateBtn.disabled = false;
    copyBtn.disabled = false;
  }, 1000);
};

generatePassword();
