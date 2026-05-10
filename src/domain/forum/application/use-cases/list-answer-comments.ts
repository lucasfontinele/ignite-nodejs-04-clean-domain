import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

interface ListAnswerCommentsRequest {
  page: number
}

interface ListAnswerCommentsResponse {
  answerComments: Array<AnswerComment>
}

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

    return {
      answerComments,
    }
  }
}
