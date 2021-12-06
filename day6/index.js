// Day 6
// https://adventofcode.com/2021/day/6

const { readFileSync } = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

const t0 = performance.now()

// Read input file
// Split by comma
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split(',')

  // Parse into number
  .map(string => +string)

// Part 1

const t1 = performance.now()

// Create an array with indexes representing days
// so like days[0] has the sum of fishes with internal clock at 0
// and days[6] has sum of fishes with internal clock at 6
const fishyfish = (input, times) => {
  const days = Array(9).fill(0)

  // Add sum of fishes into days
  for (const fish of input) {
    days[fish]++
  }

  // Do the simulation
  for (let i = 0; i < times; i++) {
    days.push(days.shift())
    days[6] += days[8]
  }

  // Return sum of all fishes
  return days.reduce((acc, cur) => acc + cur)
}

console.log(`Part 1: ${fishyfish(input, 80)}`)

const t2 = performance.now()

// Part 2

console.log(`Part 2: ${fishyfish(input, 256)}`)

const t3 = performance.now()

console.log(`Parsing: ${(t1 - t0).toLocaleString()}ms`)
console.log(`Part 1: ${(t2 - t1).toLocaleString()}ms`)
console.log(`Part 2: ${(t3 - t2).toLocaleString()}ms`)
