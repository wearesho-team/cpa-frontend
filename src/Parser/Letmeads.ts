import { ParserInterface } from "../Service";

export const Letmeads: ParserInterface = (params: URLSearchParams) => {
    if (!params.has("letmeads_ref")) {
        return;
    }

    return {
        source: "letmeads",
        config: {
            letmeadsRef: params.get("letmeads_ref"),
        }
    }
};
