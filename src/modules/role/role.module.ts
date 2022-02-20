import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository]), AuthModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
