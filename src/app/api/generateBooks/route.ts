import { faker as fakerEN } from "@faker-js/faker";
import { Book } from "@/app/types/book";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seed = searchParams.get("seed") || "1";
  const likes = parseFloat(searchParams.get("likes") || "0");
  const reviews = parseFloat(searchParams.get("reviews") || "0");
  const count = Number(searchParams.get("count")) || 20;

  fakerEN.seed(Number(seed)); // Use the same seed for deterministic results

  const generateTitle = () => {
    const adjectives = [
      "Lost",
      "Forgotten",
      "Mystical",
      "Beautiful",
      "Dangerous",
    ];
    const nouns = ["Journey", "Secret", "Dreams", "World", "Adventure", "Past"];
    const formats = [
      `The ${fakerEN.word.adjective()} ${fakerEN.word.noun()}`,
      `${fakerEN.word.adjective()} ${fakerEN.word.noun()}: A ${fakerEN.word.noun()} Tale`,
      `${fakerEN.word.noun()} of the ${fakerEN.word.adjective()} ${fakerEN.word.noun()}`,
      `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
        nouns[Math.floor(Math.random() * nouns.length)]
      }`,
    ];

    return formats[Math.floor(Math.random() * formats.length)];
  };

  fakerEN.seed(Number(seed)); // Seed the faker instance for consistent results

  const books: Book[] = Array.from({ length: count }, (_, i) => {
    fakerEN.seed(Number(seed) + i); // Seed deterministically for each book

    return {
      index: i + 1,
      isbn: fakerEN.string.numeric(13),
      title: `The ${fakerEN.word.adjective()} ${fakerEN.word.noun()}`,
      authors: fakerEN.person.fullName(),
      publisher: fakerEN.company.name(),
      likes: likes === 0 ? 0 : Math.floor(Math.random() * (likes + 1)),
      reviews: reviews === 0 ? 0 : Math.floor(Math.random() * (reviews + 1)),
    };
  });

  return NextResponse.json(books);
}
