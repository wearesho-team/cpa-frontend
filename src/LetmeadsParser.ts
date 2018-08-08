import { ParserInterface } from "./CpaIntegration";

export const LetmeadsParser: ParserInterface = (params: URLSearchParams) => {
    if (!params.has("letmeads_ref")) {
        return;
    }

    return {
        source: "letmeads",
        config: {
            letmeads_ref: params.get("letmeads_ref"),
        }
    }
};
