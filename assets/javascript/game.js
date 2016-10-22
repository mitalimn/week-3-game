window.onload = function () {

  var wordList= ["mothersstt","fathersstt","daughtersstt","sonsstt","husbandsstt","wifeesstt"];
  var word ;              // Selected word
  var resultWord;
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var winCount=0;
  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var winCtr=document.getElementById("win");
  var wrong=document.getElementById("wrongGuessList");
 // var wrong=document.getElementById("wrongGuess");
  //var getHint = document.getElementById("hint");
 // var showClue = document.getElementById("clue");
//var userGuess
    // When the user presses the key it records the keypress and then sets it to userguess
  document.onkeyup = function(event) {
  var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
  console.log("1"+userGuess);
 
 // console.log("temp =" + temp);
 if(!alreadyGuessed(userGuess))
    check(userGuess);
}

alreadyGuessed= function (userGuess) {
  for(var index=0; index < geusses.length;index++)
  {
    if(userGuess === geusses[index]){
      return true; 
    }
  }  
  return false;
  // body...
}
 // OnClick Function
   check = function (userGuess) {
      //list.onclick = function () {
      //var z= document.getElementById('letter').value;
      console.log(userGuess);
      var i=0
      var guesswords = document.getElementById('my-word');
      guess = guesswords.childNodes;
      var matched = false;

      for(;i<word.length;i++){
        
        if(word[i]===userGuess){
          //geusses[i].innerHTML = geuss;
          console.log("userGuess="+userGuess);
          guess[i].innerHTML=userGuess;
          // geusses[i]=userGuess;
          matched=true;
          resultWord[i]=userGuess;
           counter += 1;
           console.log("counter"+counter);
           console.log("wordlength"+word.length)
           //check for no of win 
           console.log("word="+word);
           console.log("resultWord="+resultWord);

           var resultString= resultWord.join("");
           console.log("resultString="+resultString);
          if(resultString===word){
            winCount ++;
            console.log("wincount:"+winCount);
            win.innerHTML=winCount;

            showLives.innerHTML="You win";
            return;
          }           
                     
        }

      }     
 
       if (!matched)
        {
         lives -= 1;
         geusses.push(userGuess);
         printWrongGuess(userGuess);
         comments();
       }   
    }
    //Print Wrong guesses
    printWrongGuess=function(userGuess){
      var list=document.createElement("li");
      list.appendChild(document.createTextNode(userGuess));
      list.setAttribute("id","wrongWord");
      wrong.appendChild(list);      

    }
 

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
     if (word[i] === "-") {
        guess.innerHTML = "-";
      } else {
        guess.innerHTML = "_";
      }
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
       }
      wordHolder.appendChild(correct);
      correct.appendChild(guess);    
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }  
  } 
 
  // Play
  play = function () {
   var random = Math.floor((Math.random()*(wordList.length)));
    word=wordList[random];
    resultWord=[];
    for(var i=0;i<word.length;i++)
    {
      resultWord.push("*"); 
    }
    console.log("word ="+word);
    console.log("word length ="+word.length);
    geusses = [ ];
    lives = 13;
    counter = 0;
    space = 0;
 
    result();
    comments();
    console.log(counter);
 
   }

play();

 //Reset for -Play again
document.getElementById('playAgain').onclick = function() {
  correct.parentNode.removeChild(correct);
  while( wrong.firstChild ){
    wrong.removeChild(wrong.firstChild );
  }

  play();
  } 
} 