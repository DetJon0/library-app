import {AbstractControl, ValidationErrors} from "@angular/forms";

export function emailValidator() {
  return (control:AbstractControl) : ValidationErrors | null => {

    let emails: string[] = control.value;
    return !validate(emails) ? {emailValid:true}: null;

  }

}

export function validate(emails: string[]) {
  emails.every((email)=> {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  })
}
