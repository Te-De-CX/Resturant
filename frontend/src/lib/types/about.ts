import { StaticImageData } from "next/image";

export type FoodCardProp = {
    title: string,
    img: StaticImageData,
    text: string,
}
export type ChefCardProp = {
    name: string,
    img: StaticImageData,
    text: string,
}