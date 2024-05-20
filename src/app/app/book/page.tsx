"use client";
import { Book } from "@/models/book.model";
import { getBooks } from "@/utils/apis/book.api";
import { Table } from "antd";
import { title } from "process";
import * as React from "react";

export default function BookPage() {
  const [books, setBooks] = React.useState<Book[]>([]);
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
      <Table dataSource={books} columns={columns} />
    </div>
  );
}
