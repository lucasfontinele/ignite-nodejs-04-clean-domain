import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FindQuestionBySlugUseCase } from './find-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FindQuestionBySlugUseCase

describe('FindQuestionBySlugUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should find a question by its slug', async () => {
    const { question: newQuestion } = await makeQuestion({
      slug: Slug.create('how-to-learn-nodejs'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'how-to-learn-nodejs',
    })

    expect(question.authorId.toString()).toEqual(
      newQuestion.authorId.toString(),
    )
    expect(question.content).toEqual(newQuestion.content)
    expect(question.slug).toEqual(newQuestion.slug)
  })
})
