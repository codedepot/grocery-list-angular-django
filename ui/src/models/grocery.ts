export interface GroceryItem {
    name: string
    comments: string;
    count: number;
    created: Date;
    id: number;
    priority: number;
    purchased: boolean;
}

export interface GroceryItemPartial {
    name?: string
    comments?: string;
    count?: number;
    created?: Date;
    id?: number;
    priority?: number;
    purchased?: boolean;
}