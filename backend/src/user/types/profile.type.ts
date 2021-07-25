import { UserType } from "./user.type";

export type ProfileType = Omit<UserType, 'token'>