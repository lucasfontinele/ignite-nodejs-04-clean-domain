import type { Answer } from '@/domain/forum/enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'

interface FindQuestionAnswersUseCaseRequest {
  page: number
}

interface FindQuestionsAnswersUseCaseResponse {
  answers: Array<Answer>
}

export class FindQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(
    questionId: string,
    { page }: FindQuestionAnswersUseCaseRequest,
  ): Promise<FindQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return {
      answers,
    }
  }
}
