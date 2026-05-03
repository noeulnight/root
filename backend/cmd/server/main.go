package main

import (
	"log"
	"net/http"

	"github.com/noeulnight/root/backend/internal/config"
	"github.com/noeulnight/root/backend/internal/server"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	handler, err := server.New(cfg)
	if err != nil {
		log.Fatal(err)
	}

	addr := ":" + cfg.Port
	log.Printf("backend listening on %s", addr)
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal(err)
	}
}
