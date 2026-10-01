import { ICasoDePrueba } from "./ICasoDePrueba";

export class CasoDePrueba implements ICasoDePrueba {
    public id: number = 0;
    public titulo: string = "";
    public estado: "Pass" | "Fail" = "Pass";
}