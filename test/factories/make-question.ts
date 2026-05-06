import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override?: Partial<QuestionProps>, id?: string) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(faker.string.uuid()),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id ? new UniqueEntityID(id) : undefined,
  )

  return { question }
}
