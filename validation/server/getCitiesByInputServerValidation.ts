import { LogicError } from "@/helpers/errorAndResponseHandlers";

export const getCitiesByInputServerValidation = async (input: string) => {
    if (!input)
        throw new LogicError("Brak danych do zastosowania w filtrze", 400);
};
