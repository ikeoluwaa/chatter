import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { useAppSelector } from "../../app/store/store";

export default function TestModal() {
  const { data } = useAppSelector((state) => state.modals);
  return (
    <ModalWrapper>
      <div>Test data is {data}</div>
    </ModalWrapper>
  );
}
