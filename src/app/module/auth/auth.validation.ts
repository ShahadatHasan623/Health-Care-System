import z from "zod";

const PatientRegistrationZodSchema = z.object({
  name: z
    .string("Not a string")
    .min(3, "Name must atleast 3 character")
    .max(10, "Name must be atleast 10 character"),
  email: z.email("Not Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  patient: z
    .object({
      contactNumber: z.string().optional(),
    })
    .optional(),
});

export const patientValidation ={
   PatientRegistrationZodSchema
}