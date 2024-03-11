import { describe, expect, it } from 'vitest'
import { fizzBuzz } from './solveMeFirst.ts'

describe('Fizz Buzz Suite', () => {
  it.each([
    [1, 1],
    [2, 2],
    [3, 'Fizz'],
    [4, 4],
    [5, 'Buzz'],
    [6, 'Fizz'],
    [7, 7],
    [8, 8],
    [9, 'Fizz'],
    [10, 'Buzz'],
    [11, 11],
    [12, 'Fizz'],
    [13, 13],
    [14, 14],
    [15, 'FizzBuzz'],
    [16, 16],
    [17, 17],
    [18, 'Fizz'],
    [19, 19],
    [20, 'Buzz'],
  ])('should return 1', (inputNumber, expectedResult) => {
    const result = fizzBuzz(inputNumber)

    expect(result).toBe(expectedResult)
  })
})
