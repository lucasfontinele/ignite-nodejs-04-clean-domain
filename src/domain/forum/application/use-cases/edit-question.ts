import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title?: string
  content?: string
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<Question> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this question')
    }

    question.title = title ?? question.title
    question.content = content ?? question.content

    const editedQuestion = await this.questionsRepository.save(question)

    return editedQuestion
  }
}
