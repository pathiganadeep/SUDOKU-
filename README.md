# Sudoku Solver

A simple, interactive Sudoku Solver built with HTML, CSS, and JavaScript. This project allows users to input a Sudoku puzzle, validate it, and solve it with the press of a button. The project leverages backtracking to find solutions and provides helpful error messages to guide the user.

## Features

- **Interactive 9x9 Grid**: A user-friendly Sudoku grid with input validation for numbers between 1 and 9.
- **Duplicate Detection**: Identifies duplicate numbers in rows, columns, and 3x3 subgrids to prevent unsolvable puzzles.
- **Sudoku Solver**: Uses the backtracking algorithm to solve valid Sudoku puzzles.
- **Error Messaging**: Displays helpful messages to guide users on invalid inputs, duplicate entries, and unsolvable puzzles.
- **Reset Function**: Easily clears the board to start fresh.

## Usage

1. **Enter Puzzle**: Input the known numbers in the grid (leave unknown cells empty).
2. **Solve Puzzle**: Press the **Solve** button to generate the solution.
3. **Reset Puzzle**: Press the **Reset** button to clear the board.

## Project Structure

- `index.html`: HTML structure for the Sudoku grid and buttons.
- `style.css`: CSS for layout and styling of the board, buttons, and messages.
- `script.js`: JavaScript for handling input validation, solving the puzzle, and updating the UI.

## How It Works

The Sudoku Solver uses a **backtracking algorithm**, a recursive approach that attempts to solve each cell in the Sudoku grid by testing numbers from 1 to 9. When the algorithm encounters an invalid placement, it "backtracks" to the previous cell, trying the next possible number. Here’s a step-by-step breakdown of how it works:

### 1. Input Validation

When the user inputs numbers into the grid, the JavaScript code first validates the entries to ensure they are either empty or between 1 and 9. This helps prevent the introduction of non-numeric values or invalid numbers, which would make solving impossible.

### 2. Detecting Duplicates

Before solving, the solver checks the initial board for duplicate numbers in each row, column, and 3x3 subgrid:

- **Rows**: The solver iterates through each row, identifying any repeated numbers.
- **Columns**: Similarly, each column is checked to ensure no duplicates are present.
- **3x3 Subgrids**: Each of the nine 3x3 subgrids is inspected to verify that no number appears more than once within it.

If duplicates are detected, the solver stops and notifies the user, as such a configuration would have no valid solution.

### 3. Backtracking Algorithm

The backtracking algorithm proceeds through the grid cell by cell, attempting to fill each empty cell with a valid number:

1. **Find an Empty Cell**: The algorithm scans the board to find an empty cell (indicated by a 0).
2. **Try Each Number**: For each empty cell, it tries numbers from 1 to 9. After placing a number in the cell, it checks if the placement is valid by ensuring that the number does not conflict with others in the same row, column, or 3x3 subgrid.
3. **Check Validity**: If the number is valid, it is temporarily placed in the cell, and the algorithm proceeds to the next empty cell.
4. **Backtrack if Necessary**: If a number placement leads to an unsolvable board (i.e., no valid numbers can be placed in a subsequent cell), the algorithm "backtracks" by removing the last number placed and trying the next possible number for that cell.

This process continues until either the entire board is filled (a solution is found) or the algorithm backtracks all the way to the start, meaning no solution exists for the given configuration.

### 4. Displaying the Solution

Once the board is solved, the solution is displayed in the grid, highlighting the filled cells to distinguish them from the initial input. The solver also updates the user with a message confirming that the Sudoku puzzle has been solved.

### 5. Handling Unsolvable Puzzles

If the solver cannot find a valid solution, it displays a message to the user indicating that no solution exists. This might occur due to an incorrect initial setup or an unsolvable puzzle configuration.

In summary, this project showcases how a backtracking algorithm can effectively solve Sudoku puzzles by testing all possible configurations and "backtracking" whenever it encounters an invalid state. The approach is both systematic and efficient, ensuring that the solution (if it exists) is found.
