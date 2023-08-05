import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InpuListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRespository: CustomerRepositoryInterface;

    constructor(customerRespository: CustomerRepositoryInterface) {
        this.customerRespository = customerRespository;
    }

    async execute(input: InpuListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRespository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto{
        return {
            customers: customer.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city
                }
            }))
        }
    }
}