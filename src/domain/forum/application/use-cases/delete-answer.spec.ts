import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete an answer', async () => {
    vi.spyOn(inMemoryAnswersRepository, 'findById')
    vi.spyOn(inMemoryAnswersRepository, 'delete')

    const newAnswerId = new UniqueEntityID('answer-1').toString()
    const newAuthorId = new UniqueEntityID('author-1').toString()

    const { answer: newAnswer } = await makeAnswer(
      {
        authorId: newAuthorId,
      },
      newAnswerId,
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswerId,
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswersRepository.findById).toHaveBeenCalledWith(newAnswerId)
    expect(inMemoryAnswersRepository.delete).toHaveBeenCalledWith(newAnswerId)
  })

  it('should not be able to delete an answer if the author is not the owner', async () => {
    vi.spyOn(inMemoryAnswersRepository, 'findById')
    vi.spyOn(inMemoryAnswersRepository, 'delete')

    const newAnswerId = new UniqueEntityID('answer-1').toString()
    const newAuthorId = new UniqueEntityID('author-1').toString()

    const { answer: newAnswer } = await makeAnswer(
      {
        authorId: newAuthorId,
      },
      newAnswerId,
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswerId,
      authorId: 'author-2',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
    expect(inMemoryAnswersRepository.findById).toHaveBeenCalledWith(newAnswerId)
    expect(inMemoryAnswersRepository.delete).not.toHaveBeenCalled()
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
