import {Routes} from '@angular/router';
// Lazy-loaded components
const categoryList = () => import('./views/category-list/category-list').then(m => m.CategoryList);
const categoryForm = () => import('./views/category-form/category-form').then(m => m.CategoryForm);
const supplierForm = () => import('./views/supplier-form/supplier-form').then(m => m.SupplierForm);
const supplierList = () => import('./views/supplier-list/supplier-list').then(m => m.SupplierList);
const courseList = () => import('./views/course-list/course-list').then(m => m.CourseList);
const courseForm = () => import('./views/course-form/course-form').then(m => m.CourseForm);

export const learningRoutes: Routes = [
  { path: 'suppliers',           loadComponent: supplierList},
  { path: 'suppliers/new',       loadComponent: supplierForm},
  { path: 'suppliers/:id/edit',  loadComponent: supplierForm},
];

