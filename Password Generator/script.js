let displayLength = document.querySelector("#lengthDigit");
let slider = document.querySelector("input[type=range]");
// console.log(slider);
// console.log(passLength);

// function to handle slider and reflect in on UI
let passLength = 10;
slider.addEventListener("input", (event) => {
  passLength = event.target.value;
  handleSlider();
});

function handleSlider() {
  slider.value = passLength;
  displayLength.innerText = passLength;
}
handleSlider();

// function to generate random values
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randUpper() {
  return String.fromCharCode(random(65, 91));
}

function randLower() {
  return String.fromCharCode(random(97, 123));
}

function randNumb() {
  return random(1, 10);
}

function randSymbol() {
  let index = random(0, symbol.length);
  return symbol[index];
}

// Strength Color Based on Password
let indicator = document.querySelector(".indicator");

// Set Indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

// Default Indicator
// setIndicator("#ccc");

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (upper.checked) hasUpper = true;
  if (lower.checked) hasLower = true;
  if (numbers.checked) hasNumber = true;
  if (symbols.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNumber || hasSymbol) && passLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNumber || hasSymbol) &&
    passLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

// Copy Message
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");


// Why we use it - https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
async function copyContent() {
  try {
    await navigator.clipboard.writeText(displayPass.value);

    copyMessage.innerText = "Copied";
    copyMessage.style.color = "white";
  } catch (e) {
    copyMessage.innerText = "Failed";
  }

  copyMessage.classList.add("active");

  setTimeout(() => {
    copyMessage.classList.remove("active");
  }, 2000);
}

copyBtn.addEventListener("click", () => {
  if (displayPass.value)copyContent();
});

// CheckBox - Handle
let checkCount = 0;
let checkboxes = document.querySelectorAll("input[type=checkbox]");

function handleCheckBoxChange() {
  checkCount = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition
  if (passLength < checkCount) {
    passLength = checkCount;
    handleSlider();
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

// Checkbox + generate button
let displayPass = document.querySelector("#displayPass");

let generateBtn = document.querySelector("#genButton");

let upper = document.querySelector("#upper");
let lower = document.querySelector("#lower");
let numbers = document.querySelector("#number");
let symbols = document.querySelector("#symbol");

generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) return;

  if (passLength < checkCount) {
    passLength = checkCount;
    handleSlider();
  }

  // Remove Previous Password
  password = "";

  let arrayOfCheckedFunction = [];

  if (upper.checked) arrayOfCheckedFunction.push(randUpper);
  if (lower.checked) arrayOfCheckedFunction.push(randLower);
  if (numbers.checked) arrayOfCheckedFunction.push(randNumb);
  if (symbols.checked) arrayOfCheckedFunction.push(randSymbol);

  // Compulsory Addition
  for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
    password += arrayOfCheckedFunction[i]();
  }

  //   shuffling array using fisher-yates method
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }
  // Additional addition
  for (let i = 0; i < passLength - arrayOfCheckedFunction.length; i++) {
    let randIndex = random(0, arrayOfCheckedFunction.length);
    password += arrayOfCheckedFunction[randIndex]();
  }
  password = shuffle(Array.from(password));
  displayPass.value = password;
  calcStrength();
});
