import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-registration',
  templateUrl: './action-registration.component.html',
  styleUrls: ['./action-registration.component.scss']
})
export class ActionRegistrationComponent implements OnInit {

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

    profiles = [
    { value: 'adminMaster', label: 'AdminMaster' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'client', label: 'Client' },
  ];

  actions = [
    { value: 'action1', label: 'Action 1' },
    { value: 'action2', label: 'Action 2' },
    { value: 'action3', label: 'Action 3' },
  ];
  categories = [
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    { value: 'category3', label: 'Category 3' },
  ];

    actives = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  components = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }];

  constructor(private fb: FormBuilder) { }


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

