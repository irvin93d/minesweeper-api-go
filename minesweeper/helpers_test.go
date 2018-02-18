package minesweeper

import "testing"

func TestCartesian(t *testing.T) {
	t.Run("Expect panic on negative parameters", func(t *testing.T) {
		assertPanic(t, func() {
			cartesian(-1, -1)
			cartesian(0, -1)
			cartesian(-1, 0)
		})
	})
	t.Run("Expect empty output on 0 rows or cols", func(t *testing.T) {
		if ps := cartesian(0, 7); len(ps) != 0 {
			t.Fail()
		}
		if ps := cartesian(7, 0); len(ps) != 0 {
			t.Fail()
		}
	})
	t.Run("Expect length to equals rows*cols", func(t *testing.T) {
		if ps := cartesian(5, 7); len(ps) != 35 {
			t.Fail()
		}
	})
	t.Run("Expect only unique permutations", func(t *testing.T) {
		rows, cols := 5, 7
		ps := cartesian(rows, cols)
		set := make(map[point]bool)
		for _, p := range ps {
			if set[p] == true {
				t.Fail()
			}
			set[p] = true
		}
	})
	t.Run("Expect all values to be within range", func(t *testing.T) {
		rows, cols := 5, 7
		ps := cartesian(rows, cols)
		for _, p := range ps {
			if p.r < 0 || p.r >= rows || p.c < 0 || p.c >= cols {
				t.Fail()
			}
		}
	})
}
