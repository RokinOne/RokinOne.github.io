console.log("START UR");

var playerStatus = document.getElementById("playerStatus");
var rollButton = document.getElementById("roll");
var resultDiv = document.getElementById("result");
var rollHistory = document.getElementById("roll-history");
var whiteStartPool = document.getElementById("whiteStartPool");
var blackStartPool = document.getElementById("blackStartPool");
var whiteEndPool = document.getElementById("whiteEndPool");
var blackEndPool = document.getElementById("blackEndPool");
var cells = document.getElementsByClassName("cell");
var white = [];
var black = [];
var player = 1; // 1-white 2-black
var turn = 0;
var j;
var game = true;
var rollAgain = false;
var result = 0;
var whiteMarkers = [];
var blackMarkers = [];
var marker;
var playerMap = [0,0,0,0,0,0,0,0]; // samo za zajednicke
var mapAgain = [0,0,0,1,0,0,0,1,0,0,0,0,0,1];
var posWhite = [0,0,0,0,0,0,0]; // 1-14, 15 je gotov
var posBlack = [0,0,0,0,0,0,0];
var rollLock = false; // disable moving of pawns when rolling

var moveAllowed = true;

init();
switchPlayer(); // START GAME

function init () {
  for (j = 1; j <= 7; j++) {
    marker = document.createElement("div");
    marker.className = "marker white";
    marker.innerHTML = j;
    marker.addEventListener("click", pawn.bind(this, 1, j), false);
    white[j] = marker;
  }

  for (j = 1; j <= 7; j++) {
    marker = document.createElement("div");
    marker.className = "marker black";
    marker.innerHTML = j;
    marker.addEventListener("click", pawn.bind(this, 2, j), false);
    black[j] = marker;
  }

  rollButton.addEventListener("click",roll);
  rollButton.disabled = true;

  player = 2;
  placeMarkers();
}

function roll () {
  result = Math.floor((Math.random() * 4) + 1); // NETOCNO
  resultDiv.innerHTML = result;
  rollHistory.innerHTML += result + " ";
  rollButton.disabled = true;
  rollLock = false;
  
  moveAllowed = checkEligibleMarkers(result);
  if (moveAllowed) { // ako ima slobodan potez, otvori pijune
    if (player == 1) {
      for (j = 1; j <= 7; j++) { white[j].disabled = false; }
    } else {
      for (j = 1; j <= 7; j++) { black[j].disabled = false; }
    }
  } else { switchPlayer(); } // u suprotnom, promini igraca
}

function canPawnMove (color, figure) {
  var newPos, j = 0, canMove = true;
  if (color != player) {console.log(1);canMove = false;}
  if (rollLock) {console.log(2);canMove = false;}
  if (player == 1) {
    newPos = posWhite[figure-1] + result; console.log("white NP:"+newPos);
    for (j = 1; j <= 7; j++) {
      if ((posWhite[j-1] == newPos) && (newPos != 15)) canMove = false;
      if ((newPos == 8) && (posBlack[j-1] == 8)) canMove = false;
    }
  } else {
    newPos = posBlack[figure-1] + result; console.log("black NP:"+newPos);
    for (j = 1; j <= 7; j++) {
      if ((posBlack[j-1] == newPos) && (newPos != 15)) canMove = false;
      if ((newPos == 8) && (posWhite[j-1] == 8)) canMove = false;
    }
  }
  if (newPos > 15) {console.log(1.5);canMove = false;}
  
  return canMove;
}

function pawn (color, figure) {
  // check pawn
  var allowed = canPawnMove(color, figure);
  var currentMarkerPos, nextMarkerPos;
  
  if (allowed) {
    if (color == 1) {
      currentMarkerPos = posWhite[figure - 1];
      nextMarkerPos = currentMarkerPos + result;
      if ((nextMarkerPos > 4) && (nextMarkerPos < 13)) {
        playerMap[currentMarkerPos - 5] = 0; // makni marker sa te pozicije
        if (playerMap[nextMarkerPos - 5] == 2) {
          for (j = 1; j <= 7; j++) { if (posBlack[j-1] == nextMarkerPos) posBlack[j-1] = 0; } // pojedi/resetiraj suprotni marker ako je tu
        }
        playerMap[nextMarkerPos - 5] = 1;
      }
      posWhite[figure-1] += result; // promjeni poziciju trenutnog markera
    }
    else {
      currentMarkerPos = posBlack[figure - 1];
      nextMarkerPos = currentMarkerPos + result;
      if ((nextMarkerPos > 4) && (nextMarkerPos < 13)) {
        playerMap[currentMarkerPos - 5] = 0; // makni marker sa te pozicije
        if (playerMap[nextMarkerPos - 5] == 1) {
          for (j = 1; j <= 7; j++) { if (posWhite[j-1] == nextMarkerPos) posWhite[j-1] = 0; } // pojedi/resetiraj suprotni marker ako je tu
        }
        playerMap[nextMarkerPos - 5] = 2;
      }
      posBlack[figure-1] += result; // promjeni poziciju trenutnog markera
    }
    console.log(posWhite);
    console.log(posBlack);
    console.log(playerMap);
    rollLock = true;
    placeMarkers();

    // check victory
    var winner = checkVictory();
    if (winner != 0) { // vidi "game" varijablu
      console.log("GAME OVER");
      if (winner == 1) {
        console.log("white wins");
        playerStatus.innerHTML = "WHITE WINS";
      }
      else {
        console.log("black wins");
        playerStatus.innerHTML = "BLACK WINS";
      }
    }

    if (player == 1) {
      for (j = 1; j <= 7; j++) { white[j].disabled = true; }
    } else {
      for (j = 1; j <= 7; j++) { black[j].disabled = true; }
    }

    switch (nextMarkerPos) {
      case 4: case 8: case 14:
        console.log("play again");
        if (player == 2) player = 1;
        else player = 2;
        break;
    }
    switchPlayer();
  } else { console.log("wrong"); }
}

