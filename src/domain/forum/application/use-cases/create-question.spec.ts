import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question: newQuestion } = await makeQuestion()

    const result = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      title: newQuestion.title,
      content: newQuestion.content,
    })

    expect(result.value!.question.title).toEqual(newQuestion.title)
    expect(result.value!.question.content).toEqual(newQuestion.content)
    expect(result.value!.question.authorId.toString()).toEqual(
      newQuestion.authorId.toString(),
    )
    expect(result.value!.question.id).toBeTruthy()
  })
})
