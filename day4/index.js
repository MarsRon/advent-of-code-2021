// Day 4
// https://adventofcode.com/2021/day/4

const { readFileSync } = require('fs')
const path = require('path')

// Read input file
// Split by newlines
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim() // remove final newline
  .split('\n\n')

// first line is the numbers to draw
// use hacky JSON.parse, turn into array
const draws = JSON.parse(`[${input.shift()}]`)

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

// Part 1

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
  for (const column of board) {
    if (column.every(x => x.marked)) {
      return true
    }
  }
  for (let i = 0; i < 5; i++) {
    if (board.every(column => column[i].marked)) {
      return true
    }
  }
  return false
}

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

{
  const { board, number } = getWinningBoard(boards, draws)
  const unmarkedNumbers = board.reduce(
    (acc, cur) => acc + cur.reduce((a, c) => (!c.marked ? a + c.value : a), 0),
    0
  )
  console.log(`Part 1: ${number.value * unmarkedNumbers}`)
}

// Part 2

const getLastWinningBoard = (boards, draws) => {
  boards = [...boards]
  for (const draw of draws) {
    let number
    for (const board of boards) {
      number = markNumber(board, draw)
    }
    if (boards.length === 1 && checkForWin(boards[0])) {
      return { board: boards[0], number }
    }
    boards = boards.filter(board => !checkForWin(board))
  }
}

{
  const { board, number } = getLastWinningBoard(boards, draws)
  const unmarkedNumbers = board.reduce(
    (acc, cur) => acc + cur.reduce((a, c) => (!c.marked ? a + c.value : a), 0),
    0
  )
  console.log(`Part 2: ${number.value * unmarkedNumbers}`)
}
