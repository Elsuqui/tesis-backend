import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoriesService } from './categories/categories.service';

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
  getMenu() {
    return this.categoriesService.showMenu();
  }
}
