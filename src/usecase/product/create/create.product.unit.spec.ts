import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit test create product use case", () => {

    describe("Product type a", () => {

        const input = {
            type: "a",
            name: "Produto 1",
            price: 10.0
        };

        it("should create a product", async () => {

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            expect(output).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price
            });
        });

        it("should throw an error when price is less than 0", async () => {
            
            input.price = -1;

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
        });

        it("should thrown an error when name is missing", async () => {
            
            input.name = "";

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            await expect(usecase.execute(input)).rejects.toThrow("Name is required");
        });
    });

    describe("Product type b", () => {

        const input = {
            type: "b",
            name: "Produto 1",
            price: 10.0
        };

        it("should create a product", async () => {

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            expect(output).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price * 2
            });
        });

        it("should throw an error when price is less than 0", async () => {
            
            input.price = -1;

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);
    
            await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
        });

        it("should thrown an error when name is missing", async () => {
            
            input.name = "";
    
            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);
    
            await expect(usecase.execute(input)).rejects.toThrow("Name is required");
        });
    });
});