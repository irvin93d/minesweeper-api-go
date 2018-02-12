package minesweeper

import (
	"encoding/json"
	"log"
	"math/rand"
	"strconv"
)

var MinSize = 3
var MaxSize = 100

type Cell struct {
	mine        bool
	surrounding int
	Flag        bool   `json:"flag"`
	Open        bool   `json:"open"`
	Content     string `json:"content"` // numeric | mine | empty
}

func (c *Cell) setContent() {
	if c.mine && c.Open {
		c.Content = "explosion"
	} else if c.mine {
		c.Content = "mine"
	} else if !c.mine && c.Flag {
		c.Content = "falsemine"
	} else {
		c.Content = strconv.Itoa(c.surrounding)
	}
}

// Game is an instance of a minesweeper game
type Game struct {
	Cells  [][]Cell `json:"cells"`
	Cols   int      `json:"cols"`
	Rows   int      `json:"rows"`
	Mines  int      `json:"mines"`
	Status string   `json:"status"`
	unopen int
}

// NewGame generates a new minesweeper of type Game
func NewGame(rows, cols, mines int) *Game {
	// Test parameters
	if rows < MinSize || cols < MinSize {
		panic("Minefield too small. Minimum is 3x3")
	}
	if rows > MaxSize || cols > MaxSize {
		panic("Minefield too big. Maximum is 100x100")
	}
	// Initialize an empty minefield
	g := new(Game)
	g.Rows, g.Cols = rows, cols
	g.Mines, g.unopen = mines, rows*cols-mines
	g.Status = "playing"
	g.Cells = make([][]Cell, g.Rows)
	for row := 0; row < g.Rows; row++ {
		g.Cells[row] = make([]Cell, g.Cols)
	}
	// Generate mines randomly
	g.generateMines()

	return g
}

func (g *Game) generateMines() {
	if g.Mines < 1 && g.Mines > g.Rows*g.Cols {
		panic("Invalid number of mines.")
	}

	ps := cartesian(g.Rows, g.Cols)
	perm := rand.Perm(len(ps))
	for i := 0; i < g.Mines; i++ {
		p := ps[perm[i]]
		g.Cells[p.r][p.c].mine = true
		g.onSurrounding(p.r, p.c, func(row, col int) {
			g.Cells[row][col].surrounding++
		})
	}
}

func (g *Game) OpenCell(row, col int) bool {
	cell := &g.Cells[row][col]
	if cell.Open || cell.Flag || g.Status != "playing" {
		return false
	}
	cell.Open = true
	cell.setContent()
	g.unopen--
	if cell.mine {
		g.Status = "lost"
		for _, row := range g.Cells {
			for _, cell := range row {
				cell.setContent()
			}
		}
	} else if cell.surrounding == 0 {
		g.onSurrounding(row, col, func(r, c int) {
			g.OpenCell(r, c)
		})
	}
	if g.unopen == 0 && !cell.mine {
		g.Status = "won"
	}
	return true
}

func (g *Game) FlagCell(row, col int) bool {
	cell := &g.Cells[row][col]
	if cell.Flag || cell.Open || g.Status != "playing" {
		return false
	}
	cell.Flag = true
	return true
}

func (g *Game) UnflagCell(row, col int) bool {
	log.Print("unFLagging")
	cell := &g.Cells[row][col]
	if !cell.Flag || cell.Open || g.Status != "playing" {
		return false
	}
	log.Print("FLaged")
	cell.Flag = false
	return true
}

func (g *Game) onSurrounding(row, col int, f func(r, c int)) {
	for r := max(row-1, 0); r < min(row+2, g.Rows); r++ {
		for c := max(col-1, 0); c < min(col+2, g.Cols); c++ {
			if r != row || c != col {
				f(r, c)
			}
		}
	}
}

func (g *Game) Json() string {
	b, err := json.Marshal(g)
	if err != nil {
		panic(err)
	}
	return (string(b))
}
