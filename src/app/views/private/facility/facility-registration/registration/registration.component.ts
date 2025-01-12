import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@models/user';
import { FacilityService } from '@services/facility.service';
import { UserService } from '@services/user.service';
import { DialogConfirmComponent } from '@shared/dialogs/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';

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
  isDeleteFacilityModalOpen: boolean = false; // Controla a exibição do modal

  owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }];
  unities = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }, { id: 5, name: '5' }];
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
  extraPhotos: string[] = [];  // Fotos carregadas
  selectedPhoto: string | null = null; // Foto selecionada para preview
  photoIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,  
    private _facilityService: FacilityService,
    private readonly _toastrService: ToastrService,
    private readonly _userService: UserService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,    
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

    this.getUsers();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.facility_id = parseInt(id);
      if (id) {
        this._facilityService.getById(parseInt(id))
          .subscribe({
            next: (res) => {
              this.form.patchValue(res);
              const images = res.images.map( image => image.path);
              this.extraPhotos = images;
              this.photoIds = res.images.map( image => image.id);
            },
            error: (error) => {
              this._toastrService.error(error.error.message);
            }
          });
      }
    });

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          this.updateFacility(value);
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
        }
      });

      this.getFacilityPhotos();
  }

  openPreview(photo: string): void {
    this.selectedPhoto = photo;
  }

  closePreview(): void {
    this.selectedPhoto = null;
  }

  updateFacility(value) {
    this._facilityService.update(this.facility_id, value)
      .subscribe({
        next: () => {},
        error: (error) => {
          this._toastrService.error(error.error.message);
        }
      });
  }

  getFacilityPhotos(): void {
    this.extraPhotos = []
  }

  goToActions(): void {
    // Navega para a aba "Actions"
    this._router.navigate([`/painel/facility/registration/${this.facility_id}`]).then(() => {
      // Atualiza a URL para a aba de "Actions"
      setTimeout(() => {
        const actionsTab = document.getElementById('actions-tab');
        if (actionsTab) {
          actionsTab.click(); // Simula o clique para ativar a aba
        }
      }, 0);
    });
  }
  
  goToComponents(): void {
    this._router.navigate([`/painel/facility/registration/${this.facility_id}`]).then(() => {
      setTimeout(() => {
        const componentsTab = document.getElementById('components-tab');
        if (componentsTab) {
          componentsTab.click(); // Simula o clique para ativar a aba
        }
      }, 0);
    });
  }
  

  deleteFacility() {
    this.isDeleteFacilityModalOpen = true;
  }

  closeDeleteFacilityModal() {
    this.isDeleteFacilityModalOpen = false; // Fecha o modal
  }

  confirmDeleteFacility() {
    this._facilityService.delete(this.facility_id)
      .subscribe({
        next: () => {
          this.isDeleteFacilityModalOpen = false;
          this._router.navigate(['/painel/facility']);
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
          this.isDeleteFacilityModalOpen = false;
        }
      });
  }

  backFacilities(): void {
    this._router.navigate(['/painel/facility']);
  }

  goComponents(): void {
    this._router.navigate(['/painel/facility']);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.uploadFile(formData);      
    }
  }
  

  getUsers() {
    this._userService.getUsers({})
      .subscribe({
        next: (res) => {
          this.users = res.data;
        },
        error: () => {}
      });
  }

  public uploadFile(image){
    const id = this.form.get('id').value;
    this._facilityService.uploadFile(id, image)
    .subscribe({
      next: (res) => {
        this.extraPhotos.push(res.data.path);
        this.photoIds.push(res.data.id);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  onSmallPhotoSelected(index: number): void {
    this.imagePreview = this.smallPhotos[index];
  }

  onExtraPhotoSelected(index: number): void {
    this.imagePreview = this.extraPhotos[index];
  }

  onDeleteImage(photo: string): void {
    this.selectedPhoto = null;
    const index = this.extraPhotos.indexOf(photo);
    const id = this.photoIds[index];
    const text = 'Tem certeza? Essa ação não pode ser revertida!';
    this._dialog
      .open(DialogConfirmComponent, { data: { text } })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.deleteImage(id, index);
        }
      });
  }

  private deleteImage(id, index){
    this._facilityService.deleteImage(id)
     .subscribe({
        next: (res) => {
          this._toastrService.success(res.message);
          this.extraPhotos.splice(index, 1);
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
        }
      })
  }
}
