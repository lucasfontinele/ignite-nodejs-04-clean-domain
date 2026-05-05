import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  async create() {
    // Simulate saving the answer to a database
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'This is an answer to the question.',
  })

  expect(answer.content).toEqual('This is an answer to the question.')
  expect(answer.authorId.toString()).toEqual('instructor-1')
  expect(answer.questionId.toString()).toEqual('question-1')
})
