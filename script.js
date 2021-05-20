const passwordLength = document.querySelector('#password-length');
const checkSymbols = document.querySelector('#check-symbols');
const checkNumbers = document.querySelector('#check-numbers');
const checkLowercase = document.querySelector('#check-lowercase');
const checkUppercase = document.querySelector('#check-uppercase');
const checkSimilar = document.querySelector('#check-similar');

const passwordText = document.querySelector('#password-text');

const generateBtn = document.querySelector('#generate-btn');
const copyBtn = document.querySelector('#copy-btn');
const githubBtn = document.querySelector('#github-btn');

const colorGreenLight = 'rgb(0, 255, 128)';
const colorGreenDark = 'rgb(0, 128, 0)';
const colorWhite = 'rgb(255, 255, 255)';
const colorBlack = 'rgb(0, 0, 0)';

generateBtn.addEventListener('click', () => {
  generatePassword();
});

copyBtn.addEventListener('click', () => {
  copyPassword();
});

githubBtn.addEventListener('click', () => {
  window.open('https://github.com/patel-priyank/Password-Generator');
});

const generatePassword = () => {
  var password = '';

  for (let i = 0; i < passwordLength.value; ++i) {
    password += generateRandomCharacter();
  }

  if (password === '') {
    passwordText.value = 'Select something!';
    passwordText.style.letterSpacing = 'unset';
    disableButtons();
  } else {
    passwordText.value = password;
    passwordText.style.letterSpacing = '0.25em';
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

  copyBtn.focus();

  passwordText.disabled = true;

  copyBtn.innerHTML = 'Copied!';

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    copyBtn.style.background = colorGreenDark;
    copyBtn.style.color = colorWhite;
  } else {
    copyBtn.style.background = colorGreenLight;
    copyBtn.style.color = colorBlack;
  }

  setTimeout(() => {
    copyBtn.innerHTML = 'Copy';
    copyBtn.style.background = '';
    copyBtn.style.color = '';
  }, 1000);
};

document.querySelectorAll('.checkbox-container').forEach((checkbox) => {
  checkbox.addEventListener('click', (event) => {
    blurOnMouseClick(event);
  });
});

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (event) => {
    blurOnMouseClick(event);
  });
});

const blurOnMouseClick = (event) => {
  if (!(event.screenX === 0 && event.screenY === 0)) {
    document.activeElement.blur();
  }
};

generatePassword();
