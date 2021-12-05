// Day 4
// https://adventofcode.com/2021/day/4

const { readFileSync } = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

const t0 = performance.now()

// Read input file
// Split by newlines
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split('\n\n')

// First line is the numbers to draw, so .shift()
// Then we split and turn into numbers
const draws = input
  .shift()
  .split(',')
  .map(s => Number(s))

// A board is something like this
/*
[
  [{ value: 1, marked: false }, {...}, {...}, {...}, {...}],
  [...],
  [...],
  [...],
  [...],
]
*/
const boards = input.map(string =>
  string.split('\n').map(column =>
    column
      .trim()
      .split(/ +/g)
      .map(number => ({
        value: Number(number.trim()),
        marked: false
      }))
  )
)

const t1 = performance.now()

// Part 1

// Mutate the marked value of the number, shouldn't've done this smh
const markNumber = (board, target) => {
  for (const column of board) {
    const number = column.find(x => x.value === target && !x.marked)
    if (number !== undefined) {
      number.marked = true
      return number
    }
  }
}

const checkForWin = board => {
  // Check horizontal
  for (const column of board) {
    if (column.every(x => x.marked)) {
      return true
    }
  }
  // Check vertical
  for (let i = 0; i < 5; i++) {
    if (board.every(column => column[i].marked)) {
      return true
    }
  }

  return false
}

// Yeah get the first winning board
const getWinningBoard = (boards, draws) => {
  for (const draw of draws) {
    for (const board of boards) {
      const number = markNumber(board, draw)
      if (checkForWin(board)) {
        return { board, number }
      }
    }
  }
}

// Scoping this because part 2 uses similar variables im too lazy to rename
{
  const { board, number } = getWinningBoard(boards, draws)
  // Sum up unmarked numbers, ignore ugly reduce code
  const unmarkedNumbers = board.reduce(
    (sum, column) =>
      sum + column.reduce((acc, n) => (!n.marked ? acc + n.value : acc), 0),
    0
  )
  console.log(`Part 1: ${number.value * unmarkedNumbers}`)
}

// Part 2

// I forgot to unmark/reset the numbers fml
// 3 for loops, nice.
for (const board of boards) {
  for (const column of board) {
    for (const number of column) {
      number.marked = false
    }
  }
}

// Remove boards that win first until last one wins
const getLastWinningBoard = (boards, draws) => {
  for (const draw of draws) {
    let number
    for (const board of boards) {
      number = markNumber(board, draw)
    }
    // If it's the last board and has win
    if (boards.length === 1 && checkForWin(boards[0])) {
      return { board: boards[0], number }
    }
    // Filter out boards with wins
    boards = boards.filter(board => !checkForWin(board))
  }
}

// Since part 1 is scoped, why not scope this too
{
  const { board, number } = getLastWinningBoard(boards, draws)
  // Sum up unmarked numbers, ignore ugly reduce code
  const unmarkedNumbers = board.reduce(
    (sum, column) =>
      sum + column.reduce((acc, n) => (!n.marked ? acc + n.value : acc), 0),
    0
  )
  console.log(`Part 2: ${number.value * unmarkedNumbers}`)
}

const t2 = performance.now()

console.log(`Parsing: ${(t1 - t0).toLocaleString()}ms`)
console.log(`Part 1 & 2: ${(t2 - t0).toLocaleString()}ms`)
