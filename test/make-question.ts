import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export async function makeQuestion(override?: Partial<QuestionProps>) {
  const question = Question.create({
    authorId: new UniqueEntityID('author-1'),
    title: 'This is a question',
    content: 'This is the content of the question.',
    ...override,
  })

  return { question }
}
