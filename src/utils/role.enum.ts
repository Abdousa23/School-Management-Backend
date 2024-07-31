import { registerEnumType } from "@nestjs/graphql";
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}
registerEnumType(Role, {
    name: 'Role', // this one is mandatory
    description: 'The roles of the users', // this one is optional
  });