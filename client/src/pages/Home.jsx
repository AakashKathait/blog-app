import Card from "../components/Card";
import "../styles/home.css";

const Home = () => {
  const cardData = [
    {
      id: "blog-list",
      heading: "THE ARRAY",
      content:
        "Browse through an array of deep and meaningful (or dumb and pointless) Blogs/Articles",
    },
    {
      id: "create-blog",
      heading: "ADD TO THE ARRAY",
      content: "Sign in and contribute to the array",
    },
  ];
  return (
    <section className="home-container">
      <div className="home">
        <Card cardData={cardData} />
      </div>
    </section>
  );
};

export default Home;
