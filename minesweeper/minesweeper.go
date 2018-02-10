package minesweeper

import (
	"encoding/json"
	"math/rand"
)

var MinSize = 3
var MaxSize = 100

type cell struct {
	mine        bool
	surrounding int
	flagged     bool
	open        bool
}

// Game is an instance of a minesweeper game
type Game struct {
	minefield [][]cell
	won       bool
	lost      bool
	Cells     [][]string `json:"cells"`
	Status    string     `json:"status"`
	Rows      int        `json:"rows"`
	Cols      int        `json:"cols"`
	Mines     int        `json:"mines"`
}

// NewGame generates a new minesweeper of type Game
func NewGame(rows, cols, mines int) *Game {
	if rows < MinSize || cols < MinSize {
		panic("Minefield too small. Minimum is 3x3")
	}
	if rows > MaxSize || cols > MaxSize {
		panic("Minefield too big. Maximum is 100x100")
	}
	g := new(Game)
	g.Rows, g.Cols, g.Mines, g.Status = rows, cols, mines, "Playing"

	g.initMinefield()
	return g
}

func (g *Game) initMinefield() {
	g.minefield = make([][]cell, g.Rows)
	for row := 0; row < g.Rows; row++ {
		g.minefield[row] = make([]cell, g.Cols)
	}

	g.Cells = make([][]string, g.Rows)
	for row := 0; row < g.Rows; row++ {
		g.Cells[row] = make([]string, g.Cols)
		for col := range g.Cells[row] {
			g.Cells[row][col] = "Closed"
		}
	}

	g.generateMines()
	g.setSurrounding()
}

func (g *Game) generateMines() {
	if g.Mines < 1 && g.Mines > g.Rows*g.Cols {
		panic("Invalid number of mines.")
	}

	ps := cartesian(g.Rows, g.Cols)
	perm := rand.Perm(len(ps))
	for i := 0; i < g.Mines; i++ {
		p := ps[perm[i]]
		g.minefield[p.r][p.c].mine = true
	}
}

func (g *Game) setSurrounding() {
	for _, p := range cartesian(g.Rows, g.Cols) {
		if g.isMine(p) {
			g.incSurrounding(p)
		}
	}
}

func (g *Game) incSurrounding(p point) {
	for r := max(p.r-1, 0); r < min(p.r+2, g.Rows); r++ {
		for c := max(p.c-1, 0); c < min(p.c+2, g.Cols); c++ {
			if r != p.r || c != p.c {
				g.minefield[r][c].surrounding++
			}
		}
	}
}

func (g *Game) isMine(p point) bool {
	return g.minefield[p.r][p.c].mine
}

func (g *Game) Json() string {
	b, err := json.Marshal(g)
	if err != nil {
		panic(err)
	}
	return (string(b))
}
