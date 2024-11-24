import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);

export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: Employee }>()
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: number }>()
);

export const loadEmployees = createAction('[Employee] Load Employees');