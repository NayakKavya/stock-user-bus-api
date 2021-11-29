import { HttpModule } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";
import { HttpClient } from "../../infrastructure/client/http.client";
import { ConfigService } from "../../infrastructure/configuration/config.service";
import { WinstonLoggerModule } from "../../infrastructure/logger/winston.logger.module";
import { UserController } from "../../routes/user.controller";
import { UserModel } from "../models/user.model";
import CreateUserInfo from "./createuserinfo.service"
import GetUserByUserId from "./getuserbyuserid.service";
import LogoutUserInfo from "./logoutuserinfo.service";
jest.mock('../../infrastructure/client/http.client')

const mock = () => ({
    handle: jest.fn(),
})

// const mockUser = {
//     userId: "User17",
//     browser: "chrome",
//     machineId: "10.102.20.45",
//     shopId: 123,
//     userLogin: "login",
//     loginDate: "2021-11-24T08:55:45.081Z"
// }

describe('CreateUserInfo Service',()=>{
    let createUserInfo: CreateUserInfo;
    let httpClient: HttpClient;
    // let userModel: UserModel

    beforeEach(async()=> {
        const module = await Test.createTestingModule({
            imports: [HttpModule, 
                WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),],
            controllers: [UserController],
            providers:[ CreateUserInfo, GetUserByUserId, LogoutUserInfo, HttpClient]
        }).compile();

        createUserInfo = module.get<CreateUserInfo>(CreateUserInfo);
        httpClient = module.get<HttpClient>(HttpClient);
        });
        
    it('CreateUserInfo to be defined', async() => {
        expect(createUserInfo).toBeDefined();
    })

    it('CreateUserInfo to have been called', async ()=>{
        const loginUserService={
            userId: "User17",
            browser: "chrome",
            machineId: "10.102.20.45",
            shopId: 123,
            userLogin: "login",
            loginDate: new Date(),
        };


        const httpSpy = jest.spyOn(httpClient, 'post')
    .mockResolvedValue(of({data:loginUserService }))
        console.log('HttpSpy7777777',httpSpy)
        // httpClient.post = jest.fn().mockResolvedValue(loginUserService);
        createUserInfo.handle(loginUserService);
        expect(httpSpy).toEqual(loginUserService)
        // // httpClient.post.mockResolvedValue(mockUser)
        // const result = await createUserInfo.handle(userModel)
        // // expect(result).toEqual(mockUser)
        // expect(result).toHaveBeenCalled();
        // expect(createUserInfo).toBeDefined();
    })
});