import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthStore} from "../core/services/auth.store";

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>, private authStore: AuthStore) { }

  @Input() set(hideForRoles: []){
    const role = this.authStore.state.user?.roles
    console.log(role);
    const intersection = this.intersect(role, hideForRoles)

    if(intersection.length === 0) {
      this.viewContainer.clear()
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }

  }


  intersect(a: [] | undefined, b: [] | undefined) {
    const setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
  }


}
