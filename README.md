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

## Installation
Using npm
```bash
npm i --save @bobra/cpa-frontend
```

## Usage

Add after page loaded:
```tsx
import { CpaIntegration } from "@bobra/cpa-frontend";

(new CpaIntegration).onLoad(new URLSearchParams(window.location.search));
```

Add after you identify user (LoginForm, bootstrap token found):
```tsx
import { CpaIntegration } from "@bobra/cpa-frontend";
import Raven from "raven-js";

// configure axios baseURL and authorization token here

try {
    (new CpaIntegration(window.location.hostname)).onLogin(
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
Implement [ParserInterface](./src/CpaIntegration.ts#L20) and specify it in constructor

```typescript
import { CpaIntegration, ParserInterface, CpaType } from "@bobra/cpa-frontend";

class CustomAdmitAdParser implements ParserInterface {
    // implementation
}

const cookieDomain = location.host;
const cpaIntegration = new CpaIntegration(cookieDomain, {
    [CpaType.admitAd]: CustomAdmitAdParser,
})
```

## Add new CPA
To add new CPA:
- Create parser in [src/](./src)
- Add your parser to [index.ts](./src/index.ts) exports
- Add your parser to [CpaType.ts](./src/CpaType.ts) enum
- Add your parser to [default parsers list](./src/CpaIntegration.ts#L26)
- Extend CPA networks list in [README](./README.md)

## License
Proprietary 
