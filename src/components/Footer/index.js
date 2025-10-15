import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import SafeReCAPTCHA from "../SafeReCAPTCHA";
import { Container, Div, GridContainer } from "../Sections";
import { Colors, RoundImage, Anchor, Button } from "../Styling";
import { H3, H4 } from "../Heading";
import { Devices } from "../Responsive";
import Icon from "../Icon";
import { newsletterSignup } from "../../actions";
import { SessionContext } from "../../session";
import { Input } from "../Form";

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (!formData[key].valid) return false;
  }
  return true;
};
const positions = [
  {
    position: "1 / 5",
  },
  {
    position: "5 / 8",
  },
  {
    position: "8 / 11",
  },
  {
    position: "11 / 13",
  },
];

const Form = styled.form`
  margin: 0 11px 0 0;
  width: 100%;
  display: flex;
  @media ${Devices.xs} {
  }
  @media ${Devices.md} {
  }
`;

const Footer = ({ yml }) => {
  const captcha = useRef(null);
  const { session } = React.useContext(SessionContext);
  let socials = session && session.location ? session.location.socials : [];

  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Request",
  });
  const [formData, setVal] = useState({
    email: { value: "", valid: false },
    consent: { value: true, valid: true },
    privacyPolicy: { value: false, valid: false },
  });

  const captchaChange = () => {
    const captchaValue = captcha?.current?.getValue();
    if (captchaValue)
      setVal({ ...formData, token: { value: captchaValue, valid: true } });
    else setVal({ ...formData, token: { value: null, valid: false } });
  };
  // Año actual
  const currentYear = new Date().getFullYear();

  return (
    <>
      <GridContainer margin="44px auto" margin_tablet="0 0 40px 0">
        <Div background="#EBEBEB" height="1px" />
      </GridContainer>
      <GridContainer
        github="/components/footer"
        gridTemplateRows_tablet="2"
        columns_tablet="12"
        padding="0 17px"
        margin="0 0 60px 0"
        childMargin="auto"
        childMaxWidth="1280px"
        flexDirection="column"
        flexDirection_tablet="row"
      >
        {/* Academy Logo - Mobile: Full width, Tablet: Grid area */}
        <Div
          justifyContent="center"
          alignItems="center"
          height="43px"
          width="100%"
          width_tablet="143px"
          height_tablet="100%"
          borderRadius="3px"
          gridArea_tablet="1/1/2/3"
          margin="0 0 20px 0"
          margin_tablet="0"
        >
          <RoundImage
            url="/images/4geeksacademy-logo-old.png"
            height="43px"
            width="143px"
            backgroundColor="transparent"
            position="center"
            bsize="contain"
          />
        </Div>

        {/* Newsletter Form - Mobile: Full width, Tablet: Grid area */}
        <Div
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="0 40px"
          height="auto"
          width="100%"
          borderRadius="3px"
          width_tablet="100%"
          height_tablet="100%"
          gridArea_tablet="1/3/2/10"
          borderRight_tablet={`1px solid ${Colors.lightGray}`}
          margin="0 0 20px 0"
          margin_tablet="0"
        >
          {formStatus.status === "thank-you" ? (
            <Div alignItems="center">
              <Icon icon="success" />{" "}
              <H4
                fontSize="15px"
                lineHeight="22px"
                margin="10px 0 10px 10px"
                align="center"
              >
                {yml.newsletter.thankyou}
              </H4>
            </Div>
          ) : (
            <>
              <H4
                margin="0 0 10px 0"
                textAlign="left"
                display="block"
                display_tablet="block"
              >
                {yml.newsletter.heading}
              </H4>
              <Div justifyContent="center" width="100%" flexDirection="column">
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                    if (!formIsValid(formData)) {
                      setFormStatus({
                        status: "error",
                        msg: yml.newsletter.form_errors,
                      });
                    } else if (!formData.privacyPolicy.valid) {
                      setFormStatus({
                        status: "error",
                        msg: yml.newsletter.privacy_required,
                      });
                    } else {
                      setFormStatus({ status: "loading", msg: "Loading..." });
                      const token = await captcha.current.executeAsync();
                      newsletterSignup(
                        { ...formData, token: { value: token, valid: true } },
                        session
                      )
                        .then((data) => {
                          if (
                            data.error !== false &&
                            data.error !== undefined
                          ) {
                            setFormStatus({
                              status: "error",
                              msg: "Fix errors",
                            });
                          } else {
                            setFormStatus({
                              status: "thank-you",
                              msg: "Thank you",
                            });
                          }
                        })
                        .catch((error) => {
                          console.log("error", error);
                          setFormStatus({
                            status: "error",
                            msg: error.message || error,
                          });
                        });
                    }
                  }}
                >
                  <Input
                    type="email"
                    className="form-control"
                    width="100%"
                    placeholder="Email *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, email: { value, valid } });
                      if (formStatus.status === "error") {
                        setFormStatus({ status: "idle", msg: "Resquest" });
                      }
                    }}
                    value={formData.email.value}
                    errorMsg="Please specify a valid email"
                    required
                  />
                  <Button
                    height="40px"
                    margin="0 0 0 10px"
                    type="submit"
                    fontSize="22px"
                    variant="full"
                    color={
                      formStatus.status === "loading"
                        ? Colors.darkGray
                        : Colors.black
                    }
                    textColor={Colors.white}
                    disabled={formStatus.status === "loading" ? true : false}
                  >
                    {formStatus.status === "loading" ? (
                      "Loading..."
                    ) : (
                      <Icon
                        icon="send"
                        height="16px"
                        width="16px"
                        color={Colors.white}
                        fill={Colors.white}
                      />
                    )}
                  </Button>
                </Form>

                {/* Privacy Policy Checkbox - Outside the form to avoid flex layout issues */}
                <Div
                  flexDirection="row"
                  alignItems="center"
                  margin="10px 0 0 0"
                  width="100%"
                >
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    checked={formData.privacyPolicy.value}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setVal({
                        ...formData,
                        privacyPolicy: { value: isChecked, valid: isChecked },
                      });
                      if (formStatus.status === "error") {
                        setFormStatus({ status: "idle", msg: "Request" });
                      }
                    }}
                    style={{
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    htmlFor="privacy-policy"
                    style={{
                      fontSize: "12px",
                      color: Colors.darkGray,
                      cursor: "pointer",
                      lineHeight: "16px",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "400",
                    }}
                  >
                    <span>{yml.newsletter.privacy_checkbox_prefix} </span>
                    <Link
                      to={
                        yml.fields?.lang === "es"
                          ? "/es/privacidad"
                          : "/us/privacy-policy"
                      }
                      style={{
                        color: Colors.darkGray,
                        textDecoration: "underline",
                        marginLeft: "2px",
                        fontWeight: "400",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {yml.newsletter.privacy_checkbox_link}
                    </Link>
                  </label>
                </Div>
                {formData.privacyPolicy.valid === false &&
                  formStatus.status === "error" && (
                    <Div
                      fontSize="12px"
                      color="#e74c3c"
                      margin="5px 0 0 0"
                      textAlign="left"
                    >
                      {yml.newsletter.privacy_required}
                    </Div>
                  )}
              </Div>
              <Div width="fit-content" margin="10px auto 0 auto">
                <SafeReCAPTCHA ref={captcha} size="invisible" />
              </Div>
            </>
          )}
        </Div>

        {/* Social Icons - Mobile: Full width, Tablet: Grid area */}
        <Div
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="auto"
          width="100%"
          width_tablet="100%"
          height_tablet="100%"
          borderRadius="3px"
          gridArea_tablet="1/10/2/13"
        >
          <H4 margin="0 0 10px 0" display="none" display_md="block">
            {yml.newsletter.heading}
          </H4>
          <Div id="icons-container" alignItems="center" gap="8px">
            {(socials || yml.socials).map((ln, i) => {
              if (!ln.icon) return null;
              return (
                <Anchor
                  key={i}
                  cursor="pointer"
                  to={ln.link}
                  // textAlign="left"
                  margin="0"
                  fontSize="13px"
                  // lineHeight="22px"
                  fontWeight="400"
                  // textTransform="uppercase"
                  color={Colors.black}
                >
                  <Icon
                    icon={ln.icon}
                    style={{ margin: "0" }}
                    color={Colors.black}
                    fill={Colors.black}
                    height="32px"
                    width="32px"
                  />
                </Anchor>
              );
            })}
          </Div>
        </Div>
        {yml.footer.map((item, i) => {
          return (
            <Div
              key={i}
              flexDirection="column"
              gridColumn_tablet={positions[i].position}
            >
              <H3
                color={Colors.darkGray}
                margin="54px 0 11px 0"
                textAlign="left"
                fontSize="15px"
                fontWeight="900"
                lineHeight="19px"
              >
                {item.heading}
              </H3>
              <ul
                style={{
                  columnCount: item.items.length > 5 ? 2 : 1,
                  columnGap: "10px",
                }}
              >
                {item.items.map((ln, i) => {
                  return (
                    <Anchor
                      key={i}
                      cursor="pointer"
                      to={ln.link}
                      margin="0 0 5px 0"
                      fontSize="13px"
                      fontWeight="400"
                      style={{
                        textTransform: "uppercase",
                        lineHeight: "22px",
                        textAlign: "left",
                      }}
                      color={Colors.black}
                    >
                      {ln.name}
                    </Anchor>
                  );
                })}
              </ul>
            </Div>
          );
        })}
      </GridContainer>
      <Div
        columns_tablet="12"
        margin="auto"
        margin_tablet="27px auto 60px auto"
        display="none"
        display_tablet="flex"
        maxWidth="1280px"
      >
        <Div margin="auto" justifyContent="center" alignItems="center">
          <H4
            fontSize="13px"
            lineHeight="22px"
            width="fit-content"
            color={Colors.darkGray}
          >
            {yml.we_accept}
            {"  "}
          </H4>
          <RoundImage
            url="/images/bitcoin.png"
            height="10px"
            width="65px"
            bsize="contain"
            margin="0 15px"
          />
          <RoundImage
            url="/images/ethereum.png"
            height="20px"
            width="65px"
            bsize="contain"
          />
        </Div>
      </Div>
      <Container>
        <GridContainer
          columns_tablet="12"
          background={Colors.lightGray}
          padding="11px 17px 29px 17px"
          padding_tablet="31px 0"
          width="100%"
        >
          <Div
            gridArea_tablet="1/6/1/13"
            justifyContent="end"
            alignItems="center"
            flexDirection="column"
            flexDirection_tablet="row"
            width="100%"
            width_tablet="100%"
            height_tablet="100%"
          >
            {yml.policy ? (
              yml.policy.map((item, i) => (
                <Link key={i} to={item.link}>
                  <H4
                    border={i % 2 == 1 && "1px solid"}
                    borderWidth={i % 2 == 1 && "0px 1px 0px 1px"}
                    key={item.name}
                    fontSize="13px"
                    lineHeight="16px"
                    width="fit-content"
                    color={Colors.darkGray}
                    padding="0 15px"
                  >
                    {item.name}
                  </H4>
                </Link>
              ))
            ) : (
              <>
                <Link to="/us/privacy-policy">
                  <H4
                    fontSize="13px"
                    padding="0 15px"
                    lineHeight="16px"
                    width="fit-content"
                    color={Colors.darkGray}
                  >
                    Privacy Policy
                  </H4>
                </Link>
                <Link to="/us/cookies">
                  <H4
                    border="1px solid"
                    padding="0 15px"
                    borderWidth="0px 1px 0px 1px"
                    fontSize="13px"
                    lineHeight="16px"
                    width="fit-content"
                    color={Colors.darkGray}
                  >
                    Cookies
                  </H4>
                </Link>
                <Link to="/us/terms-conditions">
                  <H4
                    fontSize="13px"
                    padding="0 15px"
                    lineHeight="16px"
                    width="fit-content"
                    color={Colors.darkGray}
                  >
                    Terms and Conditions
                  </H4>
                </Link>
              </>
            )}
          </Div>
          <Div
            gridArea_tablet="1/1/1/6"
            justifyContent="center"
            alignItems="center"
            height_tablet="100%"
          >
            <H4
              fontSize="13px"
              lineHeight="22px"
              textAlign_tablet="left"
              color={Colors.darkGray}
            >
              @ 4Geeks Academy LLC {currentYear}
            </H4>
          </Div>
        </GridContainer>
      </Container>
    </>
  );
};

export default Footer;
