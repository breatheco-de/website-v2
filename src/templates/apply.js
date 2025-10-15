import React, { useState, useContext, useRef } from "react";
import { graphql, navigate } from "gatsby";
import { Div, GridContainer, Header, Grid } from "../components/Sections";
import { H3, Paragraph } from "../components/Heading";
import { Colors, Button } from "../components/Styling";
import { Input, Alert } from "../components/Form";
import { SelectRaw } from "../components/Select";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import { Circle } from "../components/BackgroundDrawing";
import { apply, tagManager } from "../actions";
import PhoneInput from "../components/LeadForm/PhoneInput";
import Modal from "../components/Modal_v2";
import { isWindow } from "../utils/utils";
import SafeReCAPTCHA from "../components/SafeReCAPTCHA";

const us = {
  "(In-person and from home available)": "(In-person and from home available)",
  "(From home until further notice)": "(From home until further notice)",
  Europe: "Europe",
  "Latin America": "Latin America",
  "USA & Canada": "USA & Canada",
  "Rest of the world": "Rest of the world",
};
const es = {
  "(In-person and from home available)": "(Presencial o desde casa)",
  "(From home until further notice)": "(Desde casa hasta nuevo aviso)",
  Europe: "Europa",
  "Latin America": "Latinoamérica",
  "USA & Canada": "USA & Canada",
  "Rest of the world": "Resto del mundo",
};
const trans = { us, es };

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (formData[key] !== undefined && !formData[key].valid) return key;
  }
  return true;
};

