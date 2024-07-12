import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { ApiError } from '../../utils';
import { IBrand } from './brand.interface';
import Brand from './brand.model';

// New brand create into database
const saveBrandIntoDB = async (payload: IBrand) => {
  const isExistsBrandName = await Brand.isBrandNameExists(payload.name);

  if (isExistsBrandName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand name already exists');
  }

  const result = await Brand.create(payload);

  return result;
};

// Get a single brand by id
const getSingleBrandFromDB = async (id: string) => {
  const result = await Brand.findById(id);
  return result;
};

// Get all brand form database
const getAllBrandFromDB = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(Brand.find(), query)
    .search(['name', 'origin'])
    .filter()
    .sort()
    .paginate()

  const result = await brandQuery.modelQuery;
  const meta = await brandQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteBrandFromDB = async (id: string) => {
  const result = await Brand.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand not found');
  }

  return result;
};

export const BrandService = {
  saveBrandIntoDB,
  getSingleBrandFromDB,
  getAllBrandFromDB,
  deleteBrandFromDB,
};
