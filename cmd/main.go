package main

import (
	"log"
	"net/http"

	"github.com/irvin93d/gosweeper"
)

func main() {

	router := gosweeper.NewRouter()

	addr := ":8080"
	log.Printf("Magic happens on localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, router))
}
