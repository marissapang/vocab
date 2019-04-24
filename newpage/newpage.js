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

function showDeck4(){
  word = deck4[Math.floor(Math.random() * deck4.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck5(){
  word = deck5[Math.floor(Math.random() * deck5.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck6(){
  word = deck6[Math.floor(Math.random() * deck6.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck7(){
  word = deck7[Math.floor(Math.random() * deck7.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck8(){
  word = deck8[Math.floor(Math.random() * deck8.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck9(){
  word = deck9[Math.floor(Math.random() * deck9.length)];
  definition = dictionary[word];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
}

function showDeck10(){
  word = deck10[Math.floor(Math.random() * deck10.length)];
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

document
  .querySelector("#showDeck4Button")
  .addEventListener("click", showDeck4)

document
  .querySelector("#showDeck5Button")
  .addEventListener("click", showDeck5)

document
  .querySelector("#showDeck6Button")
  .addEventListener("click", showDeck6)

document
  .querySelector("#showDeck7Button")
  .addEventListener("click", showDeck7)

document
  .querySelector("#showDeck8Button")
  .addEventListener("click", showDeck8)

document
  .querySelector("#showDeck9Button")
  .addEventListener("click", showDeck9)

document
  .querySelector("#showDeck10Button")
  .addEventListener("click", showDeck10)

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

window.onload = function(){
  x = chrome.storage.sync.get(deck1, function(items){
    console.log("deck 1", items)
    let known_deck1 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck1 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    let len_deck1_known = Object.keys(known_deck1).length
    let len_deck1_learning = Object.keys(learning_deck1).length
    let len_deck1_new = deck1.length - len_deck1_known - len_deck1_learning
    console.log(len_deck1_known, len_deck1_learning, len_deck1_new)
    test_global_variable = len_deck1_learning
    return(test_global_variable)
  })


  setTimeout(function afterTwoSeconds() {
      var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title:{
        text: "Evening Sales in a Restaurant"
      },
      axisX: {
      },
      axisY: {
      },
      toolTip: {
        shared: true
      },
      legend:{
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [{
        type: "stackedBar",
        name: "Meals",
        showInLegend: "true",
        dataPoints: [
          { y: test_global_variable, label: "Deck 10"},
          { y: 71, label: "Deck 9"},
          { y: 45, label: "Deck 8"},
          { y: 56, label: "Deck 7"},
          { y: 71, label: "Deck 6"},
          { y: 45, label: "Deck 5"},
          { y: 56, label: "Deck 4"},
          { y: 71, label: "Deck 3"},
          { y: 45, label: "Deck 2"},
          { y: 56, label: "Deck 1"}  
        ]
      },
      {
        type: "stackedBar",
        name: "Takeaway",
        showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [
          { y: 56, label: "Deck 10"},
          { y: 71, label: "Deck 9"},
          { y: 45, label: "Deck 8"},
          { y: 56, label: "Deck 7"},
          { y: 71, label: "Deck 6"},
          { y: 45, label: "Deck 5"},
          { y: 56, label: "Deck 4"},
          { y: 71, label: "Deck 3"},
          { y: 45, label: "Deck 2"},
          { y: 56, label: "Deck 1"}  
        ]
      }]
    });
    chart.render();

    function toggleDataSeries(e) {
      if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }, 1000)

 




}

