import {Component} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../pages/auth/services/auth.service";
import {AuthStore} from "../../core/services/auth.store";
import {tap} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    ]
})
export class MainLayoutComponent {

  menuState:string = 'out';

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  items: MegaMenuItem[] = this.getItems();

  nameChanges$ = this.authStore.name$.pipe(
    tap((name) => {
      this.items = this.getItems()
      }
    )
  );

  constructor(private authService: AuthService, private authStore: AuthStore) { }

  onProfileLogout() {
    this.authService.logout();
  }

  private getItems(): MegaMenuItem[] {
    return [
      {
        label: this.authStore.getName(),
        items: [
          [
            {
              items: [{ label: 'Edit Profile', routerLink: '/edit-profile'},
                { label: 'Logout', command: () => this.onProfileLogout()}]
            }
          ]
        ]
      }
    ];
  }

}
