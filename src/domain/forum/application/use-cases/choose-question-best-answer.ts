import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
  questionId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute(
    request: ChooseQuestionBestAnswerUseCaseRequest,
  ): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const { questionId, answerId, authorId } = request
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error(
        'Only the author of the question can choose the best answer',
      )
    }

    question.setBestAnswerId(new UniqueEntityID(answer.id))

    await this.questionsRepository.save(question)

    return { question }
  }
}
