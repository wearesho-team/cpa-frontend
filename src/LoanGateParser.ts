import { ParserInterface } from "./CpaIntegration";

export const LoanGateParser: ParserInterface = (params: URLSearchParams) => {
    if (!params.has("afclick")) {
        return;
    }

    return {
        source: "loan-gate",
        config: {
            aid: params.get("afclick"), // web master identifier
        }
    }
};
