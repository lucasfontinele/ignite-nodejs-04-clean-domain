import type { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentsRepository {
  create(question: QuestionComment): Promise<void>
}
