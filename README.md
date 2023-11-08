# Tripay Client Library

## Installation

```sh
pnpm add tripay-sdk
# or
npm install tripay-sdk
# or
yarn add tripay-sdk
```

## API

### Create Tripay Config
```js
import createTripayConfig from "tripay-sdk"

const tripay = createTripayConfig({
    apiKey: [your tripay api key],
    privateKey: [your tripay private api key]
    merchant_code: [your tripay merchant code]
    isProduction: [boolean default false]
})
```

#### Instruction
```js
const instruction = await tripay.instruction({
    code: 'pay code',
    amount: 'amount',
    allow_html: ''
});
```

#### Payment Channel
```js
const paymentChannel = await tripay.paymentChannel();
```

#### Fee Calculator
```js
const feeCalculator = await tripay.feeCalculator({
    code: 'payment code',
    amount: 'amount'
});
```

#### Get Transaction List

##### Closed Transactions
```js
const transactions = await tripay.transactions({
    page: 'page'
    per_page: 'per page data'
});
```

##### Open Transactions
```js
const openTransaction = await tripay.openTransactions({
    uuid: 'uuid'
});
```

#### Create Transaction

##### Create Closed Transaction
```js
const closedTransaction = await tripay.createClosedTransaction({
    method: 'payment method'
    merchant_ref: 'merchant_ref',
    amount: 'amount Transaction',
    customer_name: 'customer name',
    customer_phone: 'customer phone',
    order_items: 'array of item ordered',
    callback_url: 'callback url',
    return_url: 'return_url',
    expired_time: by default 1 hour
});
```

##### Create Open Transaction

```js
const openTransaction = await tripay.createOpenTransaction({
    method: 'payment method'
    merchant_ref: 'merchant_ref',
    customer_name: 'customer name'
});
```

#### Get Transaction Detail

##### Get Closed Transaction Detail
```js
const closedTransactionDetail = await tripay.closedTransactionDetail({
    reference: 'reference number'
});
```

##### Get Open Transaction Detail
```js
const openTransactionDetail = await tripay.openTransactionDetail({
    uuid: 'uuid'
});
```

NOTE:
* Closed Transaction Payment Method List: 
  - MYBVA
  - PERMATAVA
  - BNIVA
  - BRIVA
  - MANDIRIVA
  - BCAVA
  - SMSVA
  - MUAMALATVA
  - CIMBVA
  - SAMPOERNAVA
  - BSIVA
  - DANAMONVA
  - ALFAMART
  - INDOMARET
  - ALFAMIDI
  - OVO
  - QRIS
  - QRIS2
  - QRISC
  - QRISD
  - SHOPEEPAY
* Open Transaction Payment Method List:
  - BNIVAOP
  - HANAVAOP
  - DANAMONOP
  - CIMBVAOP
  - BRIVAOP
  - QRISOP
  - QRISCOP
  - BSIVAOP

### Webhook (Coming Soon)
