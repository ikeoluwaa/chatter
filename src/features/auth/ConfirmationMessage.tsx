import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function ConfirmationMessage() {
  return (
    <ModalWrapper style={{ border: "3px solid #543EE0" }}>
      <div style={{}}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "2rem",
          }}
        >
          Confirmation Email Sent
        </h2>
        <p style={{ fontSize: "1.4rem" }}>
          A confirmation email has been sent to your email address. Please check
          your inbox and follow the instructions to complete the registration
          process.
        </p>
      </div>
    </ModalWrapper>
  );
}
