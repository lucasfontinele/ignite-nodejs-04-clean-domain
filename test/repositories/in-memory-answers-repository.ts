import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Array<Answer> = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id === id)

    return answer ? Promise.resolve(answer) : Promise.resolve(null)
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async save(answer: Answer): Promise<Answer> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    if (answerIndex >= 0) {
      this.items[answerIndex] = answer
    }

    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId === questionId)
      .slice((params.page - 1) * 20, params.page * 20)

    return answers
  }
}
