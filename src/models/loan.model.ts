import { Book } from "./book.model";

export enum LoanStatus {
  Pending = "pending",
  Borrowing = "borrowing",
  Returning = "returning",
  Returned = "returned",
}

export interface Loan {
  id: number;
  user_id: number;
  book_id: number;
  start_date: Date;
  due_date: Date;
  status: LoanStatus;
  createdAt: Date;
  updatedAt: Date;
  book: Book;
}
