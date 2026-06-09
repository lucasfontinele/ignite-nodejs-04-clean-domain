import { Answer } from '@/domain/forum/enterprise/entities/answer'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { right, type Either } from '@/core/either'
import { AnswerAttatchmentList } from '../../enterprise/entities/answer-attatchment-list'
import { AnswerAttatchment } from '../../enterprise/entities/answer-attatchment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
  attatchmentIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<null, Answer>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attatchmentIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: instructorId,
      questionId,
      attatchments: new AnswerAttatchmentList(),
    })

    const attatchments = attatchmentIds.map((id) =>
      AnswerAttatchment.create({
        answerId: new UniqueEntityID(questionId),
        attatchmentId: new UniqueEntityID(id),
      }),
    )

    answer.attatchments = new AnswerAttatchmentList(attatchments)

    await this.answersRepository.create(answer)

    return right(answer)
  }
}
