import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attatchments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question: newQuestion } = await makeQuestion()

    const result = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      title: newQuestion.title,
      content: newQuestion.content,
      attatchmentsIds: ['1', '2'],
    })

    expect(result.value!.question.title).toEqual(newQuestion.title)
    expect(result.value!.question.content).toEqual(newQuestion.content)
    expect(result.value!.question.authorId.toString()).toEqual(
      newQuestion.authorId.toString(),
    )
    expect(result.value!.question.id).toBeTruthy()
    expect(
      inMemoryQuestionsRepository.items[0]?.attatchments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0]?.attatchments.currentItems,
    ).toEqual([
      expect.objectContaining({ attatchmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attatchmentId: new UniqueEntityID('2') }),
    ])
  })
})
