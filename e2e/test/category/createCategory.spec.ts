import axios from 'axios';
import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config'
import { Category } from '../../dto/category.js';
import { CategoryController } from '../../controller/categoriesController.js';

describe('Create category e2e tests', () => {
  let createdCategory: Category,
  categoryController: CategoryController;
  const baseUrl = process.env.BASE_URL;

  beforeEach(async () => {
    categoryController = new CategoryController();
  }) 

  it('Creates a new category @smoketest', async () => {

      const requestBody = {
        name: Math.random().toString().substr(2, 8),
      };
      
      const response = await axios.post(`${baseUrl}/categories`, requestBody);
      createdCategory = new Category(response.data.data);
    
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(createdCategory.name).to.equal(requestBody.name);
    });

  after(async () => {
    if(createdCategory.id) {
      const deleteResponse = await categoryController.deleteCategory(createdCategory.id.toString())
      expect(deleteResponse.status).to.equal(StatusCodes.OK)
    }
  })
});