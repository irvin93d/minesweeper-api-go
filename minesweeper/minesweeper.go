package minesweeper

import (
	"math/rand"
)

var MinSize = 3
var MaxSize = 100

type status int16

const (
	open status = iota
	closed
	flagged
)

type cell struct {
	mine        bool
	surrounding int
	status      status
}

// Game is an instance of a minesweeper game
type Game struct {
	minefield [][]cell
	rows      int
	cols      int
	mines     int
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

func (g *Game) initMinefield() {
	g.minefield = make([][]cell, g.rows)
	for row := 0; row < g.rows; row++ {
		g.minefield[row] = make([]cell, g.cols)
	}
	// set all closed

	g.generateMines()

	// generate surrounding size
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

	// TODO Generate list of tuples
	// TODO Grab an fill random tuples
}
