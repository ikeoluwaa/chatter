import { render } from "@testing-library/react";
import App from "../layout/App";

test("renders without crashing", () => {
  render(<App />);
});
