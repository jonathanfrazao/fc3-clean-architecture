import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test Update product use case", () => {
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
            name: "Product 1 update",
            price: 20
        }

        it("should update a product", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(<Product>product);
            const usecase = new UpdateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            expect(output).toEqual(input);
        })

        it("should throw an error when price is less than 0", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(<Product>product);
            const usecase = new UpdateProductUseCase(productRepository);
    
            input.price = -1;
    
            await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
        });

        it("should thrown an error when name is missing", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(<Product>product);
            const usecase = new UpdateProductUseCase(productRepository);
    
            input.name = ""
    
            await expect(usecase.execute(input)).rejects.toThrow("product: Name is required");
        });
    });

    describe("Product type b", () => {

        const product = ProductFactory.create("b", "Produto 1", 10.0);
        
        const input = {
            id: product.id,
            name: "Product 1 update",
            price: 20
        }

        it("should update a product", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(<Product>product);
            const usecase = new UpdateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            expect(output).toEqual(input);
        })

        it("should throw an error when price is less than 0", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(<Product>product);
            const usecase = new UpdateProductUseCase(productRepository);
    
            input.price = -1;
    
            await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
        });

        it("should thrown an error when name is missing", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(<Product>product);
            const usecase = new UpdateProductUseCase(productRepository);
    
            input.name = ""
    
            await expect(usecase.execute(input)).rejects.toThrow("product: Name is required");
        });
    });
});