import { app, sequelize } from "../express"
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe("Product type a", () => {
        it("should create a product", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "a",
                    name: "Produto 1",
                    price: 10.0
                });
                
            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Produto 1");
            expect(response.body.price).toBe(10.0);
        });

        it("should not create a product", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "a"
                });
                
            expect(response.status).toBe(500);
        });

        it("should list all products", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "a",
                    name: "Produto 1",
                    price: 10.0
                });
    
            expect(response.status).toBe(200);
            
            const response2 = await request(app)
                .post("/product")
                .send({
                    type: "a",
                    name: "Produto 2",
                    price: 50.0
                });
                
            expect(response2.status).toBe(200);
    
            const listResponse = await request(app).get("/product").send();
            expect(listResponse.status).toBe(200);
            expect(listResponse.body.products.length).toBe(2)
            
            const product = listResponse.body.products[0];
            expect(product.name).toBe("Produto 1");
            expect(product.price).toBe(10.0);
    
            const product2 = listResponse.body.products[1];
            expect(product2.name).toBe("Produto 2");
            expect(product2.price).toBe(50.0);
        });
    });

    describe("Product type b", () => {
        it("should create a product", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "b",
                    name: "Produto 1",
                    price: 10.0
                });
                
            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Produto 1");
            expect(response.body.price).toBe(20.0);
        });

        it("should not create a product", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "b"
                });
                
            expect(response.status).toBe(500);
        });

        it("should list all products", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "b",
                    name: "Produto 1",
                    price: 10.0
                });
    
            expect(response.status).toBe(200);
            
            const response2 = await request(app)
                .post("/product")
                .send({
                    type: "b",
                    name: "Produto 2",
                    price: 50.0
                });
                
            expect(response2.status).toBe(200);
    
            const listResponse = await request(app).get("/product").send();
            expect(listResponse.status).toBe(200);
            expect(listResponse.body.products.length).toBe(2)
            
            const product = listResponse.body.products[0];
            expect(product.name).toBe("Produto 1");
            expect(product.price).toBe(20.0);
    
            const product2 = listResponse.body.products[1];
            expect(product2.name).toBe("Produto 2");
            expect(product2.price).toBe(100.0);
        });
    });
});