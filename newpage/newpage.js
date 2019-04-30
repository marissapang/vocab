let word = deck1[Math.floor(Math.random() * deck1.length)];
let definition = dictionary[word];

document.querySelector("#word").textContent = word;

/* Non-Deck Functions */
function returnScore(){
  chrome.storage.sync.get(null, function(items){
    delete items['last_five_words']
    delete items['next_word']
    test_array = Object.values(items)
    overall_score = test_array.reduce(function(a,b){return a+b;})
    document.querySelector("#score").textContent = "Score:"+ overall_score
  })
};

function lastFiveWords(){
  chrome.storage.sync.get(["last_five_words"], function(items){
    curr_list = items["last_five_words"]
    curr_list.shift() 
    console.log("TEST WORD", word)
    curr_list.push(word)
    console.log("New last five words are:", curr_list)
    chrome.storage.sync.set({last_five_words:curr_list}, function(){})
  })
}

function pickWord(deck){
  chrome.storage.sync.get(["last_five_words"], function(items){
    last_five_words = items["last_five_words"]
    console.log("pickWord last five", last_five_words)
    rest_of_deck = deck.filter(x => !last_five_words.includes(x) );
    console.log("full deck", deck)
    console.log("rest of deck", rest_of_deck)
    word = rest_of_deck[Math.floor(Math.random() * rest_of_deck.length)]
    console.log("pickWord word", word)
    chrome.storage.sync.set({next_word:word}, function(items){})
  })

}

function nextWord(){
  if (deck1.includes(word)){
    console.log("nextWord current word", word)
    pickWord(deck1)
    setTimeout(function afterHalfSec(){
      chrome.storage.sync.get(["next_word"], function(items){
      console.log("nextWord items within chrome", items)
      word = items["next_word"]
      console.log("nextWord word within chrome", word)
      document.querySelector("#word").textContent = word;
      document.querySelector("#definition").textContent = "";
      lastFiveWords();
      })
    }, 50)
      
  } else if (deck2.includes(word)){
    word = deck2[Math.floor(Math.random() * deck2.length)];
  } else if (deck3.includes(word)){
    word = deck3[Math.floor(Math.random() * deck3.length)]; 
  }

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
    chrome.storage.sync.get(null, function(items){})
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
    chrome.storage.sync.set({last_five_words:["test","test","test","test","test"]}, function(){})
	}
}

/* Non-Deck event listners */

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


