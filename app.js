const oddDucksContainer = document.getElementById('productImages');
const reportContainer = document.getElementById('report');
const voteTally = document.getElementById('voteTallyList');

const image1 = document.getElementById('product1');
const image2 = document.getElementById('product2');
const image3 = document.getElementById('product3');

const button = document.getElementById("viewResults");
let roundsOfVotingLimit = 25;


let state = {
  numClicksSoFar: 0,
  numClicksAllowed: roundsOfVotingLimit,
  allProducts: [],
};


function Product(name, image) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  state.allProducts.push(this);
}

function renderProducts() {

  function pickRandomProduct() {
    return Math.floor(Math.random() * state.allProducts.length);
  }

  let product1 = pickRandomProduct();
  let product2 = pickRandomProduct();
  let product3 = pickRandomProduct();

  while(product1 === product2) {
    product2 = pickRandomProduct();
  }

  while(product3 === product1 || product3 === product2) {
    product3 = pickRandomProduct();
  }

  image1.src = state.allProducts[product1].imageFile;
  image1.alt = state.allProducts[product1].name;

  image2.src = state.allProducts[product2].imageFile;
  image2.alt = state.allProducts[product2].name;

  image3.src = state.allProducts[product3].imageFile;
  image3.alt = state.allProducts[product3].name;

  state.allProducts[product1].views++;
  state.allProducts[product2].views++;
  state.allProducts[product3].views++;
}
// debugger;

function hideResultsButton() {
  button.style.display = 'none';
}

function renderResults() {
  for (let i = 0; i < state.allProducts.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${state.allProducts[i].name}: ${state.allProducts[i].views} views; ${state.allProducts[i].votes} votes`;
    voteTally.appendChild(li);
  }
}
function alertRefresh() {
  alert('Thanks for voting! We will show your vote tally now. Please refresh the page when you\'re done, so the next person can vote.');
}
function handleClick(event) {
  let productName = event.target.alt;

  for (let i = 0; i < state.allProducts.length; i++) {
    if(productName === state.allProducts[i].name ) {
      state.allProducts[i].votes++;
      break;
    }
  }

  state.numClicksSoFar++;

  if(state.numClicksSoFar >= state.numClicksAllowed) {
    removeListener();
    renderResults();
    hideResultsButton();
    alertRefresh();
  } else {
    renderProducts();
  }
}

function setupListeners() {
  oddDucksContainer.addEventListener('click', handleClick);
  button.addEventListener('click', renderResults);
  button.addEventListener('click', hideResultsButton);
  button.addEventListener('click', alertRefresh);
}

function removeListener() {
  oddDucksContainer.removeEventListener('click', handleClick);
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulchu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaum', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');


renderProducts();
setupListeners();

