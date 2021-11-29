import { HttpModule } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import exp from "constants";
import CreateUserInfo from "../core-domain/user-service/createuserinfo.service";
import GetUserByUserId from "../core-domain/user-service/getuserbyuserid.service";
import LogoutUserInfo from "../core-domain/user-service/logoutuserinfo.service";
import { HttpClient } from "../infrastructure/client/http.client";
import { ConfigService } from "../infrastructure/configuration/config.service";
import { WinstonLoggerModule } from "../infrastructure/logger/winston.logger.module";
import { UserController } from "./user.controller";
jest.mock('../core-domain/user-service/createuserinfo.service');
jest.mock('../core-domain/user-service/getuserbyuserid.service');
jest.mock('../core-domain/user-service/logoutuserinfo.service')

describe('UserController',()=>{

    let userController : UserController;
    let createUserInfo: CreateUserInfo;
    let getUserByUserId: GetUserByUserId;
    let logoutUserInfo: LogoutUserInfo;
    beforeEach(async()=>{
        const module = await Test.createTestingModule({
            imports: [HttpModule, 
                WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),],
            controllers: [UserController],
            providers:[ CreateUserInfo, GetUserByUserId, LogoutUserInfo, HttpClient]
        }).compile();

        userController= module.get<UserController>(UserController);
        createUserInfo = module.get<CreateUserInfo>(CreateUserInfo);
        getUserByUserId = module.get<GetUserByUserId>(GetUserByUserId);
        logoutUserInfo = module.get<LogoutUserInfo>(LogoutUserInfo);
    })

    it('CreateUserInfo Service to have been called',()=>{

        const loginUserService={
        userId: "User17",
        browser: "chrome",
        machineId: "10.102.20.45",
        shopId: 123,
        userLogin: "login",
        loginDate: new Date(),
    };

        userController.createUserInfo(loginUserService);
        expect(true).toBe(true)
        expect(UserController).toBeDefined();
        expect(createUserInfo.handle).toHaveBeenCalled()
    });

    it('GetUserInfoService to have been called', ()=>{
        const getUserService={
            userId: "User17",
            shopId: 123
        };
        userController.getUserByUserId("User17", getUserService);
        expect(getUserByUserId.handle).toHaveBeenCalled();
    });

    it('LogoutUserInfo Service to have been called',()=>{

        const logoutUserService={
        userId: "User17",
        browser: "chrome",
        machineId: "10.102.20.45",
        shopId: 123,
        loginDate: new Date(),
        logoutDate: new Date(),
    };

        userController.logoutInfo(null);
        expect(logoutUserInfo.handle).toHaveBeenCalled()
    });
});