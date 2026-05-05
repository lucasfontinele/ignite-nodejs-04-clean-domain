import { InMemoryQuestionsRepository } from './../../../../../test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
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
})
