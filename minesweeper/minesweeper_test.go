package minesweeper

import (
	"math/rand"
	"testing"
)

var iterations = 1000

func TestGenerateMines(t *testing.T) {

	t.Run("Expect panic on too many mines", func(t *testing.T) {
		testTimes(t, iterations, func(t *testing.T) {
			rows := randInt(MinSize, MaxSize)
			cols := randInt(MinSize, MaxSize)
			// All mines
			NewGame(rows, cols, rows*cols)
			// Too many mines
			assertPanic(t, func() {
				NewGame(rows, cols, rows*cols+1)
			})
		})
	})

	t.Run("Expect correct number of mines", func(t *testing.T) {
		testTimes(t, iterations, func(t *testing.T) {
			rows := randInt(MinSize, MaxSize)
			cols := randInt(MinSize, MaxSize)
			mines := randInt(1, rows*cols)
			g := NewGame(rows, cols, mines)
			count := 0
			for _, p := range cartesian(g.Rows, g.Cols) {
				if g.minefield[p.r][p.c].mine {
					count++
				}
			}
			if g.Mines != mines || count != mines {
				t.Fail()
			}
		})
	})
	t.Run("Expect correct number of surrounding mines", func(t *testing.T) {
		testTimes(t, iterations, func(t *testing.T) {
			rows := randInt(MinSize, MaxSize)
			cols := randInt(MinSize, MaxSize)
			mines := randInt(1, rows*cols)
			g := NewGame(rows, cols, mines)
			for _, p := range cartesian(g.Rows, g.Cols) {
				minc := max(p.c-1, 0)
				minr := max(p.r-1, 0)
				maxc := min(p.c+2, g.Cols)
				maxr := min(p.r+2, g.Rows)
				count := 0
				for r := minr; r < maxr; r++ {
					for c := minc; c < maxc; c++ {
						if g.minefield[r][c].mine && (c != p.c || r != p.r) {
							count++
						}
					}
				}
				if count != g.minefield[p.r][p.c].surrounding {
					t.Fail()
				}
			}
		})
	})
}

func testTimes(t *testing.T, times int, f func(*testing.T)) {
	for it := 0; it < times; it++ {
		f(t)
	}
}

func assertPanic(t *testing.T, f func()) {
	defer func() {
		if r := recover(); r == nil {
			t.Fail()
		}
	}()
	f()
}

func randInt(min, max int) int {
	return rand.Int()%(max-min) + min
}
