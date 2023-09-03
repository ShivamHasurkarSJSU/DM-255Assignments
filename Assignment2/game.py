import tkinter as tk
import random

class Game:
    def __init__(self):
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
        self.score_X = 0
        self.score_O = 0
        self.root = tk.Tk()
        self.root.title("Tic Tac Toe")
        self.game_mode = tk.StringVar(value="PvP")  # Default game mode is Player vs Player
        tk.Label(self.root, text="Choose game mode:", font=('Arial', 12)).grid(row=0, column=0, columnspan=3)
        tk.Radiobutton(self.root, text="Player vs Player", variable=self.game_mode, value="PvP").grid(row=1, column=0)
        tk.Radiobutton(self.root, text="Player vs Computer", variable=self.game_mode, value="PvC").grid(row=1, column=2)
        self.turn_label = tk.Label(self.root, text=f"Player {self.current_player}'s Turn", font=('Ariel', 20))
        self.turn_label.grid(row=4, column=0, columnspan=3)
        self.score_label_X = tk.Label(self.root, text=f"Player X: {self.score_X}", font=('Ariel', 20))
        self.score_label_X.grid(row=2, column=0)
        self.score_label_O = tk.Label(self.root, text=f"Player O: {self.score_O}", font=('Ariel', 20))
        self.score_label_O.grid(row=2, column=2)
        self.create_board()
        self.play_again_button = tk.Button(self.root, text='Play Again', font=('Arial', 15), command=self.play_again)
        self.play_again_button.grid(row=3, column=0, columnspan=3)
        self.play_again_button.config(state='disabled')

    def create_board(self, start_row=5):
        self.buttons = []
        for i in range(3):
            row = []
            for j in range(3):
                button = tk.Button(self.root, text=' ', font=('Arial', 20), width=10, height=5,
                                command=lambda i=i, j=j: self.handle_click(i, j))
                button.grid(row=i + start_row, column=j)  # Add the starting row to the grid placement
                row.append(button)
            self.buttons.append(row)

    def disable_board(self):
        for i in range(3):
            for j in range(3):
                self.buttons[i][j].config(state='disabled')

    def reset_board(self):
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        for i in range(3):
            for j in range(3):
                self.buttons[i][j].config(text=' ', state="normal")
        self.current_player = 'X'
        self.turn_label.config(text=f"Player {self.current_player}'s Turn")
        self.play_again_button.config(state='disabled')

    def update_score(self):
        if self.current_player == 'X':
            self.score_X += 1
            self.score_label_X.config(text=f"Player X: {self.score_X}")
        else:
            self.score_O += 1
            self.score_label_O.config(text=f"Player O: {self.score_O}")


    def minimax(self, board, depth, maximizing):
        if self.check_win('X'):
            return -10 + depth
        if self.check_win('O'):
            return 10 - depth
        if self.check_draw():
            return 0

        if maximizing:
            max_eval = float('-inf')
            for i in range(3):
                for j in range(3):
                    if board[i][j] == ' ':
                        board[i][j] = 'O'
                        eval = self.minimax(board, depth + 1, False)
                        board[i][j] = ' '
                        max_eval = max(max_eval, eval)
            return max_eval
        else:
            min_eval = float('inf')
            for i in range(3):
                for j in range(3):
                    if board[i][j] == ' ':
                        board[i][j] = 'X'
                        eval = self.minimax(board, depth + 1, True)
                        board[i][j] = ' '
                        min_eval = min(min_eval, eval)
            return min_eval


    def computer_move(self):
        max_eval = float('-inf')
        best_move = None
        for i in range(3):
            for j in range(3):
                if self.board[i][j] == ' ':
                    self.board[i][j] = 'O'
                    eval = self.minimax(self.board, 0, False)
                    self.board[i][j] = ' '
                    if eval > max_eval:
                        max_eval = eval
                        best_move = (i, j)
        if best_move:
            self.update_board(*best_move)

    def check_win(self, player):
        for i in range(3):
            if self.board[i][0] == self.board[i][1] == self.board[i][2] == player:
                return True
            if self.board[0][i] == self.board[1][i] == self.board[2][i] == player:
                return True
        if self.board[0][0] == self.board[1][1] == self.board[2][2] == player:
            return True
        if self.board[0][2] == self.board[1][1] == self.board[2][0] == player:
            return True
        return False

    def check_draw(self):
        for i in range(3):
            for j in range(3):
                if self.board[i][j] == ' ':
                    return False
        return True

    def update_board(self, row, col):
        self.board[row][col] = self.current_player
        self.buttons[row][col].config(text=self.current_player, state='disabled')
        if self.check_win(self.current_player):
            self.turn_label.config(text=f"Player {self.current_player} won")
            self.update_score()
            self.disable_board()  # Disable the board
            self.play_again_button.config(state='normal')
        elif self.check_draw():
            self.turn_label.config(text=f"It'a a draw!")
            self.disable_board()  # Disable the board
            self.play_again_button.config(state='normal')
        else:
            self.current_player = 'O' if self.current_player == 'X' else 'X'
            self.turn_label.config(text=f"Player {self.current_player}'s Turn")
            if self.game_mode.get() == "PvC" and self.current_player == 'O':
                self.computer_move()

    def handle_click(self, row, col):
        if self.board[row][col] == ' ':
            self.update_board(row, col)

    def play_again(self):
        self.reset_board()

if __name__ == '__main__':
    game = Game()
    game.root.mainloop()
