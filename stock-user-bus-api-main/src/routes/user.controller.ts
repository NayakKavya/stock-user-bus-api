import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { GetUserModel } from "src/core-domain/models/getuser.model";
import { UserLogoutModel } from "src/core-domain/models/user.logout.model";
import { LoginStatus, UserModel } from "src/core-domain/models/user.model";
import GetUserByUserId from "src/core-domain/user-service/getuserbyuserid.service";
import LogoutUserInfo from "src/core-domain/user-service/logoutuserinfo.service";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";
import CreateUserInfo from "../core-domain/user-service/createuserinfo.service";


@Controller()
export class UserController {
    constructor(
        private getUser: GetUserByUserId,
        private userInfo: CreateUserInfo,
        private logoutUserInfo: LogoutUserInfo,
        private logger: WinstonLoggerService,
    ) {
        this.logger.setContext(UserController.name);
        console.log('User service controller')
    }

    @Get('/all/:userId')
    getUserByUserId(@Param('userId') userId: string, @Body() getUserModel: GetUserModel): Promise<UserModel[]> {
        getUserModel.userId = userId;
        this.logger.info('in getUserByUserId info #UserId #ShopId ${getUserModel}');
        this.logger.error('in getUserByUserId error', { key: 'value' });
        this.logger.debug('in getUserByUserId debug', { key: 'value' });
        this.logger.warn('in getUserByUserId warn');
        return this.getUser.handle(getUserModel);
    }

    @Post('/login')
    createUserInfo(@Body() userModel: UserModel): Promise<LoginStatus> {
        this.logger.info('in createUserInfo info #UserModel  ${userModel}');
        this.logger.error('in createUserInfo error', { key: 'value' });
        this.logger.debug('in createUserInfo debug', { key: 'value' });
        this.logger.warn('in createUserInfo warn');
        const loginStatus = this.userInfo.handle(userModel);
        return loginStatus;
    }

    @Post('/logout')
    logoutInfo(@Body() userLogoutModel: UserLogoutModel):Promise<UserLogoutModel> {
        this.logger.info('in logoutInfo info #UserLogoutModel  ${userLogoutModel}');
        this.logger.error('in logoutInfo error', { key: 'value' });
        this.logger.debug('in logoutInfo debug', { key: 'value' });
        this.logger.warn('in logoutInfo warn');
        const user = this.logoutUserInfo.handle(userLogoutModel)
        return user;
    }
}


