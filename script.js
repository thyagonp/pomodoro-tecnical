const html = document.querySelector("html");
const buttons = document.querySelectorAll(".app__button");
const foco = document.querySelector(".button--foco");
const descanso = document.querySelector(".button--curto");
const image = document.querySelector(".app__image");

const title = document.querySelector(".app__title");
const timer = document.querySelector(".app__card-primary-button");
const startBtn = document.querySelector("#start-pause");
const startOrPauseBtn = document.querySelector("#start-pause span");

const sound = document.querySelector("#alternar-musica");

const icon = document.querySelector(".app__card-primary-butto-icon");
const timeInScreen = document.querySelector("#timer");
const music = new Audio("./sounds/luna-rise-part-one.mp3");
const playSound = new Audio("./sounds/play.wav");
const pauseSound = new Audio("./sounds/pause.mp3");
const timesUp = new Audio("./sounds/beep.mp3");

let timeInSeconds = 1500;
let intervalId = null;

mostrarTempo();

function mostrarTempo() {
  const tempo = new Date(timeInSeconds * 1000);
  const tempoFormatado = tempo.toLocaleString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timeInScreen.innerHTML = `${tempoFormatado}`;
}

timer.addEventListener("click", () => {});

startBtn.addEventListener("click", startOurPause);

function startOurPause() {
  if (intervalId) {
    pauseSound.play();
    zerar();
    return;
  }
  playSound.play();
  intervalId = setInterval(count, 1000);
  icon.setAttribute("src", "./images/pause.png");
  startOrPauseBtn.textContent = "Pausar";
}

music.loop = true;

sound.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

const count = () => {
  if (timeInSeconds <= 0) {
    timesUp.play();
    alert("tempo esgotado");
    zerar();
    return;
  }
  timeInSeconds -= 1;
  mostrarTempo();
  console.log("tempo:" + timeInSeconds);
  console.log("Id: " + intervalId);
};

function zerar() {
  clearInterval(intervalId);
  icon.setAttribute("src", "./images/play_arrow.png");
  startOrPauseBtn.textContent = "Retomar";
  intervalId = null;
}

foco.addEventListener("click", () => {
  timeInSeconds = 1500;
  mudarContexto("foco");
});

descanso.addEventListener("click", () => {
  timeInSeconds = 300;
  mudarContexto("descanso");
});

function adicionarItem() {
  const input = document.getElementById("itemInput");
  const texto = input.value.trim();
  if (texto === "") return;
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    li.classList.toggle("checked", checkbox.checked);
  };
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(" " + texto));
  document.getElementById("checklist").appendChild(li);
  input.value = "";
}

const addEnter = document.getElementById("itemInput");

addEnter.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarItem();
  }
});

function mudarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  image.setAttribute("src", `./images/${contexto}.png`);
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  mostrarTempo();

  if (contexto === "foco") {
    foco.classList.add("active");
    image.setAttribute("src", "./images/gráfico de trabalho.gif");
    title.innerHTML =
      'Otimize sua produtividade, <strong class="app__title-strong">que tal uma ajuda da técnica pomodoro para focar nos estudos?</strong>';
  } else {
    descanso.classList.add("active");
    image.setAttribute("src", "./images/Polar bear.gif");
    title.innerHTML =
      'Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa!</strong>';
  }
}
