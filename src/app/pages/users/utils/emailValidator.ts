import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function emailValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    let email = control.value;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      return null;
    }

    const emailValidated = email.forEach((emailValue: string)=> {
      if (emailValue.match(regexEmail)) {
        return true;
      } else {
        return false;
      }
    })

    return !emailValidated ? {emailValidation:true}: null;

  }
}
