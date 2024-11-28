"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Book } from "./types/book";
import LanguageSelector from "./components/LanguageSelector";
import SliderInput from "./components/SliderInput";
import BookTable from "./components/BookTable";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [seed, setSeed] = useState<string>("1");
  const [likes, setLikes] = useState<number>(5);
  const [reviews, setReviews] = useState<number>(5);
  const [tempLikes, setTempLikes] = useState<number>(5);
  const [tempReviews, setTempReviews] = useState<number>(5);
  const [language, setLanguage] = useState<string>("en_US");

  const fetchBooks = async () => {
    const response = await fetch(
      `/api/generateBooks?seed=${seed}&likes=${likes}&reviews=${reviews}&count=20`
    );
    const data: Book[] = await response.json();
    setBooks(data);
  };

  const handleGenerateSeed = () => {
    const randomSeed = Math.floor(Math.random() * 10000).toString();
    setSeed(randomSeed);
    setLikes(tempLikes);
    setReviews(tempReviews);
    fetchBooks();
  };

  const handleInputSeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(event.target.value);
  };

  const downloadCSV = () => {
    const headers = [
      "Index",
      "ISBN",
      "Title",
      "Author(s)",
      "Publisher",
      "Likes",
      "Reviews",
    ];
    const rows = books.map((book) => [
      book.index,
      book.isbn,
      book.title,
      book.authors,
      book.publisher,
      book.likes,
      book.reviews,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((item) => `"${item}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `books_seed_${seed}.csv`);
    link.click();
  };

  return (
    <main className="flex flex-col w-full h-screen p-8 space-y-8">
      <div className="flex flex-col items-center space-y-6">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={seed}
            onChange={handleInputSeed}
            placeholder="Enter your seed"
            className="p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <Button onClick={handleGenerateSeed}>Generate Random Seed</Button>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex flex-col items-start">
            <div className="flex space-x-4">
              <Button onClick={fetchBooks}>Fetch Books</Button>
              <Button
                onClick={downloadCSV}
                className="bg-green-500 hover:bg-green-600"
              >
                Download CSV
              </Button>
            </div>
            <p className="text-sm mt-2 text-gray-600">Seed: {seed}</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
            <SliderInput
              label="Average Likes"
              value={tempLikes}
              setValue={setTempLikes}
            />
            <SliderInput
              label="Average Reviews"
              value={tempReviews}
              setValue={setTempReviews}
            />
          </div>
        </div>
        <BookTable books={books} seed={"seed"} />
      </div>
    </main>
  );
}
