import { Injectable } from "@nestjs/common";
import { HttpClient } from "src/infrastructure/client/http.client";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";
import { GetUserModel } from "../models/getuser.model";
import { UserModel } from "../models/user.model";
import { IBaseService } from "./base.service";

/**This Injectable service class contains getUserById service implementation for fetching User by particular 
 * userId and shopId */
@Injectable()
export default class GetUserByUserId implements IBaseService<GetUserModel, UserModel>{
    constructor(private httpclient: HttpClient,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(GetUserByUserId.name);
        console.log('UpdateLogoutInfo created')
    }

    /**
    * This method accepts getUserModel and pass it to system api through httpclient post
    * and receives and returns user
    */
    async handle(getUserModel: GetUserModel): Promise<UserModel[]> {
        this.logger.info('in getUserByUserId handle  #GetUserModel  ${getUserModel}');
        this.logger.error('in getUserByUserId handle error', { key: 'value' });
        this.logger.debug('in getUserByUserId handle debug', { key: 'value' });
        this.logger.warn('in getUserByUserId handle warn');
        return await this.httpclient.get('all', getUserModel);
    }
}