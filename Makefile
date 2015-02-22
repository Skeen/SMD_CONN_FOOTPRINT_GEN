.PHONY: all run gen

all: run

build/output.js: SMD_pad_gen.ts
	tsc -out build/output.js SMD_pad_gen.ts

run: build/output.js
	node build/output.js test 10 2

gen: build/output.js
	mkdir -p output/
	node SMD_pad_run.js 40 1.27
	node SMD_pad_run.js 40 2
	node SMD_pad_run.js 40 2.54
