import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent, MatChip, MatChipInput } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@models/user';
import { FacilityService } from '@services/facility.service';
import { HeaderService } from '@services/header.service';
import { UserService } from '@services/user.service';
import { DialogConfirmComponent } from '@shared/dialogs/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import * as _moment from 'moment';
import { Moment } from 'moment';

const LANG = "pt-BR";
const CURRENCY = "USD";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit {
  headerTitle: string = '';
  form: FormGroup;
  formattedValue: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  facility_id: number;
  users: User[];
  isDeleteFacilityModalOpen: boolean = false; // Controla a exibição do modal

  owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }];
  unities = [{ id: 1, name: 'SM' }, { id: 2, name: 'SF' }];
  usages = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
  ];

  usedOptions: string[] = [
    'Residential',
    'Commercial',
    'Mix use',
    'Institutional',
    'Hospital',
    'Daycare',
    'Gymnasium',
    'Utility Plan',
    'Garage',
    'Storage',
    'Service building',
    'Others',
  ]
  selectedOption: string | null = null;
  newOption: string = '';
  filteredOptions: string[] = [...this.usedOptions];
  separatorKeysCodes: number[] = [13, 188]; // Enter e vírgula
  usedControl = new FormControl();
  
  // Máscaras para Replacement Coast
  currencies = [
    { code: 'BRL', symbol: 'R$', label: '' },
    { code: 'CAD', symbol: 'C$', label: '' },
    { code: 'USD', symbol: 'US$', label: '' },    
  ]
  selectedCurrency = this.currencies[1];
  mask: string;
  thousandSeparator: string;
  prefix: string;

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
    private headerService: HeaderService
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      user_id: [''],
      number: [''],
      used: [''],
      size: [''],
      unity: [''],
      report_last_update: [null, Validators.required], 
      consultant_name: [''],
      address: [''],
      city: [''],
      region: [''],
      country: [''],
      zip_code: [''],
      year_installed: [ '',
        [
        Validators.required,
        Validators.min(1900),
        Validators.max(2099),
        Validators.pattern(/^\d{4}$/), 
        ],
      ],
      replacement_cost: ['', Validators.required],
      description: [''],
    });

    

    this.getUsers();

    this.form.get('name')?.valueChanges.subscribe((value) => {
      this.headerService.setHeaderTitle(value || ''); // Atualiza o título dinamicamente
    });  

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); 
      if (id) {
        this.facility_id = parseInt(id, 10); 
        this.loadFacilityData(this.facility_id); 
      } else {
        console.error('ID não encontrado na rota!');
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

  
    
  

  onCurrencyChange(currency: any): void {
    this.selectedCurrency = currency;
  }

  loadFacilityData(id: number): void {
    this._facilityService.getById(id).subscribe({
      next: (res) => {
        this.form.patchValue(res);
        this.headerService.setHeaderTitle(res.name || ''); 
      },
      error: (error) => {
        console.error('Erro ao carregar dados da facility:', error);
        this._toastrService.error('Erro ao carregar dados da facility.');
      },
    });
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
  
  applyCurrencyMask(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
  
    // Remove tudo que não for número
    let rawValue = value.replace(/[^\d]/g, '');
  
    // Se o valor for vazio, define como '0'
    if (!rawValue) {
      rawValue = '0';
    }
  
    // Converte para um valor com dois decimais (sempre adicionando os centavos)
    const integerPart = rawValue.slice(-2) || ''; // Tudo antes dos dois últimos dígitos
    const decimalPart = rawValue.slice(-2).padStart(2, ''); // Sempre 2 dígitos para os centavos
  
    // Formata a parte inteira com separadores de milhar
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Combina a parte inteira e decimal no formato correto
    const formattedValue = `${formattedInteger},${decimalPart}`;
  
    // Atualiza o valor do campo de entrada
    inputElement.value = formattedValue;
  
    // Atualiza o FormControl associado sem disparar eventos
    this.form.get('replacement_cost')?.setValue(formattedValue, { emitEvent: false });
  
    // Mantém o cursor no final do campo
    setTimeout(() => {
      const cursorPosition = inputElement.value.length;
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  }
  
  
  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Impede a inserção de letras e caracteres especiais
      return false;
    }
  
    return true;
  }

  addOption(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.usedOptions.includes(value)) {
      this.usedOptions.push(value);
    }
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

  removeOption(option: string): void {
    const index = this.usedOptions.indexOf(option);
    if (index >= 0) {
      this.usedOptions.splice(index, 1);
    }
  }

  selectOption(event: any): void {
    const value = event.option.viewValue;
    if (!this.usedOptions.includes(value)) {
      this.usedOptions.push(value);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    event.stopPropagation(); 
  }


  addNewOption(): void {
    if (this.newOption.trim() && !this.usedOptions.includes(this.newOption.trim())) {
      this.usedOptions.push(this.newOption.trim());
      this.selectedOption = this.newOption.trim(); // Define a nova opção como selecionada
      this.newOption = ''; // Limpa o campo de entrada
    }
  }

  onSelect(selectedValue: string): void {
    this.selectedOption = selectedValue; 
    this.form.get('used')?.setValue(selectedValue); 
    console.log("🏗️ Opção selecionada:", selectedValue);
  }  

  onSelectClosed(): void {
    setTimeout(() => {
      const inputElement = document.querySelector('.new-option-input') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  }

  
  
  


  openPreview(photo: string): void {
    this.selectedPhoto = photo;
  }

  closePreview(): void {
    this.selectedPhoto = null;
  }

  updateFacility(value: any): void {
    if (!this.facility_id) {
      console.error('Facility ID não definido. Verifique se o ID foi carregado corretamente.');
      return;
    }
  
    let replacementCost = value.replacement_cost;
  
    // Converta replacementCost para string, caso não seja
    if (typeof replacementCost !== 'string') {
      replacementCost = String(replacementCost);
    }
  
    // Transforme "1.000,00" em "1000.00"
    replacementCost = replacementCost.replace(/\./g, '').replace(',', '.');
  
    const updatedValue = {
      ...value,
      unity: value.unity?.toString() || '',
      year_installed: value.year_installed?.toString() || '',
      replacement_cost: replacementCost,
    };
  
    this._facilityService.update(this.facility_id, updatedValue).subscribe({
      next: () => {
        console.log('Atualização bem-sucedida!');
      },
      error: (error) => {
        console.error('Erro ao salvar:', error);
        this._toastrService.error('Erro ao salvar a facility. Verifique os dados e tente novamente.');
      },
    });
  }

  getFacilityPhotos(): void {
    this._facilityService.getPhotos(this.facility_id).subscribe({
      next: (res) => {
        this.extraPhotos = res.data.map(photo => photo.path); // Extraindo os caminhos corretamente
      },
      error: (error) => {
        console.error('❌ Erro ao carregar fotos:', error);
        this._toastrService.error('Erro ao carregar fotos da facility.');
      }
    });
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
    const text = 'You will permanently delete this information.';
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
