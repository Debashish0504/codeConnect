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
        const { _id, firstName, lasttName ,gender, emailId } =
          connection;

        return (
          <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
             
              <p>{emailId}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;