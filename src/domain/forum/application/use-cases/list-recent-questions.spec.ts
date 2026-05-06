import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ListRecentQuestionsUseCase } from './list-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ListRecentQuestionsUseCase

describe('ListRecentQuestions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should list recent questions', async () => {
    const questionsData = [
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    ]

    for (const questionData of questionsData) {
      await inMemoryQuestionsRepository.create(questionData.question)
    }

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(inMemoryQuestionsRepository.items[0]?.id.toString()).toEqual(
      questionsData[1]?.question?.id.toString(),
    )
    expect(questions.length).toEqual(3)
  })

  it('should paginate recent questions correctly', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2022, 0, i) }).question,
      )
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions.length).toEqual(2)
  })
})
