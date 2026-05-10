import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { ListQuestionComments } from './list-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: ListQuestionComments

describe('ListQuestionComments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new ListQuestionComments(inMemoryQuestionCommentsRepository)
  })

  it('should list recent answers paginated', async () => {
    const { question } = makeQuestion({
      createdAt: new Date(2022, 0, 20),
    })

    const answersData = [
      makeQuestionComment({ questionId: new UniqueEntityID(question.id) }),
      makeQuestionComment({ questionId: new UniqueEntityID(question.id) }),
      makeQuestionComment({ questionId: new UniqueEntityID(question.id) }),
    ]

    for (const answerData of answersData) {
      await inMemoryQuestionCommentsRepository.create(answerData)
    }

    const { questionComments } = await sut.execute(question.id.toString(), {
      page: 1,
    })

    expect(questionComments.length).toEqual(3)
    expect(question.id.toString()).toEqual(
      questionComments[0]?.questionId.toString(),
    )
  })

  it('should paginate recent questions correctly', async () => {
    const { question } = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          createdAt: new Date(2022, 0, i),
          questionId: new UniqueEntityID(question.id),
        }),
      )
    }

    const { questionComments } = await sut.execute(question.id.toString(), {
      page: 2,
    })

    expect(questionComments.length).toEqual(2)
  })
})
