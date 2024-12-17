import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-registration',
  templateUrl: './action-registration.component.html',
  styleUrls: ['./action-registration.component.scss']
})
export class ActionRegistrationComponent implements OnInit {
    
  extraPhotos: string[] = ['assets/photos/photo1.jpg'];

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

    profiles = [
    { value: 'adminMaster', label: 'AdminMaster' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'client', label: 'Client' },
  ];

  actions = [
    { value: 'no', label: 'NO' },
    { value: 'repair', label: 'Repair' },
    { value: 'replace', label: 'Replace' },
    { value: 'study', label: 'Study' },
    { value: 'unknown', label: 'Unknown' },
  ];

  categories = [
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    { value: 'category3', label: 'Category 3' },
  ];

  condictions = [
    { value: 'unknown', label: 'Unknown' },
    { value: 'failed', label: 'Failed' },
    { value: 'poor', label: 'Poor' },
    { value: 'fair', label: 'Fair' },
    { value: 'good', label: 'Good' },
    { value: 'excellent', label: 'Excellent' },
  ];

  actionPriorities = [
    { value: '1-2', label: '1 to 2 Years' },
    { value: '3-4', label: '3 to 4 Years' },
    { value: '5', label: '5 Years' },
    { value: '6-10', label: '6 to 10 Years' },
    { value: '11-15', label: '11 to 15 Years' },
    { value: '16-20', label: '16 to 20 Years' },
    { value: '21-25', label: '21 to 25 Years' },
    { value: '26-30', label: '26 to 30 Years' },
    { value: '31+', label: 'Over 31 Years' },
  ];
  
  actionCategories = [
    { value: 'functionality', label: 'Functionality' },
    { value: 'maintenance', label: 'Regular Maintenance' },
    { value: 'grandfather', label: 'Grandfather Code' },
    { value: 'life-safety', label: 'Life Safety' },
    { value: 'beyond-life', label: 'Beyond Useful Life' },
    { value: 'fire-safety', label: 'Fire Safety' },
    { value: 'hazmat', label: 'HazMat' },
    { value: 'energy', label: 'Energy' },
  ];
  

    actives = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  components = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }];

  constructor(private fb: FormBuilder) { }

    ngOnInit() {
      this.form = this.fb.group({
        actionDate: ['', Validators.required],
        actionName: ['', [Validators.required, Validators.email]],
        actionCondiction: [''],
        actionPriority: ['', Validators.required], // Campo para o select
        profile: ['', Validators.required],
        description: [''],
        facilityOwner: [''],
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
    onExtraPhotoSelected(index: number): void {
      this.imagePreview = this.extraPhotos[index];
    }
  }

