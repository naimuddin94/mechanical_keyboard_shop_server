import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { ProductService } from './product.service';

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  const result = await ProductService.saveProductIntoDB(req);

  res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, result, 'Product saved successfully'),
    );
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const result = await ProductService.updateProductIntoDB(productId, req);

  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Product updated successfully'),
    );
});

// Fetch all products from the database
const FetchProducts = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await ProductService.getAllProductsFromDB(query);
  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Products retrieved successfully'),
    );
});

// Fetch single product from the database
const FetchSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const result = await ProductService.getSingleProductFromDB(productId);
  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Product retrieved successfully'),
    );
});

// Delete a product from the database
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const result = await ProductService.deleteProductFromDB(productId);

  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Product deleted successfully'),
    );
});

export const ProductController = {
  createProduct,
  updateProduct,
  FetchProducts,
  FetchSingleProduct,
  deleteProduct,
};
