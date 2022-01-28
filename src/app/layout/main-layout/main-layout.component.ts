import {Component} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../pages/auth/services/auth.service";
import {AuthStore} from "../../core/services/auth.store";
import {tap} from "rxjs";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  items: MegaMenuItem[] = this.getItems();

  visibleSidebar1 = true;

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
