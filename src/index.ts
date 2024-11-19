import crypto from "crypto"
import axios, { type AxiosError, type AxiosResponse } from "axios"

export type ClosedPaymentCode =
  | "ALFAMART" // Alfamart
  | "ALFAMIDI" // Alfamidi
  | "BNIVA" // BNI Virtual Account
  | "BRIVA" // BRI Virtual Account
  | "BSIVA" // BSI Virtual Account
  | "CIMBVA" // CIMB Niaga Virtual Account
  | "DANA" // DANA
  | "DANAMONVA" // Danamon Virtual Account
  | "INDOMARET" // Indomaret
  | "MANDIRIVA" // Mandiri Virtual Account
  | "MUAMALATVA" // Mualamat Virtual Account
  | "OCBCVA" // OCBC NISP Virtual Account
  | "OTHERBANKVA" // Other Bank Virtual Account
  | "OVO" // OVO
  | "PERMATAVA" // Permata Virtual Account
  | "QRIS" // QRIS by ShopeePay
  | "QRIS2" // QRIS
  | "QRISC" // QRIS Customizable
  | "QRIS_SHOPPEEPAY" // QRIS Custom by ShopeePay
  | "SHOPEEPAY" // ShopeePay

export type OpenPaymentCode =
  | "BNIVAOP" // BNI Virtual Account Open Payment
  | "BRIVAOP" // BRI Virtual Account Open Payment
  | "BSIVAOP" // BsI Virtual Account Open Payment
  | "CIMBVAOP" // CIMB Niaga Virtual Account Open Payment
  | "DANAMONOP" // Danamon Virtual Account Open Payment
  | "HANAVAOP" // Hana Virtual Account Open Payment
  | "QRISCOP" // QRIS Customizable Open Payment
  | "QRISOP" // QRIS Open Payment

export interface TripayConfigProps {
  apiKey: string
  privateKey: string
  merchant_code: string
  isProduction?: boolean
}

export interface TripayInputProps {
  instruction: (props: InstructionProps) => Promise<InstructionReturnProps>
  paymentChannel: () => Promise<PaymentChannelReturnProps>
  feeCalculator: (
    props: FeeCalculatorProps,
  ) => Promise<FeeCalculatorReturnProps>
  transactions: (props: TransctionsProps) => Promise<TransactionsReturnProps>
  openTransactions: (uuid: string) => Promise<OpenTransactionsReturnProps>
  createClosedTransaction: (
    props: CreateClosedTransactionProps,
  ) => Promise<CreateClosedTransactionReturnProps>
  createOpenTransaction: (
    props: CreateOpenTransactionProps,
  ) => Promise<CreateOpenTransactionReturnProps>
  closedTransactionDetail: (
    reference: string,
  ) => Promise<ClosedTransactionDetailReturnProps>
  openTransactionDetail: (
    uuid: string,
  ) => Promise<OpenTransactionDetailReturnProps>
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
  order_items: OrderItem[]
  callback_url?: string
  return_url?: string
  expired_time?: number
}

interface OrderItem {
  sku: string
  name: string
  price: number
  quantity: number
  subtotal: number
  product_url: string
  image_url: string
}

export interface CreateOpenTransactionProps {
  method: OpenPaymentCode
  merchant_ref?: string
  customer_name: string
}

export interface ClosedTransactionDetailReturnProps {
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
    paid_at: string
    expired_time: number
    order_items: OrderItem[]
    instructions: InstructionDataReturnProps[]
  }
}

export interface OpenTransactionDetailReturnProps {
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

interface InstructionDataReturnProps {
  title: string
  steps: string[]
}

export interface InstructionReturnProps extends AxiosResponse {
  success: boolean
  message: string
  data: InstructionDataReturnProps[]
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
}: TripayConfigProps): TripayInputProps {
  const endpoint = isProduction
    ? "https://tripay.co.id/api"
    : "https://tripay.co.id/api-sandbox"

  const instruction = async (
    props: InstructionProps,
  ): Promise<InstructionReturnProps> => {
    const { code, pay_code, amount, allow_html } = props

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

  const paymentChannel = async (): Promise<PaymentChannelReturnProps> => {
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

  const feeCalculator = async (
    props: FeeCalculatorProps,
  ): Promise<FeeCalculatorReturnProps> => {
    const { amount, code } = props

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

  const transactions = async (
    props: TransctionsProps,
  ): Promise<TransactionsReturnProps> => {
    const { page, per_page } = props

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

  const openTransactions = async (
    uuid: string,
  ): Promise<OpenTransactionsReturnProps> => {
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

  const createClosedTransaction = async (
    props: CreateClosedTransactionProps,
  ): Promise<CreateClosedTransactionReturnProps> => {
    const {
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
    } = props

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

  const createOpenTransaction = async (
    props: CreateOpenTransactionProps,
  ): Promise<CreateOpenTransactionReturnProps> => {
    const { method, merchant_ref, customer_name } = props

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

  const closedTransactionDetail = async (
    reference: string,
  ): Promise<ClosedTransactionDetailReturnProps> => {
    try {
      const { data } = await axios.get<ClosedTransactionDetailReturnProps>(
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

  const openTransactionDetail = async (
    uuid: string,
  ): Promise<OpenTransactionDetailReturnProps> => {
    try {
      const { data } = await axios.get<OpenTransactionDetailReturnProps>(
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
