import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoriesService } from './categories/categories.service';
import { createResponse } from './common/dto/response-dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/menu')
  async getMenu() {
    return createResponse(await this.categoriesService.showMenu());
  }
}
