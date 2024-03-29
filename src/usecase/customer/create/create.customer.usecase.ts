import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CreateCustomerUseCase{
    private customerRespository: CustomerRepositoryInterface;

    constructor(customerRespository: CustomerRepositoryInterface) {
        this.customerRespository = customerRespository;
    }

    async execute (input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>{
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city
            )
        );

        await this.customerRespository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.Address.street,
              city: customer.Address.city,
              number: customer.Address.number,
              zip: customer.Address.zip,
            },
          };
    }
}