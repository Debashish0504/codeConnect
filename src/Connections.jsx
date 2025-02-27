import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useEffect } from "react";
import { connect,useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err)
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  console.log('connections is' + connections)

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName,emailId } =
          connection;

        return (
          <div className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " }
              </h2>
             
              <p>{emailId}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;