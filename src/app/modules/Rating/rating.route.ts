import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { RatingController } from './rating.controller';
import { RatingValidation } from './rating.validation';
const router = Router();

router
  .route('/')
  .post(
    auth('admin', 'user'),
    validateRequest(RatingValidation.createRatingValidationSchema),
    RatingController.createRating,
  )
  .get(RatingController.fetchAllRatings);

router
  .route('/:id')
  .get(auth('admin', 'user'), RatingController.fetchSingleRating);

export const ratingRouter = router;
