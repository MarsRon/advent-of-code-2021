// Day 7
// https://adventofcode.com/2021/day/7

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

const getFuelUsage = (numbers, position) => {
  let fuelUsage = 0
  for (const n of numbers) {
    fuelUsage += Math.abs(n - position)
  }
  return fuelUsage
}

const getLowestFuelUsage = (numbers, getFuelUsage) => {
  const allFuelUsage = []
  for (let i = Math.min(...numbers); i <= Math.max(...numbers); i++) {
    const fuelUsage = getFuelUsage(numbers, i)
    allFuelUsage.push(fuelUsage)
  }
  return Math.min(...allFuelUsage)
}

console.log(`Part 1: ${getLowestFuelUsage(input, getFuelUsage)}`)

const t2 = performance.now()

const getFuelUsagePart2 = (numbers, position) => {
  let fuelUsage = 0
  for (const n of numbers) {
    const diff = Math.abs(n - position)
    fuelUsage += 0.5 * diff * (diff + 1)
  }
  return fuelUsage
}

// Part 2

console.log(`Part 2: ${getLowestFuelUsage(input, getFuelUsagePart2)}`)

const t3 = performance.now()

console.log(`Parsing: ${(t1 - t0).toLocaleString()}ms`)
console.log(`Part 1: ${(t2 - t1).toLocaleString()}ms`)
console.log(`Part 2: ${(t3 - t2).toLocaleString()}ms`)
