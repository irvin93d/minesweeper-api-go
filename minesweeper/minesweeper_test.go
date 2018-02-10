package minesweeper

import (
	"math/rand"
	"testing"
)

var iterations = 100

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
			for _, p := range cartesian(g.rows, g.cols) {
				if g.minefield[p.r][p.c].mine {
					count++
				}
			}
			if g.mines != mines || count != mines {
				t.Fail()
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
