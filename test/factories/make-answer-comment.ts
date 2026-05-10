import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  type AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override?: Partial<AnswerCommentProps>,
  id?: string,
) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.sentence(),
      ...override,
    },
    id ? new UniqueEntityID(id) : undefined,
  )
}
