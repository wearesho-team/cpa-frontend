import {expect} from "chai";
import {LeadFactory} from "../src/LeadFactory";
import {SalesDoublerLead} from "../src/SalesDoubler/SalesDoublerLead";
import {PrimeLeadLead} from "../src/PrimeLead/PrimeLeadLead";
import "url-search-params-polyfill";

describe("Test generating lead using LeadFactory", () => {
    let factory: LeadFactory;
    const salesDoublerData = {
        utm_source: "salesdoubler",
        aff_sub: 123,
    };
    const primeLeadData = {
        utm_source: "primelead",
        transaction_id: 123,
    };

    beforeEach(() => {
        factory = new LeadFactory();
    });

    describe("Test url", () => {
        it("Should not create lead with params that don't match any lead", () => {
            expect(factory.fromUrl("?utm_source=unknown")).to.be.equal(undefined);
        });

        it("Should create SalesDoublerLead with its correct params", () => {
            const url = "?" + Object.keys(salesDoublerData)
                .map((key: string) => `${key}=${salesDoublerData[key]}`)
                .join("&");

            expect(factory.fromUrl(url)).to.be.instanceOf(SalesDoublerLead);
        });

        it("Should create PrimeLeadLead with its correct params", () => {
            const url = "?" + Object.keys(primeLeadData)
                .map((key: string) => `${key}=${primeLeadData[key]}`)
                .join("&");

            expect(factory.fromUrl(url)).to.be.instanceOf(PrimeLeadLead);
        });
    });

    describe("Test cookie", () => {
        it("Should not create lead with params that don't match any lead", () => {
            expect(factory.fromCookie(`{"utm_source": "unknown"}`)).to.be.equal(undefined);
        });

        it("Should create SalesDoublerLead", () => {
            expect(factory.fromCookie(JSON.stringify(salesDoublerData))).to.be.instanceOf(SalesDoublerLead);
        });

        it("Should create SalesDoublerLead", () => {
            expect(factory.fromCookie(JSON.stringify(primeLeadData))).to.be.instanceOf(PrimeLeadLead);
        });
    });
});
