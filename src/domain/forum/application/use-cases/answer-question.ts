import { Answer } from '@/domain/forum/enterprise/entities/answer'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: instructorId,
      questionId,
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
