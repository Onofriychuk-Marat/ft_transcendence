import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionSiteModule } from './descriptionSite/descriptionSite.module';
import { ormconfig } from "./ormconfig";
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { EtherModule } from './ethers/ethers.module';
import { ChatModule } from './chat/chat.module';
import { WorldModule } from './world/world.module';
import { ConversationModule } from './conversation/conversations.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconfig),
		DescriptionSiteModule,
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
