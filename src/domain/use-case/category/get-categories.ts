import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category-repository";

export interface GetCategoriesUseCase {
    execute():Promise<CategoryEntity[]>;
}

export class GetCategories implements  GetCategoriesUseCase{
    constructor(
        private readonly repostory: CategoryRepository
    ){}
    execute(): Promise<CategoryEntity[]> {
        return this.repostory.getAll();
    }
    
}