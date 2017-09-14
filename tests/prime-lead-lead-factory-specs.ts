import {expect} from "chai";
import {PrimeLeadLeadFactory} from "../src/PrimeLead/PrimeLeadLeadFactory";
import {PrimeLeadLead} from "../src/PrimeLead/PrimeLeadLead";
import "url-search-params-polyfill";

describe("Test generating lead from url and cookie", () => {
    let factory: PrimeLeadLeadFactory;
    const transactionId = Math.random() * (1000000 - 1) + 1;

    beforeEach(() => {
        factory = new PrimeLeadLeadFactory();
    });

    describe("Test url", () => {
        it("Should not generate lead with url without search parr", () => {
            expect(factory.fromUrl("https://google.com")).to.be.equal(undefined);
        });

        it("Should not generate lead without utm_source", () => {
            expect(factory.fromUrl(`?transaction_id=${transactionId}`)).to.be.equal(undefined);
        });

        it("Should not generate lead without transaction_id", () => {
            expect(factory.fromUrl("?utm_source=primelead")).to.be.equal(undefined);
        });

        it("Should not generate lead with incorrect utm_source", () => {
            expect(factory.fromUrl(`?utm_source=123&transaction_id=${transactionId}`)).to.be.equal(undefined);
        });

        it("Should generate lead with correct url", () => {
            let url = `?utm_source=primelead&transaction_id=${transactionId}`;
            expect(factory.fromUrl(url)).to.be.instanceOf(PrimeLeadLead);

            url = `?transaction_id=${transactionId}&utm_source=primelead`;
            expect(factory.fromUrl(url)).to.be.instanceOf(PrimeLeadLead);
        });
    });

    describe("Test cookie", () => {
        it("Should not generate lead with empty cookie", () => {
            expect(factory.fromCookie("")).to.be.equal(undefined);
        });

        it("Should not generate lead with incorrect cookie", () => {
            expect(factory.fromCookie(undefined)).to.be.equal(undefined);
        });

        it("Should not generate lead without utm_source in cookie", () => {
            expect(factory.fromCookie(`{"transaction_id"=${transactionId}}`)).to.be.equal(undefined);
        });

        it("Should not generate lead without transaction_id", () => {
            expect(factory.fromCookie("{'utm_source'='primelead'}")).to.be.equal(undefined);
        });

        it("Should correctly generate lead", () => {
            const cookie = JSON.stringify({
                utm_source: "primelead",
                transaction_id: transactionId,
            });
            expect(factory.fromCookie(cookie)).to.be.instanceOf(PrimeLeadLead);
        });
    });
});
