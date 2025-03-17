import React, { useEffect, useState } from 'react'
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { CheckCircleIcon } from "lucide-react";

function Premium() {
    const [isUserPremium,setUserPremium] = useState(false)
    useEffect(() => {
        verifyPremiumMember()
    },[])
    const handleBuyClick = async (type) => {
        const order = await axios.post(
          BASE_URL + "payment/create",
          {
            membershipType: type,
          },
          { withCredentials: true }
        );
        console.log(order.data)
        const { amount, keyId, currency, notes, orderId } = order.data;
        console.log(notes)

        const options = {
          key: keyId,
          amount,
          currency,
          name: "Code Connect",
          description: "Connect to other developers",
          order_id: orderId,
          prefill: {
            name: notes.firstName + " " + notes.lasttName,
            email: notes.emailId,
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
          handlers : verifyPremiumMember
          
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const verifyPremiumMember = async () => {
        const res = await axios.get(BASE_URL + "premium/verify", {
            withCredentials: true,
          });
      
          if (res.data.isPremium) {
            setUserPremium(true);
          }
    }
  return(
    isUserPremium ? <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
    <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl max-w-md text-center">
      <CheckCircleIcon size={64} className="text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Premium Activated!</h2>
      <p className="text-gray-600 mb-6">
        You are already a premium member.Enjoy your premium benefits!
      </p>
      <button className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition">
        Go to Dashboard
      </button>
    </div>
  </div>:
    <div className="m-10 flex flex-col items-center gap-5">
    <div className="flex w-full justify-center">
      <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
        <h1 className="font-bold text-3xl">Silver Membership</h1>
        <ul>
          <li> - Chat with other people</li>
          <li> - 100 connection Requests per day</li>
          <li> - 3 months</li>
        </ul>
        <button   
        onClick={() => handleBuyClick("silver")}
        className="btn btn-secondary">Buy Silver</button>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
        <h1 className="font-bold text-3xl">Gold Membership</h1>
        <ul>
          <li> - Chat with other people</li>
          <li> - Infinite connection Requests per day</li>
          <li> - 6 months</li>
        </ul>
        <button 
        onClick={() => handleBuyClick("gold")}
        className="btn btn-primary">Buy Gold</button>
      </div>
    </div>
    <div className="divider divider-vertical">OR</div>
    <div className="card bg-base-300 rounded-box grid h-80 w-1/2 place-items-center">
      <h1 className="font-bold text-3xl">Platinum Membership</h1>
      <ul>
        <li> - Chat with other people</li>
        <li> - Infinite connection Requests per day</li>
        <li> - 12 months</li>
        <li> - Premium Support</li>
      </ul>
      <button 
      onClick={() => handleBuyClick("platinum")}
      className="btn btn-accent">Buy Platinum</button>
    </div>
  </div>
  
  );
}

export default Premium