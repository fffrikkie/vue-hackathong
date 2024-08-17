export interface ProductListObject {
    id: number;
    name: string;
    description: string | undefined;
    price: number;
    imageUrl: string | undefined;
    tags: string[];
}
