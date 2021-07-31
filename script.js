(function () {
    'use strict';
}());

let player1Score = 0;
let player2Score = 0;
let accumulatedScore1 = 0;
let accumulatedScore2 = 0;

//Selectors
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
const firstPlayerScore = document.getElementById('score--0');
const secondPlayerScore = document.getElementById('score--1');
const p1CurrentScore = document.getElementById('current--0');
const p2CurrentScore = document.getElementById('current--1');

//Generate random number
const randomNumber = function () {
    const number = Math.floor(Math.random() * 6) + 1;
    return number;
};

//Check active class
const activeClassCheck = function (theClass) {
    if (theClass.classList.contains('player--active'))
        return true;
    else
        return false;
};

//Displays photo
const displayPhoto = function (photoNumber) {
    document.querySelector('.dice').src = `dice-${photoNumber}.png`;
};

//Toggle active-style
const toggleActiveStyle = function () {
    firstPlayer.classList.toggle('player--active');
    secondPlayer.classList.toggle('player--active');
};

//Updating Player score
const scoreUpdate = function (playerScore, generatedNum) {
    playerScore += generatedNum;
    return playerScore;
};

//Print current score
const displayCurrentScore = function (playerScore) {
    if (activeClassCheck(firstPlayer)) {
        p1CurrentScore.textContent = playerScore;
    } else
        p2CurrentScore.textContent = playerScore;
};

//Updating billboard Score
accumulatedScores = function () {
    if (activeClassCheck(firstPlayer)) {
        accumulatedScore1 += player1Score;
        return accumulatedScore1;
    } else {
        accumulatedScore2 += player2Score;
        return accumulatedScore2;
    }
};

//Printing Billboard Score
const displayBillboardScore = function (accumulatedScore) {
    if (activeClassCheck(firstPlayer)) {
        firstPlayerScore.textContent = accumulatedScore;
    } else {
        secondPlayerScore.textContent = accumulatedScore;
    }
};


//Reset Player score
const scoreReset = function (playerScore) {
    playerScore = 0;
    displayCurrentScore(playerScore);
    toggleActiveStyle();
    return playerScore;
};




//Action of roll dice button
document.querySelector('.btn--roll').addEventListener('click', function () {
    if (accumulatedScore1 < 100 && accumulatedScore2 < 100) {

        const generatedNum = randomNumber();
        displayPhoto(generatedNum);


        if (activeClassCheck(firstPlayer)) {
            if (generatedNum !== 1) {
                player1Score = scoreUpdate(player1Score, generatedNum);

            } else {
                accumulatedScore1 += player1Score;
                //displayBillboardScore(accumulatedScore1);
                player1Score = scoreReset(player1Score);
            }
            displayCurrentScore(player1Score);

        } else {
            if (generatedNum !== 1) {
                player2Score = scoreUpdate(player2Score, generatedNum);

            } else {
                accumulatedScore2 += player2Score;
                //displayBillboardScore(accumulatedScore2);
                player2Score = scoreReset(player2Score);
            }

            displayCurrentScore(player2Score);
            //document.getElementById('current--1').textContent = player2Score;
        }
    } else {
        if (accumulatedScore1 >= 100) {
            firstPlayer.classList.add('player--winner');
        } else {
            secondPlayer.classList.add('player--winner');
        }
    }


});

document.querySelector('.btn--hold').addEventListener('click', function () {
    if (accumulatedScore1 < 100 && accumulatedScore2 < 100) {
        if (activeClassCheck(firstPlayer)) {
            //accumulatedScore1 = accumulatedScores();
            accumulatedScore1 += player1Score;
            displayBillboardScore(accumulatedScore1);
            player1Score = scoreReset(player1Score);
        } else {
            //accumulatedScore2 = accumulatedScores();
            accumulatedScore2 += player2Score;
            displayBillboardScore(accumulatedScore2);
            player2Score = scoreReset(player2Score);
        }
    } else {
        if (accumulatedScore1 >= 100) {
            firstPlayer.classList.add('player--winner');
        } else {
            secondPlayer.classList.add('player--winner');
        }
    }
});

document.querySelector('.btn--new').addEventListener('click', function () {
    player1Score = 0;
    player2Score = 0;
    accumulatedScore1 = 0;
    accumulatedScore2 = 0;

    firstPlayerScore.textContent = accumulatedScore1;
    secondPlayerScore.textContent = accumulatedScore1;
    p1CurrentScore.textContent = player1Score;
    p2CurrentScore.textContent = player2Score;

    if (activeClassCheck(secondPlayer)) {
        secondPlayer.classList.remove('player--active');
        firstPlayer.classList.add('player--active');
    }



});