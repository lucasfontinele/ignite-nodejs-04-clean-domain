import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { right, type Either } from '@/core/either'

interface ListAnswerCommentsRequest {
  page: number
}

type ListAnswerCommentsResponse = Either<
  null,
  { answerComments: Array<AnswerComment> }
>

export class ListAnswerComments {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute(
    questionId: string,
    { page }: ListAnswerCommentsRequest,
  ): Promise<ListAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
