import {Component, inject} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {AuthStore} from '../../../application/auth-store';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    RouterOutlet,
    MatMenuTrigger,
    MatMenu

    /*,
        FooterContent*/
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  options = [
    { link: '/home',  label: 'option.home'},
    { link: '/about', label: 'option.about'},
    { link: '/suppliers', label: 'option.suppliers'}

  ];

  get isAuthenticated() {
    return this.authStore.isAuthenticated();
  }

  onLogout(): void {
    this.authStore.logout();
    this.router.navigate(['/sign-in']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']); // Ajusta según tu ruta de perfil
  }

}
