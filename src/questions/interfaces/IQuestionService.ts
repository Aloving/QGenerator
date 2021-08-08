import { Question, QuestionData } from "../entities";
import { ICrudQuestionService } from "./ICrudQuestionService";
import { IQuestionProposalsService } from "./IQuestionProposalsService";

export interface IQuestionService
  extends ICrudQuestionService,
    IQuestionProposalsService {
  randomize(
    excludeIds: Question["id"][]
  ): Promise<{
    excludeIds: Question["id"][];
    question: Question;
  }>;
  increaseLikes(id: Question["id"]): Promise<Question>;
  decreaseLikes(id: Question["id"]): Promise<Question>;
  increaseDislikes(id: Question["id"]): Promise<Question>;
  decreaseDislikes(id: Question["id"]): Promise<Question>;
}
