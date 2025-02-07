import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from "ngx-toastr";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { provideLottieOptions } from "ngx-lottie";
import player from 'lottie-web';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatIconModule } from '@angular/material/icon';
import { LayoutsModule } from '@shared/layouts/layouts.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNgxMask } from 'ngx-mask';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from '@services/auth-interceptor.service';
import { BrowserstateInterceptor } from './interceptors/browserstate.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconService } from './services/icon.service';
import { ClientComponent } from './views/private/client/client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { NgxCurrencyDirective } from 'ngx-currency';
import { RegistrationComponent } from './views/private/facility/facility-registration/registration/registration.component';
import { PrivateModule } from './views/private/private.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Registra o idioma local (pt-BR)
registerLocaleData(localePt, 'pt-BR');

// Configuração personalizada para o CurrencyMask
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
};

@NgModule({
  declarations: [
    AppComponent, 
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMomentDateModule,
    HttpClientModule,
    CurrencyMaskModule,
    NgxCurrencyDirective,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NgbModule,
    LayoutsModule, // Importa LayoutsModule para usar o SidebarComponent e outros layouts
  ],
  providers: [
    provideNgxMask(),
    provideLottieOptions({
      player: () => player,
    }),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
      }
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BrowserstateInterceptor, multi: true },
    provideAnimations(),
    provideNativeDateAdapter(),
    provideNgxMask(),
    IconService,
    provideAnimationsAsync(), // Serviço para gerenciar ícones SVG
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private iconService: IconService,
    private matIconRegistry: MatIconRegistry, // Adicionado "private"
    private domSanitizer: DomSanitizer
  ) {
    // Registrar o ícone SVG para collapse-menu
    this.matIconRegistry.addSvgIcon(
      'collapse-menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/collapse-menu.svg')
    );
  }
}

