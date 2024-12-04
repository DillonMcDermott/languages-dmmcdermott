using System;

class Program
{
    static void Main(string[] args)
    {
        Game game = new Game();
        game.Start();
    }
}

class Game
{
    private Board board;
    private Player player1;
    private Player player2;
    private Player currentPlayer;

    public Game()
    {
        board = new Board();
        player1 = new Player("Player 1", 'X');
        player2 = new Player("Player 2", 'O');
        currentPlayer = player1;
    }

    public void Start()
    {
        Console.WriteLine("Welcome to Tic-Tac-Toe!");
        while (true)
        {
            board.Display();
            Console.WriteLine($"{currentPlayer.Name}'s turn. Enter row and column:");
            string[] input = Console.ReadLine().Split(' ');
            int row = int.Parse(input[0]);
            int col = int.Parse(input[1]);

            if (board.PlaceMark(row, col, currentPlayer.Mark))
            {
                if (board.CheckWinner(currentPlayer.Mark))
                {
                    board.Display();
                    Console.WriteLine($"{currentPlayer.Name} wins!");
                    break;
                }
                else if (board.IsFull())
                {
                    board.Display();
                    Console.WriteLine("It's a draw!");
                    break;
                }
                SwitchPlayer();
            }
            else
            {
                Console.WriteLine("Invalid move, try again.");
            }
        }
    }

    private void SwitchPlayer()
    {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
}

class Player
{
    public string Name { get; }
    public char Mark { get; }

    public Player(string name, char mark)
    {
        Name = name;
        Mark = mark;
    }
}

class Board
{
    private char[,] grid = new char[3, 3];

    public void Display()
    {
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                Console.Write(grid[i, j] == '\0' ? '.' : grid[i, j]);
                Console.Write(" ");
            }
            Console.WriteLine();
        }
    }

    public bool PlaceMark(int row, int col, char mark)
    {
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && grid[row, col] == '\0')
        {
            grid[row, col] = mark;
            return true;
        }
        return false;
    }

    public bool CheckWinner(char mark)
    {
        // Check rows, columns, and diagonals
        for (int i = 0; i < 3; i++)
        {
            if ((grid[i, 0] == mark && grid[i, 1] == mark && grid[i, 2] == mark) ||  // Row
                (grid[0, i] == mark && grid[1, i] == mark && grid[2, i] == mark))   // Column
                return true;
        }
        return (grid[0, 0] == mark && grid[1, 1] == mark && grid[2, 2] == mark) ||  // Diagonal
               (grid[0, 2] == mark && grid[1, 1] == mark && grid[2, 0] == mark);
    }

    public bool IsFull()
    {
        foreach (char cell in grid)
        {
            if (cell == '\0') return false;
        }
        return true;
    }
}
/*
terminal commands to build and run program:

dotnet new console -o TicTacToe
dotnet build
dotnet run
*/