export type JwtSessionResponseDTO = {
    userId: string;
    jwt: string;
};

export type LoginDTO = {
    email: string;
    password: string;
};