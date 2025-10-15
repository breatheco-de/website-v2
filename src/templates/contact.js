import React, { useState, useContext, useRef } from "react";
import { graphql, Link } from "gatsby";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import { contactUs } from "../actions.js";
import Icon from "../components/Icon";
import { isCustomBarActive } from "../actions";

// New components
import { Colors, Button } from "../components/Styling";
import { Input, Alert, TextArea } from "../components/Form";
import { H1, H2, H3, Paragraph } from "../components/Heading";
import { HR, Grid, Div, Old_Grid } from "../components/Sections";
import SafeReCAPTCHA from "../components/SafeReCAPTCHA";

const Contact = (props) => {
  const { data, pageContext, yml } = props;
  const captcha = useRef(null);
  const { session } = useContext(SessionContext);
  const [alignment, setAlignment] = useState("left");
  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Contact Us",
  });
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [formData, setVal] = useState({
    first_name: { value: "", valid: false },
    last_name: { value: "", valid: false },
    email: { value: "", valid: false },
    client_comments: { value: "", valid: false },
  });

  const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
      if (!formData[key].valid) return false;
    }
    return true;
  };

  const captchaChange = () => {
    const captchaValue = captcha?.current?.getValue();
    if (captchaValue)
      setVal({ ...formData, token: { value: captchaValue, valid: true } });
    else setVal({ ...formData, token: { value: null, valid: false } });
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (formStatus.status === "error") {
          setFormStatus({ status: "idle", msg: "Resquest" });
        }
        if (!formIsValid(formData)) {
          setFormStatus({
            status: "error",
            msg: "There are some errors in your form",
          });
        } else {
          setFormStatus({ status: "loading", msg: "Loading..." });
          const token = await captcha.current.executeAsync();
          contactUs(
            { ...formData, token: { value: token, valid: true } },
            session
          )
            .then((data) => {
              if (data.error !== false && data.error !== undefined) {
                setFormStatus({ status: "error", msg: "Fix errors" });
              } else {
                setFormStatus({
                  status: "thank-you",
                  msg: "Thank you 🤣 Gracias",
                });
              }
            })
            .catch((error) => {
              console.error("error", error);
              setFormStatus({ status: "error", msg: error.message || error });
            });
        }
      }}
    >
      <Div className="circles-left" display="none" display_tablet="inherit">
        <Icon
          icon="landingCircles/smCircle-red"
          width="23px"
          height="23px"
          style={{
            zIndex: 2,
            position: "absolute",
            left: "218px",
            top: "225px",
          }}
        />
        <Icon
          icon="landingCircles/mdCircle-lightBlue"
          style={{ zIndex: 2, position: "absolute", left: "53px", top: "97px" }}
        />
        <Icon
          icon="landingCircles/bigCircle-yellowLight"
          width="115px"
          height="329px"
          style={{ zIndex: 2, position: "absolute", left: "0px", top: "250px" }}
        />
      </Div>
      <Div className="circles-right" display="none" display_tablet="inherit">
        <Icon
          icon="landingCircles/lgCircle-mustard"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "0px",
            top: "269px",
          }}
        />
        <Icon
          icon="landingCircles/mdCircle-blue"
          width="67px"
          height="67px"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "116px",
            top: "169px",
          }}
        />
        <Icon
          icon="landingCircles/smCircle-mustard"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "299px",
            top: "122px",
          }}
        />
      </Div>

      <Div
        margin={
          isCustomBarActive(session) ? "130px auto 64px auto" : "64px auto"
        }
        justifyContent="center"
        variant="fluid"
        padding_xxs="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        maxWidth="1280px"
      >
        <Div
          paddingRight="0px"
          paddingLeft="0px"
          flexDirection="column"
          display={`flex`}
        >
          <H2
            type="h1"
            zIndex="5"
            fontSize="48px"
            lineHeight="60px"
            margin="16px 0px 19px 0px"
          >
            {yml.greetings}
            <br />
            {yml.tagline}
          </H2>
          <Paragraph
            zIndex="5"
            padding_sm="0 35px"
            padding_tablet="0 12em"
            padding_md="0 30%"
            padding="0 5%"
          >
            {yml.sub_heading}
            <Link
              to={`/${yml.fields.lang}/${yml.pathFAQ}`}
              style={{ color: "#52a6d1" }}
            >
              {" "}
              {yml.sub_headingFAQ}
            </Link>
          </Paragraph>

          <Div
            justifyContent_sm="center"
            margin="64px 0 0 0"
            padding_xs="0 10px"
            padding="0 10px"
          >
            <Old_Grid
              height="100%"
              columns_md="3fr 1fr 3fr"
              justifyContent="center"
            >
              {formStatus.status === "thank-you" ? (
                <Old_Grid
                  data-cy="thankfulness"
                  width="300px"
                  justifySelf="center"
                  alignSelf="center"
                  align="left"
                  borderRadius="0 0 0 1.25rem"
                  background="white"
                >
                  <H3
                    type="h3"
                    placeSelf="end"
                    textAlign="center"
                    fontSize="30px"
                    color={Colors.green}
                  >
                    {formStatus.msg}
                  </H3>
                  <Paragraph
                    padding="20px 10%"
                    padding_sm="20px 20%"
                    fontSize="20px"
                  >
                    {yml.left.thankyou}
                  </Paragraph>
                </Old_Grid>
              ) : (
                // Padding top m_xs="35px 0" m_sm="35px 0" m_md="35px 0" removed
                <Div
                  id="contact-form"
                  minWidth_lg="max-content"
                  flex_tablet="1"
                  flexDirection="column"
                  size="12"
                  padding_md="0px"
                  alignSelf="center"
                  height="100%"
                  borderRadius="0 0 0 1.25rem"
                  background="white"
                >
                  <Div display="block" height="50px">
                    <H3 type="h3" textAlign="left">
                      {yml.left.heading}
                    </H3>
                    {formStatus.status === "error" && (
                      <Alert color="red">{formStatus.msg}</Alert>
                    )}
                  </Div>
                  <Div display="flex" height="50px">
                    <Input
                      data-cy="first_name"
                      borderRadius="3px"
                      border="1px solid #A4A4A4"
                      margin="0"
                      bgColor={Colors.white}
                      type="text"
                      className="form-control"
                      placeholder={yml.left.form_section.first_name}
                      errorMsg="Please specify a valid first name"
                      required
                      name="first_name"
                      onChange={(value, valid) => {
                        setVal({ ...formData, first_name: { value, valid } });
                        if (formStatus.status === "error") {
                          setFormStatus({ status: "idle", msg: "Resquest" });
                        }
                      }}
                      value={formData.first_name.value}
                    />
                  </Div>
                  <Div display="flex" height="50px">
                    <Input
                      data-cy="last_name"
                      borderRadius="3px"
                      border="1px solid #A4A4A4"
                      margin="0"
                      bgColor={Colors.white}
                      name="last_name"
                      type="text"
                      className="form-control"
                      placeholder={yml.left.form_section.last_name}
                      onChange={(value, valid) => {
                        setVal({ ...formData, last_name: { value, valid } });
                        if (formStatus.status === "error") {
                          setFormStatus({ status: "idle", msg: "Resquest" });
                        }
                      }}
                      errorMsg="Please specify a valid last name"
                      required
                      value={formData.last_name.value}
                    />
                  </Div>
                  <Div display="flex" height="50px" margin="0 0 10px 0">
                    <Input
                      data-cy="email"
                      borderRadius="3px"
                      border="1px solid #A4A4A4"
                      margin="0"
                      bgColor={Colors.white}
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder={yml.left.form_section.email}
                      onChange={(value, valid) => {
                        setVal({ ...formData, email: { value, valid } });
                        if (formStatus.status === "error") {
                          setFormStatus({ status: "idle", msg: "Resquest" });
                        }
                      }}
                      errorMsg="Please specify a valid email"
                      required
                      value={formData.email.value}
                    />
                  </Div>
                  <Div display="flex" height="200px">
                    <TextArea
                      data-cy="comment"
                      borderRadius="3px"
                      border="1px solid #A4A4A4"
                      bgColor={Colors.white}
                      style={{ resize: "none" }}
                      name="client_comments"
                      type="text"
                      rows="10"
                      cols="50"
                      className="form-control"
                      value={formData.client_comments.value}
                      required
                      placeholder={yml.left.message_section.placeholder}
                      onChange={(value, valid) => {
                        setVal({
                          ...formData,
                          client_comments: { value, valid },
                        });
                        if (formStatus.status === "error") {
                          setFormStatus({ status: "idle", msg: "Resquest" });
                        }
                      }}
                      errorMsg="Please leave us a comment"
                    />
                  </Div>
                  <Div width="fit-content" margin="10px auto 0 auto">
                    <SafeReCAPTCHA ref={captcha} size="invisible" />
                  </Div>
                  <Div
                    direction="rtl"
                    textAlign="-webkit-center"
                    textAlign_md="right"
                    display="block"
                    justifyContent="flex-end"
                    alignResp="flex-end"
                  >
                    {formStatus.status === "error" && (
                      <Alert data-action="alert-message" color="red">
                        {formStatus.msg}
                      </Alert>
                    )}
                    <Button
                      width="50%"
                      width_md="96px"
                      margin_md="17px 0px"
                      justifyContent="center"
                      color={
                        formStatus.status === "loading"
                          ? Colors.darkGray
                          : Colors.white
                      }
                      textColor={Colors.white}
                      background={
                        formStatus.status === "loading"
                          ? Colors.darkGray
                          : Colors.blue
                      }
                      margin="23px 0px 0px 0px"
                      padding="12px 24px"
                      disabled={formStatus.status === "loading" ? true : false}
                      type="submit"
                    >
                      {yml.left.button.button_text}
                    </Button>
                  </Div>
                </Div>
              )}

              <HR
                background="#F5F5F5"
                height="7px"
                width="100%"
                width_md="7px"
                height_md="auto"
                margin="28px 0"
                margin_md="0px 82px"
              />
              <Old_Grid
                gridGap="0"
                columns="1"
                size="12"
                height="100%"
                minWidth="fit-content"
                flexDirection="column"
                paddingLeft="0"
                paddingRight="0"
              >
                {yml.right.content_section.map((item, i) => {
                  return (
                    <Paragraph
                      key={i}
                      fs_sm="16px"
                      fontSize="16px"
                      dangerouslySetInnerHTML={{ __html: item }}
                      margin="5px"
                      display="flex"
                      m_sm="2px"
                      align="left"
                      textAlign="left"
                      color={Colors.black}
                    ></Paragraph>
                  );
                })}
              </Old_Grid>
            </Old_Grid>
          </Div>
        </Div>
      </Div>
    </form>
  );
};
export const query = graphql`
  query ContactQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          greetings
          tagline
          sub_heading
          sub_headingFAQ
          pathFAQ
          meta_info {
            title
            description
            image
            keywords
          }
          left {
            heading
            thankyou
            locations_title
            button {
              button_text
              button_link
            }
            form_section {
              first_name
              last_name
              email
              phone
            }
            message_section {
              placeholder
              note
            }
          }
          right {
            heading
            content_section
          }
          banner {
            tagline
          }
          fields {
            lang
          }
        }
      }
    }
  }
`;
export default BaseRender(Contact);
