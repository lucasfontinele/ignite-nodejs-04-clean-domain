import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface QuestionAttatchmentProps {
  questionId: UniqueEntityID
  attatchmentId: UniqueEntityID
}

export class QuestionAttatchment extends Entity<QuestionAttatchmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attatchmentId() {
    return this.props.attatchmentId
  }

  static create(props: QuestionAttatchmentProps, id?: UniqueEntityID) {
    const questionAttatchment = new QuestionAttatchment(props, id)

    return questionAttatchment
  }
}
