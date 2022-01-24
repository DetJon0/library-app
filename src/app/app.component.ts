import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'library-app';


//  n eon init do kerkosh per token ne localstorage nese ka bej dhe thirrjen me dh evendose ne behaviour subject nese jo mos bej asgje
//  nje alternative tjeter eshte qe ne local storage te ruash dhe userin njesoj formatin sic e pranon behaviour subject dhe nese ka i jep next behaviour subject dhe ske nevoje te besh nje thirrje te dyte
}
