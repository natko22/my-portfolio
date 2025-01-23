import BookLayout from "./components/BookLayout";

export default function Home() {
  return (
    <BookLayout>
      <div className="p-8">
        <h1 className="text-book-text text-3xl">Welcome to My Portfolio</h1>
      </div>
    </BookLayout>
  );
}
