import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  unity: [''];

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
      year_installed: [ '',
        [
        Validators.required,
        Validators.min(1900),
        Validators.max(2099),
        Validators.pattern(/^\d{4}$/), 
        ],
      ],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit_cost: [0, [Validators.required, Validators.min(0)]],
      coast: [{ value: 0, disabled: true }],
      time_left_by_lifespan: [''],
      currency: [''],
      unit_currency: [''],
      lifespan: [''], // Adicionando o controle
      description: [''],
    });
    

    this.form.get('quantity')?.valueChanges.subscribe(() => this.calculateCoast());
    this.form.get('unit_cost')?.valueChanges.subscribe(() => this.calculateCoast());

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

  create(component) {
    console.log('Criando componente com os dados:', component);
    this._componentService.create(component).subscribe({
      next: (res) => {
        this.form.patchValue(res.data); 
      },
      error: (error) => {
        console.error('Erro ao criar componente:', error);
        this._toastrService.error(error.error.message || 'Erro ao criar componente. Tente novamente.');
      }
    });
  }

  update(id, component) {
    const updatedComponent = {
      ...component,
      quantity: component.quantity?.toString() || '0',
      unit_cost: component.unit_cost?.toString() || '0',
      year_installed: component.year_installed?.toString() || '',
      unit_currency: component.unit_currency?.toString() || '',
      time_left_by_condition: component.time_left_by_condition?.toString() || '',
      time_left_by_lifespan: component.time_left_by_lifespan?.toString() || '',
      lifespan: component.lifespan?.toString() || '',
    };
  
    console.log('Atualizando componente com os dados:', updatedComponent);
  
    this._componentService.update(id, updatedComponent).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Erro ao atualizar componente:', error);
        this._toastrService.error(error.error.message || 'Erro ao atualizar componente.');
      },
    });
  }
  

  calculateCoast(): void {
    const quantity = Number(this.form.get('quantity')?.value) || 0;
    const unitCost = Number(this.form.get('unit_cost')?.value) || 0;
    const coast = quantity + unitCost;
  
    this.form.get('coast')?.setValue(coast, { emitEvent: false });
  }

  validateYearInstalled(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    // Permitir apenas 4 caracteres
    if (value.length > 4) {
      input.value = value.slice(0, 4);
      this.form.get('year_installed')?.setValue(input.value); // Atualizar o FormControl
    }
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
