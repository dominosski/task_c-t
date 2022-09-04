import gatherData from "../routers/GatherData"

describe("Rabbitmq testing", () => {
    describe('when there is message in broker queue', () => {
        it('should consume message from queue', async () => {
            const response = await gatherData()
            expect(response).not.toBe(null)
        })
    })
})
