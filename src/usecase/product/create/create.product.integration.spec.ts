
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";

describe("Test create product use case", () => {
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

        const input = {
            type: "a",
            name: "Produto 1",
            price: 10.0
        }

        it("should find a product", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);

            expect(await usecase.execute(input)).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price
            });
        });

        it("should throw an error when price is less than 0", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);
    
            input.price = -1;
    
            await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
        });

        it("should thrown an error when name is missing", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);
    
            input.name = ""
    
            await expect(usecase.execute(input)).rejects.toThrow("Name is required");
        });
    });

    describe("Product type b", () => {

        const input = {
            type: "b",
            name: "Produto 1",
            price: 10.0
        }

        it("should find a product", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);

            expect(await usecase.execute(input)).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price * 2
            });
        });

        it("should throw an error when price is less than 0", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);
    
            input.price = -1;
    
            await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
        });

        it("should thrown an error when name is missing", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);
    
            input.name = "";
    
            await expect(usecase.execute(input)).rejects.toThrow("Name is required");
        });
    });
});