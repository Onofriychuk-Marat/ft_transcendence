import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionModule } from './description/description.module';
import { ormconfig } from "./ormconfig";
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { EtherModule } from './ether/ether.module';
import { ChatModule } from './chat/chat.module';
import { WorldModule } from './world/world.module';
import { ConversationModule } from './conversation/conversations.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconfig),
		DescriptionModule,
		UserModule,
		EtherModule,
		ChatModule,
		WorldModule,
		ConversationModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL
		})
	}
}
