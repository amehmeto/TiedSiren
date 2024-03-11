type FizzBuzzResult = number | 'Fizz' | 'Buzz' | 'FizzBuzz'

function isMultipleOf3(a: number) {
  return a % 3 === 0
}

function isMultipleOf5(a: number) {
  return a % 5 === 0
}

export function fizzBuzz(a: number): FizzBuzzResult {
  if (isMultipleOf3(a) && isMultipleOf5(a)) return 'FizzBuzz'
  if (isMultipleOf5(a)) return 'Buzz'
  if (isMultipleOf3(a)) return 'Fizz'
  return a
}

/*

Write a program that prints one line for each number from 1 to 100
Usually just print the number itself.
For multiples of three print Fizz instead of the number
For the multiples of five print Buzz instead of the number
For numbers which are multiples of both three and five print FizzBuzz instead of the number

 */
