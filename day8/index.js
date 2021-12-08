// Day 8
// https://adventofcode.com/2021/day/8

const { readFileSync } = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

const t0 = performance.now()

// Read input file
// Split by comma
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split('\n')

  // Parse into { input: [], output: [] }
  .map(string => string.split(' | ').map(s => s.split(' ')))
  .map(([input, output]) => ({ input, output }))

// Part 1

const t1 = performance.now()

let sum = 0

for (const { output } of input) {
  for (const segment of output) {
    if (segment.length.toString().match(/[2347]/)) {
      sum++
    }
  }
}

console.log(`Part 1: ${sum}`)

const t2 = performance.now()

// Part 2

const decode = input => {
  let one = input.find(s => s.length === 2)
  let four = input.find(s => s.length === 4)
  let seven = input.find(s => s.length === 3)
  let eight = input.find(s => s.length === 7)

  let sixLong = input.filter(s => s.length === 6)
  let nine = sixLong.find(
    s =>
      four.split('').every(x => s.includes(x)) &&
      four.split('').every(x => s.includes(x))
  )
  let zero = sixLong.find(
    s => one.split('').every(x => s.includes(x)) && s !== nine
  )
  let six = sixLong.find(s => s !== zero && s !== nine)

  /*
     aaaa 
    b    c <--
    b    c <--
     dddd 
    e    f
    e    f
     gggg 
  */
  let c = eight.split('').find(x => !six.includes(x))

  let fiveLong = input.filter(s => s.length === 5)
  let three = fiveLong.find(s => s.includes(one[0]) && s.includes(one[1]))
  let two = fiveLong.find(s => s.includes(c) && s !== three)
  let five = fiveLong.find(s => s !== three && s !== two)

  return [zero, one, two, three, four, five, six, seven, eight, nine]
    .map((value, index) => ({ digit: value, value: index }))
    .sort((a, b) => a.digit.length - b.digit.length)
}

sum = 0

for (const { output, input: encodedInput } of input) {
  const lookUp = decode(encodedInput)
  let string = output
    .map(s => {
      for (const { digit, value } of lookUp) {
        if (
          digit
            .split('')
            .sort()
            .join(',') ===
          s
            .split('')
            .sort()
            .join(',')
        ) {
          return value
        }
      }
    })
    .join('')
  sum += +string
}

console.log(`Part 2: ${sum}`)

const t3 = performance.now()

console.log(`Parsing: ${(t1 - t0).toLocaleString()}ms`)
console.log(`Part 1: ${(t2 - t1).toLocaleString()}ms`)
console.log(`Part 2: ${(t3 - t2).toLocaleString()}ms`)
