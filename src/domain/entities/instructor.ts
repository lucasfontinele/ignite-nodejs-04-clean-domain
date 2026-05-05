import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface InstructorProps {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Instructor extends Entity<InstructorProps> {
  get name() {
    return this.props.name
  }

  protected constructor(props: InstructorProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: InstructorProps, id?: UniqueEntityID) {
    const instructor = new Instructor(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )

    return instructor
  }
}
