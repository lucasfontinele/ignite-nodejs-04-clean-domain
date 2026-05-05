import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FindQuestionBySlugUseCase } from './find-question-by-slug'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FindQuestionBySlugUseCase

describe('FindQuestionBySlugUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should find a question by its slug', async () => {
    const newQuestion = Question.create({
      title: 'How to learn NodeJS?',
      content:
        "I want to learn NodeJS, but I don't know where to start. Any tips?",
      authorId: new UniqueEntityID('author-1'),
      slug: Slug.create('how-to-learn-nodejs'),
      createdAt: new Date(),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'how-to-learn-nodejs',
    })

    expect(question.authorId).toEqual(newQuestion.authorId)
    expect(question.content).toEqual(newQuestion.content)
    expect(question.slug).toEqual(newQuestion.slug)
  })
})
