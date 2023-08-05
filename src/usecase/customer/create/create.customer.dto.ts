import Address from "../../../domain/customer/value-object/address";

export interface InputCreateCustomerDto{
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    }
}

export interface OutputCreateCustomerDto{
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    }
}