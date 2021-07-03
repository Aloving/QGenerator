import { PartialType } from '@nestjs/mapped-types';
import { OfferQuestionDto } from './offer-question.dto';

export class OfferAnswerDto extends PartialType(OfferQuestionDto) {}
