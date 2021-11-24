import { Injectable } from "@nestjs/common";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";
import { HttpClient } from "../../infrastructure/client/http.client";
import { UserLogoutModel } from "../models/user.logout.model";
import { IBaseService } from "./base.service";

/* This Injectable service class contains logoutUserInfo service implementation for logout */
@Injectable()
export default class LogoutUserInfo implements IBaseService<UserLogoutModel, UserLogoutModel>{
    constructor(private httpclient: HttpClient,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(LogoutUserInfo.name);
        console.log('LogoutUserInfo created')
    }

    /** This method receives userLogoutModel through UserController
    *   fetches user details using userLogoutModel and sends it to system api to save using httpclient post
    *   then sends userId and shopId to system api to delete user using httpcient delete*/
    async handle(userLogoutModel: UserLogoutModel): Promise<UserLogoutModel> {

        this.logger.info('in LogoutUserInfo handle  #UserLogoutModel  ${userLogoutModel}');
        this.logger.error('in LogoutUserInfo handle error', { key: 'value' });
        this.logger.debug('in LogoutUserInfo handle debug', { key: 'value' });
        this.logger.warn('in LogoutUserInfo handle warn');

    let date: Date = new Date();
    console.log('Date Login', date)
    userLogoutModel.logoutDate = date;
    

    console.log('*************************',userLogoutModel)
    const found = await this.httpclient.post('getUserInfo', userLogoutModel);
 
    console.log('Found',found)

    for (let obj of await found) {
        console.log('Inside for for loop')
        console.log('UserModel**(((', userLogoutModel.userId,userLogoutModel.browser, userLogoutModel.machineId,userLogoutModel.shopId)
        console.log('%%%%%%%%%BJ',obj)
        console.log('%-----', obj.userId, obj.browser,obj.machineId, obj.shopId )
                if (obj.userId === userLogoutModel.userId && obj.browser === userLogoutModel.browser && 
                    obj.machineId === userLogoutModel.machineId) {
                    console.log('inside if block logout')

                    userLogoutModel.loginDate = obj.loginDate;
 
   
    console.log('User&&&')
    const res = await this.httpclient.post('logout', userLogoutModel)
   
    console.log('Res++++', res)

    const delres = await this.httpclient.delete('delUserInfo/'+userLogoutModel.userId+"/"+ userLogoutModel.shopId);
   
    console.log('delRes++++', delres)

    return res;
}

}

}

}