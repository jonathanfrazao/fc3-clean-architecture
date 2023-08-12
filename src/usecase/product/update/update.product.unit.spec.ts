import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";


describe("Unit test for product use case", () => {

    describe("Product type a", () => {
        const product = ProductFactory.create("a", "Produto 1", 10.0);

        const input = {
            id: product.id,
            name: "Produto 1 update",
            price: 30.1
        };

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(Promise.resolve(product)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };

        it("should update a product", async () => {
            const productRepository = MockRepository();
            const usecase = new UpdateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            expect(output).toEqual(input);
        })

        it("should thrown an error when name is missing", async () => {
            const productRepository = MockRepository();
            const usecase = new UpdateProductUseCase(productRepository);

            var modifiedInput = {...input};
            modifiedInput.name = "";

            await expect(usecase.execute(modifiedInput)).rejects.toThrow("product: Name is required");
        });

        it("should throw an error when price is less than 0", async () => {
            var product = ProductFactory.create("a", "Produto 1", 10.0);

            const MockRepository = () => {
                return {
                    find: jest.fn().mockReturnValue(Promise.resolve(product)),
                    findAll: jest.fn(),
                    create: jest.fn(),
                    update: jest.fn(),
                }
            };

            const productRepository = MockRepository();
            const usecase = new UpdateProductUseCase(productRepository);

            var modifiedInput = {...input};
            modifiedInput.price = -1;

            await expect(usecase.execute(modifiedInput)).rejects.toThrow("Price must be greater than zero");
        })
    })

    describe("Product type b", () => {

        const product = ProductFactory.create("b", "Produto 1", 10.0);

        const input = {
            id: product.id,
            name: "Produto 1 update",
            price: 30.1
        };

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(Promise.resolve(product)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };

        it("should update a product", async () => {
            const productRepository = MockRepository();
            const usecase = new UpdateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            input.price = input.price * 2;

            expect(output).toEqual(input);
        })

        it("should thrown an error when name is missing", async () => {
            const productRepository = MockRepository();
            const usecase = new UpdateProductUseCase(productRepository);
    
            var modifiedInput = {...input};
            modifiedInput.name = "";

            await expect(usecase.execute(modifiedInput)).rejects.toThrow("product: Name is required");
        });

        it("should throw an error when price is less than 0", async () => {
            const product = ProductFactory.create("b", "Produto 1", 10.0);
            const MockRepository = () => {
                return {
                    find: jest.fn().mockReturnValue(Promise.resolve(product)),
                    findAll: jest.fn(),
                    create: jest.fn(),
                    update: jest.fn(),
                }
            };

            const productRepository = MockRepository();
            const usecase = new UpdateProductUseCase(productRepository);

            var modifiedInput = {...input};
            modifiedInput.price = -1;

            await expect(usecase.execute(modifiedInput)).rejects.toThrow("Price must be greater than zero");
        })
    })
})