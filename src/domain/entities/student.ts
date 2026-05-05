import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface StudentProps {
  name: string
  createdAt: Date
  updatedAt?: Date | undefined
}

export class Student extends Entity<Optional<StudentProps, 'createdAt'>> {
  get name() {
    return this.props.name
  }

  protected constructor(
    props: Optional<StudentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    super(props, id)
  }

  static create(
    props: Optional<StudentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const student = new Student(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: props?.updatedAt ?? undefined,
      },
      id,
    )

    return student
  }
}
