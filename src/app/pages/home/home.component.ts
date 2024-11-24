import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Employee Management System
            </h1>
            <p class="mt-3 max-w-3xl text-lg text-gray-500">
              Manage your organization's workforce efficiently with our comprehensive employee management system.
            </p>
            <div class="mt-8 space-x-4">
              <a routerLink="/employees" 
                 class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                View Employees
              </a>
              <a routerLink="/employees/add"
                 class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200">
                Add Employee
              </a>
            </div>
          </div>
          <div class="mt-8 lg:mt-0">
            <div class="bg-gray-100 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4">Quick Stats</h2>
              <!-- Add stats here when implemented -->
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}