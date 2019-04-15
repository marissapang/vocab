const deck1 = ["observant","apple","Daniel","cactus"];
const deck2 = ["nihao","liaoruzhizhang","pingguo"];
const deck3 = ["bonjour","sortir","pomme"];

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
  })

  nextWord()
}

function getDefinition(){
  definition = dictionary[word];
  document.querySelector("#definition").textContent = definition
};

function returnScore(){
  chrome.storage.sync.get(null, function(items){
  	test_array = Object.values(items)
  	overall_score = test_array.reduce(function(a,b){return a+b;})
  	document.querySelector("#score").textContent = overall_score
  })
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
  .querySelector("#refreshButton")
  .addEventListener("click", nextWord);

document
  .querySelector("#refreshButton")
  .addEventListener("click", returnScore);

document
  .querySelector("#knowWordButton")
  .addEventListener("click", knowWord)

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
