import { WatchedList } from '@/core/entities/watched-list'
import type { AnswerAttatchment } from './answer-attatchment'

export class AnswerAttatchmentList extends WatchedList<AnswerAttatchment> {
  compareItems(a: AnswerAttatchment, b: AnswerAttatchment): boolean {
    return a.attatchmentId.equals(b.attatchmentId)
  }
}
