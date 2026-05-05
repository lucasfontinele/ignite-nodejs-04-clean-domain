import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

export interface QuestionProps {
  title: string
  bestAnswerId?: UniqueEntityID | undefined
  content: string
  slug: Slug
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<Optional<QuestionProps, 'createdAt'>> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'days') <= 3
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

  set title(title: string) {
    if (title.length > 100) {
      throw new Error('Invalid title length.')
    }

    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  setBestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  protected constructor(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    super(props, id)
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id,
    )

    return question
  }
}
