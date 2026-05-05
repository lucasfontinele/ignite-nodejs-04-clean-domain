import { makeQuestion } from 'test/make-question'

describe('Create question', () => {
  it('should be able to create a question', async () => {
    const { question } = await makeQuestion()

    expect(question.title).toEqual('This is a question')
    expect(question.content).toEqual('This is the content of the question.')
    expect(question.authorId.toString()).toEqual('author-1')
    expect(question.id).toBeTruthy()
  })
})
