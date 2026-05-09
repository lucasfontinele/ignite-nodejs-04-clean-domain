import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(id: string): Promise<void>
  save(answer: Answer): Promise<Answer>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
}
