import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from '../../store/employee.actions';

@Component({
  selector: 'app-employee-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <header class="mb-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Employees</h1>
          <a routerLink="/employees/add" 
             class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Add Employee
          </a>
        </div>
      </header>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          @for (employee of employees$ | async; track employee.id) {
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="aspect-w-1 aspect-h-1">
                @if (employee.photo) {
                  <img [src]="employee.photo" [alt]="employee.firstName" class="w-full h-full object-cover">
                } @else {
                  <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span class="text-2xl font-bold text-gray-400">
                      {{ employee.firstName[0] }}{{ employee.lastName[0] }}
                    </span>
                  </div>
                }
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold">
                  {{ employee.firstName }} {{ employee.lastName }}
                </h3>
                <p class="text-gray-600">{{ employee.position }}</p>
                <p class="text-gray-500 text-sm">{{ employee.department }}</p>
                <div class="mt-4 flex justify-between">
                  <a [routerLink]="['/employees', employee.id]" 
                     class="text-blue-600 hover:text-blue-800">
                    View Details
                  </a>
                  <a [routerLink]="['/employees/edit', employee.id]"
                     class="text-indigo-600 hover:text-indigo-800">
                    Edit
                  </a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class EmployeeListPageComponent {
  employees$: Observable<Employee[]>;

  constructor(private store: Store<{ employees: { employees: Employee[] } }>) {
    this.employees$ = store.select(state => state.employees.employees);
  }
}