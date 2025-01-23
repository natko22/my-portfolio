import BookLayout from "./components/BookLayout";
import Intro from "./components/Intro";

export default function Home() {
  return (
    <>
      {" "}
      <Intro />
      <BookLayout className="-mt-12" />
    </>
  );
}
