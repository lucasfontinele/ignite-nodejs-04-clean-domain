import type { Answer } from '@/domain/forum/enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'
import { right, type Either } from '@/core/either'

interface FindQuestionAnswersUseCaseRequest {
  page: number
}

type FindQuestionsAnswersUseCaseResponse = Either<
  null,
  {
    answers: Array<Answer>
  }
>

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

    return right({
      answers,
    })
  }
}
