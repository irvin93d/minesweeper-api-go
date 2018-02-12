package main

import (
	"net/http"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"NewGame",
		"POST",
		"/api/minesweeper",
		CreateGame,
	},
	Route{
		"UpdateGame",
		"PUT",
		"/api/minesweeper",
		UpdateGame,
	},
	Route{
		"GetGame",
		"GET",
		"/api/minesweeper",
		GetGame,
	},
	Route{
		"OptionsGame",
		"OPTIONS",
		"/api/minesweeper",
		OptionsGame,
	},
}
