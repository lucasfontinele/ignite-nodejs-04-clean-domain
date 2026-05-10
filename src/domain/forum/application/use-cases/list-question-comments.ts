import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface ListQuestionCommentsRequest {
  page: number
}

interface ListQuestionCommentsResponse {
  questionComments: Array<QuestionComment>
}

export class ListQuestionComments {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute(
    questionId: string,
    { page }: ListQuestionCommentsRequest,
  ): Promise<ListQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
