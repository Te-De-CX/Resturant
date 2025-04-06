import { StaticImageData } from "next/image";

export type FoodCardProp = {
    key: number,
    title: string,
    img: StaticImageData,
    text: string,
}
export type ChefCardProp = {
    key: number,
    name: string,
    img: StaticImageData,
    text: string,
}