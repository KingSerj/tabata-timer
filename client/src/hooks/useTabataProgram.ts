import {useCallback} from "react";

export const useTabataProgram = (url: string, method: string) => {
    return useCallback(async (body: any) => {
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
            console.log(e);
        }
    }, [url, method]);
};