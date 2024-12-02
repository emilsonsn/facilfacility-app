import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  // Lista de opções para o campo "profile"
  profiles = [
    { value: 'adminMaster', label: 'AdminMaster' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'client', label: 'Client' },
  ];

  actives = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      profile: ['', Validators.required], // Campo para o select
      password: ['', Validators.required],
      phone: [''],
      city: [''],
      region: [''],
      country: [''],
      zipCode: [''],
      active: [true, Validators.required],
      clientAddress: [''],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
