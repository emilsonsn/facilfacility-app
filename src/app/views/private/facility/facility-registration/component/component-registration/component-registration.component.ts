import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { component } from '@models/component';
import { ComponentService } from '@services/component.service';
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

  @Input()
  component: component;

  @Input()
  facility_id: number;

  constructor(
    private fb: FormBuilder,
    private readonly _componentService: ComponentService,
    private readonly _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: [''],                // Facility Name
      type: [''],                // Group
      category: [],            // Uniformat
      owner: [''],               // Component Name
      version: [''],             // Time left by condition
      status: [''],              // Component condition
      creationDate: [''],        // Year installed
      lastUpdated: [''],         // Quantity
      size: [''],                // Unity
      units: [''],               // Lifespan
      location: [''],
      unitCost: [''],            // Unit cost
      currency: [''],            // Currency
      timeLeftLifespan: [''],    // Time left by lifespan
      coast: [''],               // Coast
      unity: [''],
      condition: [''],           // Condition
      description: [''],
      facility_id: [this.facility_id]
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
          this.update(value);
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
        }
      });
    
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

  update(component){
    this._componentService.update(component.id, component)
    .subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
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
    }
  }
}
