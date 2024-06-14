import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuDetail } from './entities/menu_detail.entity';

@Module({
  controllers: [MenusController],
  providers: [MenusService],
  imports: [TypeOrmModule.forFeature([Menu, MenuDetail])],
})
export class MenusModule {}
