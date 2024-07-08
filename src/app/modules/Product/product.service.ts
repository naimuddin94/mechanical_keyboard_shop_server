import { Request } from 'express';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { ApiError } from '../../utils';
import { fileUploadOnCloudinary } from '../../utils/fileUploadOnCloudinary';
import Brand from '../Brand/brand.model';
import Product from './product.model';
import { productSearchableFields } from './product.utils';

// Save new product into the database
const saveProductIntoDB = async (req: Request) => {
  const productData = req.body;
  const isExistProductName = await Product.isProductNameExists(
    productData.name,
  );

  if (isExistProductName) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Product ${productData.name} already exists`,
    );
  }

  const isExistBrand = await Brand.findById(productData.brand);

  if (!isExistBrand) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid brand ID',
    );
  }

  if (req.file && req.file.buffer) {
    productData.image = await fileUploadOnCloudinary(req.file.buffer);
  }

  const result = await Product.create(productData);
  return result;
};

// Update product into the database
const updateProductIntoDB = async (id: string, req: Request) => {
  const updateData = req.body;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  if (req.file && req.file.buffer) {
    updateData.image = await fileUploadOnCloudinary(req.file.buffer);
  }

  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

// Fetch all products from the database
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find().populate('brand'), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

// Fetch single product from the database
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return result;
};

// Delete single product from the database
const deleteProductFromDB = async (id: string) => {
  const result = Product.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return result;
};

export const ProductService = {
  saveProductIntoDB,
  updateProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
