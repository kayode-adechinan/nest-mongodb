import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';

import * as redisStore from 'cache-manager-redis-store';

import { ItemModule } from './item/item.module';
import { SharedModule } from './shared/shared.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
      // uncomment the three lines bellow to swith to redis based caching otherwise you will get in memory caching
      // store: redisStore,
      // host: 'redis', // name of the service in docker-compose file, otherwise replace it with 'localhost'
      // port: 6379,
    }),

    //MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ItemModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
