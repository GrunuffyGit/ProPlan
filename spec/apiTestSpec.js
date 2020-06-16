let Request = require("request");

describe("Server", () => {
    let server;
    let endpointBegin = `http://localhost:${process.env.PORT || 3001}`;
    beforeAll(() => {
        server = require("../index");
    });
    afterAll(() => {
        server.close();
    });
    describe("GET /", () => {
        let data = {};
        beforeAll((done) => {
            Request.get(`${endpointBegin}/`, (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
    // describe("POST /user", () => {
    //     let data = {};
    //     beforeAll((done) => {
    //         Request.post(`${endpointBegin}/`)
    //     });
    // });
});