import { Module } from '@nestjs/common';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, RoleModule, AuthModule],
})
export class AppModule {
  static port: number | string;
  static allowedOrigin: string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
    AppModule.allowedOrigin = this._configService.get(
      Configuration.ALLOWED_ORIGIN,
    );
  }
}
