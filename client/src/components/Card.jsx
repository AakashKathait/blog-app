import "../styles/card.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ cardData }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleClick = (e) => {
    const id = e.target.id;
    id === "blog-list" && navigate("/bloglist");
    if (id === "create-blog") {
      if (user) {
        navigate("/new-blog");
      } else {
        toast.error("Login to create a new blog", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/login");
      }
    }
  };
  return (
    <>
      {cardData.map((card, index) => (
        <div key={index} className="card" id={card.id} onClick={handleClick}>
          <h1 id={card.id} className="card-heading">
            {card.heading}
          </h1>
          <p id={card.id}>{card.content}</p>
        </div>
      ))}
    </>
  );
};

export default Card;
