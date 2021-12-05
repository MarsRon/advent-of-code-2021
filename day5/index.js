// Day 5
// https://adventofcode.com/2021/day/5

const { readFileSync } = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

const t0 = performance.now()

// Read input file
// Split by newlines
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split('\n')

  // Parse into each line { pos1: [1, 2], pos2: [5, 2] }
  .map(string => string.split(' -> '))
  .map(([pos1, pos2]) => ({
    pos1: pos1.split(',').map(n => Number(n)),
    pos2: pos2.split(',').map(n => Number(n))
  }))

const t1 = performance.now()

// Part 1

// Function from https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
const plotLine = (x0, y0, x1, y1, plot) => {
  let dx = Math.abs(x1 - x0)
  let sx = x0 < x1 ? 1 : -1
  let dy = -Math.abs(y1 - y0)
  let sy = y0 < y1 ? 1 : -1
  let err = dx + dy
  while (true) {
    plot(x0, y0)
    if (x0 == x1 && y0 == y1) break
    let e2 = 2 * err
    if (e2 >= dy) {
      err += dy
      x0 += sx
    }
    if (e2 <= dx) {
      err += dx
      y0 += sy
    }
  }
}

const countHorVerOverlaps = input => {
  const vents = new Map()

  for (const { pos1, pos2 } of input) {
    // Only horizontal and vertical line
    if (pos1[0] === pos2[0] || pos1[1] === pos2[1]) {
      plotLine(pos1[0], pos1[1], pos2[0], pos2[1], (x, y) => {
        const pointKey = `${x},${y}`
        if (vents.has(pointKey)) {
          vents.get(pointKey).overlap++
        } else {
          vents.set(pointKey, { x, y, overlap: 0 })
        }
      })
    }
  }

  return [...vents.values()].filter(point => point.overlap > 0).length
}

console.log(`Part 1: ${countHorVerOverlaps(input)}`)

const t2 = performance.now()

// Part 2

const countOverlaps = input => {
  const vents = new Map()

  for (const { pos1, pos2 } of input) {
    plotLine(pos1[0], pos1[1], pos2[0], pos2[1], (x, y) => {
      const pointKey = `${x},${y}`
      if (vents.has(pointKey)) {
        vents.get(pointKey).overlap++
      } else {
        vents.set(pointKey, { x, y, overlap: 0 })
      }
    })
  }

  return [...vents.values()].filter(point => point.overlap > 0).length
}
console.log(`Part 2: ${countOverlaps(input)}`)

const t3 = performance.now()

console.log(`Parsing: ${(t1 - t0).toLocaleString()}ms`)
console.log(`Part 1: ${(t2 - t1).toLocaleString()}ms`)
console.log(`Part 2: ${(t3 - t2).toLocaleString()}ms`)