const Apply = (props) => {
  const { data, pageContext, yml } = props;
  const captcha = useRef(null);
  const { session } = useContext(SessionContext);
  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Apply",
  });
  const [formData, setVal] = useState({
    first_name: { value: "", valid: false },
    phone: { value: "", valid: false },
    email: { value: "", valid: false },
    location: { value: "", valid: false },
    consents: { value: [], valid: true },
    referral_key: { value: null, valid: true },
    course: { value: null, valid: false },
  });
  const [consentValue, setConsentValue] = useState([]);

  React.useEffect(() => {
    if (isWindow) window.GATSBY_CAPTCHA_KEY = process.env.GATSBY_CAPTCHA_KEY;
  }, []);

  const programs = data.allCourseYaml.edges
    .filter(
      ({ node }) =>
        !["unlisted", "hidden"].includes(node.meta_info.visibility) &&
        node.meta_info.show_in_apply
    )
    .map(({ node }) => ({
      label: node.apply_form.label,
      value: node.meta_info.bc_slug,
    }));

  // Filter programs based on selected location
  const filteredPrograms = React.useMemo(() => {
    // Define course restrictions - full-stack-ft only available in Dallas and Miami
    const courseLocationRestrictions = {
      "full-stack-ft": ["dallas-usa", "downtown-miami"],
    };

    return programs.filter((program) => {
      // If no location is selected, show all programs except restricted ones
      if (!formData.location.value) {
        return !courseLocationRestrictions[program.value];
      }

      // Check if this program has location restrictions
      const restrictedLocations = courseLocationRestrictions[program.value];
      if (restrictedLocations) {
        // Only show if current location is in the allowed list
        return restrictedLocations.includes(formData.location.value);
      }

      // No restrictions, show the program
      return true;
    });
  }, [programs, formData.location.value]);

  const [regionVal, setRegionVal] = useState(null);
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const regions = [
    { label: trans[pageContext.lang]["Latin America"], value: "latam" },
    { label: trans[pageContext.lang]["USA & Canada"], value: "usa-canada" },
    { label: trans[pageContext.lang]["Europe"], value: "europe" },
    { label: trans[pageContext.lang]["Rest of the world"], value: "online" },
  ];

  const locationContext = session && session.location;
  const locations = React.useMemo(
    () =>
      data.allLocationYaml.edges
        .map((l) => l.node)
        .sort((a, b) => {
          // First, sort by availability (both in-person and online first)
          const aHasBoth =
            a.online_available === true && a.in_person_available === true;
          const bHasBoth =
            b.online_available === true && b.in_person_available === true;

          if (aHasBoth && !bHasBoth) return -1;
          if (!aHasBoth && bHasBoth) return 1;

          // If both have same availability, sort by position
          return a.meta_info.position > b.meta_info.position ? 1 : -1;
        })
        .map((m) => ({
          label:
            m.name +
            " " +
            (m.online_available == true && m.in_person_available == true
              ? trans[pageContext.lang]["(In-person and from home available)"]
              : ""),
          value: m.active_campaign_location_slug,
          region: m.meta_info.region,
          dialCode: m.meta_info.dialCode,
          country: m.country,
          consents: m.consents,
        })),
    [data.allLocationYaml, pageContext.lang]
  );

  React.useEffect(() => {
    tagManager("application_rendered");
  }, []);

  React.useEffect(() => {
    if (formData.location.value) {
      const selectedLocation = locations?.find(
        (l) => l.value === formData.location.value
      );
      if (!selectedLocation) {
        // Reset location and consents if location is not found in new language
        setVal((prev) => ({
          ...prev,
          location: { value: "", valid: false },
          consents: { value: [], valid: true },
        }));
        setConsentValue([]);
        return;
      }
      const activeConsents =
        selectedLocation?.consents?.filter((c) => c.active) || [];
      if (activeConsents.length !== consentValue.length) {
        setConsentValue(new Array(activeConsents.length).fill(false));
      }
    } else {
      // If no location is selected, reset consents
      setConsentValue([]);
    }
  }, [formData.location.value, locations, pageContext.lang]);

  // Clear course selection if current course is not available for selected location
  React.useEffect(() => {
    if (formData.location.value && formData.course.value) {
      const courseLocationRestrictions = {
        "full-stack-ft": ["dallas-usa", "downtown-miami"],
      };

      const restrictedLocations =
        courseLocationRestrictions[formData.course.value];
      if (
        restrictedLocations &&
        !restrictedLocations.includes(formData.location.value)
      ) {
        // Clear the course selection if it's not available for the current location
        setVal((prev) => ({
          ...prev,
          course: { value: null, valid: false },
        }));
      }
    }
  }, [formData.location.value, formData.course.value]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Pre-fill the region
    let _region = urlParams.get("region");
    if (!_region && session.location?.meta_info?.region) {
      _region = session.location.meta_info.region; // e.g. 'latam'
    }

    // Pre-fill the location
    let _location = urlParams.get("location");
    if (!_location && session.location)
      _location = session.location.active_campaign_location_slug;

    if (typeof _location === "string" && session.locations)
      _location = session.locations.find(
        (l) =>
          l.active_campaign_location_slug === _location ||
          l.breathecode_location_slug === _location
      );
    else _location = null;

    if (_location) _location = _location.active_campaign_location_slug;

    // Pre-fill the course
    let _course = urlParams.get("course");
    if (!_course && props.location.state) _course = props.location.state.course;
    if (typeof _course === "string") {
      // Find the course in the original programs array
      const foundCourse = programs.find((p) => p.value === _course);

      // If we found the course, check if it's available for the selected location
      if (foundCourse) {
        const courseLocationRestrictions = {
          "full-stack-ft": ["dallas-usa", "downtown-miami"],
        };

        const restrictedLocations =
          courseLocationRestrictions[foundCourse.value];
        if (restrictedLocations) {
          // If the course has restrictions, only set it if the location is allowed
          if (_location && restrictedLocations.includes(_location)) {
            _course = foundCourse;
          } else {
            _course = null; // Don't pre-fill restricted courses if location doesn't match
          }
        } else {
          _course = foundCourse; // No restrictions, use the course
        }
      } else {
        _course = null;
      }
    }

    // Pre-fill the utm_url
    let _utm_url = undefined;
    if (props.location.state)
      _utm_url = { value: props.location.state.prevUrl, valid: true };

    setVal((_val) => ({
      ..._val,
      utm_url: _utm_url,
      // this is the line that automatically sets the location, we don't want that anymore
      // its better if leads choose the location themselves
      location: {
        value: _location || "",
        valid: typeof _location === "string" && _location !== "",
      },
      course: {
        value: _course || null,
        valid: _course && _course.value ? true : false,
      },
      referral_key: { value: session?.utm?.referral_code || null, valid: true },
    }));

    setRegionVal(_region || null);
  }, [session]);

  let privacy = data.privacy.edges.find(
    ({ node }) => node.fields.lang === pageContext.lang
  );
  if (privacy) privacy = privacy.node;

  const submitForm = (payload) => {
    setFormStatus({ status: "loading", msg: "Loading..." });
    apply(
      {
        ...formData,
        ...payload,
        course: formData.course.value,
        location: formData.location.value,
      },
      session
    )
      .then((data) => {
        if (typeof data.error !== "undefined") {
          setFormStatus({ status: "error", msg: "Fix errors" });
        } else {
          setFormStatus({ status: "thank-you", msg: "Thank you" });
          if (!session || !session.utm || !session.utm.utm_test)
            navigate(
              `${pageContext.lang === "us" ? "/us/thank-you" : "/es/gracias"}`
            );
          else
            console.log(
              "Lead success, but no redirection because of testing purposes"
            );
        }
      })
      .catch((error) => {
        console.log("error", error);
        setFormStatus({
          status: "error",
          msg: error.message || error,
        });
      });
  };

  const captchaChange = () => {
    const captchaValue = captcha?.current?.getValue();
    if (captchaValue)
      setVal({ ...formData, token: { value: captchaValue, valid: true } });
    else setVal({ ...formData, token: { value: null, valid: false } });
  };
  return (
    <>
      <Header
        padding="0 10px"
        padding_tablet="64px 0 "
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph_html={yml.header.paragraph}
        fontSize_paragraph="20px"
        margin="90px 0 0 0"
        position="relative"
      >
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="90px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="0"
          left="125px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="168px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="205px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="0"
          left="304px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="32px"
          left="35px"
          zIndex="1"
          display="none"
          display_tablet="inline"
          opacity="0.2"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="32px"
          left="70px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="32px"
          left="125px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="32px"
          left="168px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="32px"
          left="249px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="red"
          width="27px"
          height="27px"
          top="183px"
          left="125px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="250px"
          height="250px"
          bottom="-100px"
          right="-68px"
          opacity="0.2"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="120px"
          right="50px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="120px"
          right="89px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="120px"
          right="128px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="119px"
          height="11px"
          border="10px"
          bottom="115px"
          right="40px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="77px"
          height="11px"
          border="10px"
          bottom="115px"
          right="175px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="116px"
          height="116px"
          bottom="-58px"
          left="-58px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="lightBlue"
          width="57px"
          height="57px"
          top="32px"
          left="-28px"
          display="inline"
          display_tablet="none"
        />
      </Header>
      <GridContainer columns_tablet="12" margin="0 0 82px 0">
        <Div
          gridColumn_tablet="1 / 7"
          gridRow_tablet="1 / 1"
          flexDirection="column"
          textAlign="center"
        >
          <form
            onSubmit={async (e) => {
              try {
                e.preventDefault();
                if (formStatus.status === "error")
                  setFormStatus({ status: "idle", msg: "Resquest" });

                const valid = formIsValid(formData);
                if (valid !== true) {
                  setFormStatus({
                    status: "error",
                    msg: `${yml.left.form_section.errors.default} ${valid}`,
                  });
                } else {
                  if (showPhoneWarning && regionVal !== "online") {
                    setShowModal(true);
                  } else {
                    const token = await captcha.current.executeAsync();
                    submitForm({ token });
                  }
                }
              } catch (e) {
                console.log("e");
                console.log(e);
              }
            }}
          >
            <Div margin_tablet="0 0 23px 0">
              <Input
                data-cy="first_name"
                border="1px solid hsl(0,0%,80%)"
                borderRadius="3px"
                bgColor={Colors.white}
                type="text"
                className="form-control"
                placeholder={yml.left.form_section.first_name}
                errorMsg="Please specify a valid first name"
                required
                onChange={(value, valid) => {
                  setVal({ ...formData, first_name: { value, valid } });
                  if (formStatus.status === "error") {
                    setFormStatus({ status: "idle", msg: "Resquest" });
                  }
                }}
                value={formData.first_name.value || ""}
              />
            </Div>
            <Grid
              gridTemplateColumns_tablet="repeat(12, 1fr)"
              margin_tablet="0 0 23px 0"
              gridGap="0"
              gridGap_tablet="15px"
            >
              <Div gridColumn_tablet="1 / 7">
                <Input
                  data-cy="email"
                  border="1px solid hsl(0,0%,80%)"
                  bgColor={Colors.white}
                  type="email"
                  className="form-control"
                  placeholder={yml.left.form_section.email}
                  errorMsg="Please specify a valid email"
                  required
                  onChange={(value, valid) => {
                    setVal({ ...formData, email: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.email.value || ""}
                />
              </Div>
              <Div gridColumn_tablet="7 / 13">
                <PhoneInput
                  data-cy="phone"
                  setVal={setVal}
                  formData={formData}
                  phoneFormValues={formData["phone"]}
                  errorMsg="Please specify a valid phone number"
                  sessionContextLocation={locationContext}
                  campusDial={formData?.location.value}
                  setShowPhoneWarning={setShowPhoneWarning}
                />
              </Div>
            </Grid>
            <Div
              data-cy="dropdown_program_selector"
              tabindex="1"
              margin_tablet="0 0 23px 0"
            >
              <SelectRaw
                bgColor={Colors.white}
                options={filteredPrograms}
                value={formData.course.value || ""}
                defaultValue={formData.course.value}
                placeholder={yml.left.course_title.open}
                inputId={"dropdown_program_selector"}
                onChange={(value, valid) =>
                  setVal({ ...formData, course: { value, valid } })
                }
              />
            </Div>
            <Div
              data-cy="dropdown_region_selector"
              tabindex="1"
              contenteditable="true"
              margin_tablet="0 0 12px 0"
            >
              <SelectRaw
                tabindex="1"
                bgColor={Colors.black}
                options={regions}
                value={
                  regionVal ? regions.find((r) => r.value === regionVal) : null
                }
                placeholder={yml.left.regions_title}
                inputId="dropdown_region_selector"
                onChange={(value) => {
                  setRegionVal(value.value);
                  setVal({
                    ...formData,
                    location: { value: "", valid: false },
                  });
                }}
              />
            </Div>
            {formStatus.status === "error" && !formData.location.valid && (
              <Alert color="red">Please pick a location</Alert>
            )}
            {showPhoneWarning && regionVal !== "online" && (
              <Div
                background="rgba(0, 151, 205, 0.19)"
                borderRadius="2px"
                padding="5px 10px"
              >
                <Paragraph
                  fontSize="10px"
                  lineHeight="12px"
                  color="#000"
                  textAlign="left"
                >
                  {yml.left.form_section.phone_warning}
                </Paragraph>
              </Div>
            )}
            {regionVal && (
              <Div
                data-cy="dropdown_academy_selector"
                tabindex="1"
                contenteditable="true"
                margin_tablet="11px 0 23px 0"
              >
                {(() => {
                  const options =
                    regionVal === "online"
                      ? [{ label: "Online", value: "online" }]
                      : locations?.filter(
                          (academy) => academy.region === regionVal
                        ) || [];

                  return (
                    <SelectRaw
                      bgColor={Colors.black}
                      options={options}
                      value={locations?.find(
                        (el) => el.value === formData.location.value
                      )}
                      placeholder={yml.left.locations_title}
                      inputId={"dropdown_academy_selector"}
                      onChange={(value) => {
                        setVal((prev) => ({
                          ...prev,
                          location: {
                            value: value.value,
                            valid: !!value.value,
                          },
                        }));
                      }}
                    />
                  );
                })()}
              </Div>
            )}
            {formData.referral_key.value &&
              formData.referral_key.value != "" && (
                <Alert color="blue">
                  You have applied a referral code to this form
                </Alert>
              )}
            <Input
              border="1px solid hsl(0,0%,80%)"
              bgColor={Colors.white}
              type="text"
              className="form-control"
              placeholder={yml.left.referral_section.placeholder}
              value={formData.referral_key.value || ""}
              onChange={(value, valid) =>
                setVal({ ...formData, referral_key: { value, valid } })
              }
            />
            {session?.location &&
              formData.location.value &&
              locations
                ?.find((l) => l.value === formData.location.value)
                ?.consents?.filter((consent) => consent.active)
                ?.map((consent, index) => (
                  <Div
                    key={`consent-${index}`}
                    margin="15px 0 0 0"
                    display="flex"
                    alignItems="center"
                  >
                    <input
                      required
                      type="checkbox"
                      checked={consentValue[index] || false}
                      onChange={() => {
                        const newConsentValue = [...consentValue];
                        newConsentValue[index] = !newConsentValue[index];
                        setConsentValue(newConsentValue);
                        setVal({
                          ...formData,
                          consents: {
                            ...formData.consents,
                            value: newConsentValue,
                            valid: newConsentValue.every((v) => v),
                          },
                        });
                      }}
                      style={{
                        width: "22px",
                        height: "22px",
                        marginRight: "7px",
                      }}
                    />
                    <Paragraph
                      margin="0 0 0 15px"
                      fontSize="10px"
                      lineHeight="15px"
                      textAlign="justify"
                      dangerouslySetInnerHTML={{ __html: consent.message }}
                    />
                  </Div>
                ))}
            <Div width="fit-content" margin="10px auto 0 auto">
              <SafeReCAPTCHA ref={captcha} size="invisible" />
            </Div>
            <Div
              flexDirection_tablet="column"
              flexDirection="column"
              justifyContent="end"
            >
              {formStatus.status === "error" && (
                <Alert data-cy="alertText" color="red">
                  {formStatus.msg}
                </Alert>
              )}
              <Button
                variant="full"
                type="submit"
                margin="2rem auto"
                margin_tablet="2rem 0 0 auto"
                width="100%"
                textAlign="center"
                display="block"
                borderRadius="4px"
                color={
                  formStatus.status === "loading"
                    ? Colors.darkGray
                    : Colors.blue
                }
                textColor={Colors.white}
                padding=".45rem 3rem"
                disabled={formStatus.status === "loading" ? true : false}
              >
                {formStatus.status === "loading"
                  ? "Loading..."
                  : yml.left.button.button_text}
              </Button>
              <Paragraph fontSize="10px" textAlign="left">
                {yml.left.terms.agree_terms_text}{" "}
                <a
                  href={yml.left.terms.terms_and_conditions_link}
                  target="_blank"
                >
                  {yml.left.terms.terms_and_conditions}
                </a>{" "}
                {yml.left.terms.connector_and}{" "}
                <a href={yml.left.terms.privacy_policy_link} target="_blank">
                  {yml.left.terms.privacy_policy}
                </a>
              </Paragraph>
            </Div>
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              showHeader={true}
              title={yml.left.form_section.modal.title}
              padding="20px 10px"
            >
              <Paragraph>{yml.left.form_section.modal.text}</Paragraph>
              <Div justifyContent="between">
                <Button
                  variant="full"
                  margin="2rem 0 0 0"
                  color={Colors.blue}
                  textColor={Colors.white}
                  padding_tablet=".40rem 2.1rem"
                  padding=".40rem .7rem"
                  maxWidth_tablet="none"
                  maxWidth_sm="160px"
                  maxWidth="125px"
                  disabled={formStatus.status === "loading" ? true : false}
                  onClick={() => setShowModal(false)}
                >
                  {yml.left.form_section.modal.left_button}
                </Button>
                <Button
                  variant="outline"
                  margin="2rem 0 0 0"
                  color={Colors.blue}
                  padding_tablet=".40rem 2.1rem"
                  padding=".40rem .7rem"
                  maxWidth_tablet="none"
                  maxWidth_sm="160px"
                  maxWidth="125px"
                  disabled={formStatus.status === "loading" ? true : false}
                  onClick={() => {
                    setShowModal(false);
                    submitForm();
                  }}
                >
                  {formStatus.status === "loading"
                    ? "Loading..."
                    : `${yml.left.form_section.modal.right_button} ${formData?.location?.value?.country}`}
                </Button>
              </Div>
            </Modal>
          </form>
        </Div>

        <Div
          gridColumn_tablet="8 / 13"
          gridRow_tablet="1 / 1"
          background={Colors.lightGray}
          padding="46px 40px"
          flexDirection="column"
          borderRadius="3px"
        >
          <H3 textAlign="left" textTransform="capitalize">
            {yml.right.heading}
          </H3>
          {yml.right.content_section.map((m, i) => {
            return (
              <Paragraph
                textAlign="left"
                margin="20px 0"
                key={i}
                dangerouslySetInnerHTML={{ __html: m }}
              />
            );
          })}
        </Div>
      </GridContainer>
    </>
  );
};
export const query = graphql`
  query ApplyQuery($file_name: String!, $lang: String!) {
    allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          name
          consents {
            active
            message
            slug
          }
          active_campaign_location_slug
          breathecode_location_slug
          in_person_available
          online_available
          country
          meta_info {
            region
            dialCode
            position
          }
        }
      }
    }
    privacy: allPageYaml(
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
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          header {
            title
            paragraph
            image_alt
            button
          }
          meta_info {
            title
            description
            image
            keywords
          }
          left {
            heading
            locations_title
            regions_title
            course_title {
              open
              close
            }
            button {
              button_text
              button_link
            }
            terms {
              agree_terms_text
              terms_and_conditions
              terms_and_conditions_link
              privacy_policy
              privacy_policy_link
              connector_and
            }
            form_section {
              first_name
              last_name
              email
              phone
              phone_warning
              errors {
                default
              }
              modal {
                title
                text
                left_button
                right_button
              }
            }
            referral_section {
              placeholder
              content
            }
          }
          right {
            heading
            content_section
          }
          testimonial_header {
            heading
            sub_heading
          }
        }
      }
    }
    allCourseYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          meta_info {
            slug
            title
            bc_slug
            visibility
            show_in_apply
          }
          apply_form {
            label
          }
        }
      }
    }
  }
`;
export default BaseRender(Apply);
