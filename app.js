const oddDucksContainer = document.getElementById('productImages');
const reportContainer = document.getElementById('report');
// querySelectorAll = list of elements
// querySelector = 1 element
const image1 = document.getElementById('product1');
const image2 = document.getElementById('product2');
const image3 = document.getElementById('product3');

const button = document.getElementById("viewResults");
let numRoundsOfVoting = 5;
// The global "State" of the application
let state = {
  numClicksSoFar: 0,
  numClicksAllowed: numRoundsOfVoting,
  allProducts: [],
};


// Constructor
function Product(name, image) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  state.allProducts.push(this);
}


// Helper Functions

function renderProducts() {
  // pick 2 random goats from our array

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

  // put the goats on screen
  // <img src="" alt="" />
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

function renderResultsButton() {
  button.style.display = "block";
}

function renderResults() {
  console.log("Showing the results");
}

function handleClick(event) {
  // Get the name from the alt tage of the image
  let productName = event.target.alt;

  // Loop the array and find that goat, update the vote and stop
  for (let i = 0; i < state.allProducts.length; i++) {
    if(productName === state.allProducts[i].name ) {
      state.allProducts[i].votes++;
      break;
    }
  }


  state.numClicksSoFar++;

  if(state.numClicksSoFar >= state.numClicksAllowed) {
    // remove the event handler
    removeListener();
    // show the button which would let you render the results
    renderResultsButton();
  } else {
    renderProducts();
  }
}

function setupListeners() {
  oddDucksContainer.addEventListener("click", handleClick);
  button.addEventListener("click", renderResults);

  // Alternatively: have an event listener oneach images
  // image1.addEventListener("click", handleClick);
  // image2.addEventListener("click", handleClick);
}

function removeListener() {
  oddDucksContainer.removeEventListener("click", handleClick);
}

// Do I need to make these into variables????
// If not (hint), how can I do it without making them variables?
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

// debugger;
