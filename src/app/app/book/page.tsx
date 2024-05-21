"use client";
import BorrowBookModal from "@/components/book/borrow-book-modal";
import CreateBookModal from "@/components/book/create-book-modal";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Book, BookStatus } from "@/models/book.model";
import { UserRole } from "@/models/user.model";
import { getBooks } from "@/utils/apis/book.api";
import { capitalizeFirstLetter } from "@/utils/string";
import { Button, Flex, Table, TableColumnType } from "antd";
import * as React from "react";

export default function BookPage() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openBorrow, setOpenBorrow] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const { user } = useAuth();

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const columns: TableColumnType<Book>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render(value) {
        return (
          <div>
            <p>{capitalizeFirstLetter(value)}</p>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render(value, record, index) {
        return (
          <div>
            {record.status === BookStatus.Available && (
              <Button
                type="primary"
                onClick={() => {
                  setSelectedBook(record);
                  setOpenBorrow(true);
                }}
              >
                Borrow
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {user?.role !== UserRole.USER && (
        <Flex className="justify-end mb-4">
          <Button onClick={() => setOpen(true)}>Add New Book</Button>
        </Flex>
      )}
      <Table dataSource={books} columns={columns} />
      <CreateBookModal isModalOpen={open} onClose={() => setOpen(false)} />
      <BorrowBookModal
        isModalOpen={openBorrow}
        onClose={() => {
          setOpenBorrow(false);
          setSelectedBook(null);
          fetchBooks();
        }}
        book_id={selectedBook?.id}
        book_title={selectedBook?.title}
      />
    </div>
  );
}
