import React, { useState, useEffect, useRef } from "react";

const MOCK_DATA = Array.from({ length: 5000 }, (_, index) => {
  return {
    id: index,
    name: ["noor", "riya", "divesh", "anushka"][index % 4],
    email: ["noor", "riya", "divesh", "anushka"][index % 4],
  };
});

const Row = ({ data }) => {
  return (
    <div>
      <span>Index: {data.id}</span>
      <span>, Name: {data.name}</span>
      <span>, Email: {data.email}</span>
    </div>
  );
};

const InfiniteScroll = () => {
  const [data, setNewData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const sentinelRef = useRef();

  const increment = 50;

  const handleDataLoad = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNewData((prev) => MOCK_DATA.slice(0, prev.length + increment));
    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          handleDataLoad();
        }
      },
      { threshold: 0.9 },
    );

    const entry = sentinelRef?.current;
    observer.observe(entry);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <div>
      {data.map((item) => {
        return <Row data={item} />;
      })}

      <div
        ref={sentinelRef}
        style={{ heigth: "20px", background: "transprent" }}
      >
        {loading ? "Loading more Amazing Content" : ""}
      </div>
    </div>
  );
};

export default InfiniteScroll;
