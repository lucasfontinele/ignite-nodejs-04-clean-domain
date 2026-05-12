import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FindQuestionAnswersUseCase } from './find-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FindQuestionAnswersUseCase

describe('FindQuestionAnswersUseCase', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FindQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should list recent answers paginated', async () => {
    const question = makeQuestion({
      createdAt: new Date(2022, 0, 20),
    }).question

    await inMemoryQuestionsRepository.create(question)

    const answersData = [
      makeAnswer({ questionId: question.id }),
      makeAnswer({ questionId: question.id }),
      makeAnswer({ questionId: question.id }),
    ]

    for (const answerData of answersData) {
      await inMemoryAnswersRepository.create(answerData.answer)
    }

    const result = await sut.execute(question.id.toString(), {
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeTruthy()
  })

  it('should paginate recent questions correctly', async () => {
    const { question } = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ createdAt: new Date(2022, 0, i), questionId: question.id })
          .answer,
      )
    }

    const result = await sut.execute(question.id.toString(), {
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value!.answers.length).toEqual(2)
  })
})
