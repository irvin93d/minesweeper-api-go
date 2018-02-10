package minesweeper

import (
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
	rows      int
	cols      int
	mines     int
	won       bool
	lost      bool
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
	g.rows = rows
	g.cols = cols
	g.mines = mines

	g.initMinefield()

	return g
}

func (g *Game) print() {
	println("Heres a game")
	for r := 0; r < g.rows; r++ {
		for c := 0; c < g.cols; c++ {
			if g.minefield[r][c].mine {
				print("x ")
			} else {
				print(g.minefield[r][c].surrounding)
				print(" ")
			}
		}
		print("\n")
	}
}

func (g *Game) initMinefield() {
	g.minefield = make([][]cell, g.rows)
	for row := 0; row < g.rows; row++ {
		g.minefield[row] = make([]cell, g.cols)
	}

	g.generateMines()
	g.setSurrounding()
}

func (g *Game) generateMines() {
	if g.mines > g.rows*g.cols {
		panic("Too many mines.")
	}
	if g.mines < 1 {
		panic("Must have at least 1 mine")
	}

	ps := cartesian(g.rows, g.cols)
	perm := rand.Perm(len(ps))
	for i := 0; i < g.mines; i++ {
		p := ps[perm[i]]
		g.minefield[p.r][p.c].mine = true
	}
}

func (g *Game) setSurrounding() {
	for _, p := range cartesian(g.rows, g.cols) {
		if g.isMine(p) {
			g.incSurrounding(p)
		}
	}
}

func (g *Game) incSurrounding(p point) {
	for r := max(p.r-1, 0); r < min(p.r+2, g.rows); r++ {
		for c := max(p.c-1, 0); c < min(p.c+2, g.cols); c++ {
			if r != p.r || c != p.c {
				g.minefield[r][c].surrounding++
			}
		}
	}
}

func (g *Game) isMine(p point) bool {
	return g.minefield[p.r][p.c].mine
}
func max(a, b int) int {
	if a >= b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a <= b {
		return a
	}
	return b
}
