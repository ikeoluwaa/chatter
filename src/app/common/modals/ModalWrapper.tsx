import { ReactNode } from "react";
import { Modal, ModalProps } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { closeModal } from "./modalSlice";

type Props = {
  children: ReactNode;
  header?: string;
  contentStyle?: React.CSSProperties;
} & ModalProps;

export default function ModalWrapper({
  children,
  header,
  contentStyle,
  ...props
}: Props) {
  const { open } = useAppSelector((state) => state.modals);

  const dispatch = useAppDispatch();
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => dispatch(closeModal())}
      size={props.size}
      style={props.style}
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content style={contentStyle}>{children}</Modal.Content>
    </Modal>
  );
}
