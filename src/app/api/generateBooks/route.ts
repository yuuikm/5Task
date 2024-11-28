import { faker as fakerEN } from "@faker-js/faker";
import { Book } from "@/app/types/book";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seed = searchParams.get("seed") || "1";
  const likes = parseFloat(searchParams.get("likes") || "0");
  const reviews = parseFloat(searchParams.get("reviews") || "0");
  const count = Number(searchParams.get("count")) || 20;

  fakerEN.seed(Number(seed));

  fakerEN.seed(Number(seed));

  const books: Book[] = Array.from({ length: count }, (_, i) => {
    fakerEN.seed(Number(seed) + i);

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
