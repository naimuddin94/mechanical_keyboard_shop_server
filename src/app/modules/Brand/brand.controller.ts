import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { BrandService } from './brand.service';

// Create a new brand
const createBrand = asyncHandler(async (req, res) => {
  const result = await BrandService.saveBrandIntoDB(req.body);
  res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, result, 'Brand created successfully'),
    );
});

// Fetch single brand
const fetchSingleBrand = asyncHandler(async (req, res) => {
  const brandId = req.params.id;
  const result = await BrandService.getSingleBrandFromDB(brandId);
  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Brand retrieved successfully'),
    );
});

// Fetch all brand list
const fetchAllBrands = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await BrandService.getAllBrandFromDB(query);
  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Brands retrieved successfully'),
    );
});

// Delete brand by id
const deleteBrand = asyncHandler(async (req, res) => {
  const brandId = req.params.id;
  const result = await BrandService.deleteBrandFromDB(brandId);
  res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, result, 'Brand deleted successfully'));
});

export const BrandController = {
  createBrand,
  fetchSingleBrand,
  fetchAllBrands,
  deleteBrand,
};
