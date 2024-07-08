import httpStatus from 'http-status';
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
const getAllBrandFromDB = async () => {
  const result = await Brand.find();
  return result;
};

const deleteBrandFromDB = async (id: string) => {
  const result = await Brand.findByIdAndDelete(id);
  return result;
};

export const BrandService = {
  saveBrandIntoDB,
  getSingleBrandFromDB,
  getAllBrandFromDB,
  deleteBrandFromDB,
};
