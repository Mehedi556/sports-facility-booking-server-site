import { z } from "zod";

export const CreateValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        image: z.string(),
        description: z.string(),
        pricePerHour: z.number(),
        location: z.string(),
        capacity: z.number(),
        rules: z.array(z.string()),
        nearbyFacilities: z.array(z.string()),
        contactInfo: z.object({
            name: z.string(),
            email: z.string(),
            phone: z.string(),
        }),
        isDeleted: z.boolean().optional(),
    })
    
})

export const UpdateValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        pricePerHour: z.number().optional(),
        location: z.string().optional(),
        capacity: z.number().optional(),
        rules: z.array(z.string()).optional(),
        nearbyFacilities: z.array(z.string()).optional(),
        contactInfo: z.object({
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
        }).optional(),
        isDeleted: z.boolean().optional(),
    })
    
})

export const FacilityValidationSchema = {
    CreateValidationSchema,
    UpdateValidationSchema
}