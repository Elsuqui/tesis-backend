import axios from 'axios';
import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config'
import { Category } from '../../dto/category.js';
import { CategoryController } from '../../controller/categoriesController.js';

describe('Delete category e2e test', () => {
  let categoryToDelete: Category,
  categoryController: CategoryController;
  const baseUrl = process.env.BASE_URL;

  beforeEach(async () => {
    categoryController = new CategoryController();
    const requestBody = {
        name: Math.random().toString().substr(2, 8),
      };

    const response = await categoryController.createCategory(requestBody);
    categoryToDelete = new Category(response.data.data);


  }) 

  it('Delete an existing category @smoketest', async () => {
    const deleteResponse = await axios.delete(`${baseUrl}/categories/${categoryToDelete.id.toString()}`);    
    expect(deleteResponse.status).to.equal(StatusCodes.OK);
    });

});