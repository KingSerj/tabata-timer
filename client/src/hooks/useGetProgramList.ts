import {useCallback} from "react";

export const useGetProgramList = () => {
    return useCallback(() =>
            fetch("http://localhost:3002/api/tabata/titles")
                .then((response) => response.json()), []);
};