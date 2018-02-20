import { LeadInterface } from "./LeadInterface";

export type ParserInterface = (params: URLSearchParams) => LeadInterface | undefined;
