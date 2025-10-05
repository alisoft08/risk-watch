import {computed, Injectable, Signal, signal} from '@angular/core';
import {Supplier} from '../domain/model/supplier.entity';
import {Category} from '../domain/model/category.entity';
import {Course} from '../domain/model/course.entity';
import {LearningApi} from '../infrastructure/learning-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


@Injectable({providedIn: 'root'})
export class LearningStore {
  // State signals
  private readonly categoriesSignal = signal<Category[]>([]);
  private readonly coursesSignal = signal<Course[]>([]);
  private readonly suppliersSignal = signal<Supplier[]>([]);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  // Readonly signals
  readonly categories = this.categoriesSignal.asReadonly();
  readonly courses = this.coursesSignal.asReadonly();
  readonly suppliers = this.suppliersSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  // Computed signals
  readonly categoriesCount = computed(() => this.categories.length);
  readonly coursesCount = computed(() => this.courses.length);
  readonly suppliersCount = computed(() => this.suppliers.length);
  readonly loading = this.loadingSignal.asReadonly();

  constructor(private learningApi: LearningApi) {
    this.loadCategories();
    this.loadCourses();
    this.loadSuppliers();
  }

  getCategoryById(id: number | null | undefined): Signal<Category | undefined> {
    return computed(() => id ? this.categories().find(c => c.id === id) : undefined);
  }



  addCategory(category: Category): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.createCategory(category).pipe(retry(2)).subscribe({
      next: createdCategory => {
        this.categoriesSignal.update(categories => [...categories, createdCategory]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create category'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateCategory(updatedCategory: Category): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.updateCategory(updatedCategory).pipe(retry(2)).subscribe({
      next: category => {
        this.categoriesSignal.update(categories => categories.map(c => c.id === category.id ? category : c));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update category'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteCategory(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.deleteCategory(id).pipe(retry(2)).subscribe({
      next: () => {
        this.categoriesSignal.update(categories => categories.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete category'));
        this.loadingSignal.set(false);
      }
    });
  }

  //SUPPLIER
  addSupplier(supplier: Supplier): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.createSupplier(supplier).pipe(retry(2)).subscribe({
      next: createdSupplier => {
        this.suppliersSignal.update(suppliers => [...suppliers, createdSupplier]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create supplier-form'));
        this.loadingSignal.set(false);
      }
    });
  }

  getSupplierById(id: number | null | undefined): Signal<Supplier | undefined> {
    return computed(() => id ? this.suppliers().find(c => c.id === id) : undefined);
  }

  updateSupplier(updatedSupplier: Supplier): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.updateSupplier(updatedSupplier).pipe(retry(2)).subscribe({
      next: supplier => {
        this.suppliersSignal.update(suppliers => suppliers.map(c => c.id === supplier.id ? supplier : c));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update supplier'));
        this.loadingSignal.set(false);
      }
    });
  }



  deleteSupplier(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.deleteSupplier(id).pipe(retry(2)).subscribe({
      next: () => {
        this.suppliersSignal.update(suppliers => suppliers.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete supplier'));
        this.loadingSignal.set(false);
      }
    });
  }

  //COURSE

  getCourseById(id: number | null | undefined): Signal<Course | undefined> {
    return computed(() => id ? this.courses().find(c => c.id === id) : undefined);
  }

  addCourse(course: Course): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.createCourse(course).pipe(retry(2)).subscribe({
      next: createdCourse => {
        createdCourse = this.assignCategoryToCourse(createdCourse);
        this.coursesSignal.update(courses => [...courses, createdCourse]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create course'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateCourse(updatedCourse: Course): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.updateCourse(updatedCourse).pipe(retry(2)).subscribe({
      next: course => {
        course = this.assignCategoryToCourse(course);
        this.coursesSignal.update(courses => courses.map(c => c.id === course.id ? course : c));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update course'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteCourse(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.deleteCourse(id).pipe(retry(2)).subscribe({
      next: () => {
        this.coursesSignal.update(courses => courses.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete course'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadCategories(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.getCategories().pipe(takeUntilDestroyed()).subscribe({
      next: categories => {
        this.categoriesSignal.set(categories);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load categories'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadCourses(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.getCourses().pipe(takeUntilDestroyed()).subscribe({
      next: courses => {
        this.coursesSignal.set(courses);
        this.loadingSignal.set(false);
        this.assignCategoriesToCourses();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load courses'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadSuppliers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.getSuppliers().pipe(takeUntilDestroyed()).subscribe({
      next: suppliers => {
        this.suppliersSignal.set(suppliers);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load suppliers'));
        this.loadingSignal.set(false);
      }
    });
  }

  private assignCategoriesToCourses(): void {
    this.coursesSignal.update(courses => courses.map(course => this.assignCategoryToCourse(course)));
  }

  private assignCategoryToCourse(course: Course): Course {
    const categoryId = course.categoryId ?? 0;
    course.category = categoryId ? this.getCategoryById(categoryId)() ?? null : null;
    return course;
  }

  private formatError(error: any,  fallback: string): string {
    if (error instanceof Error)
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    return fallback;
  }

}
