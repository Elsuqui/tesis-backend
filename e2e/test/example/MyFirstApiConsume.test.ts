import axios from 'axios';
import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';


describe('First Api Tests', () => {
    it('Consume GET Service', async () => {
        const response = await axios.get('https://httpbin.org/ip');
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
      });
});