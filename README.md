# CPA Integration

This packages created fo commercial products of [Wearesho Team](https://wearesho.com)
Should be used in pair with [wearesho-team/bobra-cpa](https://github.com/wearesho-team/bobra-cpa) back-end

Integrated:
- SalesDoubler
- DoAffiliate
- LoanGate
- Cashka
- AdmitAd
- PrimeLead
- LeadsSu
- FinLine
- Letmeads
- LeadGid
- LinkProfit

## Installation
Using npm
```bash
npm i --save @sho-js/cpa
```

## Usage

Add after page loaded:
```typescript
import * as Cpa from "@sho-js/cpa";

(new Cpa.Service).onLoad(new URLSearchParams(window.location.search));
```

Add after you identify user (LoginForm, bootstrap token found):
```typescript
import * as Cpa from "@sho-js/cpa";
import Raven from "raven-js";

// configure axios baseURL and authorization token here

try {
    (new Cpa.Service(window.location.hostname)).onLogin(
        /** path to back-end should be generated here */
        (source) => `/lead/${source}`
    );
} catch (error) {
    if (process.env.NODE_ENV !== 'production') {
        throw error;
    }
    Raven.captureException(error);
}
```
**Raven usage is optional**

## Parsers customization

You can override default parsers if default config is incompatible with your application.
Implement [ParserInterface](src/Service.ts) and specify it in constructor

```typescript
import * as Cpa from "@sho-js/cpa"

class CustomAdmitAdParser implements Cpa.ParserInterface {
    // implementation
}

const cookieDomain = location.host;
const cpaIntegration = new Cpa.Service(cookieDomain, {
    [Cpa.Type.admitAd]: CustomAdmitAdParser,
})
```

## Add new CPA
To add new CPA:
- Create parser in [src/](./src)
- Add your parser to [index.ts](./src/index.ts) exports
- Add your parser to [Type.ts](src/Type.ts) enum
- Add your parser to [Service.parsers](src/Service.ts)
- Extend CPA networks list in [README](./README.md)

## License
Proprietary 
