
export interface ProductQuery {
  filter: string;
  sortCriteria: SortCriteria;
}

export enum SortCriteria {
  bestseller = 1,
  bestRated = 2,
  cheapest = 3,
  mostExpensive = 4,
}
