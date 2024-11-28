import { useState, useMemo } from "react";
import { faker } from "@faker-js/faker";
import { Book } from "../types/book";
import React from "react";

interface BookGalleryProps {
  books: Book[];
  seed: string;
}

export default function BookTable({ books, seed }: BookGalleryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const gradients = useMemo(
    () => [
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-green-400 to-blue-500",
      "bg-gradient-to-r from-yellow-400 to-red-500",
      "bg-gradient-to-r from-indigo-400 to-purple-600",
      "bg-gradient-to-r from-teal-400 to-blue-600",
    ],
    []
  );

  const getGradient = (index: number) => {
    const seedInt = parseInt(seed, 10) || 0; // Ensure seed is a number
    return gradients[(index + seedInt) % gradients.length];
  };

  const reviewsMemo = useMemo(() => {
    faker.seed(parseInt(seed, 10)); // Seed faker with the provided seed
    return books.map((book) => {
      if (book.reviews === 0) return []; // No reviews if reviews === 0
      return Array.from({ length: book.reviews }, () => ({
        reviewer: faker.person.fullName(),
        company: faker.company.name(),
        review: faker.lorem.sentence(),
      }));
    });
  }, [books, seed]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => {
          const gradient = getGradient(index);
          const reviews = reviewsMemo[index];

          return (
            <div
              key={book.index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
              onClick={() => toggleCard(index)}
            >
              <div
                className={`w-full h-48 flex items-center justify-center text-center relative ${gradient}`}
              >
                <p className="text-sm font-bold text-white px-2">
                  {book.title}
                </p>
              </div>
              <div className="p-4 flex flex-col space-y-2">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">by {book.authors}</span>
                </p>
                <p className="text-sm text-gray-500">{book.publisher}</p>
                <div className="mt-2 text-sm font-medium text-gray-700">
                  ❤️ {book.likes} Likes
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <h4 className="text-sm font-semibold">Reviews:</h4>
                  {book.reviews === 0 ? (
                    <p className="text-sm italic text-gray-500">
                      No any reviews published for this book
                    </p>
                  ) : (
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {reviews.map((review, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">
                            {review.reviewer}
                          </span>
                          from <span className="italic">{review.company}</span>:
                          {review.review}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
