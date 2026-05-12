import { Answer } from '@/domain/forum/enterprise/entities/answer'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { right, type Either } from '@/core/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, Answer>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: instructorId,
      questionId,
    })

    await this.answersRepository.create(answer)

    return right(answer)
  }
}
