import { Repository } from 'typeorm';

import { QuestionsService } from './questions.service';
import { compileTestQuestionModule } from './helpers/testHelpers';
import { Question } from './entities';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';

describe('QuestionsService', () => {
  let questionService: QuestionsService;
  let questionRepository: Repository<Question>;

  beforeEach(async () => {
    const questionModule = await compileTestQuestionModule();

    questionRepository = questionModule.questionRepository;
    questionService = questionModule.questionService;
  });

  describe('create', () => {
    it('should call create with dto and after save that', async () => {
      const inputData: CreateQuestionDto = {
        likes: 0,
        dislikes: 0,
        text: 'test question',
        authorId: 'test_author_id',
        answers: [],
      };
      const responseData = {
        id: 1,
        ...inputData,
      };

      (questionRepository.create as jest.Mock).mockImplementation(
        () => responseData,
      );
      (questionRepository.save as jest.Mock).mockResolvedValue('ok');

      const response = await questionService.create(inputData);

      expect(questionRepository.create).toHaveBeenCalledWith(inputData);
      expect(questionRepository.save).toHaveBeenCalledWith(responseData);
      expect(response).toEqual('ok');
    });
  });

  describe('findAll', () => {
    it('should call find method', () => {
      questionService.findAll();

      expect(questionRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call update wth right params', async () => {
      const testData: UpdateQuestionDto = {
        likes: 0,
        dislikes: 0,
        text: 'test question',
        answers: [],
      };

      (questionRepository.save as jest.Mock).mockResolvedValue('ok');

      const response = await questionService.update(10, testData);

      expect(questionRepository.save).toHaveBeenCalledWith({
        id: 10,
        ...testData,
      });
      expect(response).toEqual('ok');
    });
  });

  describe('remove', () => {
    it('should call delete method and return its value', async () => {
      (questionRepository.delete as jest.Mock).mockImplementation(() => 'ok');

      const response = await questionService.remove(10);

      expect(questionRepository.delete).toHaveBeenCalledWith(10);
      expect(response).toEqual('ok');
    });
  });

  it('should call dislike method and return value', async () => {
    const testQuestion = {
      id: 1,
      likes: 0,
      dislikes: 0,
      text: 'test question',
      authorId: 'test_author_id',
      answers: [],
      author: {
        id: 'test_id',
        name: 'test_name',
        answers: [],
        questions: [],
      },
    };

    jest.spyOn(questionRepository, 'findOne').mockResolvedValue(testQuestion);
    (questionRepository.save as jest.Mock).mockResolvedValue('ok');

    const response = await questionService.dislike(1);

    expect(questionRepository.findOne).toHaveBeenCalledWith(1);
    expect(questionRepository.save).toHaveBeenCalledWith({
      ...testQuestion,
      dislikes: testQuestion.dislikes + 1,
    });
    expect(response).toEqual('ok');
  });

  it('should call like method and return value', async () => {
    const testQuestion = {
      id: 1,
      likes: 0,
      dislikes: 0,
      text: 'test question',
      authorId: 'test_author_id',
      answers: [],
      author: {
        id: 'test_id',
        name: 'test_name',
        answers: [],
        questions: [],
      },
    };

    jest.spyOn(questionRepository, 'findOne').mockResolvedValue(testQuestion);
    (questionRepository.save as jest.Mock).mockResolvedValue('ok');

    const response = await questionService.like(1);

    expect(questionRepository.findOne).toHaveBeenCalledWith(1);
    expect(questionRepository.save).toHaveBeenCalledWith({
      ...testQuestion,
      likes: testQuestion.likes + 1,
    });
    expect(response).toEqual('ok');
  });
});
