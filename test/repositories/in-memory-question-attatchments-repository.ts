import type { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attatchments-repository'
import type { QuestionAttatchment } from '@/domain/forum/enterprise/entities/question-attatchment'

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: Array<QuestionAttatchment> = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<Array<QuestionAttatchment>> {
    const questionAttatchments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttatchments
  }
}
