# Tripay Client Library

## Installation

```sh
pnpm add tripay-sdk
# or
npm install tripay-sdk
# or
yarn add tripay-sdk
# or
bun add tripay-sdk
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
const openTransaction = await tripay.openTransactions('uuid');
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
const closedTransactionDetail = await tripay.closedTransactionDetail('reference');
```

##### Get Open Transaction Detail
```js
const openTransactionDetail = await tripay.openTransactionDetail('uuid');
```

NOTE:
* Closed Transaction Payment Method List: 
  - ALFAMART (Alfamart)
  - ALFAMIDI (Alfamidi)
  - BNIVA (BNI Virtual Account)
  - BRIVA (BRI Virtual Account)
  - BSIVA (BSI Virtual Account)
  - CIMBVA (CIMB Niaga Virtual Account)
  - DANA (DANA)
  - DANAMONVA (Danamon Virtual Account)
  - INDOMARET (Indomaret)
  - MANDIRIVA (Mandiri Virtual Account)
  - MUAMALATVA (Mualamat Virtual Account)
  - OCBCVA (OCBC NISP Virtual Account)
  - OTHERBANKVA (Other Bank Virtual Account)
  - OVO (OVO)
  - PERMATAVA (Permata Virtual Account)
  - QRIS (QRIS by ShopeePay)
  - QRIS2 (QRIS)
  - QRISC (QRIS Customizable)
  - QRIS_SHOPPEEPAY (QRIS Custom by ShopeePay)
  - SHOPEEPAY (ShopeePay)
* Open Transaction Payment Method List:
  - BNIVAOP (BNI Virtual Account Open Payment)
  - BRIVAOP (BRI Virtual Account Open Payment)
  - BSIVAOP (BsI Virtual Account Open Payment)
  - CIMBVAOP (CIMB Niaga Virtual Account Open Payment)
  - DANAMONOP (Danamon Virtual Account Open Payment)
  - HANAVAOP (Hana Virtual Account Open Payment)
  - QRISCOP (QRIS Customizable Open Payment)
  - QRISOP (QRIS Open Payment)

### Webhook (Coming Soon)
