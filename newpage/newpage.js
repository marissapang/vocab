
const wordsList = ["observant", "apple", "Daniel", "cactus"];

const dictionary = {
  observant: "ability to notice things",
  apple: "a crispy red or green fruit (sometimes yellow!)",
  Daniel:
    "a man willing to take his own precious time and help out friends in need",
  cactus: "spiky plant"
};

let new_value = 1000
let word = wordsList[Math.floor(Math.random() * wordsList.length)];
let definition = dictionary[word];
document.querySelector("#word").textContent = word;


function nextWord(){
  word = wordsList[Math.floor(Math.random() * wordsList.length)];
  document.querySelector("#word").textContent = word;
  document.querySelector("#definition").textContent = "";
};

function knowWord(){
  chrome.storage.sync.get(null, function(items){
  	if (word in items){
  		console.log("word in items", items[word])
  		new_value = items[word] + 1 	
  	} else{
  		console.log("word not in items")
  		new_value = 5
  	}
  	small_dict = {}
  	small_dict[word] = new_value
  	console.log("small_dict", small_dict)
  	console.log("new value outside",word, "::", new_value)
  	chrome.storage.sync.set(small_dict, function(){console.log("saved")})
  })

  nextWord()
}


function getDefinition(){
  definition = dictionary[word];
  document.querySelector("#definition").textContent = definition
};


function returnScore(){
  chrome.storage.sync.get(null, function(items){
  	console.log("UPDATED items", items)
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


/*document
  .querySelector("#returnScore")
  .addEventListener("click", returnScore)*/