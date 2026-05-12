import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { left, right, type Either } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
  questionId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

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
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.setBestAnswerId(new UniqueEntityID(answer.id))

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
