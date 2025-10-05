import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {CoursesApiEndpoint} from './courses-api-endpoint';
import {CategoriesApiEndpoint} from './categories-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../domain/model/course.entity';
import {Category} from '../domain/model/category.entity';
import {Supplier} from '../domain/model/supplier.entity';
import {SuppliersApiEndpoint} from './suppliers-api-endpoint';

@Injectable({providedIn: 'root'})
export class LearningApi extends BaseApi {
  private readonly coursesEndpoint: CoursesApiEndpoint;
  private readonly categoriesEndpoint: CategoriesApiEndpoint;
  private readonly suppliersEndpoint: SuppliersApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.categoriesEndpoint = new CategoriesApiEndpoint(http);
    this.coursesEndpoint = new CoursesApiEndpoint(http);
    this.suppliersEndpoint = new SuppliersApiEndpoint(http);
  }

  getCourses(): Observable<Course[]> {
    return this.coursesEndpoint.getAll();
  }

  getCourse(id: number): Observable<Course> {
    return this.coursesEndpoint.getById(id);
  }

  createCourse(course: Course): Observable<Course> {
    return this.coursesEndpoint.create(course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.coursesEndpoint.update(course, course.id);
  }

  deleteCourse(id: number): Observable<void> {
    return this.coursesEndpoint.delete(id);
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesEndpoint.getAll();
  }

  getCategory(id: number): Observable<Category> {
    return this.categoriesEndpoint.getById(id);
  }

  createCategory(category: Category): Observable<Category> {
    return this.categoriesEndpoint.create(category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoriesEndpoint.update(category, category.id);
  }

  deleteCategory(id: number): Observable<void> {
    return this.categoriesEndpoint.delete(id);
  }

  //supplier-form
  getSupplier(id: number): Observable<Supplier> {
    return this.suppliersEndpoint.getById(id);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.suppliersEndpoint.getAll();
  }
  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.suppliersEndpoint.create(supplier);
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.suppliersEndpoint.update(supplier, supplier.id);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.suppliersEndpoint.delete(id);
  }

}
