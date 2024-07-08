import { Router } from 'express';
import multer from 'multer';
import validateRequest from '../../middleware/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const upload = multer();

const router = Router();

router
  .route('/')
  .post(
    upload.single('image'),
    validateRequest(ProductValidation.createProductValidationSchema),
    ProductController.createProduct,
  )
  .get(ProductController.FetchProducts);

router
  .route('/:id')
  .patch(
    upload.single('image'),
    validateRequest(ProductValidation.updateProductValidationSchema),
    ProductController.updateProduct,
  )
  .get(ProductController.FetchSingleProduct)
  .delete(ProductController.deleteProduct);

export const productRouter = router;
