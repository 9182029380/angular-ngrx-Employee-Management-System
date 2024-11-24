import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state) => state.employees
);

export const selectEmployeeById = (id: number) => createSelector(
  selectAllEmployees,
  (employees) => employees.find(emp => emp.id === id)
);