import { useState } from "react";
import { Input } from "semantic-ui-react";
import debounce from "lodash/debounce";

export default function Search() {
  const [, setSearchTerm] = useState("");

  const handleSearch = debounce((searchTerm) => {
    // Your search logic here
    console.log("Searching for:", searchTerm);
  }, 300);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
