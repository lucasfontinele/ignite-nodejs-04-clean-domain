import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerAttatchmentProps {
  answerId: UniqueEntityID
  attatchmentId: UniqueEntityID
}

export class AnswerAttatchment extends Entity<AnswerAttatchmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attatchmentId() {
    return this.props.attatchmentId
  }

  static create(props: AnswerAttatchmentProps, id?: UniqueEntityID) {
    const answerAttatchment = new AnswerAttatchment(props, id)

    return answerAttatchment
  }
}
