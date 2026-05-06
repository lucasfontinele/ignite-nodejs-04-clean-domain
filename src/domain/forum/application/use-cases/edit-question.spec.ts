import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    vi.spyOn(inMemoryQuestionsRepository, 'findById')
    vi.spyOn(inMemoryQuestionsRepository, 'save')

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
      title: 'Edited Question',
      content: 'Edited Question Content',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(inMemoryQuestionsRepository?.items[0]?.title).toEqual(
      'Edited Question',
    )
    expect(inMemoryQuestionsRepository?.items[0]?.content).toEqual(
      'Edited Question Content',
    )
    expect(inMemoryQuestionsRepository.findById).toHaveBeenCalledWith(
      newQuestionId,
    )
    expect(inMemoryQuestionsRepository.save).toHaveBeenCalledWith(newQuestion)
  })

  it('should not be able to edit a question with wrong author', async () => {
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
