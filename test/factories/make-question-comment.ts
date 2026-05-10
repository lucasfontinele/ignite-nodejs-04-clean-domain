import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { QuestionCommentProps } from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: string,
) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityID(faker.string.uuid()),
      authorId: new UniqueEntityID(faker.string.uuid()),
      content: faker.lorem.sentence(),
      ...override,
    },
    id ? new UniqueEntityID(id) : undefined,
  )
}
