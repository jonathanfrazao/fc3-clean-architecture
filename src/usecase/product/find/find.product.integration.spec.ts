import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequilize.addModels([ProductModel]);
        await sequilize.sync();
    })

    afterEach(async () => {
        await sequilize.close();
    })

    describe("Product type a", () => {

        const product = ProductFactory.create("a", "Produto 1", 10.0);
        
        const input = {
            id: product.id,
        }

        const output  = {
            id: product.id,
            name: "Produto 1",
            price: 10
        }

        it("should find a Product", async() => {
            const productRepository = new ProductRepository();
            const usecase = new FindProductUseCase(productRepository);

            await productRepository.create(<Product>product);

            const result = await usecase.execute(input)
    
            expect(result).toEqual(output);
        });

        it("should not find a product", async() => {
            const productRepository = new ProductRepository();
            const usecase = new FindProductUseCase(productRepository);

            await productRepository.create(<Product>product);

            input.id = "ABC123"

            expect(() => {return usecase.execute(input)}).rejects.toThrow("Product not found")
        });
    });

    describe("Product type b", () => {

        const product = ProductFactory.create("b", "Produto 1", 10.0);
        
        const input = {
            id: product.id,
        }

        const output  = {
            id: product.id,
            name: "Produto 1",
            price: 20
        }

        it("should find a Product", async() => {
            const productRepository = new ProductRepository();
            const usecase = new FindProductUseCase(productRepository);

            await productRepository.create(<Product>product);

            const result = await usecase.execute(input)
    
            expect(result).toEqual(output);
        });

        it("should not find a product", async() => {
            const productRepository = new ProductRepository();
            const usecase = new FindProductUseCase(productRepository);

            await productRepository.create(<Product>product);

            input.id = "ABC123"

            expect(() => {return usecase.execute(input)}).rejects.toThrow("Product not found")
        });
    });
});