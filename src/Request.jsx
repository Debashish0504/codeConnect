import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "./utils/requestSlice";
import { useEffect } from "react";
import { removeRequest } from "./utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  const reviewRequest = async (status , _id) => {
    try{
        const res =  axios.post(BASE_URL + 'request/review/' +status +'/' + _id , {} , {
            withCredentials : true
        })
        dispatch(removeRequest(_id))
    }catch (error) {
        console.error(error)
    }
  }



  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return  <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lasttName,  age, gender } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={gender === 'male' 
                ? "https://banner2.cleanpng.com/lnd/20240919/j/a3a3dc5630c36b919c1688240ee833.webp" 
                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lasttName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;