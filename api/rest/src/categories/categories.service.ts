import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import Fuse from 'fuse.js';
import categoriesJson from './categories.json';
import { paginate } from 'src/common/pagination/paginate';
import { GetCategoriesAlongChildrenDto } from './dto/get-categories-along-children.dto';
const categories = plainToClass(Category, categoriesJson);
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
const fuse = new Fuse(categories, options);
@Injectable()
export class CategoriesService {
  private categories: Category[] = categories;

  create(createCategoryDto: CreateCategoryDto) {
    return this.categories[0];
  }

  getCategories({ limit, page, search }: GetCategoriesDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Category[] = this.categories;
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  // getCategoriesAlongChildren(
  //   values: GetCategoriesAlongChildrenDto,
  // ): Category[] {
  //   console.log(values, 'values');
  //   return this.categories;
  // }

  getCategory(id: number): Category {
    return this.categories.find((p) => p.id === id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categories[0];
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

// { search: 'type.slug:grocery', searchJoin: 'and', limit: '30' }
