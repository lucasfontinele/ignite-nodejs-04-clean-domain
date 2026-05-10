import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface QuestionsCommentsRepository {
  create(question: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
}
