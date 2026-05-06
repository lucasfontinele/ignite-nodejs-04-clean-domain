import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    vi.spyOn(inMemoryAnswersRepository, 'findById')
    vi.spyOn(inMemoryAnswersRepository, 'save')

    const newAnswerId = new UniqueEntityID('answer-1').toString()
    const { answer: newAnswer } = await makeAnswer({}, newAnswerId)

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id,
      content: 'Edited Answer Content',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
    expect(inMemoryAnswersRepository?.items[0]?.content).toEqual(
      'Edited Answer Content',
    )
    expect(inMemoryAnswersRepository.findById).toHaveBeenCalledWith(newAnswerId)
    expect(inMemoryAnswersRepository.save).toHaveBeenCalledWith(newAnswer)
  })

  it('should not be able to edit an answer with wrong author', async () => {
    const newAnswerId = new UniqueEntityID('answer-1').toString()
    const { answer: newAnswer } = await makeAnswer({}, newAnswerId)

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: new UniqueEntityID('author-2').toString(),
        answerId: newAnswer.id,
      }),
    ).rejects.toThrow('You are not the author of this answer')
  })
})
