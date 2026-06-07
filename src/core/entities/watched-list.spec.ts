import { WatchedList } from './watched-list'

export class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.getItems().length).toEqual(3)
  })

  it('should be able to add new items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.getItems()).toEqual([1, 2, 3, 4])
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)

    expect(list.getItems()).toEqual([1, 3])
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('should be able to add and remove the same item', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(2)
    list.remove(2)

    expect(list.getItems()).toEqual([1, 3])
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('should be able to update watched list items', () => {
    const list = new NumberWatchedList([1, 3, 5])

    list.update([1, 2, 4])

    expect(list.getItems()).toEqual([1, 2, 4])
    expect(list.getNewItems()).toEqual([2, 4])
    expect(list.getRemovedItems()).toEqual([3, 5])
  })
})
