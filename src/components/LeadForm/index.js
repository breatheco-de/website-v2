import React, { useContext, useState, useRef } from "react";
import { Alert, Input } from "../Form/index";
import { Row, Column, Div, GridContainer } from "../Sections";
import { H4, Paragraph } from "../Heading";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SessionContext } from "../../session";
import { Button, Colors } from "../Styling";
import { Break, Devices } from "../Responsive";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { SelectRaw } from "../Select";
import PhoneInput from "./PhoneInput";
import SafeReCAPTCHA from "../SafeReCAPTCHA";

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (formData[key].value === "" && formData[key].required === false)
      continue;
    if (!formData[key].valid) return false;
  }
  return true;
};

const Form = styled.form`
  margin: ${(props) => props.margin};
  margin-top: ${(props) => props.marginTop};
  padding: ${(props) => props.padding};
  width: auto;
  height: auto;
  display: block;
  background: ${(props) => (props.background ? props.background : "#FFFFFF")};
  border-radius: 3px;
  box-shadow: ${(props) => props.boxShadow};
  @media ${Break.sm} {
    display: ${(props) => props.d_sm};
  }
  @media ${Devices.xxs} {
  }

  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
    margin: ${(props) => props.margin_tablet};
    margin-top: ${(props) => props.marginTop_tablet};
    width: 100%;
  }
  @media ${Devices.md} {
    margin: ${(props) => props.margin_md};
    width: ${(props) => props.width_md};
  }
  @media ${Devices.lg} {
  }
`;

const _fields = {
  first_name: {
    value: "",
    valid: false,
    required: true,
    type: "text",
    place_holder: "First name",
    error: "Please specify a valid first name",
  },
  full_name: {
    value: "",
    valid: false,
    required: true,
    type: "text",
    place_holder: "Full name ",
    error: "Please specify a valid full name",
  },
  last_name: {
    value: "",
    valid: false,
    required: false,
    type: "text",
    place_holder: "Last name",
    error: "Please specify a valid last name",
  },
  email: {
    value: "",
    valid: false,
    required: true,
    type: "email",
    place_holder: "Your email",
    error: "Please specify a valid email",
  },
  phone: {
    value: "",
    valid: false,
    required: true,
    type: "phone",
    place_holder: "Phone number",
    error: "Please specify a valid phone",
  },
  client_comments: {
    value: "",
    valid: true,
    required: false,
    type: "text",
    place_holder: "Any comments?",
    error: "Please specify any comments",
  },
  form_type: {
    value: "",
    valid: true,
    required: true,
    type: "hidden",
    place_holder: "",
    error: "formType not found",
  },
  course: {
    value: "",
    valid: true,
    required: true,
    type: "selector",
    place_holder: "Select a program *",
    error: "Please choose a program",
  },
};

const clean = (fields, data) => {
  let cleanedData = { ...data };

  Object.keys(cleanedData).forEach(
    (key) =>
      // i also make sure I don't delete the hidden fields
      key !== "course" &&
      key !== "utm_location" &&
      cleanedData[key].type !== "hidden" &&
      //clean all the rest of the fields that are no supposed to be sent
      //according to the landing YML data
      !fields.includes(key) &&
      delete cleanedData[key]
  );

  // forget about the full_name, its relly first_name
  if (cleanedData.full_name !== undefined) {
    cleanedData.first_name = cleanedData.full_name;
    delete cleanedData.full_name;
  }

  console.log("FormData Before sending", cleanedData, data, fields);
  return cleanedData;
};

