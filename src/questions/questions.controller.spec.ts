import { QuestionsController } from './questions.controller';
import { QuestionsService } from './services/questions.service';
import { compileTestQuestionModule } from './helpers/testHelpers';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';

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
        answers: [],
      };

      jest.spyOn(questionsService, 'create').mockResolvedValue('ok' as never);

      const response = await questionsController.create(inputData);

      expect(questionsService.create).toHaveBeenCalledWith(inputData);
      expect(response).toEqual('ok');
    });
  });

  describe('findAll', () => {
    it('should call findAll method and return value', async () => {
      jest
        .spyOn(questionsService, 'findAll')
        .mockResolvedValue(['ok', 'ok'] as never);

      const response = await questionsController.findAll();

      expect(questionsService.findAll).toHaveBeenCalled();
      expect(response).toEqual(['ok', 'ok']);
    });
  });

  describe('update', () => {
    it('should call update method and return value', async () => {
      const inputData: UpdateQuestionDto = {
        likes: 0,
        dislikes: 0,
        text: 'test question',
        answers: [],
      };

      jest.spyOn(questionsService, 'update').mockResolvedValue('ok' as never);

      const response = await questionsService.update(10, inputData);

      expect(questionsService.update).toHaveBeenCalledWith(10, inputData);
      expect(response).toEqual('ok');
    });
  });

  describe('remove', () => {
    it('should call remove method and return value', async () => {
      jest.spyOn(questionsService, 'remove').mockResolvedValue('ok' as never);

      const response = await questionsService.remove(10);

      expect(questionsService.remove).toHaveBeenCalledWith(10);
      expect(response).toEqual('ok');
    });
  });
});
