import crypto from "crypto"
import axios, { type AxiosError, type AxiosResponse } from "axios"

export type ClosedPaymentCode =
  | "MYBVA"
  | "PERMATAVA"
  | "BNIVA"
  | "BRIVA"
  | "MANDIRIVA"
  | "BCAVA"
  | "SMSVA"
  | "MUAMALATVA"
  | "CIMBVA"
  | "SAMPOERNAVA"
  | "BSIVA"
  | "DANAMONVA"
  | "ALFAMART"
  | "INDOMARET"
  | "ALFAMIDI"
  | "OVO"
  | "QRIS"
  | "QRIS2"
  | "QRISC"
  | "QRISD"
  | "SHOPEEPAY"

export type OpenPaymentCode =
  | "BNIVAOP"
  | "HANAVAOP"
  | "DANAMONOP"
  | "CIMBVAOP"
  | "BRIVAOP"
  | "QRISOP"
  | "QRISCOP"
  | "BSIVAOP"

export interface TripayConfigProps {
  apiKey: string
  privateKey: string
  merchant_code: string
  isProduction?: boolean
}

export interface TripayInputProps<T> {
  instruction: ({
    code,
    pay_code,
    amount,
    allow_html,
  }: InstructionProps) => Promise<T>
  paymentChannel: () => Promise<T>
  feeCalculator: ({ code, amount }: FeeCalculatorProps) => Promise<T>
  transactions: ({ page, per_page }: TransctionsProps) => Promise<T>
  openTransactions: ({ uuid }: OpenTransactionDetailProps) => Promise<T>
  createClosedTransaction: ({
    method,
    merchant_ref,
    amount,
    customer_name,
    customer_email,
    customer_phone,
    order_items,
    callback_url,
    return_url,
    expired_time,
  }: CreateClosedTransactionProps) => Promise<T>
  createOpenTransaction: ({
    method,
    merchant_ref,
    customer_name,
  }: CreateOpenTransactionProps) => Promise<T>
  closedTransactionDetail: ({
    reference,
  }: ClosedTransactionDetailProps) => Promise<T>
  openTransactionDetail: ({ uuid }: OpenTransactionDetailProps) => Promise<T>
}

export interface InstructionProps {
  code: ClosedPaymentCode
  pay_code?: string
  amount?: number
  allow_html?: boolean
}

export interface FeeCalculatorProps {
  amount: number
  code?: ClosedPaymentCode
}

export interface TransctionsProps {
  page: number
  per_page: number
}

export interface CreateClosedTransactionProps {
  method: ClosedPaymentCode
  merchant_ref?: string
  amount: number
  customer_name: string
  customer_email: string
  customer_phone: string
  order_items: {
    sku: string
    name: string
    price: number
    quantity: number
    subtotal: number
    product_url: string
    image_url: string
  }[]
  callback_url?: string
  return_url?: string
  expired_time?: number
}

export interface CreateOpenTransactionProps {
  method: OpenPaymentCode
  merchant_ref?: string
  customer_name: string
}

export interface ClosedTransactionDetailProps {
  reference: string
}

export interface OpenTransactionDetailProps {
  uuid: string
}

export interface InstructionReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    title: string
    steps: string[]
  }[]
}

export interface PaymentChannelReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    group: string
    code: ClosedPaymentCode | OpenPaymentCode
    name: string
    type: string
    fee_merchant?: {
      flat: number
      percent: number
    }
    fee_customer?: {
      flat: number
      percent: number
    }
    total_fee: {
      flat: number
      percent: number
    }
    minimum_fee: number
    maximum_fee: number
    icon_url: string
    active: boolean
  }[]
}

export interface FeeCalculatorReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    code: ClosedPaymentCode | OpenPaymentCode
    name: string
    fee: {
      flat: number
      percent: string
      min: number | null
      max: number | null
    }
    total_fee: {
      merchant: number
      customer: number
    }
  }[]
}

export interface TransactionsReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    reference: string
    merchant_ref: string
    payment_selection_type: string
    payment_method: ClosedPaymentCode | OpenPaymentCode
    payment_name: string
    customer_name: string
    customer_email: string
    customer_phone: string | null
    callback_url: string | null
    return_url: string | null
    amount: number
    fee_merchant: number
    fee_customer: number
    total_fee: number
    amount_received: number
    pay_code: number
    pay_url: string | null
    checkout_url: string
    order_items: [
      {
        sku: string | null
        name: string
        price: number
        quantity: number
        subtotal: number
      },
    ]
    status: string
    note: string | null
    created_at: number
    expired_at: number
    paid_at: number | null
  }[]
  pagination: {
    sort: string
    offset: {
      from: number
      to: number
    }
    current_page: number
    previous_page: number | null
    next_page: number | null
    last_page: number
    per_page: number
    total_records: number
  }
}

export interface OpenTransactionsReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    reference: string
    merchant_ref: string
    payment_method: string
    payment_name: string
    customer_name: string
    amount: number
    fee_merchant: number
    fee_customer: number
    total_fee: number
    amount_received: number
    checkout_url: string
    status: string
    paid_at: number
  }[]
  pagination: {
    total: number
    data_from: number
    data_to: number
    per_page: number
    current_page: number
    last_page: number
    next_page: number | null
  }
}

export interface CreateOpenTransactionReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    uuid: string
    merchant_ref: string
    customer_name: string
    payment_name: string
    payment_method: string
    pay_code: string
    qr_string: string | null
    qr_url: string | null
  }
}

