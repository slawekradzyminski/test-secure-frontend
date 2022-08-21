export type EmailMessage = {
    total: number
    count: number
    start: number
    items: Item[]
}

type Item = {
    ID: string,
    From: EmailAddress,
    To: EmailAddress,
    Content: Content
    Created: string,
    MIME: string,
    Raw: Raw
}

type EmailAddress = {
    Relays: string,
    Mailbox: string,
    Domain: string,
    Params: string
}

type Raw = {
    From: string,
    To: string,
    Data: string
}

type Content = {
    Body: string,
    Size: number,
    MIME: string,
    Headers: Headers
}

type Headers = {
    "Content-Transfer-Encoding": string,
    "Content-Type": string,
    "Date": string,
    "From": string,
    "MIME-Version": string,
    "Message-ID": string,
    "Received": string,
    "Return-Path": string,
    Subject: string,
    To: string,
}