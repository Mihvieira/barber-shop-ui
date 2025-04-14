export class Client {
  constructor(id?: number, name?: string, phone?: string, email?: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }

  id: number | undefined;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}

export class ClientPost {
  name!: string;
  phone!: string;
  email!: string;
}

export class ClientUpdate {
  id!: number;
  name!: string;
  phone!: string;
  email!: string;
}
