package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	for {
		input, err := reader.ReadString('\n')

		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		if err = run(input); err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
	}
}
func run(input string) error {
	input = strings.TrimSuffix(input, "\n")
	args := strings.Split(input, " ")

	cmd := exec.Command(args[0], args[1:]...)

	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
func must(err error) {
	if err != nil {
		panic(err)
	}
}
