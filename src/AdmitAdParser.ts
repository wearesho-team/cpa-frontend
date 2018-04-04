import { ParserInterface } from "./CpaIntegration";

export const AdmitAdParser: ParserInterface = (params: URLSearchParams) => {
    if (!params.has("admitad_uid")) {
        return;
    }

    return {
        source: "admit-ad",
        config: {
            uid: params.get("admitad_uid"),
        }
    }
};
