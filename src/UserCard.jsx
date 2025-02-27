import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";


const UserCard = ({ user }) => {
    const { _id , firstName, lasttName, age, gender, emailId } = user;

    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
      try {
        const res = await axios.post(
          BASE_URL + "request/send/" + status + "/" + userId,
          {},
          { withCredentials: true }
        );
        dispatch(removeFeed(userId));
      } catch (err) {}
    };

    return (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + `${lasttName || ''}`}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{emailId}</p>
          <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          </div>
        </div>
      </div>
    );
  };
  export default UserCard;