export interface CreateClosedTransactionReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: {
    reference: string
    merchant_ref: string
    payment_selection_type: string
    payment_method: string
    payment_name: string
    customer_name: string
    customer_email: string
    customer_phone: string
    callback_url: string
    return_url: string
    amount: number
    fee_merchant: number
    fee_customer: number
    total_fee: number
    amount_received: number
    pay_code: string
    pay_url: string | null
    checkout_url: string
    status: string
    expired_time: number
    order_items: {
      sku: string
      name: string
      price: number
      quantity: number
      subtotal: number
      product_url: string
      image_url: string
    }[]
    instructions: [
      {
        title: string
        steps: string[]
      },
    ]
    qr_string: string | null
    qr_url: string | null
  }
}

export default function createTripayConfig({
  apiKey,
  privateKey,
  merchant_code,
  isProduction = false,
}: TripayConfigProps): TripayInputProps<unknown> {
  const endpoint = isProduction
    ? "https://tripay.co.id/api"
    : "https://tripay.co.id/api-sandbox"

  //Instructions
  const instruction = async ({
    code,
    pay_code,
    amount,
    allow_html,
  }: InstructionProps) => {
    const params =
      (pay_code ? `&pay_code=${pay_code}` : "") +
      (amount ? `&amount=${amount}` : "") +
      (allow_html ? `&allow_html=${allow_html}` : "")

    try {
      const { data } = await axios.get<InstructionReturnProps>(
        `${endpoint}/payment/instruction?code=${code}${params}`,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Payment Channel
  const paymentChannel = async () => {
    try {
      const { data } = await axios.get<PaymentChannelReturnProps>(
        `${endpoint}/merchant/payment-channel`,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //FEE Calculator
  const feeCalculator = async ({ code, amount }: FeeCalculatorProps) => {
    try {
      const { data } = await axios.get<FeeCalculatorReturnProps>(
        `${endpoint}/merchant/fee-calculator/${
          code ? `?code=${code}&amount=${amount}` : `?amount=${amount}`
        }`,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Transctions
  const transactions = async ({ page, per_page }: TransctionsProps) => {
    try {
      const { data } = await axios.get<TransactionsReturnProps>(
        `${endpoint}/merchant/transactions?page=${page}&per_page=${per_page} `,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Open Transaction
  const openTransactions = async ({ uuid }: OpenTransactionDetailProps) => {
    try {
      const { data } = await axios.get<OpenTransactionsReturnProps>(
        `https://tripay.co.id/api/open-payment/${uuid}/transactions`,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Create Closed Transaction
  const createClosedTransaction = async ({
    method,
    merchant_ref,
    amount,
    customer_name,
    customer_email,
    customer_phone,
    order_items,
    callback_url,
    return_url,
    expired_time,
  }: CreateClosedTransactionProps) => {
    const expiry: number = expired_time
      ? Math.floor(new Date().getTime() / 1000) + expired_time * 60 * 60
      : Math.floor(new Date().getTime() / 1000) + 1 * 60 * 60

    const payload = {
      method,
      merchant_ref,
      amount,
      customer_name,
      customer_email,
      customer_phone,
      order_items,
      callback_url,
      return_url,
      expired_time: expired_time ? expired_time : expiry,
      signature: crypto
        .createHmac("sha256", privateKey)
        .update(merchant_code + merchant_ref + amount)
        .digest("hex"),
    }

    try {
      const { data } = await axios.post<CreateClosedTransactionReturnProps>(
        `${endpoint}/transaction/create`,
        payload,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Create Open Transaction
  const createOpenTransaction = async ({
    method,
    merchant_ref,
    customer_name,
  }: CreateOpenTransactionProps) => {
    const payload = {
      method,
      merchant_ref,
      customer_name,
      signature: crypto
        .createHmac("sha256", privateKey)
        .update(merchant_code + method + merchant_ref)
        .digest("hex"),
    }

    try {
      const { data } = await axios.post<CreateOpenTransactionReturnProps>(
        "https://tripay.co.id/api/open-payment/create",
        payload,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )

      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Closed Transaction Detail
  const closedTransactionDetail = async ({
    reference,
  }: ClosedTransactionDetailProps) => {
    try {
      const { data } = await axios.get<CreateClosedTransactionReturnProps>(
        `${endpoint}/transaction/detail?reference=${reference}`,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )

      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  //Open Transaction Detail
  const openTransactionDetail = async ({
    uuid,
  }: OpenTransactionDetailProps) => {
    try {
      const { data } = await axios.get<CreateOpenTransactionProps>(
        `https://tripay.co.id/api/open-payment/${uuid}/detail`,
        {
          headers: { Authorization: "Bearer " + apiKey },
        },
      )
      return data
    } catch (error) {
      const axiosError = error as AxiosError<unknown>
      if (axiosError.response) {
        const { status, data } = axiosError.response
        let errorMessage = "Unknown error occurred"
        if (typeof data === "string") {
          errorMessage = data
        } else if (data && typeof data === "object" && "message" in data) {
          errorMessage = data.message as string
        }
        throw new Error(`Request failed with status ${status}: ${errorMessage}`)
      } else if (axiosError.request) {
        throw new Error("No response received from the server")
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  return {
    instruction,
    paymentChannel,
    feeCalculator,
    transactions,
    openTransactionDetail,
    openTransactions,
    createClosedTransaction,
    createOpenTransaction,
    closedTransactionDetail,
  }
}
