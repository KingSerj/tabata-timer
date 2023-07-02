import {useCallback} from "react";
import {IProgramProps} from "../components/commons/interfaces/ProgramProps";

export const useTabataProgram = (url: string, method: string) => {
    return useCallback(async (body: IProgramProps) => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (res.status !== 200) {
                const json = await res.json();
                alert(json.message);
            }

            return await res.json();
        } catch (e) {
            console.error(e);
        }
    }, [url, method]);
};