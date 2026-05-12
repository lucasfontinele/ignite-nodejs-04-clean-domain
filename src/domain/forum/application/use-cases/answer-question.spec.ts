import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await answerQuestion.execute({
      instructorId: 'instructor-1',
      questionId: 'question-1',
      content: 'This is an answer to the question.',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value!.content).toEqual('This is an answer to the question.')
    expect(result.value!.authorId.toString()).toEqual('instructor-1')
    expect(result.value!.questionId.toString()).toEqual('question-1')
  })
})
