import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.registerIcons();
  }

  private registerIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'icon-facility-menu-item',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facility-menu-item.svg')
    );
    
    // Registra o ícone "add"
    this.matIconRegistry.addSvgIcon(
      'add-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg')
    );
  }
}
