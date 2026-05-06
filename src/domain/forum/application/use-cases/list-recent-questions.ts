import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'

interface ListRecentQuestionsRequest {
  page: number
}

export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(request: ListRecentQuestionsRequest) {
    const { page } = request

    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return {
      questions,
    }
  }
}
