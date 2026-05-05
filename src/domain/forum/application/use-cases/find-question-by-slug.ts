import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'

interface FindQuestionBySlugUseCaseRequest {
  slug: string
}

interface FindQuestionBySlugUseCaseResponse {
  question: Question
}

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}