const LeadForm = ({
  id,
  marginButton,
  marginButton_tablet,
  widthButton,
  background,
  width_md,
  margin,
  marginTop,
  marginTop_tablet,
  marginTop_xs,
  margin_tablet,
  margin_md,
  gap,
  padding,
  justifyContentButton,
  buttonWidth_tablet,
  titleTextAlign,
  buttonBorderRadius,
  d_sm,
  fields,
  thankyou,
  heading,
  redirect,
  formHandler,
  data,
  handleClose,
  style,
  sendLabel,
  lang,
  motivation,
  layout,
  inputBgColor,
  textColor,
  buttonStyles,
  landingTemplate,
  selectProgram,
  selectLocation,
  textPadding,
  textPadding_tablet,
  titleMargin,
  titleMargin_tablet,
  headerImage,
  boxShadow,
}) => {
  const _query = useStaticQuery(graphql`
    query newLeadFormQuery {
      allPageYaml(
        filter: { fields: { file_name: { regex: "/privacy-policy/" } } }
      ) {
        edges {
          node {
            fields {
              lang
            }
          }
        }
      }
      allLeadFormYaml {
        edges {
          node {
            fields {
              lang
            }
            messages {
              loading
              success
              error
            }
            terms {
              agree_terms_text
              terms_and_conditions
              terms_and_conditions_link
              privacy_policy
              privacy_policy_link
              connector_and
            }
            form_fields {
              name
              required
              type
              place_holder
              error
            }
          }
        }
      }
    }
  `);

  let page = _query.allPageYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  let form = _query.allLeadFormYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  let yml = { ...page.node, ...form.node };

  const captcha = useRef(null);

  // Safe captcha execution with defensive checks
  const executeRecaptcha = async () => {
    if (captcha.current && typeof captcha.current.executeAsync === "function") {
      try {
        return await captcha.current.executeAsync();
      } catch (error) {
        console.warn("ReCAPTCHA execution failed:", error);
        return null;
      }
    }
    console.warn("ReCAPTCHA not available, proceeding without token");
    return null;
  };

  const [formStatus, setFormStatus] = useState({ status: "idle", msg: "" });
  const [formData, setVal] = useState(_fields);
  const [consentValue, setConsentValue] = useState([]);
  const [smsConsentChecked, setSmsConsentChecked] = useState(false);
  const { session, setLocation } = useContext(SessionContext);
  const courseSelector = yml.form_fields.find((f) => f.name === "course");
  const locationSelector = yml.form_fields.find((f) => f.name === "location");
  const consentCheckboxField = yml.form_fields.find(
    (f) => f.name === "consent"
  );

  React.useEffect(() => {
    setVal((_data) => {
      const _ = Object.keys(_data).reduce((total, key) => {
        if (_data[key] !== undefined) {
          const field = yml.form_fields.find((f) => f.name === key);
          return { ...total, [key]: { ..._data[key], ...field } };
        }
      }, {});

      return {
        ..._,
        ...data,
        utm_url: { type: "hidden", value: window.location.href, valid: true },
      };
    });
  }, [data]);

  //validate fields
  fields.forEach((f) => {
    if (formData[f] === undefined)
      throw Error(
        `Invalid form field ${f}, options are: ${Object.keys(formData).join(
          ","
        )}`
      );
  });

  const captchaChange = () => {
    const captchaValue = captcha?.current?.getValue();
    if (captchaValue)
      setVal({ ...formData, token: { value: captchaValue, valid: true } });
    else setVal({ ...formData, token: { value: null, valid: false } });
  };

  return (
    <Form
      id={id}
      boxShadow={boxShadow}
      width_md={width_md}
      margin={margin}
      background={background}
      margin_md={margin_md}
      margin_tablet={margin_tablet}
      marginTop={marginTop}
      marginTop_tablet={marginTop_tablet}
      marginTop_xs={marginTop_xs}
      padding="24px"
      d_sm={d_sm}
      style={style}
      onSubmit={async (e) => {
        e.preventDefault();

        if (formStatus.status === "error")
          setFormStatus({ status: "idle", msg: "" });
        const cleanedData = clean(fields, formData);

        // Validate all consents, including SMS
        const nonSmsConsents =
          session?.location?.consents?.filter(
            (c) => c.active && c.slug !== "sms_consent"
          ) || [];
        const allNonSmsChecked =
          consentValue.length === nonSmsConsents.length &&
          consentValue.every(Boolean);
        const smsConsentObj = session?.location?.consents?.find(
          (c) => c.slug === "sms_consent" && c.active
        );
        const smsConsentValid = smsConsentObj ? smsConsentChecked : true;

        if (
          !formIsValid(cleanedData) ||
          !allNonSmsChecked ||
          !smsConsentValid
        ) {
          setFormStatus({ status: "error", msg: yml.messages.error });
          return;
        }
        if (
          formData.course !== undefined &&
          Array.isArray(formData.course.value) &&
          formData.course.value.length > 1
        ) {
          setFormStatus({ status: "error", msg: courseSelector.error });
        } else if (
          formData.utm_location !== undefined &&
          Array.isArray(formData.utm_location.value) &&
          formData.utm_location.value.length > 1
        ) {
          setFormStatus({ status: "error", msg: locationSelector.error });
        } else {
          setFormStatus({ status: "loading", msg: yml.messages.loading });
          const token = await executeRecaptcha();
          formHandler(
            { ...cleanedData, token: { value: token || "", valid: !!token } },
            session
          )
            .then((data) => {
              if (data && data.error !== false && data.error !== undefined) {
                setFormStatus({ status: "error", msg: data.error });
              } else {
                if (redirect && redirect !== "") {
                  if (redirect.indexOf("http") > -1)
                    window.location.href = redirect;
                  else navigate(redirect);
                } else
                  setFormStatus({
                    status: "thank-you",
                    msg: yml.messages.success,
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
      {headerImage && (
        <Div
          position="absolute"
          top_tablet="-10px"
          right_tablet="-45%"
          top_md=""
          right_md=""
          top_lg=""
          right_lg=""
          width="100%"
          display="none"
          display_tablet="flex"
          display_md="flex"
          display_lg="flex"
          flexDirection_tablet="row"
          justifyContent_tablet="flex-end"
        >
          <GatsbyImage
            loading="eager"
            style={{
              width: "100%",
              height: "109px",
            }}
            imgStyle={{ objectFit: "contain" }}
            image={getImage(headerImage)}
            alt="4Geeks Logo"
          />
        </Div>
      )}
      {/* {heading && <H4 type="h4" fontSize="25px" width="auto" textAlign="center" textAlign_tablet={titleTextAlign || "left"} margin={landingTemplate ? "15px 0px 30px 0" : titleMargin || "20px 30px 15px 30px"} margin_tablet={titleMargin_tablet || "20px 40px 15px 40px"}>{heading}</H4>} */}
      {formStatus.status === "thank-you" ? (
        <Paragraph color={textColor} margin="20px 0px 0px 0px">
          {thankyou || formStatus.msg}
        </Paragraph>
      ) : (
        <>
          <Div
            display="block"
            className={"leadform-" + layout}
            size="12"
            gap={gap}
          >
            {heading && (
              <H4
                type="h4"
                // lineHeight="26px"
                lineHeight=""
                fontSize="45px"
                padding={headerImage && "0 10% 0 0"}
                color={textColor}
                fontWeight="400"
                fontFamily="Archivo"
                width="auto"
                textAlign={titleTextAlign || "left"}
                margin={
                  landingTemplate
                    ? "25px 0px 10px 0"
                    : titleMargin || "20px 0px 10px 0px"
                }
                margin_tablet="0 0 18px 0"
              >
                {heading}
              </H4>
            )}
            {motivation && (
              <Paragraph
                style={{ fontWeight: "400", color: textColor || "#000" }}
                fontFamily="Archivo"
                textAlign="left"
                padding={textPadding || "0px 0px 10px 0px"}
                padding_tablet={textPadding_tablet || "0px 0px 20px 0px"}
                opacity="1"
              >
                {motivation}
              </Paragraph>
            )}
            {fields
              .filter(
                (f) =>
                  formData[f].type !== "hidden" && formData[f].name !== "phone"
              )
              .map((f, i) => {
                const _field = formData[f];
                return (
                  <React.Fragment key={i}>
                    {_field.name !== "phone" && (
                      <Input
                        style={{ margin: "0 0 16px 0" }}
                        data-cy={f}
                        id={f}
                        bgColor={inputBgColor || "#FFFFFF"}
                        opacity="1"
                        type={_field.type}
                        className="form-control"
                        placeholder={_field.place_holder}
                        onChange={(value, valid) => {
                          setVal({
                            ...formData,
                            [f]: { ..._field, value, valid },
                          });
                          if (formStatus.status === "error") {
                            setFormStatus({ status: "idle", msg: "Request" });
                          }
                        }}
                        valid={true}
                        value={_field.value}
                        errorMsg={_field.error}
                        required={_field.required}
                      />
                    )}
                  </React.Fragment>
                );
              })}

            {fields
              .filter((l) => formData[l].name === "phone")
              .map((f, i) => {
                const _field = formData[f];
                return (
                  <PhoneInput
                    style={{ margin: "0 0 16px 0" }}
                    inputStyle={{ opacity: 1 }}
                    key={i}
                    data-cy="phone"
                    id="phone"
                    formData={formData}
                    setVal={setVal}
                    phoneFormValues={formData["phone"]}
                    errorMsg={_field.error}
                    sessionContextLocation={session && session.location}
                  />
                );
              })}

            {selectProgram?.length > 1 && (
              <Div data-cy="dropdown_program_selector" margin_tablet="0 0 0 0">
                <SelectRaw
                  //Not apply styles
                  options={selectProgram}
                  placeholder={courseSelector.place_holder}
                  valid={true}
                  controlStyles={{ opacity: 1 }}
                  onChange={(selected, valid) =>
                    setVal({
                      ...formData,
                      course: { value: selected.value, valid },
                    })
                  }
                />
              </Div>
            )}
            {selectLocation?.length > 1 && (
              <Div data-cy="dropdown_location_selector" margin_tablet="0">
                <SelectRaw
                  //Not apply styles
                  options={selectLocation}
                  placeholder={locationSelector.place_holder}
                  valid={true}
                  controlStyles={{ opacity: 1 }}
                  onChange={(selected, valid) => {
                    setVal({
                      ...formData,
                      utm_location: { value: selected.value, valid },
                    });
                    setLocation(selected.value);
                  }}
                />
              </Div>
            )}
            {layout === "flex" && (
              <Button
                width="fit-content"
                justifyContent="center"
                //width_tablet={buttonWidth_tablet}
                variant="full"
                type="submit"
                margin={marginButton}
                borderRadius={buttonBorderRadius || "0px 10px 10px 0px"}
                color={
                  formStatus.status === "loading"
                    ? Colors.darkGray
                    : Colors.blue
                }
                textColor={Colors.white}
                disabled={formStatus.status === "loading" ? true : false}
              >
                {formStatus.status === "loading" ? "Loading..." : sendLabel}
              </Button>
            )}
            {session &&
              session.location &&
              session.location.consents &&
              // Render non-SMS consents
              session.location.consents
                .filter(
                  (consent) => consent.active && consent.slug !== "sms_consent"
                )
                .map((consent, index) => (
                  <Div
                    key={`consent-${index}`}
                    position="relative"
                    margin="10px 0 0 0"
                    alignItems="center"
                  >
                    <input
                      required
                      name={`consent-${consent.slug}`}
                      type="checkbox"
                      checked={consentValue[index]}
                      onChange={() => {
                        const updatedConsentValue = [...consentValue];
                        updatedConsentValue[index] = !consentValue[index];
                        setConsentValue(updatedConsentValue);
                        setVal({
                          ...formData,
                          consents: {
                            ...formData.consents,
                            value: updatedConsentValue,
                          },
                        });
                      }}
                      style={{
                        width: "22px",
                        height: "22px",
                        top: "10px",
                        left: "7px",
                      }}
                    />
                    <Paragraph
                      fontSize="11px"
                      lineHeight="15px"
                      margin="8px 0 0 5px"
                      textAlign="left"
                      color={textColor}
                      dangerouslySetInnerHTML={{
                        __html: consent.message,
                      }}
                    />
                  </Div>
                ))}
            {/* Render SMS consent in a visually distinct section */}
            {session &&
              session.location &&
              session.location.consents &&
              session.location.consents.some(
                (consent) => consent.slug === "sms_consent" && consent.active
              ) && (
                <Div
                  className="sms-consent-section"
                  position="relative"
                  margin="10px 0 0 0"
                  alignItems="center"
                >
                  {session.location.consents
                    .filter(
                      (consent) =>
                        consent.slug === "sms_consent" && consent.active
                    )
                    .map((consent, idx) => (
                      <React.Fragment key={`sms-consent-${idx}`}>
                        <input
                          required
                          name="smsConsent"
                          type="checkbox"
                          checked={smsConsentChecked}
                          onChange={() => {
                            setSmsConsentChecked(!smsConsentChecked);
                            setVal({
                              ...formData,
                              sms_consent: {
                                value: !smsConsentChecked,
                                valid: !smsConsentChecked,
                              },
                            });
                          }}
                          style={{
                            width: "22px",
                            height: "22px",
                            top: "10px",
                            left: "7px",
                          }}
                        />
                        <Paragraph
                          fontSize="11px"
                          lineHeight="15px"
                          margin="8px 0 0 5px"
                          textAlign="left"
                          color={textColor}
                          dangerouslySetInnerHTML={{
                            __html: consent.message,
                          }}
                        />
                      </React.Fragment>
                    ))}
                </Div>
              )}
            {formStatus.status === "error" && (
              <Alert color="red" margin="20px 0 0 0" padding="5px 0 0 0">
                {formStatus.msg}
              </Alert>
            )}
            <Div width="fit-content" margin="10px auto 0 auto">
              <SafeReCAPTCHA
                ref={captcha}
                // onChange={captchaChange}
                size="invisible"
              />
            </Div>
            {layout === "block" && (
              <Div
                display="flex"
                padding="10px 0 0 0"
                width="100%"
                flexDirection="row-reverse"
              >
                <Button
                  type="submit"
                  fontSize="21px"
                  height="auto"
                  width="100%"
                  margin={marginButton}
                  margin_tablet={marginButton_tablet}
                  width_lg={widthButton}
                  justifyContent="center"
                  background={buttonStyles?.background || Colors.black}
                  borderRadius="3px"
                  color={
                    formStatus.status === "loading"
                      ? Colors.darkGray
                      : Colors.white
                  }
                  disabled={formStatus.status === "loading" ? true : false}
                >
                  {formStatus.status === "loading" ? "Loading..." : sendLabel}
                </Button>
              </Div>
            )}
            <Paragraph fontSize="10px" textAlign="left" color={textColor}>
              {yml.terms.agree_terms_text}{" "}
              <a
                href={yml.terms.terms_and_conditions_link}
                style={{
                  color:
                    background === Colors.blue ? Colors.black : Colors.blue,
                }}
                target="_blank"
              >
                {yml.terms.terms_and_conditions}
              </a>{" "}
              {yml.terms.connector_and}{" "}
              <a
                href={yml.terms.privacy_policy_link}
                style={{
                  color:
                    background === Colors.blue ? Colors.black : Colors.blue,
                }}
                target="_blank"
              >
                {yml.terms.privacy_policy}
              </a>
            </Paragraph>
          </Div>
        </>
      )}
    </Form>
  );
};

LeadForm.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  motivation: PropTypes.string,
  sendLabel: PropTypes.string,
  redirect: PropTypes.string,
  layout: PropTypes.string,
  fields: PropTypes.array,
  formHandler: PropTypes.func,
  handleClose: PropTypes.func,
  buttonStyles: PropTypes.object,
};
LeadForm.defaultProps = {
  heading: null,
  motivation: null,
  sendLabel: "SEND",
  formHandler: null,
  redirect: null,
  handleClose: null,
  layout: "block",
  id: "leadform",
  data: {},
  buttonStyles: {},
  fields: ["full_name", "phone", "email"],
};
export default LeadForm;
