import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from '../../store/employee.actions';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent],
  template: `
    <div class="max-w-7xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Employee List</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg shadow-lg">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (employee of employees$ | async; track employee.id) {
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      @if (employee.photo) {
                        <img class="h-10 w-10 rounded-full object-cover" [src]="employee.photo" [alt]="employee.firstName">
                      } @else {
                        <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {{ employee.firstName[0] }}{{ employee.lastName[0] }}
                        </div>
                      }
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ employee.firstName }} {{ employee.lastName }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ employee.position }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ employee.department }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ employee.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button (click)="viewDetails(employee)" class="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button (click)="editEmployee(employee)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button (click)="deleteEmployee(employee.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      
      <app-employee-details 
        [employee]="selectedEmployee"
        (close)="selectedEmployee = null"
      />
    </div>
  `
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;
  selectedEmployee: Employee | null = null;

  constructor(private store: Store<{ employees: { employees: Employee[] } }>) {
    this.employees$ = store.select(state => state.employees.employees);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
    }
  }

  editEmployee(employee: Employee) {
    // Implement edit functionality
  }

  viewDetails(employee: Employee) {
    this.selectedEmployee = employee;
  }
}