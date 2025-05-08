import React, { useState, useEffect } from 'react';
import '../styles/Grid.css';

// Utility function to check if placing a number is valid
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Backtracking algorithm to generate a solved Sudoku board
function generateSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) { // Empty cell
                const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of nums) {
                    if (isValid(board, i, j, num)) {
                        board[i][j] = num;
                        if (generateSudoku(board)) {
                            return true;
                        }
                        board[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true; // Solution found
}

// Helper function to shuffle an array (randomize)
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
    return arr;
}

// Function to generate Sudoku puzzle by removing numbers
function generatePuzzle(sudoku, difficulty) {
    let puzzle = JSON.parse(JSON.stringify(sudoku)); // Create a deep copy of the solved board
    let emptyCells = getEmptyCellCount(difficulty);

    while (emptyCells > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (puzzle[row][col] !== 0) { // If cell is not already empty
            puzzle[row][col] = 0;
            emptyCells--;
        }
    }

    return puzzle;
}

// Function to determine the number of empty cells based on difficulty
function getEmptyCellCount(difficulty) {
    if (difficulty === "easy") return 35; // Fewer cells empty for easy puzzles
    if (difficulty === "medium") return 45; // Moderate empty cells for medium puzzles
    if (difficulty === "hard") return 55; // More empty cells for hard puzzles
    return 40; // Default to medium
}

const Grid = ({ difficulty }) => {
    const [sudokuArr, setSudokuArr] = useState(Array(9).fill().map(() => Array(9).fill(0))); // Initialize to a 9x9 grid of 0's
    const [preFilledArr, setPreFilledArr] = useState(Array(9).fill().map(() => Array(9).fill(false))); // Track pre-filled cells

    useEffect(() => {
        // Generate a solved Sudoku grid
        let solvedSudoku = Array(9).fill().map(() => Array(9).fill(0));
        generateSudoku(solvedSudoku);

        // Generate a puzzle based on the selected difficulty
        let puzzle = generatePuzzle(solvedSudoku, difficulty);

        // Mark pre-filled cells
        let preFilled = Array(9).fill().map(() => Array(9).fill(false));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j] !== 0) {
                    preFilled[i][j] = true;
                }
            }
        }

        setSudokuArr(puzzle);
        setPreFilledArr(preFilled);
    }, [difficulty]); // Re-run when difficulty changes

    function getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function onInputChange(e, row, col) {
        let val = parseInt(e.target.value) || -1;
        let grid = getDeepCopy(sudokuArr);
        if (val === -1 || (val >= 1 && val <= 9)) {
            grid[row][col] = val;
        }
        setSudokuArr(grid);
    }

    function checkSudoku() {
        let grid = getDeepCopy(sudokuArr);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] !== 0) { // Only check non-empty cells
                    let num = grid[i][j];
                    grid[i][j] = 0;
                    if (!isValid(grid, i, j, num)) {
                        alert("Invalid Sudoku");
                        return;
                    }
                    grid[i][j] = num;
                }
            }
        }
        alert("Valid Sudoku");
    }

    function solve(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) { // Solve empty cells
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, i, j, num)) {
                            grid[i][j] = num;
                            if (solve(grid)) {
                                return true;
                            }
                            grid[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function solveSudoku() {
        let grid = getDeepCopy(sudokuArr);
        if (solve(grid)) {
            setSudokuArr(grid);
        } else {
            alert("No solution exists");
        }
    }

    function resetSudoku() {
        let solvedSudoku = Array(9).fill().map(() => Array(9).fill(0));
        generateSudoku(solvedSudoku);
        let puzzle = generatePuzzle(solvedSudoku, difficulty);
        
        // Mark pre-filled cells
        let preFilled = Array(9).fill().map(() => Array(9).fill(false));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j] !== 0) {
                    preFilled[i][j] = true;
                }
            }
        }

        setSudokuArr(puzzle);
        setPreFilledArr(preFilled);
    }

    return (
        <div className="flex-container">
            <div className="grid-wrapper">
                <table>
                    <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => (
                                <tr key={rIndex} className={(row + 1) % 3 === 0 ? "b-border" : ''}>
                                    {
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => (
                                            <td key={`${rIndex}-${cIndex}`} className={(col + 1) % 3 === 0 ? "r-border" : ''}>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="9"
                                                    maxLength={1}
                                                    onChange={(e) => onInputChange(e, row, cIndex)}
                                                    className="cell-input"
                                                    value={sudokuArr[row][cIndex] === 0 ? '' : sudokuArr[row][cIndex]} // Render blank for 0
                                                    disabled={preFilledArr[row][cIndex]} // Disable input if the cell was pre-filled
                                                />
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="button-container">
                    <button className="check-button" onClick={checkSudoku}>Check</button>
                    <button className="solve-button" onClick={solveSudoku}>Solve</button>
                    <button className="reset-button" onClick={resetSudoku}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default Grid;
