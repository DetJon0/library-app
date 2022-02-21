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

    console.log(this.roleArray?.includes('member'));

    const checkPermission = this.roleArray?.includes('member')

    if(checkPermission) {
      this.elementRef.nativeElement.style.display = 'none';
    } else {
      this.elementRef.nativeElement.style.display = 'inline-block';
    }

    // if(intersection.length > 0) {
    //   this.elementRef.nativeElement.style.display = 'none';
    // } else {
    //
    // }
  }


  // @Input() set(hideForRoles: []){
  //   const role = this.authStore.state.user?.roles
  //   console.log(role);
  //   const intersection = this.intersect(role, hideForRoles)
  //
  //   if(intersection.length === 0) {
  //     this.viewContainer.clear()
  //   } else {
  //     this.viewContainer.createEmbeddedView(this.templateRef)
  //   }
  //
  // }


  intersect(a: [] | undefined, b: [] | string[] | undefined) {
    const setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
  }


}
