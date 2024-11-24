import { createReducer, on } from '@ngrx/store';
import { Employee } from '../models/employee.model';
import * as EmployeeActions from './employee.actions';

export interface EmployeeState {
  employees: Employee[];
}

export const initialState: EmployeeState = {
  employees: []
};

export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee]
  })),
  on(EmployeeActions.updateEmployee, (state, { employee }) => ({
    ...state,
    employees: state.employees.map(emp => 
      emp.id === employee.id ? employee : emp
    )
  })),
  on(EmployeeActions.deleteEmployee, (state, { id }) => ({
    ...state,
    employees: state.employees.filter(emp => emp.id !== id)
  }))
);