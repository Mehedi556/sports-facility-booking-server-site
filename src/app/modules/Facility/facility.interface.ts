export type TFacility = {
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    image: string;
    capacity: number;
    rules: string[];
    contactInfo: {
        name: string;
        email: string;
        phone: string;
    };
    nearbyFacilities: string[];
    isDeleted: boolean;
}