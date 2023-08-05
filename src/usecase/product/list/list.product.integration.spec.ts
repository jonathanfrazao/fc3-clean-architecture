import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
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
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product1 = ProductFactory.create("a", "Produto 1", 10);
        const product2 = ProductFactory.create("b", "Produto 2", 10);

        productRepository.create(<Product>product1);
        productRepository.create(<Product>product2);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
});