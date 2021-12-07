const { readFileSync } = require('fs')
const path = require('path')
const inputFilePath = path.join(__dirname, 'input.txt')
const input = readFileSync(inputFilePath, 'utf8')
  .trim()
  .split(',')
  .map(string => +string)

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

const generation = 556
const fishVolume = 15 * 5 * 3
const totalFish = fishyfish(input, generation)
// divide by 1000000 to use meter, not cm
const totalFishVolume = BigInt(Math.round((fishVolume * totalFish) / 1_000_000))
const oceanVolume = 1_335_000_000_000_000_000n
// doing wacky stuff for percentage
const fishesOverOcean = parseInt(totalFishVolume * 100000n / oceanVolume) / 1000

console.log(`Input: ${input.join()}`)
console.log(`Generations: ${generation}`)
console.log(`Volume of 1 lantern fish: ${fishVolume / 1000000}m^3`)
console.log(`Fishes: ${totalFish.toLocaleString('fullwide')} fish`)
console.log(`Total fishes volume: ${totalFishVolume.toLocaleString('fullwide')}m^3`)
console.log(`Ocean volume: ${oceanVolume.toLocaleString('fullwide')}m^3`)
console.log(`Volume of fishes over volume of ocean: ${fishesOverOcean}%`)
