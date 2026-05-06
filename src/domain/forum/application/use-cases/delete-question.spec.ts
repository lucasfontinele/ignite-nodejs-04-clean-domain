import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    vi.spyOn(inMemoryQuestionsRepository, 'findById')
    vi.spyOn(inMemoryQuestionsRepository, 'delete')

    const newQuestionId = new UniqueEntityID('question-1').toString()
    const { question: newQuestion } = await makeQuestion(
      {
        slug: Slug.create('question-1'),
      },
      newQuestionId,
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionsRepository.findById).toHaveBeenCalledWith(
      newQuestionId,
    )
    expect(inMemoryQuestionsRepository.delete).toHaveBeenCalledWith(
      newQuestionId,
    )
  })

  it('should not be able to delete a question with wrong author', async () => {
    const newQuestionId = new UniqueEntityID('question-1').toString()
    const { question: newQuestion } = await makeQuestion(
      {
        slug: Slug.create('question-1'),
      },
      newQuestionId,
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: new UniqueEntityID('author-2').toString(),
        questionId: newQuestion.id,
      }),
    ).rejects.toThrow('You are not the author of this question')
  })
})
