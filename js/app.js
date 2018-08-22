/*
 * Create a list that holds all of your cards
 */

let start = 0;
let myCardsArray = [];
let viewedCards = [];
let matchedViewedCard = [];
let increaseMoves = 0;
const myCards = document.querySelectorAll('.card');
const cardDeck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
const resetGame = document.querySelector('.restart');
const star = document.querySelector('.stars');
const winRestart = document.querySelector('#win-restart');
const winMovesCount =  document.querySelector('.win-moves');
const winStarsCount =  document.querySelector('.win-stars');
const container =  document.querySelector('.container');
const windeck =  document.querySelector('.windeck');
const timeUsed =  document.querySelector('.timeused');
const winTimeUsed =  document.querySelector('.win-time');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 
function myReset(){
	myCards.forEach(function(fromDomItem) {
	  myCardsArray.push(fromDomItem.innerHTML);
	 }); 
	 
	shuffle(myCardsArray);

	for(let i = 0; i < myCardsArray.length; i++ ){
		myCards[i].innerHTML = myCardsArray[i];
    }
}

myReset();

// If the cards do not match, remove the cards from the list and hide the card's symbol
function removeClass(){
	for(const testview of viewedCards){
		testview.classList.remove("show" , "open" , "vibrate" , "disable");
	}
	viewedCards = [];
}

// If the cards do match, lock the cards in the open position
function lockCard(){
	for (const viewedCard of viewedCards) {
		viewedCard.classList.remove("show" , "open");
		viewedCard.classList.add("match");
		matchedViewedCard.push(viewedCard);
		viewedCards = [];
	}
}
 
// Check to see if two cards match if match show and lock card else hide card
function tryMatchCard(){
	if(viewedCards[0].isEqualNode(viewedCards[1])){
		lockCard();	
	}else{
		for (const viewedCard of viewedCards) {
		viewedCard.classList.add("vibrate");
	    }
		setTimeout(removeClass, 1000);
	}
}
 
// Display the clicked card's symbol 
function showCards(clickedIcon){
	clickedIcon.classList.toggle("open");
	clickedIcon.classList.toggle("show");
    clickedIcon.classList.toggle("disable");
}

function addCards(clickedIcon){
	viewedCards.push(clickedIcon);
}

// Increment the move counter and display it on the page also update the stars
function updateMoves(){
	increaseMoves++ ;
	if(increaseMoves === 1){
		moveCounter.innerHTML = increaseMoves + " move" ;
		winMovesCount.innerHTML = increaseMoves + " move" ;		
	}else{
		moveCounter.innerHTML = increaseMoves + " moves" ;
		winMovesCount.innerHTML = increaseMoves + " moves" ;			
	}
	if(increaseMoves === 8){
		star.lastElementChild.innerHTML = '<i class="fa fa-star-o"></i>';
		winStarsCount.innerHTML = "2 Stars"
	}else if(increaseMoves === 16){
		star.lastElementChild.previousElementSibling.innerHTML = '<i class="fa fa-star-o"></i>';
		winStarsCount.innerHTML = "1 Star"
	}
}

// Set up the event listener for a card click
cardDeck.addEventListener('click', function (evt) {
	  	clickedIcon = evt.target;
if (clickedIcon.className === 'card') {
		showCards(clickedIcon);
		addCards(clickedIcon);
	}
	if(viewedCards.length === 2){
		tryMatchCard();	
		updateMoves();
		gameOver();
	}
}, true);

//When all cards have matched, display a message with the final score
function gameOver(){
	if(matchedViewedCard.length === myCardsArray.length){
		container.innerHTML = "";
		winTimeUsed.innerHTML = timeUsed.innerHTML;
		windeck.style.display = "block";
		winRestart.addEventListener('click', function (event) {
			location.reload();
			windeck.style.display = "none";
		});
	}
}

// If the reset button is clicked reset the game
resetGame.addEventListener('click', function (e) {
	location.reload();
});

//When the player starts a game, a displayed timer starts
function setTime(){
	let seconds = start++;
    timeUsed.innerHTML = seconds + "s";
}

setInterval(setTime, 1000);

setTime();
