import axios from "axios";

export class CategoryController {

    private readonly categoryUrl = `${process.env.BASE_URL}/categories`

    async createCategory(requestBody: Object) {
        return axios.post(this.categoryUrl, requestBody)
    }
    
    async deleteCategory(categoryId: string) {
        return axios.delete(`${this.categoryUrl}/${categoryId}`)
    }
}