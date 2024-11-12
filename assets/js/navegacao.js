let overlay = document.querySelector(".overlay-menu");
let navegacao = document.querySelector(".navegacao");

function menu() {
  if (navegacao.style.left === "0px") {
    navegacao.style.left = "-100%";
    overlay.style.opacity = "0";
  } else {
    navegacao.style.left = "0";
    overlay.style.opacity = "1";
  }
}

function exit() {
  if (navegacao.style.left === "0px") {
    navegacao.style.left = "-100%";
    overlay.style.opacity = "0";
  } else {
    navegacao.style.left = "0";
    overlay.style.opacity = "1";
  }
}
