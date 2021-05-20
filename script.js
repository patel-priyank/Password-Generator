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

const colorGreenLight = 'springgreen';
const colorGreenDark = 'green';
const colorWhite = 'white';
const colorBlack = 'black';

const symbols = '@#$%^&*(){}[]<>?';
const similarSymbols = '!:;,./\\';
const numbers = '23456789';
const similarNumbers = '01';
const lowercaseCharacters = 'abcdefghjkmnopqrstuvwxyz';
const similarLowercaseCharacters = 'il';
const uppercaseCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const similarUppercaseCharacters = 'IO';

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
    var conditionsValid = checkAllConditions(password);

    if (conditionsValid) {
      passwordText.value = password;
      passwordText.style.letterSpacing = '0.25em';
      enableButtons();
    } else {
      generatePassword();
    }
  }
};

const checkAllConditions = (password) => {
  var conditionExists = false;
  var checkConditions = '';

  if (checkSymbols.checked) {
    conditionExists = false;
    checkConditions = symbols;

    if (checkSimilar.checked) {
      checkConditions += similarSymbols;
    }

    for (var condition of checkConditions) {
      if (password.includes(condition)) {
        conditionExists = true;
        break;
      }
    }

    if (!conditionExists) {
      return false;
    }
  }

  if (checkNumbers.checked) {
    conditionExists = false;
    checkConditions = numbers;

    if (checkSimilar.checked) {
      checkConditions += similarNumbers;
    }

    for (var condition of checkConditions) {
      if (password.includes(condition)) {
        conditionExists = true;
        break;
      }
    }

    if (!conditionExists) {
      return false;
    }
  }

  if (checkLowercase.checked) {
    conditionExists = false;
    checkConditions = lowercaseCharacters;

    if (checkSimilar.checked) {
      checkConditions += similarLowercaseCharacters;
    }

    for (var condition of checkConditions) {
      if (password.includes(condition)) {
        conditionExists = true;
        break;
      }
    }

    if (!conditionExists) {
      return false;
    }
  }

  if (checkUppercase.checked) {
    conditionExists = false;
    checkConditions = uppercaseCharacters;

    if (checkSimilar.checked) {
      checkConditions += similarUppercaseCharacters;
    }

    for (var condition of checkConditions) {
      if (password.includes(condition)) {
        conditionExists = true;
        break;
      }
    }

    if (!conditionExists) {
      return false;
    }
  }

  return true;
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
    pwdString += symbols;

    if (checkSimilar.checked) {
      pwdString += similarSymbols;
    }
  }

  if (checkNumbers.checked) {
    pwdString += numbers;

    if (checkSimilar.checked) {
      pwdString += similarNumbers;
    }
  }

  if (checkLowercase.checked) {
    pwdString += lowercaseCharacters;

    if (checkSimilar.checked) {
      pwdString += similarLowercaseCharacters;
    }
  }

  if (checkUppercase.checked) {
    pwdString += uppercaseCharacters;

    if (checkSimilar.checked) {
      pwdString += similarUppercaseCharacters;
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
