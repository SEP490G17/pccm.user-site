export class LoginDto {
  username: string = '';
  password: string = '';

  constructor(data?: Partial<LoginDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class RegisterDto {
  email: string = '';
  password: string = '';
  displayName: string = '';
  username: string = '';
  phoneNumber: string = '';
  firstName?: string = '';
  lastName?: string = '';

  constructor(data?: Partial<RegisterDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
