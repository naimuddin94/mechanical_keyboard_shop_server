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
  const { brand, ...remainProductData } = req.body;

  // Fetch brand and check if product name exists in parallel
  const [isExistProductName, isExistBrand] = await Promise.all([
    Product.isProductNameExists(remainProductData.name),
    Brand.findById(brand),
  ]);

  if (isExistProductName) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Product ${remainProductData.name} already exists`,
    );
  }

  if (!isExistBrand) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid brand ID',
    );
  }

  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product image is required');
  }

  // Upload image to Cloudinary if it exists
  if (req.file && req.file.buffer) {
    remainProductData.image = await fileUploadOnCloudinary(req.file.buffer);
  }

  // Assign brand details
  remainProductData.brand = {
    name: isExistBrand.name,
    origin: isExistBrand.origin,
  };

  const result = await Product.create(remainProductData);
  return result;
};

// Update product into the database
const updateProductIntoDB = async (id: string, req: Request) => {
  const { brand, ...remainUpdateData } = req.body;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  if (remainUpdateData?.name) {
    const isExistsProductName = await Product.findOne({
      name: remainUpdateData?.name,
    });
    if (isExistsProductName) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already exists');
    }
  }

  if (brand) {
    const isExistBrand = await Brand.findById(brand);

    if (!isExistBrand) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
    }

    remainUpdateData.brand = {
      name: isExistBrand.name,
      origin: isExistBrand.origin,
    };
  }

  if (req.file && req.file.buffer) {
    remainUpdateData.image = await fileUploadOnCloudinary(req.file.buffer);
  }

  const result = await Product.findByIdAndUpdate(id, remainUpdateData, {
    new: true,
  });

  return result;
};

// Fetch all products from the database
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
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
  const result = await Product.findByIdAndDelete(id);
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
