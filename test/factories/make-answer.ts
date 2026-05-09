import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Answer,
  type AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer(override?: Partial<AnswerProps>, id?: string) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(faker.string.uuid()).toValue(),
      questionId: new UniqueEntityID(faker.string.uuid()).toValue(),
      content: faker.lorem.text(),
      ...override,
    },
    id ? new UniqueEntityID(id) : undefined,
  )

  return { answer }
}
