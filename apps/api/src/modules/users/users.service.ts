import { Injectable } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';

export type UserRecord = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  passwordHash: string;
};

export type PublicUser = Omit<UserRecord, 'passwordHash'>;

@Injectable()
export class UsersService {
  private readonly users: UserRecord[] = [
    {
      id: '1',
      email: 'admin@misviajes.mx',
      fullName: 'Administrador MisViajes',
      role: Role.ADMIN,
      passwordHash: '$2b$10$c4CMAoFjPJFCMwYko9W7se66DToxlnEp0OCrcqBo1vYEVng8V1maq',
    },
  ];

  findByEmail(email: string): UserRecord | undefined {
    return this.users.find((user) => user.email === email);
  }

  findById(id: string): UserRecord | undefined {
    return this.users.find((user) => user.id === id);
  }

  toPublicUser(user: UserRecord): PublicUser {
    const { passwordHash: _passwordHash, ...publicUser } = user;
    return publicUser;
  }
}
