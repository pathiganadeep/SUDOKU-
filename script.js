let reset = document.getElementById("reset-btn");
let solve = document.getElementById("solve");
let message = document.getElementById("message");
let boxes = document.querySelectorAll(".box");

// Function to read the current Sudoku grid from inputs
const getBoard = () => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let index = i * 9 + j;
            let value = boxes[index].value;
            row.push(value === '' ? 0 : parseInt(value));
        }
        board.push(row);
    }
    return board;
}

// Validating input (checks if all inputs are valid numbers between 1-9 or empty)
const valid = (boxes) => {
    let isValid = true;
    boxes.forEach(box => {
        let value = box.value;
        if (value !== '' && (isNaN(value) || value < 1 || value > 9)) {
            isValid = false;
        }
    });
    return isValid;
}

// Check for duplicates in rows, columns, and 3x3 subgrids
const duplicates = (board) => {
    const N = 9;
    let used = new Array(N + 1).fill(false);

    // Check rows
    for (let row = 0; row < N; row++) {
        used.fill(false);
        for (let col = 0; col < N; col++) {
            let value = board[row][col];
            if (value !== 0) {
                if (used[value]) {
                    return true;
                }
                used[value] = true;
            }
        }
    }

    // Check columns
    for (let col = 0; col < N; col++) {
        used.fill(false);
        for (let row = 0; row < N; row++) {
            let value = board[row][col];
            if (value !== 0) {
                if (used[value]) {
                    return true;
                }
                used[value] = true;
            }
        }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            used.fill(false);
            for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
                for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
                    let value = board[row][col];
                    if (value !== 0) {
                        if (used[value]) {
                            return true;
                        }
                        used[value] = true;
                    }
                }
            }
        }
    }

    return false;
}

// Function to check if a value is safe to place in a cell
const isValid = (board, row, col, num) => {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] == num) return false;
    }

    // Check 3x3 box
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) return false;
        }
    }

    return true;
}

// Solving the Sudoku board using backtracking
const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Set the solved board values to the input boxes
const setBoard = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let ind = i * 9 + j;
            if (boxes[ind].value === '') {
                boxes[ind].value = board[i][j];
                boxes[ind].classList.add("solution");
            }
        }
    }
}

// Reset the board to its initial empty state
const resetBoard = () => {
    boxes.forEach(box => {
        box.value = '';
        box.classList.remove("solution");
        message.innerText="";
    });
}

// Main function to handle solving logic
const func = () => {
    let board = getBoard();
    if (!valid(boxes)) {
        message.innerText = "Invalid Input! Please enter numbers between 1-9.";
        message.style.color="red";
        
    } else if (duplicates(board)) {
        message.innerText = "No solution exists due to duplicates!";
        message.style.color="red";
    } else if (solveSudoku(board)) {
        message.style.color="rgb(20, 223, 121)";
        message.innerText = "Sudoku is solved!";
        setBoard(board);
    } else {
        message.innerText = "No solution exists!";
    }
}

// Event listeners for reset and solve buttons
reset.addEventListener("click", resetBoard);
solve.addEventListener("click", func);
