import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { QuestionCommentProps } from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override?: Partial<QuestionCommentProps>,
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
