import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test for product use case", () => {

    describe("Product type a", () => {
        const product = ProductFactory.create("a", "Produto 1", 10.0);

        const input = {
            id: product.id
        };

        const output = {
            id: product.id,
            name: "Produto 1",
            price: 10
        }

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(Promise.resolve(<Product>product)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };

        it("should find a product", async () => {
            const productRepository = MockRepository();
            const usecase = new FindProductUseCase(productRepository);

            const result = await usecase.execute(input);

            expect(result).toEqual(output);
        });

        it("should not find a product", async () => {
            const productRepository = MockRepository();
            productRepository.find.mockImplementation(() => {
                throw new Error("Product not found");
            });

            const usecase = new FindProductUseCase(productRepository);

            input.id = "ABC123";

            expect(() => {return usecase.execute(input)}).rejects.toThrow("Product not found")
        });
    })

    describe("Product type b", () => {

        const product = ProductFactory.create("b", "Produto 1", 10.0);

        const input = {
            id: product.id
        };

        const output = {
            id: product.id,
            name: "Produto 1",
            price: 20
        }

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(Promise.resolve(<Product>product)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };

        it("should find a product", async () => {
            const productRepository = MockRepository();
            const usecase = new FindProductUseCase(productRepository);

            const result = await usecase.execute(input);

            expect(result).toEqual(output);
        });

        it("should not find a product", async () => {
            const productRepository = MockRepository();
            productRepository.find.mockImplementation(() => {
                throw new Error("Product not found");
            });

            const usecase = new FindProductUseCase(productRepository);

            input.id = "ABC123";

            expect(() => {return usecase.execute(input)}).rejects.toThrow("Product not found")
        });
    })
})