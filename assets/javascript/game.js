///////////////////////////////////////////////////////////////////////////////////
// Created By : Mitali Naik                                                      // 
// Assignment 3 - Boot Camp                                                      // 
//                                                                               // 
// Description: This is a version of Hangman game, with country names being used // 
// for guessing.                                                                 //
///////////////////////////////////////////////////////////////////////////////////

window.onload = function () {

//Game Win Counter
var numberOfWins = 0;

//The following country names are word list for this game
var india = {
  name: "india",
  image:"india.png",
  audio:"INDIA.mp3"
}

var usa = {
  name: "unitedstatesofamerica",
  image:"usa.jpg",
  audio:"USA.mp3"
}

var canada = {
  name: "canada",
  image:"canada.jpg",
  audio:"CANADA.mp3"
}

var france = {
  name: "france",
  image:"france.jpg",
  audio:"FRANCE.mp3"
}

var germany = {
  name: "germany",
  image:"germany.png",
  audio:"GERMANY.mp3"
}

var russia = {
  name: "russia",
  image:"russia.png",
  audio:"RUSSIA.mp3"
}



var GuessWords =[india,usa,russia,germany,france,canada];

//This function ca be used to test/display the list of countries names, while degugging
displayGuessWords= function()
{
  for (var i = GuessWords.length - 1; i >= 0; i--) {
    console.log ("name="+GuessWords[i].name);
    console.log ("image="+GuessWords[i].imageURL);
  }
}

//UI elements
var showLives = document.getElementById("mylives");
var guessWordHolder = document.getElementById('hold');
var winCtr=document.getElementById("win");
var wrong=document.getElementById("wrongGuessList");
var flagImage=document.getElementById("flag");
var music=document.getElementById("music");

var Game = {

  initialize:function()
  {
//clear screen
    var seletedWordsHolder = document.getElementById('selected-word');
    if (null != seletedWordsHolder)
      while(seletedWordsHolder.firstChild)
        seletedWordsHolder.removeChild(seletedWordsHolder.firstChild);
    if (null != wrong)
      while( wrong.firstChild )
        wrong.removeChild(wrong.firstChild ); 
    if (null != guessWordHolder)
      while( guessWordHolder.firstChild )
        guessWordHolder.removeChild(guessWordHolder.firstChild ); 

//reset image and audio
    this.setImage("Guess.jpg");
    this.setAudio("default.mp3");

//reset variables
    console.log("initialize");
    this.seletedWord = this.getRandomWord();
    console.log("seletedWord:"+this.seletedWord.name);
    this.intializeResultWord(this.seletedWord.name.length);
    console.log("resultWord:"+this.resultWord);  
    this.userGuesses = [ ];
    this.lives = 13;
    this.userGuess="";
 
  },

  setImage:function(imageName){
    console.log("setImage:imageName");
    flagImage.src ="./assets/images/"+ imageName;
    
  },

  setAudio:function(audioName)
  {
    music.pause();
    console.log("setAudio:audioName");
    music.src = "./assets/audio/"+audioName;
    music.play();
  },

  getRandomWord:function () {
    var random = Math.floor((Math.random()*(GuessWords.length)));
    randomWord=GuessWords[random];
    return randomWord;
  },

  intializeResultWord:function (length) {
    this.resultWord=[];
    for(var i=0;i<length;i++)
    {
      this.resultWord.push("*"); 
    }
  },

  alreadyGuessed: function () {
    for(var index=0; index < this.userGuesses.length;index++)
    {
      if(this.userGuess === this.userGuesses[index]){
        return true; 
      }
    }  
    return false;    
  },

  // Create guesses ul
   generateGuessPlaceholder:function () {
    seletedWord= this.seletedWord.name;
    console.log("generateGuessPlaceholder:seletedWord:"+ seletedWord);
    var correctWordHolder = document.createElement('ul');
    
    for (var i = 0; i < seletedWord.length; i++) {
      correctWordHolder.setAttribute('id', 'selected-word');
      var guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (seletedWord[i] === "-") {
        guess.innerHTML = "-";
      } else {
        guess.innerHTML = "_";
      }
      guessWordHolder.appendChild(correctWordHolder);
      correctWordHolder.appendChild(guess);
       }
      guessWordHolder.appendChild(correctWordHolder);
      correctWordHolder.appendChild(guess);    
  },

  // display result
   displayResult: function () {
    showLives.innerHTML = "You have " + this.lives + " lives";
    if (this.lives < 1) {
      showLives.innerHTML = "Game Over";
    }  
  },

  play:function () {
      
      console.log(this.userGuess);
      var i=0;
      var seletedWordsHolder = document.getElementById('selected-word');
      guessChild = seletedWordsHolder.childNodes;
      var matched = false;

      for(;i<this.seletedWord.name.length;i++){
        
        if(this.seletedWord.name[i]===this.userGuess){          
          
          console.log("userGuess="+this.userGuess);
          guessChild[i].innerHTML=this.userGuess;
          
          matched=true;
          this.resultWord[i]=this.userGuess;

           console.log("wordlength"+this.seletedWord.name.length)
           //check for no of win 
           console.log("word="+this.seletedWord.name);
           console.log("resultWord="+this.resultWord);

           var resultString= this.resultWord.join("");
           console.log("resultString="+resultString);

          if(resultString===this.seletedWord.name){
            numberOfWins ++;
            console.log("numberOfWins:"+numberOfWins);
            win.innerHTML=numberOfWins;
            showLives.innerHTML="You win";
            this.setImage(this.seletedWord.image);
            this.setAudio(this.seletedWord.audio);
            return;
          }           
                     
        }

      }     
 
       if (!matched)
        {
         this.lives -= 1;
         this.userGuesses.push(this.userGuess);
         this.printWrongGuess();
         this.displayResult();
       }   
    },

    //Print Wrong guesses
    printWrongGuess:function(){
      var list=document.createElement("li");
      list.appendChild(document.createTextNode(this.userGuess));
      list.setAttribute("id","wrongWord");
      wrong.appendChild(list); 
    } 
};

playGame = function function_name(argument) {
    var game = Object.create(Game);
    game.initialize();
    game.generateGuessPlaceholder();
    
  
      document.onkeyup = function(event) {
         game.userGuess = String.fromCharCode(event.keyCode).toLowerCase();
         console.log("1"+game.userGuess);
          if(!game.alreadyGuessed()){
          game.play();
          }      
      }
  game.displayResult();
} 

  document.getElementById('playAgain').onclick = function() {
    playGame();   
}

playGame();
}