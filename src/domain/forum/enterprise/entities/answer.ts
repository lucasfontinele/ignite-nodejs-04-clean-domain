import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { AnswerAttatchmentList } from './answer-attatchment-list'

export interface AnswerProps {
  content: string
  authorId: string
  questionId: string
  attatchments: AnswerAttatchmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get attatchments() {
    return this.props.attatchments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    if (content.length > 2400) {
      throw new Error('Invalid content length.')
    }

    this.props.content = content
    this.touch()
  }

  set attatchments(attatchments: AnswerAttatchmentList) {
    this.props.attatchments = attatchments
    this.touch()
  }

  protected constructor(props: AnswerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        attatchments: props.attatchments || new AnswerAttatchmentList(),
        createdAt: new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )

    return answer
  }
}
