import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttatchmentProps {
  title: string
  link: string
  parentId: string
  parentType: 'question' | 'answer'
}

export class Attatchment extends Entity<AttatchmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttatchmentProps, id?: UniqueEntityID) {
    const attatchment = new Attatchment(props, id)

    return attatchment
  }
}
