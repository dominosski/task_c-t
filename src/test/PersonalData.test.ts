import request from 'supertest'
import app from "../services/PersonalData"

describe("POST /api/v1/commands/run", () => {
    describe("given id between 10 and 20", () => {
        it("should return user object with specified id", async () => {
            const id = 19

            const response = await request(app).post("/api/v1/commands/run").send({
                id: id
            })

            expect(response.statusCode).toBe(200)
            expect(response.body).not.toBe(null)
            expect(response.type).toBe('application/json')
        })
    })

    describe("when id is NOT between 10 and 20", () => {
        it("should return error 400 bad request", async () => {
            const id = 2
            const response = await request(app).post("/api/v1/commands/run").send({
                id: id
            })

            expect(response.statusCode).toBe(400)
            expect(response.body).toMatchObject({
                "error": "ID must be between 10 and 20"
            })
        })
    })

    describe("when there is no user with specified ID", () => {
        it("should return error 404 not found", async () => {
            const id = 12
            const response = await request(app).post("/api/v1/commands/run").send({
                id: id
            })

            expect(response.statusCode).toBe(404)
        })
    })
})
