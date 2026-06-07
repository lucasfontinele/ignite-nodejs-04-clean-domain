import { WatchedList } from '@/core/entities/watched-list'
import type { QuestionAttatchment } from './question-attatchment'

export class QuestionAttatchmentList extends WatchedList<QuestionAttatchment> {
  compareItems(a: QuestionAttatchment, b: QuestionAttatchment): boolean {
    return a.attatchmentId.equals(b.attatchmentId)
  }
}
