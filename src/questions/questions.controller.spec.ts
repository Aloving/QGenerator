import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { compileTestQuestionModule } from './helpers/testHelpers';
import {
  CreateQuestionDto,
  GetRandomQuestionDto,
  UpdateQuestionDto,
} from './dto';

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;

  beforeEach(async () => {
    const questionModule = await compileTestQuestionModule();

    questionsController = questionModule.questionController;
    questionsService = questionModule.questionService;
  });

  describe('create', () => {
    it('should call create method and return value', async () => {
      const inputData: CreateQuestionDto = {
        likes: 0,
        dislikes: 0,
        text: 'test question',
        authorId: 'test_author_id',
        answers: [],
      };

      jest.spyOn(questionsService, 'create').mockResolvedValue('ok' as never);

      const response = await questionsController.create(inputData);

      expect(questionsService.create).toHaveBeenCalledWith(inputData);
      expect(response).toEqual('ok');
    });
  });

  it('should call findAll method and return value', async () => {
    jest
      .spyOn(questionsService, 'findAll')
      .mockResolvedValue(['ok', 'ok'] as never);

    const response = await questionsController.findAll();

    expect(questionsService.findAll).toHaveBeenCalled();
    expect(response).toEqual(['ok', 'ok']);
  });

  it('should call update method and return value', async () => {
    const inputData: UpdateQuestionDto = {
      likes: 0,
      dislikes: 0,
      text: 'test question',
      answers: [],
    };

    jest.spyOn(questionsService, 'update').mockResolvedValue('ok' as never);

    const response = await questionsController.update('10', inputData);

    expect(questionsService.update).toHaveBeenCalledWith(10, inputData);
    expect(response).toEqual('ok');
  });

  it('should call remove method and return value', async () => {
    jest.spyOn(questionsService, 'remove').mockResolvedValue('ok' as never);

    const response = await questionsController.remove('10');

    expect(questionsService.remove).toHaveBeenCalledWith(10);
    expect(response).toEqual('ok');
  });

  it('should call like method and return value', async () => {
    jest.spyOn(questionsService, 'like').mockResolvedValue('ok' as never);

    const response = await questionsController.like(10);

    expect(questionsService.like).toHaveBeenCalledWith(10);
    expect(response).toEqual('ok');
  });

  it('should call dislike method and return value', async () => {
    jest.spyOn(questionsService, 'dislike').mockResolvedValue('ok' as never);

    const response = await questionsController.dislike(10);

    expect(questionsService.dislike).toHaveBeenCalledWith(10);
    expect(response).toEqual('ok');
  });

  it('should call dislike method and return value', async () => {
    const inputData: GetRandomQuestionDto = {
      excludeQuestionIds: [],
    };

    jest.spyOn(questionsService, 'generate').mockResolvedValue('ok' as never);

    const response = await questionsController.generateQuestion(inputData);

    expect(questionsService.generate).toHaveBeenCalledWith([]);
    expect(response).toEqual('ok');
  });
});
