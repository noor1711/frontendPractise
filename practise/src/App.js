import logo from "./logo.svg";
import "./App.css";
import { use, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const MOCK_DATA = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `Cluster-${i % 100}-${Math.floor(Math.random() * 1000)}`,
  status: i % 5 === 0 ? "Failed" : "Success",
  size: `${(Math.random() * 500).toFixed(2)} GB`,
  updatedAt: new Date(
    Date.now() - Math.floor(Math.random() * 1000000000)
  ).toLocaleDateString(),
}));

function App() {
  const [inputValue, setInputValue] = useState();
  const [data, setData] = useState(MOCK_DATA);

  const filterItems = (term) => {
    return Array.from(data).filter((item) => item?.name?.startsWith(term));
  };

  const debouncedFilterItems = useDebouncedCallback(filterItems, 1000);

  const filteredData = useMemo(() => {
    return debouncedFilterItems(inputValue);
  }, [inputValue, data]);

  const changeSearchTerm = (ev) => {
    const targetValue = ev.target.value;
    setInputValue(targetValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Search Autocomplete</p>
        <input
          type="text"
          onChange={changeSearchTerm}
          value={inputValue}
        ></input>
        <ul>
          {filteredData?.map((item, index) => {
            return <li key={item?.id}>{item.name}</li>;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
