import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose best answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should choose the best answer for a question', async () => {
    const newAnswerId = 'answer-1'
    const newQuestionId = 'question-1'
    const authorId = 'author-1'

    const { question: questionFromFactory } = await makeQuestion(
      {
        slug: Slug.create(newQuestionId),
        authorId: new UniqueEntityID(authorId),
        bestAnswerId: new UniqueEntityID('answer-2'),
      },
      newQuestionId,
    )
    const { answer: answerFromFactory } = await makeAnswer(
      {
        authorId,
        questionId: newQuestionId,
      },
      newAnswerId,
    )

    await inMemoryQuestionsRepository.create(questionFromFactory)
    await inMemoryAnswersRepository.create(answerFromFactory)

    sut.execute({
      answerId: newAnswerId,
      authorId,
      questionId: newQuestionId,
    })

    const question = await inMemoryQuestionsRepository.findById('question-1')

    question?.setBestAnswerId(new UniqueEntityID(newAnswerId))

    expect(question?.bestAnswerId).toBe(newAnswerId)
  })

  it('should not be able to choose the best answer with wrong author', async () => {
    const newAnswerId = 'answer-1'
    const newQuestionId = 'question-1'

    const { question: questionFromFactory } = await makeQuestion(
      {
        slug: Slug.create(newQuestionId),
        authorId: new UniqueEntityID('author-1'),
      },
      newQuestionId,
    )
    const { answer: answerFromFactory } = await makeAnswer(
      {
        authorId: 'author-1',
        questionId: newQuestionId,
      },
      newAnswerId,
    )

    await inMemoryQuestionsRepository.create(questionFromFactory)
    await inMemoryAnswersRepository.create(answerFromFactory)

    const result = await sut.execute({
      answerId: newAnswerId,
      authorId: new UniqueEntityID('author-2').toString(),
      questionId: newQuestionId,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
