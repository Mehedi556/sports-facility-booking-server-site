import QueryBuilder from "../../builder/QueryBuilder";
import { facilitySearchableFields } from "./facility.constant";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

// this service is for create facility into db
const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

// this service is for get all facilities from db
const getAllFacilitiesFromDB = async (query: Record<string, unknown>) => {

  const facilityQuery = new QueryBuilder(Facility.find(), query).search(facilitySearchableFields).filter().sort().paginate().fields();

  const result = await facilityQuery.modelQuery;
  const meta = await facilityQuery.countTotal();

  return {
    result,
    meta
  }
};

const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById({_id: id});
  return result;
};

// this service is for update facility into db
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

// this service is for soft delete facility into db
const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
      },
    );
    return result;
  };

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilitiesFromDB,
  getSingleFacilityFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB
};