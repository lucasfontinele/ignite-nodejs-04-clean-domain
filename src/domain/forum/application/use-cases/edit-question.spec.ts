import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attatchments-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { makeQuestionAttatchment } from '../../../../../test/factories/make-question-attatchment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttatchmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttatchmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttatchmentsRepository,
    )
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

    const firstQuestionAttatchment = makeQuestionAttatchment({
      questionId: new UniqueEntityID(newQuestion.id),
      attatchmentId: new UniqueEntityID('1'),
    })
    const secondQuestionAttatchment = makeQuestionAttatchment({
      questionId: new UniqueEntityID(newQuestion.id),
      attatchmentId: new UniqueEntityID('2'),
    })

    inMemoryQuestionAttatchmentsRepository.items.push(
      firstQuestionAttatchment,
      secondQuestionAttatchment,
    )

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id,
      title: 'Edited Question',
      content: 'Edited Question Content',
      attatchmentsIds: ['1', '3'],
    })

    expect(
      inMemoryQuestionsRepository.items[0]?.attatchments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0]?.attatchments.currentItems,
    ).toEqual([
      expect.objectContaining({ attatchmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attatchmentId: new UniqueEntityID('3') }),
    ])

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

    const result = await sut.execute({
      authorId: new UniqueEntityID('author-2').toString(),
      questionId: newQuestion.id,
      attatchmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
