export interface ApiPaymentDto {
    jsonrpc: string
    id: string
    method: string
    params: ApiPaymentCard
}

export interface ApiPaymentCard {
    pan: string,
    expire: string,
    cardholder: string,
    cvc: string
}