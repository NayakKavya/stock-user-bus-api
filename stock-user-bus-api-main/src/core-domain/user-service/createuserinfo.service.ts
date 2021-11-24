import { Injectable } from "@nestjs/common";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";
import { HttpClient } from "../../infrastructure/client/http.client";
import { LoginStatus, UserModel } from "../models/user.model";
import { IBaseService } from "./base.service";

/* This Injectable service class contains createUserInfo service implementation for login */
@Injectable()
export default class CreateUserInfo implements IBaseService<UserModel, LoginStatus>{
    constructor(private httpclient: HttpClient,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(CreateUserInfo.name);
        console.log('UpdateUserInfo created')
    }

    /* This method accepts userModel through UserController
    *  model is passed to system api to get user
    *  if the user is not found then userModel is sent to system api through http client post to create user detail
    *  if user is found then check browser and machine Id, matches then allows login else denies login */
    async handle(userModel: UserModel): Promise<LoginStatus> {
        this.logger.info('in createUserInfo handle  #UserModel  ${userModel}');
        this.logger.error('in createUserInfo handle error', { key: 'value' });
        this.logger.debug('in createUserInfo handle debug', { key: 'value' });
        this.logger.warn('in createUserInfo handle warn');

        let date: Date = new Date();
       
        userModel.loginDate = date;
        
        const responseObject = await this.httpclient.post('getUserInfo', userModel);

         console.log("response obj",responseObject)

         console.log("Model",userModel)

        if (responseObject.length === 0) {
            console.log("New User")
            const users = await this.httpclient.post('save', userModel);
            console.log("New User logged in",users)
            const um = new UserModel(users.userId, users.browser, users.machineId, users.shopId, users.userLogin, users.loginDate)
            const loginStatus = new LoginStatus("SUCCESS", um)
            return loginStatus;
        }

        else {
            for (let obj of responseObject) {
                if (obj.userId === userModel.userId) {
                    if (obj.browser === userModel.browser && obj.machineId === userModel.machineId) {
                        const loginStatus = new LoginStatus("SUCCESS", obj)
                        return loginStatus
                    }
                    return new LoginStatus("LOGGED_OUT", obj)
                }
            }
        }

        return responseObject;
    }
}