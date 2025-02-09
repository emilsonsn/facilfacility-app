import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { action } from '@models/action';
import { ActionService } from '@services/action.service';
import { ComponentService } from '@services/component.service';
import { DialogConfirmComponent } from '@shared/dialogs/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-action-registration',
  templateUrl: './action-registration.component.html',
  styleUrls: ['./action-registration.component.scss']
})
export class ActionRegistrationComponent implements OnInit {

  private extractFacilityIdFromUrl(): string | null {
    const urlSegments = this._router.url.split('/');
    const facilityIndex = urlSegments.indexOf('registration');
    return facilityIndex !== -1 ? urlSegments[facilityIndex + 1] : null;
  }
  

  @Input()
  action: action;
  
  @Input()
  facility_id: number;
  
  extraPhotos: string[] = [];

  form: FormGroup;

  @Output() returnToActions = new EventEmitter<void>();

  isDeleteActionModalOpen: boolean = false;

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


  selectedPhoto: string | null = null;
  components: any[];

  constructor(
    private fb: FormBuilder,
    private readonly _componentService: ComponentService,
    private readonly _actionService: ActionService,
    private readonly _toastrService: ToastrService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog
  ) { }

    ngOnInit() {
      this.form = this.fb.group({
        id: [null],
        component_id: [null],
        name: [null],
        type: [null],
        date: [null],
        category: [null],
        condition: [null],
        priority: [null],
        frequency: [null],
        coast: [null],
        curracy: [null],
        description: [null],
      });

      if(this.action){
        this.form.patchValue(this.action);
      }else{
        this.create(this.form.getRawValue());
      }

      this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(action => {
        this.update(action.id, action);
      });

      this.getComponents();
  }

  create(action){
    this._actionService.postAction(action)
    .subscribe({
      next: (res) => {
        this.form.get('id').patchValue(res.data.id);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  update(id: number, action: any): void {
    // Verifica se a data está definida e a converte para o formato correto
    if (action.date instanceof Date) {
      action.date = action.date.toISOString().split('T')[0]; // Converte para YYYY-MM-DD
    }
  
    const updatedAction = {
      ...action,
      coast: action.coast ? String(action.coast).replace(/\./g, '').replace(',', '.') : null,
    };
  
    console.log('Atualizando ação:', updatedAction);
  
    this._actionService.patchAction(id, updatedAction).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Erro ao atualizar ação:', error);
        this._toastrService.error(error.error.message || 'Erro ao atualizar ação.');
      },
    });
  }


  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Impede a inserção de letras e caracteres especiais
      return false;
    }
  
    return true;
  }
  
  onActionCoastInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
  
    // Remove caracteres não numéricos e converte para número
    let numericValue = inputElement.value.replace(/[^\d,-]/g, '');
    numericValue = numericValue.replace(',', '.'); // Converte decimal para formato padrão
  
    // Atualiza o valor formatado no formulário
    this.form.get('coast')?.setValue(numericValue, { emitEvent: false });
  }
  
  
  
  getComponents(){
    this._componentService.search()
    .subscribe({
      next: (res) => {
        this.components = res.data;
      },
      error: (error) => {

      }
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


      const formData = new FormData();
      formData.append('image', file);

      this.update(this.form.get('id').value, formData);
    }
  }
    onExtraPhotoSelected(index: number): void {
      this.imagePreview = this.extraPhotos[index];
    }

    openPreview(photo: string|any): void {
      this.selectedPhoto = photo;
    }
  
    closePreview(): void {
      this.selectedPhoto = null;
    }

    backFacilities(){
      this.returnToActions.emit()
    }

    openDeleteActionModal(): void {
      this.isDeleteActionModalOpen = true;
    }

    // Fechar modal
    closeDeleteActionModal(): void {
      this.isDeleteActionModalOpen = false;
    }

    
    comfirmDeleteAction(): void {
      this._actionService.deleteAction(this.action.id).subscribe({
        next: () => {
          this.isDeleteActionModalOpen = false;
  
          // Exibe mensagem de confirmação
          this._toastrService.success('Action deleted successfully!');
  
          // Notificar o componente pai para mudar a aba
          this.returnToActions.emit();
        },
        error: (error) => {
          this._toastrService.error(error.error.message);
          this.isDeleteActionModalOpen = false; // Fecha o modal
        },
      });
    }
    
  onDeleteImage(photo: string): void {
      this.closePreview();
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
      const id = this.action.id;
      this._actionService.deleteImage(id)
      .subscribe({
          next: (res) => {
            this._toastrService.success(res.message);
            this.imagePreview = null;
            this.action.image = null;
          },
          error: (error) => {
            this._toastrService.error(error.error.message);
          }
        })
    }    
    
  }

