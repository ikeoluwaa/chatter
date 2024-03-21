import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function ConfirmationMessage() {
  return (
    <ModalWrapper>
      <div>
        <h2>Confirmation Email Sent</h2>
        <p>
          A confirmation email has been sent to your email address. Please check
          your inbox and follow the instructions to complete the registration
          process.
        </p>
      </div>
    </ModalWrapper>
  );
}
