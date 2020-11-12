// Sobrescrever uma tipagem de dentro do express
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }

}