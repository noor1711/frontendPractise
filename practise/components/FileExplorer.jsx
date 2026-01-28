import { useState } from "react";

const Folder = ({ data, tab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const name = data.name;
  const id = data.id;

  return (
    <div>
      <div
        key={id}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <pre>
          {Array.from({ length: tab }, (_, index) => "   ").join("") + name} [
          {isOpen ? "-" : "+"}]
        </pre>
      </div>
      {isOpen ? (
        data.children.map((item) => <Item tab={tab + 1} data={item} />)
      ) : (
        <></>
      )}
    </div>
  );
};

const Item = ({ data, tab }) => {
  const id = data.id;
  const name = data.name;

  if (!data.children) {
    return (
      <div key={id}>
        <span>
          <pre>
            {Array.from({ length: tab }, (_, index) => "   ").join("") + name}
          </pre>
        </span>
      </div>
    );
  }

  return <Folder tab={tab} data={data} />;
};

export default function FileExplorer({ data }) {
  const [message, setMessage] = useState("Hello world");

  return (
    <div>
      <h1>{message}</h1>
      {data.map((row) => (
        <Item data={row} tab={0} />
      ))}
    </div>
  );
}
