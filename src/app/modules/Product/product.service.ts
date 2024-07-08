import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { ApiError } from '../../utils';
import Brand from '../Brand/brand.model';
import { IProduct } from './product.interface';
import Product from './product.model';
import { productSearchableFields } from './product.utils';

// Save new product into the database
const saveProductIntoDB = async (payload: IProduct) => {
  const isExistProductName = await Product.isProductNameExists(payload.name);

  if (isExistProductName) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Product ${payload.name} already exists`,
    );
  }

  const isExistBrand = await Brand.findById(payload.brand);

  if (!isExistBrand) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid brand ID',
    );
  }

  const result = await Product.create(payload);
  return result;
};

// Update product into the database
const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
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
