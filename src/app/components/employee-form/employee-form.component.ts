import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from '../../store/employee.actions';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6">{{ editMode ? 'Edit' : 'Add' }} Employee</h2>
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="mb-6">
          <div class="flex items-center space-x-4">
            <div class="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
              @if (previewImage) {
                <img [src]="previewImage" alt="Preview" class="w-full h-full object-cover">
              } @else {
                <div class="w-full h-full flex items-center justify-center text-gray-400">
                  No Photo
                </div>
              }
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Employee Photo</label>
              <input type="file" (change)="onPhotoSelected($event)" accept="image/*" class="mt-1">
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" formControlName="firstName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" formControlName="lastName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" formControlName="phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <input type="text" formControlName="department" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Position</label>
            <input type="text" formControlName="position" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Salary</label>
            <input type="number" formControlName="salary" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Joining Date</label>
            <input type="date" formControlName="joiningDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Reporting Manager</label>
          <select formControlName="reportingManagerId" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option [ngValue]="null">None</option>
            @for (manager of managers$ | async; track manager.id) {
              <option [value]="manager.id">{{ manager.firstName }} {{ manager.lastName }}</option>
            }
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">About</label>
          <textarea formControlName="about" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Brief description about the employee..."></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <textarea formControlName="address" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
          <input type="text" formControlName="skills" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        
        <div class="flex justify-end space-x-3">
          <button type="button" (click)="resetForm()" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Reset
          </button>
          <button type="submit" [disabled]="!employeeForm.valid" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
            {{ editMode ? 'Update' : 'Add' }} Employee
          </button>
        </div>
      </form>
    </div>
  `
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  editMode = false;
  private currentId = 1;
  previewImage: string | null = null;
  managers$: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ employees: { employees: Employee[] } }>
  ) {
    this.createForm();
    this.managers$ = store.select(state => state.employees.employees);
  }

  ngOnInit() {}

  createForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      joiningDate: ['', Validators.required],
      address: ['', Validators.required],
      skills: ['', Validators.required],
      photo: [''],
      about: ['', Validators.required],
      reportingManagerId: [null]
    });
  }

  onPhotoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result as string;
        this.employeeForm.patchValue({ photo: this.previewImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employee: Employee = {
        id: this.currentId++,
        ...formValue,
        skills: formValue.skills.split(',').map((skill: string) => skill.trim()),
        reportingManagerId: formValue.reportingManagerId ? Number(formValue.reportingManagerId) : null
      };

      this.store.dispatch(EmployeeActions.addEmployee({ employee }));
      this.resetForm();
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.editMode = false;
    this.previewImage = null;
  }
}