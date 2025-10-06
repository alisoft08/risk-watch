import {Routes} from '@angular/router';
const supplierForm = () => import('./views/supplier-form/supplier-form').then(m => m.SupplierForm);
const supplierList = () => import('./views/supplier-list/supplier-list').then(m => m.SupplierList);
const supplierScreeningModal = () => import('./views/supplier-screening-modal/supplier-screening-modal').then(m => m.SupplierScreeningModal);
const riskEntitiesList = () => import('./views/risk-entities-list/risk-entities-list').then(m => m.RiskEntitiesList);

export const learningRoutes: Routes = [
  { path: '',           loadComponent: supplierList},
  { path: 'new',       loadComponent: supplierForm},
  { path: ':id/edit',  loadComponent: supplierForm},
  { path: ':name/screening',  loadComponent: supplierScreeningModal},
  { path: ':name/screening/list',  loadComponent: riskEntitiesList}

];


