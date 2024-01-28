const containers = document.querySelectorAll(".container");
const buttons = document.querySelectorAll(".btn");
const body = document.querySelector("body");
const bubble = document.querySelectorAll(".nav-bubble");
let imageIndex = 0;


const images = ["Flamingo.jpg", "Owl.jpg", "Macaw.jpg", "Puffin.jpg"];

let loadedImages = 0;

function preloadImages() {
  images.forEach((image) => {
    const img = new Image();
    img.onload = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        console.log("All images loaded");
      }
    };
    img.src = `./images/${image}`;
  });
}

preloadImages();

function changeBG(index) {
  body.style.background = `url(./images/${images[index]})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.boxShadow = "box-shadow: inset 0 0 100px 3rem black";
}
changeBG(0);

let currentContainer = 0;

function showNextContainer() {
  containers[currentContainer].classList.add("hidden");
  currentContainer = (currentContainer + 1) % containers.length;
  containers[currentContainer].classList.remove("hidden");
}

let currentBubble=0;
function changeBubble() {
  bubble[currentBubble].checked = false;
  currentBubble = (currentBubble + 1) % bubble.length;
  bubble[currentBubble].checked = true;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    imageIndex++;
    changeBG(imageIndex);
    if (imageIndex >= images.length) {
      imageIndex = 0;
      changeBG(imageIndex);
    }
    showNextContainer();
    changeBubble();
  });
});
