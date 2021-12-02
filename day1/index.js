// Day 1
// https://adventofcode.com/2021/day/1

const { readFileSync } = require('fs')
const path = require('path')

// Read input file
// Split by newlines
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split('\n')

  // Turn string into numbers
  .map(string => Number(string))

// Part 1

const largerThanPrevious = []

// i starts from 1 to omit first measurement, start from second
for (let i = 1; i < input.length; i++) {
  // If current is larger than previous, count it
  if (input[i] > input[i - 1]) {
    largerThanPrevious.push(input[i])
  }
}

console.log(`Part 1: ${largerThanPrevious.length}`)

// Part 2

// All sums
const sums = []

for (let i = 0; i < input.length; i++) {
  // Break if not enough measurement to sum
  if (i + 2 >= input.length) break

  // Get i, i+1, i+2
  const sum = input[i] + input[i + 1] + input[i + 2]
  sums.push(sum)
}

// Increased sum
const largerThanPreviousSum = []

// i starts from 1 to omit first measurement, start from second
for (let i = 1; i < sums.length; i++) {
  // If current is larger than previous, count it
  if (sums[i] > sums[i - 1]) {
    largerThanPreviousSum.push(sums[i])
  }
}

console.log(`Part 2: ${largerThanPreviousSum.length}`)
