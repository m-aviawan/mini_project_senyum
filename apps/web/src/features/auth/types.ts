import { AxiosError } from "axios";

export interface IValuesLoginUser {
    email: string,
    password: string,
}

export interface IResponse {
    onSuccess: (res: any) => void,
    onError: (err: AxiosError) => void,
}