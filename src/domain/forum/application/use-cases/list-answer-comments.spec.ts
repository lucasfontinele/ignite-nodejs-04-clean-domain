import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { ListAnswerComments } from './list-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: ListAnswerComments

describe('ListAnswerComments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new ListAnswerComments(inMemoryAnswerCommentsRepository)
  })

  it('should list recent answers paginated', async () => {
    const { answer } = makeAnswer({
      createdAt: new Date(2022, 0, 20),
    })

    const answersData = [
      makeAnswerComment({ answerId: new UniqueEntityID(answer.id) }),
      makeAnswerComment({ answerId: new UniqueEntityID(answer.id) }),
      makeAnswerComment({ answerId: new UniqueEntityID(answer.id) }),
    ]

    for (const item of answersData) {
      await inMemoryAnswerCommentsRepository.create(item)
    }

    const result = await sut.execute(answer.id.toString(), {
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value!.answerComments.length).toEqual(3)
    expect(answer.id.toString()).toEqual(
      result.value!.answerComments[0]?.answerId.toString(),
    )
  })

  it('should paginate recent answers correctly', async () => {
    const { question } = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          createdAt: new Date(2022, 0, i),
          answerId: new UniqueEntityID(question.id),
        }),
      )
    }

    const result = await sut.execute(question.id.toString(), {
      page: 2,
    })

    expect(result.value!.answerComments.length).toEqual(2)
  })
})
