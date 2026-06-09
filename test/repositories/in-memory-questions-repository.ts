import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attatchments-repository'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Array<Question> = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

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
    const question = this.items.findIndex((item) => item.id === questionId)

    this.items.splice(question, 1)

    await this.questionAttachmentsRepository.deleteManyByQuestionId(questionId)
  }

  async save(question: Question): Promise<Question> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    if (questionIndex >= 0) {
      this.items[questionIndex] = question
    }

    return Promise.resolve(question)
  }

  async findManyRecent(params: PaginationParams): Promise<Array<Question>> {
    const { page } = params

    const questions = this.items
      .sort((a, b) => b!.createdAt!.getTime() - a!.createdAt!.getTime())
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(questions)
  }
}
