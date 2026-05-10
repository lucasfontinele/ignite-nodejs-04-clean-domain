import type { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionsCommentsRepository {
  public items: Array<QuestionComment> = []

  async create(question: QuestionComment): Promise<void> {
    this.items.push(question)
  }

  async findById(id: string) {
    const questionComment = this.items.find((i) => i.id === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((i) => i.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }
}
