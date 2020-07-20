const radioRange = document.querySelector('#rangeRadio');
const frequencyRadio = document.querySelector('#frequencyRadio');
const displayPodcast = document.querySelector('#displayPodcast');
const buttonUp = document.querySelector('#up');
const buttonDown = document.querySelector('#down');

const img = document.createElement('img');
const description = document.createElement('p');
const audio = document.createElement('audio');

const message = document.createElement('p');
message.setAttribute('id', 'message');
message.textContent = 'Sem estação na frequência';

const imgNotFound = document.createElement('img');
imgNotFound.src = '../img/not_found.png';
imgNotFound.title = 'Não encontrado';
imgNotFound.alt = 'Não Encontrado';

function start() {
  console.log('DOM carregado!');
  
  frequencyRadio.textContent = `${radioRange.value} Mhz`;
  
  displayPodcast.appendChild(message);
  displayPodcast.appendChild(imgNotFound);  
  
  radioRange.addEventListener('input', handlerRangeValueChange);

  buttonDown.addEventListener('click', () =>{
    if (radioRange.value > 87.5){
      radioRange.value = parseFloat(radioRange.value) - 0.1;
      frequencyRadio.textContent = `${radioRange.value} Mhz`;
      findPodcastFrom(radioRange.value);
    }
  });

  buttonUp.addEventListener('click', () =>{
    if (radioRange.value < 108){
      radioRange.value = parseFloat(radioRange.value) + 0.1;
      frequencyRadio.textContent = `${radioRange.value} Mhz`;
      findPodcastFrom(radioRange.value);
    }
  });
}


function handlerRangeValueChange(event) {
  const { value } = event.target;
  frequencyRadio.textContent = `${value} Mhz`;
  findPodcastFrom(value);
}

function findPodcastFrom(frequency) {
  let foundPodcast = null;
  for (let i = 0; i < realPodcasts.length; i++) {
    let currentPodCast = realPodcasts[i];

    if (currentPodCast.frequency === frequency) {
      foundPodcast = currentPodCast;
      break;
    }
  }

  if (!!foundPodcast) {
    renderFound(foundPodcast);
  } else {
    rederNotFound();
  }
}

function renderFound(foundPodcast) {
  img.src = foundPodcast.img;
  img.alt = foundPodcast.title;
  img.title = foundPodcast.title;

  description.innerHTML = foundPodcast.description;

  audio.src = foundPodcast.url;
  audio.autoplay = false;
  audio.controls = true;

  displayPodcast.removeChild(message);
  displayPodcast.removeChild(imgNotFound);
  displayPodcast.appendChild(img);
  displayPodcast.appendChild(description);
  displayPodcast.appendChild(audio);
}

function renderNotFound(){
  if (displayPodcast.childNodes.length === 2) {
    displayPodcast.appendChild(message);
    displayPodcast.appendChild(imgNotFound);
  } else {
    displayPodcast.removeChild(img);
    displayPodcast.removeChild(description);
    displayPodcast.removeChild(audio);
    displayPodcast.appendChild(message);
    displayPodcast.appendChild(imgNotFound);  
  }
}


start();
