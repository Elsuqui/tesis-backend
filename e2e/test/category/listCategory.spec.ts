import axios from 'axios';
import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config'
import { Category } from '../../dto/category.js';
import { CategoryController } from '../../controller/categoriesController.js';

describe('Delete category e2e test', () => {
  let categoryToList: Category,
  categoryController: CategoryController;
  const baseUrl = process.env.BASE_URL;

  beforeEach(async () => {
    categoryController = new CategoryController();
    const requestBody = {
        name: Math.random().toString().substr(2, 8),
      };

    const response = await categoryController.createCategory(requestBody);
    expect(response.status).to.equal(StatusCodes.CREATED)
    categoryToList = new Category(response.data.data);
  }) 

  it('Call the list categories endpoint @smoketest', async () => {
    const getResponse = await axios.get(`${baseUrl}/categories/`);
    const categoryList = getResponse.data.data;

    const foundCategory = categoryList.find((category: { name: string; }) => category.name === categoryToList.name);
    
    expect(getResponse.status).to.equal(StatusCodes.OK);
    expect(getResponse.data.message).to.equal('OK');
    expect(foundCategory.name).to.equal(categoryToList.name)
    });

    after(async () => {
        if(categoryToList.id) {
          const deleteResponse = await categoryController.deleteCategory(categoryToList.id.toString())
          expect(deleteResponse.status).to.equal(StatusCodes.OK)
        }
      })

});