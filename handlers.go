package gosweeper

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/irvin93d/gosweeper/minesweeper"
)

//w.Header().Set("Access-Control-Allow-Origin", "*")
//w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
//w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
var game *minesweeper.Game

type Field struct {
	Row    int    `json:"row"`
	Col    int    `json:"col"`
	Rows   int    `json:"rows"`
	Cols   int    `json:"cols"`
	Mines  int    `json:"mines"`
	Action string `json:"action"`
}

type createJson struct {
	Rows  int `json:"rows"`
	Cols  int `json:"cols"`
	Mines int `json:"mines"`
}

func middle(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		next.ServeHTTP(w, r)
	})
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Index")
}

func CreateGame(w http.ResponseWriter, r *http.Request) {
	var data createJson
	var err error
	if r.Body == nil {
		err = errors.New("Missing body")
	} else if err = json.NewDecoder(r.Body).Decode(&data); err != nil {
		log.Print("heey")
	} else if data.Cols == 0 || data.Cols > 100 {
		err = errors.New("Missing field: cols")
	} else if data.Rows == 0 || data.Rows > 100 {
		err = errors.New("Missing field: rows")
	} else if data.Mines == 0 || data.Mines >= data.Cols*data.Rows {
		err = errors.New("Missing field: mines")
	}
	if err != nil {
		log.Print(err)
		http.Error(w, err.Error(), 400)
		return
	}
	game = minesweeper.NewGame(data.Rows, data.Cols, data.Mines)
	fmt.Fprintln(w, game.Json())
}

func GetGame(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, game.Json())
}

func UpdateGame(w http.ResponseWriter, r *http.Request) {
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	var f Field
	err := json.NewDecoder(r.Body).Decode(&f)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	log.Print(f.Action)
	switch f.Action {
	case "open":
		game.OpenCell(f.Row, f.Col)
	case "flag":
		game.FlagCell(f.Row, f.Col)
	case "unflag":
		game.UnflagCell(f.Row, f.Col)
	}
	fmt.Fprintln(w, game.Json())
}

func OptionsGame(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w)
}
