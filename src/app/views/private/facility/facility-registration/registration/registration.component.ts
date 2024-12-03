import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }];
  unities = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 2, name: '3' }, { id: 2, name: '4' }, { id: 2, name: '5' }];
  usages = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
  ];

    // Fotos para miniaturas menores
    smallPhotos: string[] = [
      'assets/photos/small-photo1.jpg',
      'assets/photos/small-photo2.jpg'
    ];
  
    // Fotos para a linha extra
    extraPhotos: string[] = [
      'assets/photos/extra-photo1.jpg',
      'assets/photos/extra-photo2.jpg',
      'assets/photos/extra-photo3.jpg'
    ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      facilityName: [''],
      facilityOwner: [''],
      facilityNumber: [''],
      facilityUsed: [''],
      address: [''],
      city: [''],
      country: [''],
      zipCode: [''],
    });
  }

  // Função para carregar a foto principal
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  }

    // Função para selecionar uma foto menor
    onSmallPhotoSelected(index: number): void {
      this.imagePreview = this.smallPhotos[index];
    }
  
    // Função para selecionar uma foto extra
    onExtraPhotoSelected(index: number): void {
      this.imagePreview = this.extraPhotos[index];
    }
  }

