import { ParserInterface } from "../Service";

export const AdmitAd: ParserInterface = (params: URLSearchParams) => {
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
