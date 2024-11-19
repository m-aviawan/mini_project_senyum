import { AxiosError } from "axios";

export interface IValuesLoginUser {
    email: string,
    password: string,
}

export interface IResponseUseMutation {
    onSuccess: (res: any) => void,
    onError: (err: AxiosError) => void,
}