import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '../../enterprise/entities/question'
import { right, type Either } from '@/core/either'

interface ListRecentQuestionsRequest {
  page: number
}

type ListRecentQuestionsResponse = Either<
  null,
  {
    questions: Array<Question>
  }
>

export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    request: ListRecentQuestionsRequest,
  ): Promise<ListRecentQuestionsResponse> {
    const { page } = request

    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return right({
      questions,
    })
  }
}
