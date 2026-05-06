import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  title?: string
  content?: string
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<Answer> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    answer.content = content ?? answer.content

    const editedAnswer = await this.answersRepository.save(answer)

    return editedAnswer
  }
}