/* Deck functions */
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
  chrome.storage.sync.get(deck1, function(items){
    let known_deck1 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck1 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck1_known = Object.keys(known_deck1).length
    len_deck1_learning = Object.keys(learning_deck1).length
    len_deck1_new = deck1.length - len_deck1_known - len_deck1_learning
  })

  chrome.storage.sync.get(deck2, function(items){
    let known_deck2 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck2 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck2_known = Object.keys(known_deck2).length
    len_deck2_learning = Object.keys(learning_deck2).length
    len_deck2_new = deck2.length - len_deck2_known - len_deck2_learning
  })

  chrome.storage.sync.get(deck3, function(items){
    let known_deck3 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck3 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck3_known = Object.keys(known_deck3).length
    len_deck3_learning = Object.keys(learning_deck3).length
    len_deck3_new = deck3.length - len_deck3_known - len_deck3_learning
  })

  chrome.storage.sync.get(deck4, function(items){
    let known_deck4 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck4 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck4_known = Object.keys(known_deck4).length
    len_deck4_learning = Object.keys(learning_deck4).length
    len_deck4_new = deck4.length - len_deck4_known - len_deck4_learning
  })

  chrome.storage.sync.get(deck5, function(items){
    let known_deck5 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck5 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck5_known = Object.keys(known_deck5).length
    len_deck5_learning = Object.keys(learning_deck5).length
    len_deck5_new = deck5.length - len_deck5_known - len_deck5_learning
  })

  chrome.storage.sync.get(deck6, function(items){
    let known_deck6 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck6 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck6_known = Object.keys(known_deck6).length
    len_deck6_learning = Object.keys(learning_deck6).length
    len_deck6_new = deck6.length - len_deck6_known - len_deck6_learning
  })

  chrome.storage.sync.get(deck7, function(items){
    let known_deck7 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck7 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck7_known = Object.keys(known_deck7).length
    len_deck7_learning = Object.keys(learning_deck7).length
    len_deck7_new = deck7.length - len_deck7_known - len_deck7_learning
  })

  chrome.storage.sync.get(deck8, function(items){
    let known_deck8 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck8 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck8_known = Object.keys(known_deck8).length
    len_deck8_learning = Object.keys(learning_deck8).length
    len_deck8_new = deck8.length - len_deck8_known - len_deck8_learning
  })

  chrome.storage.sync.get(deck9, function(items){
    let known_deck9 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck9 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck9_known = Object.keys(known_deck9).length
    len_deck9_learning = Object.keys(learning_deck9).length
    len_deck9_new = deck9.length - len_deck9_known - len_deck9_learning
  })

  chrome.storage.sync.get(deck10, function(items){
    let known_deck10 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] >= 5) filtered[key] = items[key];
      return filtered;
    },{});

    let learning_deck10 = Object.keys(items).reduce(function (filtered, key) {
      if (items[key] < 5 & items[key] > 1) filtered[key] = items[key];
      return filtered;
    },{});

    len_deck10_known = Object.keys(known_deck10).length
    len_deck10_learning = Object.keys(learning_deck10).length
    len_deck10_new = deck10.length - len_deck10_known - len_deck10_learning
  })

  setTimeout(function afterTwoSeconds() {
      var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title:{
        text: "Your Progress"
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
        name: "Known",
        showInLegend: "true",
        dataPoints: [
          { y: len_deck10_known, label: "Deck 10"},
          { y: len_deck9_known, label: "Deck 9"},
          { y: len_deck8_known, label: "Deck 8"},
          { y: len_deck7_known, label: "Deck 7"},
          { y: len_deck6_known, label: "Deck 6"},
          { y: len_deck5_known, label: "Deck 5"},
          { y: len_deck4_known, label: "Deck 4"},
          { y: len_deck3_known, label: "Deck 3"},
          { y: len_deck2_known, label: "Deck 2"},
          { y: len_deck1_known, label: "Deck 1"}  
        ]
      },
      {
        type: "stackedBar",
        name: "Learning",
        showInLegend: "true",
        dataPoints: [
          { y: len_deck10_learning, label: "Deck 10"},
          { y: len_deck9_learning, label: "Deck 9"},
          { y: len_deck8_learning, label: "Deck 8"},
          { y: len_deck7_learning, label: "Deck 7"},
          { y: len_deck6_learning, label: "Deck 6"},
          { y: len_deck5_learning, label: "Deck 5"},
          { y: len_deck4_learning, label: "Deck 4"},
          { y: len_deck3_learning, label: "Deck 3"},
          { y: len_deck2_learning, label: "Deck 2"},
          { y: len_deck1_learning, label: "Deck 1"}  
        ]
      },
      {
        type: "stackedBar",
        name: "New",
        showInLegend: "true",
        dataPoints: [
          { y: len_deck10_new, label: "Deck 10"},
          { y: len_deck9_new, label: "Deck 9"},
          { y: len_deck8_new, label: "Deck 8"},
          { y: len_deck7_new, label: "Deck 7"},
          { y: len_deck6_new, label: "Deck 6"},
          { y: len_deck5_new, label: "Deck 5"},
          { y: len_deck4_new, label: "Deck 4"},
          { y: len_deck3_new, label: "Deck 3"},
          { y: len_deck2_new, label: "Deck 2"},
          { y: len_deck1_new, label: "Deck 1"}  
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

