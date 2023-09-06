**Tic-Tac-Toe Game in Python with Tkinter**

**Overview**

This repository contains the code for a simple Tic-Tac-Toe game implemented using Python and Tkinter. The game provides two modes:
1. Player vs Player (PvP) - Two players can play against each other.
2. Player vs Computer (PvC) - A single player can play against the computer. The computer uses the Minimax algorithm to make its moves.

**Features**
1. Graphical User Interface (GUI) using Tkinter.
2. Two game modes: Player vs Player and Player vs Computer.
3. Score tracking for each player.
4. Option to play again without restarting the application.


**ScreenShot**

![image](https://github.com/ShivamHasurkarSJSU/DM-255Assignments/assets/143695709/5231ec41-70ce-4bce-82a5-39df18ec4a02)

![image](https://github.com/ShivamHasurkarSJSU/DM-255Assignments/assets/143695709/f8bd24ee-7a35-45a0-a850-55132bae4bb0)

**Installation and Setup**
1. Clone the repository or download the code.
2. Make sure you have Python installed on your system.
3. Run the script to start the game.

**Code Structure**

**Classes:**
Game -
This is the main class containing all game logic and UI components.

**Methods:**
1. __init__: Initializes variables, sets up the Tkinter UI.
2. create_board: Creates the 3x3 Tic-Tac-Toe board using Tkinter buttons.
3. disable_board: Disables all the buttons on the board, usually after a game ends.
4. reset_board: Resets the board for a new game.
5. update_score: Updates the score based on who won.
6. minimax: Implements the Minimax algorithm for computer moves.
7. computer_move: Determines the best move for the computer.
8. check_win: Checks if a player has won the game.
9. check_draw: Checks if the game is a draw.
10. update_board: Updates the board after a move.
11. handle_click: Handles a button click event on the board.
12. play_again: Resets the board for a new game.

**Running the Game**
Initialize the Game class.
Start the Tkinter event loop.

**How to Play**
1. Choose a game mode: Player vs Player or Player vs Computer.
2. Click on the grid to place your symbol ('X' or 'O').
3. The game will declare a winner or a draw, and you can choose to play again.

**Future Enhancements**
1. Add difficulty levels for Player vs Computer mode.
2. Implement a leaderboard to track scores across multiple sessions.
3. Add multiplayer support over a network.

I have used gpt-engineer - https://github.com/AntonOsika/gpt-engineer to generate the basic code and then imporvise the code with help of Github co-pilot and ChatGPT-4.
Video link - With the process of how I built this project entirely (https://drive.google.com/file/d/1dOz-P7NiOv_H8wsZHtW6mxu0iAUE0aEn/view?usp=drivesdk)
