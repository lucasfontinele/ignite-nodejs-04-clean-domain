import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Array<Question>>
  create(question: Question): Promise<void>
  delete(questionId: string): Promise<void>
  save(question: Question): Promise<Question>
}
