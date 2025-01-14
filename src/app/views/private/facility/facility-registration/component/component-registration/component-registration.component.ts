import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { component } from '@models/component';
import { ComponentService } from '@services/component.service';
import { FacilityService } from '@services/facility.service';
import { DialogConfirmComponent } from '@shared/dialogs/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-component-registration',
  templateUrl: './component-registration.component.html',
  styleUrls: ['./component-registration.component.scss']
})
export class ComponentRegistrationComponent implements OnInit {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  extraPhotos: string[] = ['assets/photos/photo1.jpg', 'assets/photos/photo2.jpg'];

  // Propriedades esperadas no HTML
  componentTypes: string[] = [ 'Structure', 'Building Enclosure', 'Interior Finishing', 'Conveying', 
    'Plumbing', 'HVAC', 'Fire Protection', 'Electrical', 'Security', 'Site Components'];
  categories: string[] = ['Foundations', 'Suspended Slab', 'Slab on Grade', 'Floor Construction', 'Roof Construction',
    'Exterior Walls', 'Exterior Windows', 'Exterior Doors', 'Roof Coverings', 'Roof Openings',
    'Partitions', 'Interior Doors', 'Fittings', 'Stair Construction', 'Stair Finishes',
    'Wall Finishes', 'Floor Finishes', 'Ceiling Finishes', 'Elevators & Lifts', 'Escalators & Moving Walks',
    'Other Conveying Systems', 'Plumbing Fixtures', 'Domestic Water Distribution', 'Sanitary Waste',
    'Rain Water Drainage', 'Other Plumbing Systems', 'Energy Supply', 'Heat Generating Systems',
    'Cooling Generating Systems', 'Distribution Systems', 'Terminal & Package Units', 'Controls & Instrumentation',
    'Sprinklers', 'Standpipes', 'Fire Protection Specialties', 'Other Fire Protection Systems',
    'Electrical Service & Distribution', 'Lighting and Branch Wiring', 'Communications & Security',
    'Site Fixtures', 'Site Soft Landscape', 'Site Hard Landscape'];

  componentConditions: string[] = [
      'Failed (0% of Lifetime)',
      'Critical (15% of Lifetime)',
      'Poor (30% of Lifetime)',
      'Fair (50% of Lifetime)',
      'Good (70% of Lifetime)',
      'Excellent (100% of Lifetime)'
    ];
  owners: string[] = ['Owner 1', 'Owner 2', 'Owner 3'];

  unityOptions: string[] = [
    'SM', 'SF', 'LM', 'LF', 'Each', 'KW', 'Ton', 'BTU’s'
  ];

  // @Input() component: component;
  @Input() component: any;

  @Input() facility_id: number;

  @Output() returnToComponents = new EventEmitter<void>();

  isDeleteComponentModalOpen: boolean = false;
  selectedPhoto: string | null = null; // Foto selecionada para preview

  backToComponents(): void {
    this.returnToComponents.emit();
  }

  constructor(
    private fb: FormBuilder,
    private readonly _componentService: ComponentService,
    private readonly _toastrService: ToastrService,
    private readonly _router: Router,
    private readonly _facilityService: FacilityService,
    private readonly _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      facility_name: [null],
      name: [''],
      facility_id: [this.facility_id],
      group: [''],
      uniformat: [],
      time_left_by_condition: [''],
      condition: [''],
      year_installed: [''],
      quantity: [''],
      unity: [''],
      unit_cost: [''],
      time_left_by_lifespan: [''],
      coast: [''],
      currency: [''],
      unit_currency: [''],
      description: [''],
    });

    if(this.component){
      this.form.patchValue(this.component);      
    }else{
      this.create(this.form.getRawValue());
    }

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          this.update(value.id, value);
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
        }
      });
    
      this.getFacility();
    
  }

  getFacility(){    
    this._facilityService.getById(this.facility_id)
    .subscribe(res => {
      this.form.get('facility_name').patchValue(res.name);
    })
  }

  create(component){
    this._componentService.create(component)
    .subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  update(id, component){
    this._componentService.update(id, component)
    .subscribe({
      next: (res) => {
        // this.form.patchValue(res.data);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  onSubmit(): void {
    console.log('Form Data:', this.form.value);
  }

  onExtraPhotoSelected(index: number): void {
    this.imagePreview = this.extraPhotos[index];
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      this.update(this.form.get('id').value, formData);
    }
  }

  backFacilities(){
    window.location.href = '/painel/facility/registration/' + this.facility_id;
  }

  openPreview(photo: string): void {
    this.selectedPhoto = photo;
  }

  closePreview(): void {
    this.selectedPhoto = null;
  }

    // Abrir o modal de confirmação
    openDeleteComponentModal(): void {
      this.isDeleteComponentModalOpen = true;
    }
  
    // Fechar o modal de confirmação
    closeDeleteComponentModal(): void {
      this.isDeleteComponentModalOpen = false;
    }

    confirmDeleteComponent(): void {
      this._componentService.deleteComponent(this.component.id).subscribe({
        next: () => {
          this.isDeleteComponentModalOpen = false;
          this._toastrService.success('Component deleted successfully!');
          this.returnToComponents.emit(); // Notifica o componente pai para voltar à listagem
        },
        error: (error) => {
          this._toastrService.error('Error deleting component.');
          this.isDeleteComponentModalOpen = false;
        }
      });
    }

  onDeleteImage(photo: string): void {
    this.selectedPhoto = null;
    const text = 'You will permanently delete this information.';
    this._dialog
      .open(DialogConfirmComponent, { data: { text } })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.deleteImage();
        }
      });
  }

  private deleteImage(){
    const id = this.form.get('id').value;
    this._componentService.deleteImage(id)
     .subscribe({
        next: (res) => {
          this._toastrService.success(res.message);
          this.component.image = null;
          this.imagePreview = null;
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
        }
      })
  }
}
