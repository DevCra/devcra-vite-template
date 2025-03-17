import { BaseStorage } from "./base-storage";

type Sth = {};

export const sthStorage = new BaseStorage<Sth[]>(localStorage, "sth");
