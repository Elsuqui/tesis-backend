import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { MenuDetail } from './entities/menu_detail.entity';
import { CreateMenuDetailDto } from './dto/create-menu-detail.dto';
import handleDBError from 'src/common/utils/db_error_handler';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(MenuDetail)
    private readonly menuDetailRepository: Repository<MenuDetail>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      const menu = this.menuRepository.create(createMenuDto);
      if (createMenuDto.isActive) {
        this.disableActiveMenus();
      }
      const savedMenu = await this.menuRepository.save(menu);
      return savedMenu;
    } catch (error) {
      console.log('Error: ', error);
      handleDBError(error);
    }
  }

  findAll() {
    const menus = this.menuRepository.find({
      relations: { menuDetails: { product: true, tag: true } },
    });
    return menus;
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: { menuDetails: { product: true, tag: true } },
    });
    if (!menu) {
      throw new NotFoundException(`Menu #${id} not found`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.preload({
      id,
      ...updateMenuDto,
    });
    if (!menu) {
      throw new NotFoundException(`Menu #${id} not found`);
    }
    if (updateMenuDto.isActive) {
      this.disableActiveMenus();
    }
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    return this.menuRepository.softRemove(menu);
  }

  async addMenuDetails(id: number, body: CreateMenuDetailDto[]) {
    const menu = await this.findOne(id);
    const menuWithDetails = this.menuRepository.merge(menu, {
      menuDetails: body,
    });
    try {
      const menuWithNewDetails =
        await this.menuRepository.save(menuWithDetails);
      return menuWithNewDetails;
    } catch (error) {
      console.log('Error: ', error);
      handleDBError(error);
    }
  }

  async disableActiveMenus() {
    const queryBuilder = this.menuRepository.createQueryBuilder();
    await queryBuilder
      .where('isActive = :isActive', { isActive: true })
      .update({ isActive: false })
      .execute();
  }
}
