import { left, right, type Either } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  return shouldSuccess ? right(10) : left('failure')
}

test('success result', () => {
  const result = doSomething(true)

  if (result.isRight()) {
    console.log(result.value) // 10
  }

  expect(result.isRight()).toEqual(true)
  expect(result.isLeft()).toEqual(false)
})

test('failure result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})
