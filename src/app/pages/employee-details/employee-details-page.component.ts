import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { selectEmployeeById } from '../../store/employee.selectors';

@Component({
  selector: 'app-employee-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      @if (employee$ | async; as employee) {
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Employee Information
            </h3>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ employee.firstName }} {{ employee.lastName }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Position</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ employee.position }}
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ employee.email }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Department</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ employee.department }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      } @else {
        <div class="text-center py-12">
          <p class="text-gray-500">Employee not found</p>
        </div>
      }
    </div>
  `
})
export class EmployeeDetailsPageComponent implements OnInit {
  employee$: Observable<Employee | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.employee$ = this.store.select(selectEmployeeById(id));
  }

  ngOnInit() {
    this.employee$.subscribe(employee => {
      if (!employee) {
        this.router.navigate(['/employees']);
      }
    });
  }
}