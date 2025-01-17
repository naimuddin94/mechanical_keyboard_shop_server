import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BrandController } from './brand.controller';
import { BrandValidation } from './brand.validation';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(BrandValidation.createBandValidationSchema),
    BrandController.createBrand,
  )
  .get(BrandController.fetchAllBrands);

router
  .route('/:id')
  .get(BrandController.fetchSingleBrand)
  .delete(BrandController.deleteBrand);

router.route('fetch-by-name/:name').get(BrandController.fetchSingleBrandByName);

export const brandRouter = router;
