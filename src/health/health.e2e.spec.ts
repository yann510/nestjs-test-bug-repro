import { INestApplication, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"

import { initializeModuleAndApp } from "../test"
import { HealthModule } from "./health.module"
import {NestFastifyApplication} from "@nestjs/platform-fastify";

describe("Health", () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    // testingHelper = await new TestingHelper().initializeModuleAndApp("health", [HealthModule])
    app = await initializeModuleAndApp("health", [HealthModule])

    // console.time("createTestingModule")
    // const moduleRef = await Test.createTestingModule({
    //   imports: [HealthModule],
    // })
    //   .setLogger(new Logger("TestingHelper"))
    //   .compile()
    // console.timeEnd("createTestingModule")
    //
    // console.time("createNestApplication")
    // app = moduleRef.createNestApplication(new FastifyAdapter())
    // console.timeEnd("createNestApplication")
    //
    // console.time("init")
    // await app.init()
    // console.timeEnd("init")
  })

  afterAll(async () => {
    // await testingHelper.shutdownServer();
    await app.close()
  })

  describe("GET /health", () => {
    it("should return status 200", async () => {
      await app.inject({method: "GET", url:"/health"})
      .then(({payload}) => expect(JSON.parse(payload)).toMatchObject({
          status: "ok",
          info: {
              api: { status: "up" },
          },
          error: {},
          details: {
              api: { status: "up" },
          },
      }))
    })
  })
})
