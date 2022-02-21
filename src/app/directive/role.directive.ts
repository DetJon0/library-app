import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthStore} from "../core/services/auth.store";

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  roleArray: string[] = []

  constructor(private viewContainer: ViewContainerRef, private elementRef: ElementRef, private authStore: AuthStore) { }

  ngOnInit() {
    const role = this.authStore.state.user?.roles

    role?.forEach((el)=> {
      this.roleArray.push(el)
    })
    console.log(this.roleArray);

    console.log(this.roleArray?.includes('member') && !this.roleArray?.includes('librarian'));

    const checkPermission = this.roleArray?.includes('member')

    if(checkPermission) {
      this.elementRef.nativeElement.style.display = 'none';
    } else {
      this.elementRef.nativeElement.style.display = 'inline-block';
    }
  }

}
