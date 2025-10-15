import React, { useState, useContext, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Button, Colors, Link } from "../Styling";
import { Input } from "../Form";
import { SessionContext } from "../../session";
import { newsletterSignup } from "../../actions";
import SafeReCAPTCHA from "../SafeReCAPTCHA";
import styled from "styled-components";
import Icon from "../Icon";

const Form = styled.form`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DoubleActionCTA = ({
  disableRestriction = false,
  disableBullets = false,
  location,
  ctaData,
}) => {
  const { session: appSession } = useContext(SessionContext);
  const captcha = useRef(null);

  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Resquest",
  });
  const [formData, setVal] = useState({
    email: { value: "", valid: false },
    consent: { value: true, valid: true },
  });

  const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
      if (!formData[key].valid) return false;
    }
    return true;
  };
  if (!disableRestriction && location?.country !== "USA") {
    return null;
  }

  const content = ctaData;
  const existsPrimaryBenefits =
    !disableBullets && content?.primary?.benefits.length > 0;
  const existsSecondaryBenefits =
    !disableBullets && content?.secondary?.benefits.length > 0;

  return (
    <Div
      width="100%"
      maxWidth="1280px"
      margin="0 auto"
      padding="4rem 1rem 2rem 1rem"
      flexDirection="column"
    >
      <Div textAlign="center" margin="0 0 3rem 0" flexDirection="column">
        <H2
          className="dual-cta-title"
          fontSize="2.5rem"
          fontWeight="700"
          color="currentColor"
          margin="0 0 1rem 0"
          line-height="1.2"
          fontFamily="var(--font-sans)"
          letterSpacing="normal"
        >
          {content.title}
        </H2>
        <Paragraph
          className="dual-cta-subtitle"
          fontSize="1.125rem"
          fontWeight="400"
          color={Colors.lightGray3}
          maxWidth="42rem"
          margin="0 auto"
          line-height="1.5"
          fontFamily="var(--font-sans)"
          letterSpacing="normal"
        >
          {content.description}
        </Paragraph>
      </Div>

      <Div
        display="grid"
        gridTemplateColumns="1fr"
        gap="1.5rem"
        gap_tablet="2.5rem"
        margin="0 0 3rem 0"
        gridTemplateColumns_tablet="1fr 1fr"
      >
        <Div
          className="cta_card"
          position="relative"
          background={Colors.white}
          border="1px solid #e5e7eb"
          borderRadius="8px"
          padding="1.5rem"
          overflow="hidden"
          boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
          display="flex"
          flexDirection="column"
        >
          <Div margin="0" flexDirection="column">
            <H3
              fontSize="1.5rem"
              fontWeight="700"
              margin="0 0 0.5rem 0"
              lineHeight="1.3"
              textAlign="left"
              fontFamily="var(--font-sans)"
              letterSpacing="normal"
            >
              {content?.primary?.title}
            </H3>
            <Paragraph
              fontSize="1rem"
              color={Colors.lightGray3}
              margin="0"
              lineHeight="1.5"
              textAlign="left"
              fontFamily="var(--font-sans)"
              letterSpacing="normal"
            >
              {content?.primary?.description}
            </Paragraph>
          </Div>

          {/* Benefits List */}
          {existsPrimaryBenefits && (
            <Div margin="1rem 0" display="flex" flexDirection="column">
              {content?.primary?.benefits.map((benefit, index) => (
                <Div
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap="0.75rem"
                  margin="0 0 0.75rem 0"
                >
                  <Icon
                    icon="check-circle"
                    width="18px"
                    height="18px"
                    fill={Colors.green2}
                  />
                  <Paragraph
                    textAlign="left"
                    fontSize="0.875rem"
                    color={Colors.lightGray3}
                  >
                    {benefit}
                  </Paragraph>
                </Div>
              ))}
            </Div>
          )}

          {content?.primary?.image?.childImageSharp && (
            <GatsbyImage
              style={{
                height: "auto",
                width: "100%",
                height: "220px",
                borderRadius: "0.5rem",
                margin: existsPrimaryBenefits ? "" : "2rem auto 0.5rem",
              }}
              imgStyle={{ objectFit: "cover" }}
              loading="eager"
              alt="Book a Career Consultation"
              draggable={false}
              image={getImage(
                content.primary.image.childImageSharp.gatsbyImageData
              )}
            />
          )}

          <Link to={content?.primary?.action_url} target="_blank">
            <Button
              className="scale_hover"
              width="100%"
              padding="14px 24px"
              padding_tablet="14px 24px"
              borderRadius="8px"
              height="auto"
              fontSize="1rem"
              fontWeight="600"
              background="#000000"
              color={Colors.white}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.5rem"
              margin={
                content?.primary?.footer_text ? "1.5rem 0" : "1.5rem 0 0.5rem 0"
              }
            >
              <Icon
                icon="calendar"
                width="18px"
                height="18px"
                stroke={Colors.white}
              />
              <span>{content?.primary?.action_text}</span>
            </Button>
          </Link>

          {content?.primary?.footer_text && (
            <Paragraph
              fontSize="0.75rem"
              color={Colors.lightGray3}
              textAlign="center"
              margin="0"
              fontFamily="var(--font-sans)"
              letterSpacing="normal"
            >
              {content?.primary?.footer_text}
            </Paragraph>
          )}
        </Div>

        {/* Newsletter Subscription Card */}
        <Div
          className="cta_card"
          position="relative"
          background={Colors.white}
          border="1px solid #e5e7eb"
          borderRadius="8px"
          padding="1.5rem"
          overflow="hidden"
          boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
          display="flex"
          flexDirection="column"
        >
          <Div margin="0" flexDirection="column">
            <H3
              fontSize="1.5rem"
              fontWeight="700"
              margin="0 0 0.5rem 0"
              lineHeight="1.3"
              textAlign="left"
              fontFamily="var(--font-sans)"
              letterSpacing="normal"
            >
              {content?.secondary?.title}
            </H3>
            <Paragraph
              fontSize="1rem"
              color={Colors.lightGray3}
              margin="0"
              lineHeight="1.5"
              textAlign="left"
              fontFamily="var(--font-sans)"
              letterSpacing="normal"
            >
              {content?.secondary?.description}
            </Paragraph>
          </Div>

          {/* Benefits List */}
          {existsSecondaryBenefits && (
            <Div margin="1rem 0" display="flex" flexDirection="column">
              {content?.secondary?.benefits.map((benefit, index) => (
                <Div
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap="0.75rem"
                  margin="0 0 0.75rem 0"
                >
                  <Icon
                    icon="check-circle"
                    width="18px"
                    height="18px"
                    fill={Colors.green2}
                  />
                  <Paragraph
                    textAlign="left"
                    fontSize="0.875rem"
                    color={Colors.lightGray3}
                  >
                    {benefit}
                  </Paragraph>
                </Div>
              ))}
            </Div>
          )}

          {content?.secondary?.image?.childImageSharp && (
            <GatsbyImage
              style={{
                height: "auto",
                width: "100%",
                height: "220px",
                borderRadius: "0.5rem",
                margin: existsSecondaryBenefits ? "" : "2rem auto 0.5rem",
              }}
              imgStyle={{ objectFit: "cover" }}
              loading="eager"
              alt="Newsletter"
              draggable={false}
              image={getImage(
                content.secondary.image.childImageSharp.gatsbyImageData
              )}
            />
          )}

          {content?.secondary?.action_url ? (
            <Link to={content?.secondary?.action_url} target="_blank">
              <Button
                className="scale_hover"
                width="100%"
                padding="14px 24px"
                padding_tablet="14px 24px"
                borderRadius="8px"
                height="auto"
                fontSize="1rem"
                fontWeight="600"
                color="white"
                background={Colors.blue}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="0.5rem"
                margin={
                  content?.secondary?.footer_text
                    ? "1.5rem 0"
                    : "1.5rem 0 0.5rem 0"
                }
              >
                {content?.secondary?.action_text}
              </Button>
            </Link>
          ) : (
            <>
              {/* Newsletter Form - Maintaining existing functionality */}
              {formStatus.status === "thank-you" ? (
                <Div alignItems="center" flexDirection="column">
                  <H3
                    fontSize="16px"
                    lineHeight="24px"
                    margin="25px 0 10px 10px"
                    textAlign="center"
                    fontFamily="var(--font-sans)"
                    letterSpacing="normal"
                  >
                    {content?.newsletter_form?.success_message}
                  </H3>
                </Div>
              ) : (
                <Div justifyContent="center" width="100%" margin="1.5rem 0">
                  <Form
                    margin="0"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (formStatus.status === "error") {
                        setFormStatus({
                          status: "idle",
                          msg: content?.newsletter_form?.status_idle,
                        });
                      }
                      if (!formIsValid(formData)) {
                        setFormStatus({
                          status: "error",
                          msg: content?.newsletter_form?.status_error,
                        });
                      } else {
                        setFormStatus({
                          status: "loading",
                          msg: content?.newsletter_form?.button_loading,
                        });
                        const token = await captcha.current.executeAsync();
                        newsletterSignup(
                          {
                            ...formData,
                            token: { value: token, valid: true },
                          },
                          appSession
                        )
                          .then((data) => {
                            const hasError = data.error && data.error !== false;
                            if (hasError) {
                              setFormStatus({
                                status: "error",
                                msg: content?.newsletter_form
                                  ?.status_correct_errors,
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
                      height="46px"
                      placeholder={content?.newsletter_form?.placeholder_email}
                      borderRadius="8px"
                      bgColor={Colors.white}
                      border="1px solid #e5e7eb"
                      padding="0.75rem"
                      fontSize="1rem"
                      margin="0 0 0.75rem 0"
                      onChange={(value, valid) => {
                        setVal({
                          ...formData,
                          email: { value, valid },
                        });
                        if (formStatus.status === "error") {
                          setFormStatus({
                            status: "idle",
                            msg: content?.newsletter_form?.status_idle,
                          });
                        }
                      }}
                      value={formData.email.value}
                      errorMsg={content?.newsletter_form?.error_email}
                      required
                    />
                    <Div width="fit-content" margin="10px auto 0 auto">
                      <SafeReCAPTCHA ref={captcha} size="invisible" />
                    </Div>
                    <Button
                      className="scale_hover"
                      width="100%"
                      height="auto"
                      padding="14px 24px"
                      padding_tablet="14px 24px"
                      background={
                        formStatus.status === "loading"
                          ? "oklch(.92 0 0)"
                          : "oklch(.97 0 0)"
                      }
                      type="submit"
                      borderRadius="8px"
                      fontWeight="600"
                      justifyContent="center"
                      fontSize="1rem"
                      variant="full"
                      disabled={formStatus.status === "loading"}
                      display="flex"
                      alignItems="center"
                      gap="0.5rem"
                      style={{
                        color:
                          formStatus.status === "loading"
                            ? Colors.black
                            : Colors.black,
                      }}
                    >
                      {formStatus.status === "loading" ? (
                        content?.newsletter_form?.button_loading
                      ) : (
                        <>
                          <Icon icon="mail" width="18px" height="18px" />
                          <span>{content?.newsletter_form?.button_submit}</span>
                        </>
                      )}
                    </Button>
                  </Form>
                </Div>
              )}
            </>
          )}

          {content?.secondary?.footer_text && (
            <Paragraph
              fontSize="0.75rem"
              color={Colors.lightGray3}
              textAlign="center"
              margin="0"
              fontFamily="var(--font-sans)"
              letterSpacing="normal"
            >
              {content?.secondary?.footer_text}
            </Paragraph>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default DoubleActionCTA;
