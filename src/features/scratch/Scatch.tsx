import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { decrement, increment, incrementByAmount } from "./testSlice";
import { openModal } from "../../app/common/modals/modalSlice";

export default function Scatch() {
  const { data } = useAppSelector((state) => state.test);
  const dispatchh = useAppDispatch();
  return (
    <div>
      <h1>scratch pagge</h1>
      <h3>The data is: {data}</h3>
      <button
        onClick={() => dispatchh(increment())}
        style={{ backgroundColor: "green" }}
      >
        increment
      </button>
      <button
        onClick={() => dispatchh(decrement())}
        style={{ backgroundColor: "red" }}
      >
        decrement
      </button>
      <button
        onClick={() => dispatchh(incrementByAmount(5))}
        style={{ backgroundColor: "teal" }}
      >
        increment by 5
      </button>
      <Button
        onClick={() => dispatchh(openModal({ type: "TestModal", data: data }))}
        style={{ backgroundColor: "teal" }}
      >
        open model
      </Button>
    </div>
  );
}
