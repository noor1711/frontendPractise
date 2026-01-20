import React, {
  useDeferredValue,
  useState,
  useMemo,
  useActionState,
} from "react";
import "./App.css";

// 1. Move Row outside to prevent unmounting on every scroll/render
const Row = ({ name, height }) => {
  return (
    <div
      style={{
        height: `${height}px`,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        padding: "0 10px",
        boxSizing: "border-box",
        backgroundColor: "white",
      }}
    >
      {name}
    </div>
  );
};

const MOCK_DATA = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `Cluster-${i % 100}-${Math.floor(Math.random() * 1000)}`,
  status: i % 5 === 0 ? "failed" : "success",
}));

const fetchData = async (prevState, formData) => {
  if (prevState.dog == 2) {
    const res = await new Promise((resolve) => setTimeout(resolve, 5000));
    return { dog: 1, cat: 2 };
  } else {
    const res = await new Promise((resolve) => setTimeout(resolve, 5000));
    return { dog: 2, cat: 1 };
  }
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [formState, formAction, isPending] = useActionState(fetchData, {
    dog: 2,
  });
  // Constants for Virtualization
  const windowHeight = 500;
  const rowHeight = 40; // Increased for better visibility
  const overScan = 5;

  // 2. DERIVED STATE: Filter data instantly during render.
  // 5k items is trivial for JS, no need for complex async state syncs.
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const matchesStatus = selectedStatus
        ? item.status === selectedStatus
        : true;
      return matchesSearch && matchesStatus;
    });
  }, [inputValue, selectedStatus]);

  const deferedData = useDeferredValue(filteredData, MOCK_DATA);

  // 3. VIRTUAL MATH
  const startIndex = Math.floor(scrollTop / rowHeight);
  // Calculate how many to show, ensuring we don't go out of bounds
  const endIndex = Math.min(
    filteredData.length,
    startIndex + Math.ceil(windowHeight / rowHeight) + overScan
  );

  // Slice the data to only what is visible
  const visibleIndices = [];
  for (let i = Math.max(0, startIndex - overScan); i < endIndex; i++) {
    visibleIndices.push(i);
  }

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <form method="GET" action={formAction}>
        {" "}
        <p>{JSON.stringify(formState)}</p>
        <button disabled={isPending} type="submit">
          {" "}
          Submit
        </button>
      </form>

      <h1>Rubrik Cluster Manager</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search clusters..."
          onChange={(ev) => {
            setInputValue(ev.target.value);
            setScrollTop(0); // Reset scroll on search
          }}
          value={inputValue}
          style={{ padding: "8px", width: "250px" }}
        />

        <select
          onChange={(ev) => {
            setSelectedStatus(ev.target.value);
            setScrollTop(0); // Reset scroll on filter
          }}
          value={selectedStatus}
          style={{ padding: "8px" }}
        >
          <option value="">All Statuses</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

        <span style={{ alignSelf: "center" }}>
          Showing {filteredData.length} items
        </span>
      </div>

      {/* THE VIEWPORT */}
      <div
        className="ulListContainer"
        onScroll={(ev) => setScrollTop(ev.currentTarget.scrollTop)}
        style={{
          height: `${windowHeight}px`,
          width: "500px",
          overflowY: "auto",
          position: "relative",
          border: "2px solid #333",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* THE PHANTOM SPACER (Sets the scrollbar height) */}
        <div
          style={{
            height: `${rowHeight * filteredData.length}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* THE VISIBLE WINDOW (Moves with scroll) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              // Pixel math: Offset by the number of skipped rows * height
              transform: `translateY(${
                Math.max(0, startIndex - overScan) * rowHeight
              }px)`,
            }}
          >
            {visibleIndices.map((idx) => (
              <Row
                key={filteredData[idx].id}
                name={filteredData[idx].name}
                height={rowHeight}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
