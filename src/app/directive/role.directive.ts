import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthStore} from "../core/services/auth.store";
import {intersect} from "../shared/intersect/intersect.function";

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  @Input() appRole: string[] = [];

  roleArray: string[] = []

  constructor(
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef,
    private authStore: AuthStore) { }

  ngOnInit() {
    const role = this.authStore.state.user?.roles

    role?.forEach((el)=> {
      this.roleArray.push(el)
    })
    // console.log(this.roleArray);
    // console.log(this.appRole)

    // console.log(this.roleArray?.includes('member') && !this.roleArray?.includes('librarian'));
    const intersection = intersect(this.appRole, role)
    // console.log(this.appRole, role)

    // console.log(intersection)

    if(intersection.length > 0) {
      // console.log('authorized');
    } else {
      console.log('not authorized')
      this.elementRef.nativeElement.remove();
    }

  }
}
