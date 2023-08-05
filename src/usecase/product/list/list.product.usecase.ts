import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InpuListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private ProductRespository: ProductRepositoryInterface;

    constructor(ProductRespository: ProductRepositoryInterface) {
        this.ProductRespository = ProductRespository;
    }

    async execute(input: InpuListProductDto): Promise<OutputListProductDto> {
        const Products = await this.ProductRespository.findAll();
        return OutputMapper.toOutput(Products);
    }
}

class OutputMapper {
    static toOutput(Product: Product[]): OutputListProductDto{
        return {
            products: Product.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}