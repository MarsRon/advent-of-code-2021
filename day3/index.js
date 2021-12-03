// Day 3
// https://adventofcode.com/2021/day/3

const { readFileSync } = require('fs')
const path = require('path')

// Read input file
// Split by newlines
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split('\n')

  // Map each character into array of numbers
  .map(string => string.split('').map(char => Number(char)))

// Part 1

const getGamma = input => {
  let gamma = ''
  for (let i = 0; i < input[0].length; i++) {
    const ones = input.filter(bitString => bitString[i] === 1)
    // if ones are more common than zeros
    if (ones.length > input.length / 2) {
      gamma += '1'
    } else {
      gamma += '0'
    }
  }
  return parseInt(gamma, 2)
}

// Basically opposite of gamma
const getEpsilon = input => {
  let epsilon = ''
  for (let i = 0; i < input[0].length; i++) {
    const ones = input.filter(bitString => bitString[i] === 1)
    // if ones are more common than zeros
    if (ones.length > input.length / 2) {
      epsilon += '0'
    } else {
      epsilon += '1'
    }
  }
  return parseInt(epsilon, 2)
}

console.log(`Part 1: ${getGamma(input) * getEpsilon(input)}`)

// Part 2

const getO2 = (input, i = 0) => {
  const ones = input.filter(bits => bits[i] === 1)
  const zeros = input.filter(bits => bits[i] === 0)
  const filtered = ones.length >= zeros.length ? ones : zeros
  return filtered.length !== 1
    ? getO2(filtered, i + 1)
    : parseInt(filtered[0].join(''), 2)
}

const getCO2 = (input, i = 0) => {
  const ones = input.filter(bits => bits[i] === 1)
  const zeros = input.filter(bits => bits[i] === 0)
  const filtered = ones.length < zeros.length ? ones : zeros
  return filtered.length !== 1
    ? getCO2(filtered, i + 1)
    : parseInt(filtered[0].join(''), 2)
}

console.log(`Part 2: ${getO2(input) * getCO2(input)}`)
