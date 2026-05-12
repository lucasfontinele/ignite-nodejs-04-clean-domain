import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { right, type Either } from '@/core/either'

interface ListQuestionCommentsRequest {
  page: number
}

type ListQuestionCommentsResponse = Either<
  null,
  {
    questionComments: Array<QuestionComment>
  }
>

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

    return right({
      questionComments,
    })
  }
}
