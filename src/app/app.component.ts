import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-nav-bar />
      <main>
        <router-outlet />
      </main>
      <footer class="bg-white mt-auto">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p class="text-center text-gray-500 text-sm">
            © {{ currentYear }} Employee Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}