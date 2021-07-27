import { RequestWithUser } from "src/interfaces/requestWithUser.interface";
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithUser>()

        if (request.user === undefined) {
            throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED)
        }
        if (request.user.position === 'BlockedUser') {
            throw new HttpException("You've been blocked! hahahahahah!", 418)
        }
        return true 
    }
}
