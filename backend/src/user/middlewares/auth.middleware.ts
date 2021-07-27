import { JWT_SECRET } from "src/ormconfig"
import { RequestWithUser } from "src/interfaces/requestWithUser.interface"
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserService } from "../user.service"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(request: RequestWithUser, _: Response, next: NextFunction) {
        if (!request.headers.authorization) {
            request.user = null
            next()
            return ;
        }
        const token = request.headers.authorization.split(' ')[1]

        try {
            const decode = verify(token, JWT_SECRET)
            const user = await this.userService.findById(decode.id)
            request.user = user
            next()
        } catch (error) {
            request.user = null
            next()
        }
    }
}
