import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormPipe } from './payment-form.pipe';
import { PhoneMaskPipe } from './phone-mask.pipe';
import { CpfCnpjMaskPipe } from './cpf-cnpj-mask.pipe';
import { CompanyPositionPipe } from './company-position.pipe';

const pipes = [
  PaymentFormPipe,
  PhoneMaskPipe,
  CpfCnpjMaskPipe,
  CompanyPositionPipe
];

@NgModule({
  declarations: [
    pipes,
    CompanyPositionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    pipes
  ]
})
export class PipesModule { }
