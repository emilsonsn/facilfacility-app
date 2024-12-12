import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@models/user';
import { FacilityService } from '@services/facility.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { debounce, debounceTime } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  facility_id: number;
  users: User[];

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,  
    private _facilityService: FacilityService,
    private readonly toastrService: ToastrService,
    private readonly _userService: UserService,
    private readonly _router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      user_id: [''],
      number: [''],
      used: [''],
      size: [''],
      unity: [''],
      report_last_update: [''],
      consultant_name: [''],
      address: [''],
      city: [''],
      region: [''],
      country: [''],
      zip_code: [''],
      year_installed: [''],
      replacement_cost: [''],
      description: [''],
    });

    this.getUsers()

    this.route.paramMap.subscribe(params => {
      const id =params.get('id');
      this.facility_id = parseInt(id);
      if(id){
        this._facilityService.getById(parseInt(id))
        .subscribe({
          next: (res) => {
            this.form.patchValue(res);
          },
          error: (error) => {
            this.toastrService.error(error.error.message)
          }
        });
      }
    });

    this.form.valueChanges
    .pipe(debounceTime(500))
    .subscribe({
      next: (value) => {
        this.updateFacility(value)
      },
      error: (error) => {

      }
    })
  }

  updateFacility(value){
    this._facilityService.update(this.facility_id, value)
    .subscribe({
      next: () => {},
      error: (error) => {
        this.toastrService.error(error.error.message)
      }
    })
  }

  deleteFacility(){
    this._facilityService.delete(this.facility_id)
    .subscribe({
      next: () => {
    this._router.navigate([`/painel/facility`]);

      },
      error: (error) => {
        this.toastrService.error(error.error.message)
      }
    })
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


  getUsers(){
    this._userService.getUsers({})
    .subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: () => {}
    });
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

