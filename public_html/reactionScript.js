//Declaring and initializing the global variables
var startButton = document.getElementById("startButton");       //Start button in home page
var circle = document.getElementById("circle");                 //Div id = "circle"
var square = document.getElementById("square");                 //Div id = "square"
var triangle = document.getElementById("triangle");             //Div id = "triangle"

var elems = [circle, square, triangle];                         //An array containing the above elements
var reactionTimes = new Array(9);                               //An array that will hold the reaction times
var sum = 0;                                                    //Sum variable is used when calculating average
var average = 0;                                                //Average reaction time
var max = 0;                                                    //Longest reaction time
var min = 0;                                                    //Shortest reaction time

//These are random values. They determine where the elements are positioned on the screen
var marginLeft = Math.floor(Math.random() * 690);               
var marginTop = Math.floor(Math.random() * 390);

//3 variables that hold the time when element was created, removed and reaction time
var timeCreated, timeGone, reactionTime;

var counter = 0;                                                //This is the counter before the game starts
var arrayCounter = 0;                                           //This is the counter that determines the number of appearances left

//The next array holds 4 messages. One of them is displayed at the end of the game
var resulStrings = ["Great job!", "Well done!", "Good results!", "You can do better!"];
var stringIndex = 0;                                            //This variable will determine which message will be displayed

/*
 * The start button works in the following way:
 * 1. Onclick the start button disappears
 * 2. The parent div node is styled and counter is initialized with the value of 3
 * 3. Call countDown() function
 */
startButton.onclick = function() {
    this.style.display = "none";
    var parent = this.parentNode;
    parent.style.fontSize = "100px";
    parent.style.color = "lightyellow";
    parent.style.textShadow = "3px 3px 3px #ff0000";
    var counter = 3;
    countDown();

    /*
     * CountDown() function:
     * 1. If counter is greater than 0, display the value of 'counter' variable
     * 2. If counter is 0, display "GO!"
     * 3. If counter is less than 0, display the first element (circle) and record the time using timeCreated variable
     * 4. Decrement counter
     * 5. If counter is greater than or equal to -1, call countDown() function again with 1second delay
     */
    function countDown() {
        setTimeout(function() {
            if(counter > 0) {
                parent.innerHTML = counter;
            }
            else if(counter === 0) {
                parent.innerHTML = "GO!";
            }
            else {
                parent.style.display = "none";
                setTimeout(function() {
                    circle.style.display = "block";
                    timeCreated = Date.now();
                }, 500);
            }
            counter--;
            if(counter >= -1) {
                countDown();
            }
        }, 1000);
    }
};

//Position the circle element on screen using the 2 random values
circle.style.marginLeft = marginLeft + "px";
circle.style.marginTop = marginTop + "px";

//Counter is reinitialized to 0
counter = 0;

/*
 * hideAndDisplay(elem) is called when user clicks on an element (circle, square, triangle)
 * 1. The time is recorded using timeGone
 * 2. Reaction time is calculated and added to the array 'reactionTimes'
 * 3. counter is incremented, if counter is greater than 2 --> make counter 0 (so the first element of the array is displayed again)
 * 4. Further explanation below...
 */
function hideAndDisplay(elem) {

    timeGone = Date.now();

    reactionTimes[arrayCounter] = (timeGone - timeCreated) / 1000;
    arrayCounter++;

    elem.style.display = "none";

    counter++;

    if(counter > 2) {
        counter = 0;
    }

    //New random values are calculated and the element is positioned
    marginLeft = Math.floor(Math.random() * 660);
    marginTop = Math.floor(Math.random() * 360);

    elems[counter].style.marginLeft = marginLeft + "px";
    elems[counter].style.marginTop = marginTop + "px";

    //If arrayCounter is less then the length of the array --> game is not over
    //The next element of the array is displayed and time is saved 
    //This is done in between 0-5 seconds
    if(arrayCounter < reactionTimes.length) {
        setTimeout(function() {
            elems[counter].style.display = "block";
            timeCreated = Date.now();
        }, Math.random() * 5000);
    }

    //If the array is full --> game is over
    else {
        /*
         * Find the shortest and longest reaction time in the array.
         * Then calculate the average.
         * Depending on the value of the average, a string is displayed i.e. averege = 0.751,
         * average floored = 0, so the first string of the array is displayed.
         * Then the results are displayed along with a "Play again!" button.
         */
        min = reactionTimes[0];

        for(var i = 0; i < reactionTimes.length; i++) {
            if(reactionTimes[i] > max) {
                max = reactionTimes[i];
            }
            else if(reactionTimes[i] < min) {
                min = reactionTimes[i];
            }
            sum += reactionTimes[i];
        }
        average = (sum / reactionTimes.length).toFixed(3);

        if(average > 3) {
            stringIndex = 3;
        }
        else {
            stringIndex = Math.floor(average);
        }
        var resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "Your best time: " + min + "s<br /> Your worst time: " + max + "s<br />" + "Average: " + average + "s" +
                "<br /> " + resulStrings[stringIndex] +
                "<br /><button id = \"playAgain\" onclick = \"window.location.reload()\">Play Again</button>";
        resultsDiv.style.display = "block";
    }
}
            


