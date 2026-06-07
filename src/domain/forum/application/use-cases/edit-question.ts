import { left, right, type Either } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionAttatchment } from '../../enterprise/entities/question-attatchment'
import { QuestionAttatchmentList } from '../../enterprise/entities/question-attatchment-list'
import type { QuestionAttachmentsRepository } from './../repositories/question-attatchments-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title?: string
  content?: string
  attatchmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Question
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
    title,
    attatchmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttatchments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttatchmentList(
      currentQuestionAttatchments,
    )

    const questionAttatchments = attatchmentsIds.map((attatchmentId) => {
      return QuestionAttatchment.create({
        questionId: new UniqueEntityID(question.id),
        attatchmentId: new UniqueEntityID(attatchmentId),
      })
    })

    questionAttachmentList.update(questionAttatchments)
    question.title = title ?? question.title
    question.content = content ?? question.content
    question.attatchments = questionAttachmentList

    const editedQuestion = await this.questionsRepository.save(question)

    return right(editedQuestion)
  }
}
