import { Schema, model } from "mongoose"
import { TFacility } from "./facility.interface"

const facilitySchema = new Schema<TFacility>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true
    },
    rules: {
        type: [String],
        required: true
    },
    nearbyFacilities: {
        type: [String],
        required: true
    },
    contactInfo: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

export const Facility = model<TFacility>('Facility', facilitySchema)