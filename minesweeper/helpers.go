package minesweeper

type point struct {
	r int
	c int
}

func cartesian(rows, cols int) []point {
	if rows < 0 || cols < 0 {
		panic("Negative parameter.")
	}
	ps := make([]point, rows*cols)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			i := r*cols + c
			ps[i].r = r
			ps[i].c = c
		}
	}
	return ps
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
