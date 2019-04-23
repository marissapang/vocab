

const dictionary = {
  observant: "ability to notice things",
  apple: "a crispy red or green fruit (sometimes yellow!)",
  Daniel:
    "a man willing to take his own precious time and help out friends in need",
  cactus: "spiky plant",
  nihao: "chinese hello",
  liaoruzhizhang: "knowing something like the back of one's hand",
  pingguo: "chinese apple",
  bonjour: "french hello",
  sortir: "leave",
  pomme: "french apple"
};

let word = deck1[Math.floor(Math.random() * deck1.length)];
let definition = dictionary[word];

document.querySelector("#word").textContent = word;

function returnScore(){
  chrome.storage.sync.get(null, function(items){
    test_array = Object.values(items)
    overall_score = test_array.reduce(function(a,b){return a+b;})
    document.querySelector("#score").textContent = "Score:"+ overall_score
    console.log("returnScore", items)
  })
};

function nextWord(){
  if (deck1.includes(word)){
    word = deck1[Math.floor(Math.random() * deck1.length)];
  } else if (deck2.includes(word)){
    word = deck2[Math.floor(Math.random() * deck2.length)];
  } else if (deck3.includes(word)){
    word = deck3[Math.floor(Math.random() * deck3.length)]; 
  }
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
};

function knowWord(){
  chrome.storage.sync.get(null, function(items){
  	if (word in items){
  		new_value = items[word] + 1 	
  	} else{
  		new_value = 5
  	}
  	small_dict = {}
  	small_dict[word] = new_value
  	chrome.storage.sync.set(small_dict, function(){})
    chrome.storage.sync.get(null, function(items){console.log("knowWord",items)})
    returnScore()
  })
  nextWord()
}

function dontKnowWord(){
  chrome.storage.sync.get(null, function(items){
    new_value = 0
    small_dict = {}
    small_dict[word] = new_value
    chrome.storage.sync.set(small_dict, function(){})
    returnScore()
  })
  nextWord()
}

function getDefinition(){
  definition = dictionary[word];
  document.querySelector("#definition").textContent = definition
};

function clearProgress(){
	if (confirm("Are you sure you want to delete your progress history?")){
	  chrome.storage.sync.clear(function(){})
	}
}

function showDeck1(){
  word = deck1[Math.floor(Math.random() * deck1.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck2(){
  word = deck2[Math.floor(Math.random() * deck2.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck3(){
  word = deck3[Math.floor(Math.random() * deck3.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

document
  .querySelector("#showDefinitionButton")
  .addEventListener("click",getDefinition);

document
  .querySelector("#knowWordButton")
  .addEventListener("click", knowWord)

document
  .querySelector("#dontKnowWordButton")
  .addEventListener("click", dontKnowWord)

document
  .querySelector("#clearProgressButton")
  .addEventListener("click", clearProgress)

document
  .querySelector("#showDeck1Button")
  .addEventListener("click", showDeck1)

document
  .querySelector("#showDeck2Button")
  .addEventListener("click", showDeck2)

document
  .querySelector("#showDeck3Button")
  .addEventListener("click", showDeck3)

// Code for block 
// Get the modal
var modal = document.getElementById('scores_popup');

// Get the button that opens the modal
viewProgressButton = document.getElementById("viewProgressButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
viewProgressButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


window.onload = function () {
  
var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  
  title:{
    text:"Fortune 500 Companies by Country"
  },
  axisX:{
    interval: 1
  },
  axisY2:{
    interlacedColor: "rgba(1,77,101,.2)",
    gridColor: "rgba(1,77,101,.1)",
    title: "Number of Companies"
  },
  data: [{
    type: "bar",
    name: "companies",
    axisYType: "secondary",
    color: "#014D65",
    dataPoints: [
      { y: 3, label: "Sweden" },
      { y: 7, label: "Taiwan" },
      { y: 5, label: "Russia" },
      { y: 9, label: "Spain" },
      { y: 7, label: "Brazil" },
      { y: 7, label: "India" },
      { y: 9, label: "Italy" },
      { y: 8, label: "Australia" },
      { y: 11, label: "Canada" },
      { y: 15, label: "South Korea" },
      { y: 12, label: "Netherlands" },
      { y: 15, label: "Switzerland" },
      { y: 25, label: "Britain" },
      { y: 28, label: "Germany" },
      { y: 29, label: "France" },
      { y: 52, label: "Japan" },
      { y: 103, label: "China" },
      { y: 134, label: "US" }
    ]
  }]
});

chart.render();

}