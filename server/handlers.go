package main

import (
	"encoding/json"
	"fmt"
	"log"
	"minesweeper-api-go/server/minesweeper"
	"net/http"
)

var game *minesweeper.Game

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Index")
}

func CreateGame(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	game = minesweeper.NewGame(15, 25, 30)
	fmt.Fprintln(w, game.Json())
}

func GetGame(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	game = minesweeper.NewGame(15, 25, 30)
	fmt.Fprintln(w, game.Json())
}

type Field struct {
	Row    int    `json:"row"`
	Col    int    `json:"col"`
	Action string `json:"action"`
}

func UpdateGame(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
	fmt.Fprintln(w)
}
