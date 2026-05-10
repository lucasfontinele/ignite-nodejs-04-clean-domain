import type { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionsCommentsRepository {
  public items: Array<QuestionComment> = []

  async create(question: QuestionComment): Promise<void> {
    this.items.push(question)
  }
}
