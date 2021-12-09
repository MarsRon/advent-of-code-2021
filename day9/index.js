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

  // Parse into 2D array
  .map(string => string.split('').map(s => +s))

// Part 1

const t1 = performance.now()

const comparePoints = (a, b) => a < (b ?? Number.MAX_SAFE_INTEGER)

const getLowPoints = map => {
  const lowPoints = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (
        comparePoints(map[y][x], map[y - 1]?.[x]) &&
        comparePoints(map[y][x], map[y]?.[x + 1]) &&
        comparePoints(map[y][x], map[y + 1]?.[x]) &&
        comparePoints(map[y][x], map[y]?.[x - 1])
      ) {
        lowPoints.push({ y, x })
      }
    }
  }
  return lowPoints
}

// +1 for risk value
let sum = getLowPoints(input).reduce((a, c) => a + input[c.y][c.x] + 1, 0)

console.log(`Part 1: ${sum}`)

const t2 = performance.now()

// Part 2

// this kinda uses dfs
const getBasin = (map, y, x) => {
  let size = 0

  const stack = []
  stack.push({ y, x })

  const visited = Array.from(Array(map.length), () =>
    Array(map[0].length).fill(false)
  )

  const isValid = (y, x) => {
    if (
      y < 0 ||
      x < 0 ||
      y >= map.length ||
      x >= map[0].length ||
      visited[y][x] ||
      map[y][x] === 9
    )
      return false
    return true
  }

  while (stack.length !== 0) {
    const current = stack[stack.length - 1]
    stack.pop()
    let { y, x } = current

    if (isValid(y, x)) {
      visited[y][x] = true
      size += 1
      // Push all the adjacent cells
      for (let i = 0; i < 4; i++) {
        stack.push({
          y: y + [0, 1, 0, -1][i],
          x: x + [-1, 0, 1, 0][i]
        })
      }
    }
  }

  return size
}

const lowPoints = getLowPoints(input)
const basinSizes = lowPoints.map(p => getBasin(input, p.y, p.x))
const threeLargestBasinSizes = basinSizes.sort((a, b) => b - a).slice(0, 3)
const part2 = threeLargestBasinSizes.reduce((a, c) => a * c, 1)

console.log(`Part 2: ${part2}`)

const t3 = performance.now()

console.log(`Parsing: ${(t1 - t0).toLocaleString()}ms`)
console.log(`Part 1: ${(t2 - t1).toLocaleString()}ms`)
console.log(`Part 2: ${(t3 - t2).toLocaleString()}ms`)
