export type JwtSessionResponseDTO = {
    userId: string;
    jwt: string;
    role: string;
};

export type LoginDTO = {
    email: string;
    password: string;
};