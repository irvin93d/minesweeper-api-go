package main

import (
	"log"
	"net/http"
)

func main() {

	router := NewRouter()

	addr := ":8080"
	log.Printf("Magic happens on localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, router))
}
