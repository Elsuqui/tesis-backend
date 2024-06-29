import axios from 'axios';
import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config'
import { Category } from '../../dto/category.js';
import { CategoryController } from '../../controller/categoriesController.js';

describe('Query a category e2e test', () => {
  let categoryToQuery: Category,
  categoryController: CategoryController;
  const baseUrl = process.env.BASE_URL;

  beforeEach(async () => {
    categoryController = new CategoryController();
    const requestBody = {
        name: Math.random().toString().substr(2, 8),
      };

    const response = await categoryController.createCategory(requestBody);
    expect(response.status).to.equal(StatusCodes.CREATED)
    categoryToQuery = new Category(response.data.data);
  }) 

  it('Call the get category by id endpoint @smoketest', async () => {
    const getResponse = await axios.get(`${baseUrl}/categories/${categoryToQuery.id}`);

    
    expect(getResponse.status).to.equal(StatusCodes.OK);
    expect(getResponse.data.message).to.equal('OK');
    expect(getResponse.data.data.name).to.equal(categoryToQuery.name);

    });

    after(async () => {
        if(categoryToQuery.id) {
          const deleteResponse = await categoryController.deleteCategory(categoryToQuery.id.toString())
          expect(deleteResponse.status).to.equal(StatusCodes.OK)
        }
      })

});