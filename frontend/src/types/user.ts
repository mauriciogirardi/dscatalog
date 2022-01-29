export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type Roles = {
    authority: string;
    id: number;
};

export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles[];
};
