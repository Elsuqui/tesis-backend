import axios from 'axios';
import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config'
import { Category } from '../../dto/category.js';

describe('Localhost Api Tests', () => {
  let createdCategory: Category;
  const baseUrl = process.env.BASE_URL;
    it('Creates a new category @miguel', async () => {

        const requestBody = {
          name: Math.random().toString().substr(2, 8),
        };
        
        console.log('Environment variables:', process.env);
        

        const response = await axios.post(`${baseUrl}/api/categories`, requestBody);

        createdCategory = new Category(response.data.data);
      
        //console.log(response);
        
        expect(response.status).to.equal(StatusCodes.CREATED);
        expect(createdCategory.name).to.equal(requestBody.name);
      });

    after(async () => {
      if(createdCategory.id) {
        const deleteResponse = await axios.delete(`${baseUrl}/api/categories/${createdCategory.id}`);
        expect(deleteResponse.status).to.equal(StatusCodes.OK)
      }
    })
});