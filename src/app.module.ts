import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './modules/url/entities/url.entity';
import { UrlModule } from './modules/url/url.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Url],
      synchronize: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }),
    UrlModule,
  ],
})
export class AppModule {}
