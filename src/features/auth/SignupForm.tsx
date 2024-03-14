import { useState } from "react";
import { Grid, GridColumn, Tab } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import SignUpRegisterForm from "./SignUpRegisterForm";
import SignUpLoginForm from "./SignUpLoginForm";

export default function SignupForm() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_e: any, { activeIndex }: any) => {
    setActiveTab(activeIndex);
  };

  const panes = [
    {
      menuItem: { content: "REGISTER", style: { order: 1 } },
      render: () => (
        <Tab.Pane>
          <SignUpRegisterForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: "LOG IN" },
      render: () => (
        <Tab.Pane>
          <SignUpLoginForm />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <ModalWrapper
      style={{
        height: "auto",
        display: "flex",
        margin: "0",
      }}
      contentStyle={{
        height: "100%",
        background: "none",
        padding: "0",
        margin: "0",
      }}
      className="signup-modalWrapper"
    >
      <Grid className="signup-form" style={{ margin: "0" }}>
        <GridColumn
          className="signup-background-img"
          computer={7}
          tablet={12}
          mobile={6}
          style={{
            padding: "0",
            border: "none",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/signin.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="signup-form-texts"
            style={{
              marginTop: "15rem",
              marginLeft: "2rem",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "1.6rem",
              }}
            >
              CHATTER
            </h1>
            <p style={{ color: "white", lineHeight: "1.5" }}>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </GridColumn>
        <GridColumn
          style={{ padding: "0" }}
          computer={9}
          tablet={12}
          mobile={16}
        >
          <Tab
            style={{ padding: "6rem" }}
            menu={{
              secondary: true,
              pointing: true,
              style: { display: "flex", justifyContent: "space-between" },
            }}
            panes={panes}
            activeIndex={activeTab}
            onTabChange={handleTabChange}
          />
        </GridColumn>
      </Grid>
    </ModalWrapper>
  );
}
