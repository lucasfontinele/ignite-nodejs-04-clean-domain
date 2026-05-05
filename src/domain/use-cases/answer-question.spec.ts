import { expect, test } from 'vitest';
import type { Answer } from '@/domain/entities/answer';
import type { AnswersRepository } from '@/domain/repositories/answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

const fakeAnswersRepository: AnswersRepository = {
  async create(answer: Answer) {
    // Simulate saving the answer to a database
    return;
  },
};

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'This is an answer to the question.',
  });

  expect(answer.content).toEqual('This is an answer to the question.');
  expect(answer.authorId.toString()).toEqual('instructor-1');
  expect(answer.questionId.toString()).toEqual('question-1');
});
