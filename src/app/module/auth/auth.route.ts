import { NextFunction, Request, Response, Router } from "express";

import { AuthController } from "./auth.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import z from "zod";
import { catchAsync } from "../../utils/catchAsync";
import { validateRequest } from "../../middleware/validatedRequest";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  //   (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const payload = req.body ?? {};
  //       const result =
  //         patientValidation.PatientRegistrationZodSchema.safeParse(payload);
  //       if (!result.success) {
  //         console.log(result.error);
  //         console.log(result.error.message);
  //         throw new Error(result.error.issues[0].message);
  //       }
  //       req.body = result.data;
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
  validateRequest(UserValidation.PatientRegistrationZodSchema),
  AuthController.registerPatient
);
router.post("/login",validateRequest(UserValidation.LoginZodSchema), AuthController.loginUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.getMe
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);

export const AuthRoutes = router;
