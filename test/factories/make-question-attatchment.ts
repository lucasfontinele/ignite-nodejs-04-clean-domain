import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttatchment,
  type QuestionAttatchmentProps,
} from '@/domain/forum/enterprise/entities/question-attatchment'

export function makeQuestionAttatchment(
  override?: Partial<QuestionAttatchmentProps>,
  id?: string,
) {
  return QuestionAttatchment.create(
    {
      questionId: new UniqueEntityID(),
      attatchmentId: new UniqueEntityID(),
      ...override,
    },
    id ? new UniqueEntityID(id) : undefined,
  )
}
