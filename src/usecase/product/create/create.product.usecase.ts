import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase{
    private productRespository: ProductRepositoryInterface;

    constructor(productRespository: ProductRepositoryInterface) {
        this.productRespository = productRespository;
    }

    async execute (input: InputCreateProductDto): Promise<OutputCreateProductDto>{
        const product = ProductFactory.create(
            input.type,
            input.name,
            input.price
        );

        await this.productRespository.create(<Product>product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
          };
    }
}