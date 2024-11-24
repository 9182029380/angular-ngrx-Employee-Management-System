import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-form-page',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Add New Employee</h1>
      </header>
      <app-employee-form />
    </div>
  `
})
export class EmployeeFormPageComponent {}