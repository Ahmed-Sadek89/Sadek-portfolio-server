import { awner } from "@prisma/client";

export type Awner = awner
export type AwnerLogin = { email: string, password: string }
export type AwnerWithoutPassword = Omit<awner, 'password'>;