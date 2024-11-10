import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidationSchema } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import auth from '../../middlewares/auth';



const router = express.Router();

router.post(
  '/',
  auth("admin"),
  // validateRequest(FacilityValidationSchema.CreateValidationSchema),
  FacilityControllers.createFacility,
);


router.put(
  '/:id',
  auth("admin"),
  validateRequest(
    FacilityValidationSchema.UpdateValidationSchema
  ),
  FacilityControllers.updateFacility,
);

router.get('/', 
  // auth("admin", "user"), 
  FacilityControllers.getAllFacilities);

router.get('/:id', 
  // auth("admin", "user"), 
  FacilityControllers.getSingleFacility);

router.delete('/:id', auth("admin"), FacilityControllers.deleteFacility);

export const FacilityRoutes = router;