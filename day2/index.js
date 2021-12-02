// Day 2
// https://adventofcode.com/2021/day/2

const { readFileSync } = require('fs')
const path = require('path')

// Read input file
// Split by newlines
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath)
  .toString()
  .trim() // remove final newline
  .split('\n')

  // Map into objects with instruction and step
  .map(string => string.split(' '))
  .map(array => ({
    instruction: array[0],
    step: Number(array[1]) // Don't forget to make it a number
  }))

// Part 1

let horizontalPosition = 0
let depth = 0

for (const { instruction, step } of input) {
  switch (instruction) {
    // Add to horizontal position
    case 'forward': {
      horizontalPosition += step
      break
    }
    // Up will decrease depth
    case 'up': {
      depth -= step
      break
    }
    // Down will increase depth
    case 'down': {
      depth += step
      break
    }
  }
}

console.log(`Part 1: ${horizontalPosition * depth}`)

// Part 2

// Reset variables
let aim = 0
horizontalPosition = 0
depth = 0

for (const { instruction, step } of input) {
  switch (instruction) {
    case 'forward': {
      horizontalPosition += step
      depth += aim * step
      break
    }
    // Up will decrease depth
    case 'up': {
      aim -= step
      break
    }
    // Down will increase depth
    case 'down': {
      aim += step
      break
    }
  }
}

console.log(`Part 2: ${horizontalPosition * depth}`)

// I forgot to add "break" to the switch statement
// that slowed me down quite a lot lol
