import { useCallback } from "react";
import { TABATA_GET_ENDPOINT } from "../api/endpoints";

export const useGetProgramList = () => {
    return useCallback(() =>
            fetch(TABATA_GET_ENDPOINT)
                .then((response) => response.json()), [])
}