function switchPlayer () {
  for (j = 1; j <= 7; j++) { white[j].classList.remove("interactive");}
  for (j = 1; j <= 7; j++) { black[j].classList.remove("interactive");}
  
  if (player == 1) {
    player = 2;
    playerStatus.innerHTML = "Black plays";
    console.log("Black plays");
  } else {
    turn++;
    console.log("New turn: " + turn);
    player = 1;
    playerStatus.innerHTML = "White plays";
    console.log("White plays");
  }
  rollButton.disabled = false;
}

function checkEligibleMarkers(result) {
  var j = 0;
  var result = false;
  var temp;
  if (player == 1) {
    for (j = 1; j <= 7; j++) {
      temp = posWhite[j-1] + result;
      if (canPawnMove(1, j)) {
        white[j].classList.add("interactive");
        result = true;
      }
    }
  } else {
    for (j = 1; j <= 7; j++) {
      temp = posBlack[j-1] + result;
      if (canPawnMove(2, j)) {
        black[j].classList.add("interactive");
        result = true;
      }
    }
  }
  return result;
}

function checkVictory () {
  var victory = true;
  for (var i = 0; i < posWhite.length; i++) {
    if (posWhite[i] < 15) victory = false;
  }
  if (victory == true) return 1;
  
  victory = true
  for (i = 0; i < posBlack.length; i++) {
    if (posBlack[i] < 15) victory = false;
  }
  if (victory == true) return 2;
  
  return 0;
}

function placeMarkers () {
  var j, marker;
  for (var i = 0; i < 20; i++) { cells[i].innerHTML = ""; }
  
  for (j = 1; j <= 7; j++) {
    marker = posWhite[j-1];
    if (((marker > 0) && (marker < 5)) || ((marker > 12) && (marker < 15))) {
        document.getElementById("cellW" + marker).appendChild(white[j]);
    } else if ((marker > 4) && (marker < 13)) {
        document.getElementById("cellM" + marker).appendChild(white[j]);
    } else if (marker == 0) {
        whiteStartPool.appendChild(white[j]);
    } else if (marker > 14) {
        whiteEndPool.appendChild(white[j]);
    }
  }
  
  for (j = 1; j <= 7; j++) {
    marker = posBlack[j-1];
    if (((marker > 0) && (marker < 5)) || ((marker > 12) && (marker < 15))) {
        document.getElementById("cellB" + marker).appendChild(black[j]);
    } else if ((marker > 4) && (marker < 13)) {
        document.getElementById("cellM" + marker).appendChild(black[j]);
    } else if (marker == 0) {
        blackStartPool.appendChild(black[j]);
    } else if (marker > 14) {
        blackEndPool.appendChild(black[j]);
    }
  }
  
  //refreshPoolStats();
}

function refreshPoolStats () {
  var j;
  var no = 0;
  for (j = 1; j <= 7; j++) { if (posWhite[j] == 0) no++; }
  whiteStartPool.innerHTML = no;
  
  no = 0;
  for (j = 1; j <= 7; j++) { if (posBlack[j] == 0) no++; }
  blackStartPool.innerHTML = no;
  
  no = 0;
  for (j = 1; j <= 7; j++) { if (posWhite[j] > 14) no++; }
  whiteEndPool.innerHTML = no;
  
  no = 0;
  for (j = 1; j <= 7; j++) { if (posBlack[j] > 14) no++; }
  blackEndPool.innerHTML = no;
}

// TURN
// roll
// pawn
// switch
// roll
// pawn
// switch
