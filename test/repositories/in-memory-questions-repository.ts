import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Array<Question> = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id === id)

    if (!question) {
      return null
    }

    return Promise.resolve(question)
  }

  async delete(questionId: string): Promise<void> {
    const question = await this.items.findIndex(
      (item) => item.id === questionId,
    )

    this.items.splice(question, 1)
  }
}
