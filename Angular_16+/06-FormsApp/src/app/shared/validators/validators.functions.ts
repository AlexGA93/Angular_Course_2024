import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

// fucntion that checks if form control is strider
export const cantBeRegisteredUser = (
  control: FormControl
): ValidationErrors | null => {
  // extract control value to compare
  const value = control.value.trim().toLowerCase();
  console.log(value);

  // example of username give by backend
  const usernameFromDatabase = 'John93'.trim().toLowerCase();

  if (value === usernameFromDatabase) {
    return { noUser: true };
  }

  return null;
};

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

