//global variables
const guitaristWordbank = ["clapton", "lennon", "johnson", "hendrix", "reinhardt", "vaughan", "berry", "iomi", "richards", "mitchell", "holmes", "raitt"];

const popArtistWords = ['whitney', 'adele', 'michael', 'beyonce', 'rihanna', 'madonna', 'prince'];
// console.log(guitaristWordbank);  
var gameArrays = [guitaristWordbank, popArtistWords];
let chosenGameArray = [];
var gameWordLetters = [];// breaks the chosen word into individual letters
var blanks = 0; // number of blanks for chosen Gameword
var wrongGuesses = [];//holds wrong guesses
var guessBlanks = [];//holds blanks and solved letters guesses during the game
var randomGameWord = ""; //solution (chosen game word makes up game) held here
//counters
var winCount = 0;
var lossCount = 0;
let guessesLeft = 9; // guesses that decrement with a wrong guess 

//start game and reset function-----------------------
let startGame = () => {
      //reset guesses back to 9      
    guessesLeft = 9;
      //select array
      let chosenGameArray = gameArrays[Math.floor(Math.random() * gameArrays.length)];
        if (chosenGameArray == guitaristWordbank){
          randomGameWord = guitaristWordbank[Math.floor(Math.random() * guitaristWordbank.length)];
          $('#hint').html('*Hint: Guess the last name of the iconic 20th century guitarist*');
          $('#hint').css('color','purple');
        } else {
          randomGameWord = popArtistWords[Math.floor(Math.random() * popArtistWords.length)];
          $('#hint').html('*Hint: Iconic pop artist*');
          $('#hint').css('color', 'red');
        }
      
      //selects random word
      console.log(randomGameWord);
      // use .split to beak random Word into individual letters
      gameWordLetters = randomGameWord.split("");
      //produce number of blanks for letters in randomGameWord
      blanks = gameWordLetters.length;
        console.log(blanks);
      guessBlanks = [];//reset after game
      wrongGuesses = [];
    // Fill up the guessBlanks list with appropriate number of blanks. This is based on number of letters in solution
     // for (var i=0; i <blanks; i++){
     //    guessBlanks.push("_");
     // }
     gameWordLetters.forEach(letter => {
      guessBlanks.push("_");
     });
    console.log(guessBlanks);
    //reprints guesses to 9
    $("#guessesLeft").html(guessesLeft);
    $("#letterBlanks").html(guessBlanks.join(" "));
    
    $('#outcome').empty();
    $('#outcomeMessage').empty();
}
// checkLettesr() function----------------------
// It's where we will do all of the comparisons for matches. Again, it's not being called here. It's just being made for future use.
var checkLetters = (letter) => {
  //check to make sure guess is a letter and that its lowercase and its in thhe word, used in the future
  
var letterInWord = false; // true when in word

// Check if a leter exists inside the array at all.
  for (var i=0; i<blanks; i++) {
    if(randomGameWord[i] == letter) {
      letterInWord = true; // if the letter exists then toggle this boolean to true. This will be used in the next step. 
    }
  }
// If the letter exists somewhere in the word, then figure out exactly where (which indices)
  if(letterInWord){
  
    // loop through the word 
    for (let i=0; i<blanks; i++) {

      // Populate the guessBlanks with every instance of the letter.
      if(randomGameWord[i] == letter) {
        guessBlanks[i] = letter; // here we set the specific space in blanks and letter equal to the letter when there is a match.
      }
    }
            
        }else {
          if(guessesLeft > 0){
             wrongGuesses.push(letter); // then we add the letter to the list of wrong letters
             guessesLeft--;
           
         }
    }          
};


// gameComplete() function============================================================================================================
// Here we will have all of the code that needs to be run after each guess is made
let gameComplete = () => {
  
  // First, log an initial status update in the console telling us how many wins, losses, and guesses are left
  console.log("Wins: " + winCount + " | Losses: " + lossCount + " | Guesses Left: " + guessesLeft);
console.log(chosenGameArray);
  // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
  $("#guessesLeft").html(guessesLeft);
  $("#letterBlanks").html(guessBlanks.join(" ")); // This will print the array of guesses and blanks onto the page
  $("#wrongGuesses").html(wrongGuesses.join(" ")); // this will print the wrong guesses onto the page.


  // If we have gotten all the letters to match the solution... 
  if (gameWordLetters.toString() == guessBlanks.toString()) {
    winCount += 1; // add to the win counter
      
   $('#outcome').html('Congratulations!');
  if(chosenGameArray == guitaristWordbank){ 
          $('#outcomeMessage').html("The guitarist's last name is: " + randomGameWord);
        }
    else{
          $('#outcomeMessage').html("The pop artist is known as: " + randomGameWord.toUpperCase());
        }
    // give the user an alert

    // Update +the win counter in the HTML
    $("#winCount").html(winCount);
//    startGame(); // restart the game 
   
  }

  // If we've run out of guesses
  else if(guessesLeft == 0) {
    
    lossCount++;   // add to the loss counter 
    $('#outcome').html(':*(');
    $('#myModal').modal('toggle');
    if(chosenGameArray = guitaristWordbank){ 
          $('#outcomeMessage').html("The guitarist's last name is: " + randomGameWord);
        }
    else{
          $('#outcomeMessage').html("The pop artist is known as: " + randomGameWord.toUpperCase());

        }
    // Update the loss counter in the HTML
    $("#lossCount").html(lossCount); 
    $("#wrongGuesses").empty();
    // startGame(); 
  }

};

//New Game Button Click Handler
var newGame = $('#newGame').on('click', function ()
  {     

       startGame();
      
  });
// GAME FUNCTION 
// ==================================================================================================

// Starts the Game by running the startGame() function
startGame();

// Then initiates the function for capturing key clicks.
var keypress = document.onkeyup = function(e) {
  //only allows user to guess a letter, all other characters prompt an alert, how do we keep from decrementing?
        if(e.keyCode < 65 || e.keyCode > 90 ){
    alert('You didnt guess a letter!');
  }
  letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); // converts all key clicks to lowercase lettesr 
  checkLetters(letterGuessed); // runs the code to check for correctness 
// else { (alert("You can only guess letters!"));
  gameComplete(); // runs the code after each round is done

};