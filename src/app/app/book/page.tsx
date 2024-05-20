"use client";
import CreateBookModal from "@/components/book/create-book-modal";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Book } from "@/models/book.model";
import { UserRole } from "@/models/user.model";
import { getBooks } from "@/utils/apis/book.api";
import { Button, Flex, Table } from "antd";
import * as React from "react";

export default function BookPage() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  React.useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks();
      setBooks(response);
    };
    fetchBooks();
  }, []);

  const columns = [
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
    </div>
  );
}
