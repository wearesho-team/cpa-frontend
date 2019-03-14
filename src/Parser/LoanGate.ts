import { ParserInterface } from "../Service";

export const LoanGate: ParserInterface = (params: URLSearchParams) => {
    if (!params.has("afclick")) {
        return;
    }

    return {
        source: "loan-gate",
        config: {
            afclick: params.get("afclick"),
        }
    }
};
