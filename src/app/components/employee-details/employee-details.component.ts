import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" 
         *ngIf="employee">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-start">
          <h2 class="text-2xl font-bold mb-4">Employee Details</h2>
          <button (click)="close.emit()" class="text-gray-500 hover:text-gray-700">
            <span class="text-2xl">&times;</span>
          </button>
        </div>
        
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-1">
            <div class="w-full aspect-square rounded-lg overflow-hidden bg-gray-200 mb-4">
              @if (employee.photo) {
                <img [src]="employee.photo" [alt]="employee.firstName" class="w-full h-full object-cover">
              } @else {
                <div class="w-full h-full flex items-center justify-center text-gray-400">
                  No Photo
                </div>
              }
            </div>
            
            <div class="space-y-2">
              <h3 class="font-semibold text-lg">{{ employee.firstName }} {{ employee.lastName }}</h3>
              <p class="text-gray-600">{{ employee.position }}</p>
              <p class="text-gray-600">{{ employee.department }}</p>
            </div>
          </div>
          
          <div class="col-span-2 space-y-6">
            <div>
              <h4 class="font-semibold mb-2">About</h4>
              <p class="text-gray-600">{{ employee.about }}</p>
            </div>
            
            @if (reportingManager$ | async; as manager) {
              <div>
                <h4 class="font-semibold mb-2">Reporting Manager</h4>
                <p class="text-gray-600">{{ manager.firstName }} {{ manager.lastName }}</p>
                <p class="text-gray-500 text-sm">{{ manager.position }}</p>
              </div>
            }
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold mb-2">Contact Information</h4>
                <p class="text-gray-600">{{ employee.email }}</p>
                <p class="text-gray-600">{{ employee.phone }}</p>
                <p class="text-gray-600">{{ employee.address }}</p>
              </div>
              
              <div>
                <h4 class="font-semibold mb-2">Employment Details</h4>
                <p class="text-gray-600">Joined: {{ employee.joiningDate | date }}</p>
                <p class="text-gray-600">Salary: ${{ employee.salary | number }}</p>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">Skills</h4>
              <div class="flex flex-wrap gap-2">
                @for (skill of employee.skills; track skill) {
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {{ skill }}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EmployeeDetailsComponent {
  @Input() employee: Employee | null = null;
  reportingManager$: Observable<Employee | null>;

  constructor(private store: Store<{ employees: { employees: Employee[] } }>) {
    this.reportingManager$ = store.select(state => state.employees.employees).pipe(
      map(employees => {
        if (this.employee?.reportingManagerId) {
          return employees.find(emp => emp.id === this.employee?.reportingManagerId) || null;
        }
        return null;
      })
    );
  }
}