let counter = -1;
let maxRowCol = 3;
let table = document.getElementById("table");

function create_X_And_O_Table() {
    for (let i = 0; i < maxRowCol; ++i) {
        let row = document.createElement("div");
        row.className = "row";
        table.appendChild(row);
        for (let j = 0; j < maxRowCol; ++j) {
            let button = document.createElement("button");
            button.className = "btn btn-outline-dark";
            button.id = "Button" + "[" + i + "]" + "[" + j + "]";
            button.addEventListener("click", () => add_X_Or_O_ToTheTable(button.id), {once : true});
            table.appendChild(button);
        }
    }
}

function add_X_Or_O_ToTheTable(buttonId) {
    let button = document.getElementById(buttonId);
    let inputHeader = document.getElementById("inputHeader");
    ++counter;
    if (counter % 2 == 0) {
        button.innerHTML = "X";
        inputHeader.innerHTML = "Add your O input in any free square."
    } else {
        button.innerHTML = "O";
        inputHeader.innerHTML = "Add your X input in any free square."
    }
    if (counter >= 4) {
        checkPossibleWinner();
    }
}

let buttonMatrix = [[], [], []];
let messageToUserButton = document.createElement("button");
messageToUserButton.className = "btn btn-outline-dark";

function checkPossibleWinner() {
    for (let i = 0; i < maxRowCol; ++i) {
        for (let j = 0; j < maxRowCol; ++j) {
            buttonMatrix[i][j] = document.getElementById("Button" + "[" + i + "]" + "[" + j + "]").textContent;
        }
    }
    let found = false;
    let j = 0;
    for (let i = 0; i < maxRowCol; ++i) {
        if (buttonMatrix[i][j] == buttonMatrix[i][j + 1] && buttonMatrix[i][j] == buttonMatrix[i][j + 2] && buttonMatrix[i][j] != "") {
            showWinner(buttonMatrix[i][j], i, j, i, j + 1, i, j + 2);
            found = true;
        }
    }
    let i = 0;
    for (let j = 0; j < maxRowCol; ++j) {
        if (buttonMatrix[i][j] == buttonMatrix[i + 1][j] && buttonMatrix[i][j] == buttonMatrix[i + 2][j] && buttonMatrix[i][j] != "") {
            showWinner(buttonMatrix[i][j], i, j, i + 1, j, i + 2, j);
            found = true;
        }
    }
    if (buttonMatrix[i][i] == buttonMatrix[i + 1][i + 1] && buttonMatrix[i][i] == buttonMatrix[i + 2][i + 2] && buttonMatrix[i][j] != "") {
        showWinner(buttonMatrix[i][i], i, i, i + 1, i + 1, i + 2, i + 2);
        found = true;
    }
    if (buttonMatrix[i][maxRowCol - i - 1] == buttonMatrix[i + 1][maxRowCol - i - 2] 
        && buttonMatrix[i][maxRowCol - i - 1] == buttonMatrix[i + 2][maxRowCol - i - 3] && buttonMatrix[i][j] != "") {
        showWinner(buttonMatrix[i][maxRowCol - i - 1], i, maxRowCol - i - 1, i + 1, maxRowCol - i - 2, i + 2, maxRowCol - i - 3);
        found = true;
    }
    if (found == false && counter == 8) {
        messageToUserButton.innerText ="Nobody won the game. It's a draw. Click HERE to play one more time.";
        messageToUserButton.addEventListener("click", () => window.location.reload());
        container.appendChild(messageToUserButton);
    }
}

let container = document.getElementById("container");

function showWinner(winner, iFirstPos, jFirstPos, iSecondPos, jSecondPos,  iThirdPos, jThirdPos) {
    for (let i = 0; i < maxRowCol; ++i) {
        for (j = 0; j < maxRowCol; ++j) {
            document.getElementById("Button" + "[" + i + "]" + "[" + j + "]").disabled = true;
        }
    }

    let firstWinningButton = document. getElementById("Button" + "[" + iFirstPos + "]" + "[" + jFirstPos + "]");
    firstWinningButton.style.backgroundColor = "yellow";
    let secondWinningButton = document. getElementById("Button" + "[" + iSecondPos + "]" + "[" + jSecondPos + "]");
    secondWinningButton.style.backgroundColor = "yellow";
    let thirdWinningButton = document. getElementById("Button" + "[" + iThirdPos + "]" + "[" + jThirdPos + "]");
    thirdWinningButton.style.backgroundColor = "yellow";

    messageToUserButton.innerText ="\"" + winner + "\" won the game. Click HERE to play one more time.";
    messageToUserButton.addEventListener("click", () => window.location.reload());
    container.appendChild(messageToUserButton);
}

create_X_And_O_Table();