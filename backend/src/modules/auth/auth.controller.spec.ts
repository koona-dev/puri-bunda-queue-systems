import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: "AUTH_SERVICE",
          useValue: {
            getByNik: jest.fn(),
            getByUsername: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: "JWT_AUTH_SERVICE",
          useValue: {
            generateJwtUser: jest.fn(),
          },
        },
        {
          provide: "COOKIE_SERVICE",
          useValue: {
            generateCookie: jest.fn(),
            removeCookie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
