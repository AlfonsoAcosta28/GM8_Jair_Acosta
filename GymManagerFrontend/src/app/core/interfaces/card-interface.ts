export interface CardInterface{
    typeCard: string
    closeHeader: boolean
    header?: Header
    body: Body
    footer: Footer
}

export interface Body{
    title?: string
    tittleClass?: string
    desc: string
    descClass?: string
    subDesc?: string
    subDescClass?: string
}

export interface Footer{
    footerType: footerType
    footerClass?: string
    label:string
}

export interface Header{
    title: string[],
    siglas?: string
    titleClass?:string
}

export enum footerType{
    typeLbl='label',
    typeBtn = 'button'

}
