export enum BookStatus {
  Available = "available",
  CheckedOut = "checked out",
  Maintenance = "maintenance",
  Lost = "lost",
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  genre: string;
  status: BookStatus;
}
