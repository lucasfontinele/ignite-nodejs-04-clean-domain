import { expect, test } from 'vitest'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  async create() {
    // Simulate saving the question to a database
  },
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: 'author-1',
    title: 'This is a question',
    content: 'This is the content of the question.',
  })

  expect(question.title).toEqual('This is a question')
  expect(question.content).toEqual('This is the content of the question.')
  expect(question.authorId.toString()).toEqual('author-1')
  expect(question.id).toBeTruthy()
})
