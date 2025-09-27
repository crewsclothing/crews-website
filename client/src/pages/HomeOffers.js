import React, { useEffect, useState } from "react";
import "./HomeOffers.css"; // optional for styling

const offers = [
  "🔥 Flat 50% off on all T-Shirts!",
  "🚚 Free Delivery for orders above ₹999!",
  "🎉 New Summer Collection Just Arrived!",
  "💳 UPI & Cash On Delivery Available!",
  "🧥 Trending: Oversized Hoodies Back in Stock!"
];

function HomeOffers() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 2000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="offer-banner">
      <p>{offers[index]}</p>
    </div>
  );
}

export default HomeOffers;
