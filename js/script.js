var numHosts = 25;

$(document).ready(function(){
    //Checks the answers submitted.
    $("#check-answer-btn").click(function(){
        checkAnswer()
    });

    $("#gen-new-btn").click(function(){
        generateNewQuestion();
    })

    $("form").submit(function(){
        checkAnswer()
      });

    $("#clear-btn").click(function(){
        $("#groups-container").empty();
    })
});

//Generates a new question
function generateNewQuestion() {
    // $("#groups-container").empty();
    //generates a random number of hosts from 1-253. This reserves 2 addresses for broadcast and network IP
    numHosts = Math.floor(Math.random() * 254) + 1;
    $("#number-of-hosts").text(numHosts + " hosts");

    //Resets fields
    $("#CIDR-notation").val("");
    $("#answer-text").text("Please enter an answer");
    $("#answer-text").css("color", "black");
}

//checks the answer based on user input
function checkAnswer() {
    let answer = $("#CIDR-notation").val();
    let correct = false;
    let checkedCIDR = findCIDRNotation(numHosts, 24);
    if (answer == checkedCIDR) {
        correct = true;
    }

    if (correct) {
        $("#answer-text").text("Correct!");
        $("#answer-text").css("color", "green");
    } else {
        $("#answer-text").text("Incorrect");
        $("#answer-text").css("color", "red");
    }
}

//This function creates the smallest possible CIDR notation based on the amount of hosts passed in.
// It will return a string.
function findCIDRNotation(numHosts, networkBits) {
    let finalCIDR = "";
    let hostBits = findHostBits(numHosts+2, 1);
    let subnetBits = 32 - hostBits;
    finalCIDR = "/" + subnetBits;
    return finalCIDR
}

//This is a recursivce function that finds the number for CIDR notation. 
//It checks if the number is less than 2 to the power of the index. This will find how many bits are needed
//for the hosts address. This does NOT account for the broadcast and network ID. Those must be passed in.
function findHostBits (number, index) {
    //prevents endless loop if incorrect index passed in.
    if (index < 0) {
        return -1;
    }

    //recursive function call
    if (number <= Math.pow(2, index)) {
        return index;
    } else {
        index += 1;
        return findHostBits(number, index);
    }
}