import { StaticImageData } from "next/image";

export interface MenuCardProps {
    id?: number,
    name:string,
    description?: string,
    img: StaticImageData | string,
    newPrice: number,
    formerPrice: number,
}

export interface NewsCardProps {
    name: string,
    date: string,
    img: StaticImageData,
}

export interface ReviewsCardProps {
    name: string,
    position: string,
    text: string,
    numberOfStars: number,
    img: StaticImageData,
}

export interface MarqueCardProps {
    name: string,
    price: number,
    numberOfStars: number,
    img: StaticImageData,
}