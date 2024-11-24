import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-white text-xl font-bold">EMS</span>
            </div>
            <div class="ml-10 flex items-baseline space-x-4">
              <a routerLink="/"
                 routerLinkActive="bg-gray-900 text-white"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a routerLink="/employees"
                 routerLinkActive="bg-gray-900 text-white"
                 class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Employees
              </a>
              <a routerLink="/employees/add"
                 routerLinkActive="bg-gray-900 text-white"
                 class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Add Employee
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavBarComponent {}