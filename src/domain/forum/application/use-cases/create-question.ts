import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { right, type Either } from '@/core/either'
import { QuestionAttatchment } from '../../enterprise/entities/question-attatchment'
import { QuestionAttatchmentList } from '../../enterprise/entities/question-attatchment-list'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attatchmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attatchmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const attatchments = attatchmentsIds.map((id) =>
      QuestionAttatchment.create({
        questionId: new UniqueEntityID(authorId),
        attatchmentId: new UniqueEntityID(id),
      }),
    )

    question.attatchments = new QuestionAttatchmentList(attatchments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
