import React, { useState, useEffect, useContext, useRef } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GridContainer, Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, Button, Spinner } from "../Styling";
import dayjs from "dayjs";
import { SelectRaw } from "../Select";
import "dayjs/locale/de";
import Icon from "../Icon";
import styled from "styled-components";
import { Input } from "../Form";
import { getCohorts, newsletterSignup } from "../../actions";
import { SessionContext } from "../../session";
import SafeReCAPTCHA from "../SafeReCAPTCHA";

const Form = styled.form`
  margin: 0 11px 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UpcomingDates = ({
  id,
  style,
  lang,
  location,
  locations,
  message,
  defaultCourse,
  actionMessage,
  showMoreRedirect,
}) => {
  const dataQuery = useStaticQuery(graphql`
    {
      allUpcomingDatesYaml {
        edges {
          node {
            title
            paragraph
            conector
            to
            remote
            placeholder
            button {
              text
              top_label
            }
            syllabus_alias {
              default_course
              course_slug
              name
              duration_weeks
              slug_variants
            }
            email_form_content {
              heading
              button_text
              successful_text
            }
            online_bootcamp
            info {
              button_link
              button_text
              program_label
              duration_label
              location_label
              date
              action_label
              in_person
              remote
              remote_usa
              remote_latam
              remote_europe
              region_usa
              region_latam
              region_europe
            }
            no_course_message
            footer {
              button_text
              button_text_close
              button_text_open
              button_link
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const { session } = useContext(SessionContext);
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

  const [data, setData] = useState({
    cohorts: { catalog: [], all: [], filtered: [] },
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [academy, setAcademy] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Resquest",
  });
  const [formData, setVal] = useState({
    email: { value: "", valid: false },
    consent: { value: true, valid: true },
  });

  const captchaChange = () => {
    const captchaValue = captcha?.current?.getValue();
    if (captchaValue)
      setVal({ ...formData, token: { value: captchaValue, valid: true } });
    else setVal({ ...formData, token: { value: null, valid: false } });
  };

  let content = dataQuery.allUpcomingDatesYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;

  // Helper function to get duration from syllabus alias
  const getDurationFromSyllabus = (courseSlug) => {
    const syllabus = syllabusAlias.find(
      (syll) => syll.course_slug === courseSlug
    );
    return syllabus?.duration_weeks || null;
  };

  // Cohort-slug fallback: match cohort.slug to syllabus_alias when syllabus_version missing or enrichment failed
  const getDisplayInfoFromCohortSlug = (cohortSlug) => {
    if (!cohortSlug || typeof cohortSlug !== "string") return null;
    const slug = cohortSlug.toLowerCase();
    const sorted = [...(syllabusAlias || [])].sort(
      (a, b) =>
        (b.default_course?.length ?? 0) - (a.default_course?.length ?? 0)
    );
    const alias = sorted.find((syll) => {
      const dc = syll.default_course?.toLowerCase();
      if (!dc) return false;
      if (slug.includes(dc)) return true;
      const variants = syll.slug_variants || [];
      return variants.some((v) => slug.includes(v));
    });
    return alias
      ? {
          name: alias.name,
          duration_weeks: alias.duration_weeks,
          course_slug: alias.course_slug,
          default_course: alias.default_course,
        }
      : null;
  };

  // Helper function to get regional remote text based on academy slug
  const getRegionalRemoteText = (academySlug) => {
    const regionMappings = {
      europe: () =>
        academySlug?.includes("spain") || academySlug === "madrid-spain",
      latam: () => academySlug === "online",
      usa: () => academySlug?.includes("miami") || academySlug?.includes("usa"),
    };

    const matchedRegion = Object.keys(regionMappings).find((region) =>
      regionMappings[region]()
    );

    const remoteTextMap = {
      europe: content.info.remote_europe,
      latam: content.info.remote_latam,
      usa: content.info.remote_usa,
    };

    return remoteTextMap[matchedRegion] || content.info.remote;
  };

  const emailFormContent = content.email_form_content;
  const syllabusAlias = content.syllabus_alias;

  const getData = async () => {
    try {
      setIsLoading(true);

      const academySlug =
        session?.academyAliasDictionary?.[location] ||
        location ||
        session?.academyAliasDictionary?.[academy?.value];

      // Only pass academy to API when it is a real academy slug (from locations), not a region value (usa, europe, latam)
      const validAcademySlugs = (locations || [])
        .map(({ node }) => node?.breathecode_location_slug)
        .filter(Boolean);
      const isRealAcademySlug =
        academySlug && validAcademySlugs.includes(academySlug);

      // Normalize course slugs for client-side matching consistency (API is called without syllabus_slug_like)
      const normalizedDefaultCourse = (() => {
        const raw = (defaultCourse || "").toLowerCase();
        const aliasMap = {
          cybersecurity: "cyber-security",
        };
        return aliasMap[raw] || raw;
      })();

      const requestParams = {
        ...(defaultCourse && isRealAcademySlug && { academy: academySlug }),
        limit: 50,
      };
      console.log("🔍 API Debug - Request Parameters:", {
        defaultCourse,
        academySlug,
        apiUrl: "getCohorts",
        requestParams,
      });

      const response = await getCohorts(requestParams);

      console.log("📡 API Debug - Raw Response:", {
        response,
        resultsCount: response?.results?.length ?? 0,
        hasResults: !!response?.results,
      });

      if (!response || !response.results) {
        console.error("Invalid response from cohorts API:", response);
        setIsLoading(false);
        return;
      }

      if (response?.results) {
        console.log("📊 API Debug - Detailed Cohort Analysis:", {
          defaultCourse,
          totalCohorts: response.results.length,
          cohortDetails: response.results.map((cohort) => ({
            slug: cohort.slug,
            academy: cohort.academy?.slug,
            syllabusVersionSlug: cohort.syllabus_version?.slug,
            syllabusVersionName: cohort.syllabus_version?.name,
            matchesDefaultCourse: cohort.syllabus_version?.slug
              ?.toLowerCase()
              ?.includes(defaultCourse?.toLowerCase() || ""),
          })),
        });
      }

      const academyLocation = locations.find(
        ({ node }) =>
          node.breathecode_location_slug === location ||
          node.breathecode_location_slug === academy?.value
      );

      // Derive region from locations (meta_info.region) and normalize to dropdown values (usa, europe, latam)
      const getRegionFromLocations = (slug, locationEdges) => {
        if (!slug || !Array.isArray(locationEdges)) return null;
        // API uses academy "online" for LATAM remote cohorts; location YAML has online as usa-canada
        if (slug === "online") return "latam";
        const loc = locationEdges.find(
          ({ node }) => node?.breathecode_location_slug === slug
        );
        const region = loc?.node?.meta_info?.region;
        if (!region) return null;
        const normalized = String(region).toLowerCase();
        if (normalized.includes("usa") || normalized.includes("canada"))
          return "usa";
        if (normalized.includes("europe")) return "europe";
        if (normalized.includes("latam")) return "latam";
        return null;
      };

      const cohorts =
        response?.results.filter((elm) => {
          if (
            Array.isArray(academyLocation?.node.meta_info.cohort_exclude_regex)
          ) {
            if (
              academyLocation.node.meta_info.cohort_exclude_regex.some((regx) =>
                RegExp(regx).test(elm.slug)
              )
            ) {
              return false;
            }
          }

          if (selectedRegion?.value) {
            const cohortRegion = getRegionFromLocations(
              elm.academy?.slug,
              locations
            );
            return cohortRegion === selectedRegion.value;
          }

          return true;
        }) || [];

      const courseFilteredCohorts = cohorts.filter((cohort) => {
        const syllabusSlug = cohort.syllabus_version?.slug?.toLowerCase();

        console.log("🎯 Course Filter Debug:", {
          cohortSlug: cohort.slug,
          defaultCourse,
          syllabusSlug,
          syllabusName: cohort.syllabus_version?.name,
          fallbackMatch: syllabusSlug?.includes(normalizedDefaultCourse || ""),
        });

        // More precise matching using actual syllabus patterns
        const courseMatchers = {
          "full-stack": () => {
            // Part-time full-stack: should contain "pt" but not be exactly "full-stack-ft"
            return (
              syllabusSlug?.includes("full-stack") &&
              (syllabusSlug?.includes("pt") ||
                syllabusSlug?.includes("part-time")) &&
              syllabusSlug !== "full-stack-ft"
            );
          },
          "full-stack-ft": () => {
            // Full-time full-stack: exact match or contains "ft" without "pt"
            return (
              syllabusSlug === "full-stack-ft" ||
              (syllabusSlug?.includes("full-stack") &&
                syllabusSlug?.includes("ft") &&
                !syllabusSlug?.includes("pt") &&
                !syllabusSlug?.includes("part-time"))
            );
          },
          "machine-learning": () => syllabusSlug?.includes("machine-learning"),
          cybersecurity: () =>
            syllabusSlug?.includes("cybersecurity") ||
            syllabusSlug?.includes("cyber-security"),
          "ai-engineering": () => syllabusSlug?.includes("ai-engineering"),
        };

        const matcherResult = courseMatchers[normalizedDefaultCourse]?.();
        const fallbackResult = syllabusSlug?.includes(
          normalizedDefaultCourse || ""
        );
        let finalResult;
        if (!normalizedDefaultCourse) {
          finalResult = true;
        } else if (syllabusSlug) {
          finalResult = matcherResult ?? fallbackResult;
        } else {
          finalResult =
            getDisplayInfoFromCohortSlug(
              cohort.slug
            )?.default_course?.toLowerCase() === normalizedDefaultCourse;
        }

        console.log("🔍 Course Matcher Results:", {
          cohortSlug: cohort.slug,
          defaultCourse,
          matcherExists: !!courseMatchers[defaultCourse],
          matcherResult,
          fallbackResult,
          finalResult,
        });

        return finalResult;
      });

      courseFilteredCohorts.forEach((cohort) => {
        // Skip enrichment if syllabus_version is null
        if (!cohort.syllabus_version) {
          return;
        }

        const syllabus =
          syllabusAlias.find((syll) => syll.default_course === defaultCourse) ||
          syllabusAlias.find((syll) =>
            cohort.syllabus_version?.slug
              ?.toLowerCase()
              ?.includes(syll.default_course)
          );

        if (syllabus) {
          cohort.syllabus_version.name = syllabus.name;
          cohort.syllabus_version.courseSlug = syllabus.course_slug;
          cohort.syllabus_version.duration = syllabus.duration_weeks;
        }
      });

      setData((oldData) => ({
        cohorts: {
          catalog: oldData.cohorts.catalog,
          all: courseFilteredCohorts,
          filtered: courseFilteredCohorts,
        },
      }));

      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching cohorts data:", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.academyAliasDictionary) getData();
  }, [session, academy, selectedRegion]);

  const formIsValid = (formData = null) => {
    if (!formData) return null;
    for (let key in formData) {
      if (!formData[key].valid) return false;
    }
    return true;
  };

  // Build region-only dropdown options from YAML labels
  useEffect(() => {
    if (!content?.info) return;
    const regionOptions = [
      { label: content.info.region_usa, value: "usa" },
      { label: content.info.region_latam, value: "latam" },
      { label: content.info.region_europe, value: "europe" },
    ];
    setData((prev) => ({
      cohorts: {
        ...prev.cohorts,
        catalog: regionOptions,
      },
    }));
  }, [content?.info]);

  // Auto-select region based on session.location.meta_info.region
  useEffect(() => {
    const region = session?.location?.meta_info?.region;
    const normalized = String(region || "").toLowerCase();

    const regionOptions = {
      usa: () => normalized.includes("usa"),
      europe: () => normalized.includes("europe"),
      latam: () => true, // default fallback
    };

    const matchedRegion = Object.keys(regionOptions).find((key) =>
      regionOptions[key]()
    );

    const regionLabels = {
      usa: { label: content?.info?.region_usa, value: "usa" },
      europe: { label: content?.info?.region_europe, value: "europe" },
      latam: { label: content?.info?.region_latam, value: "latam" },
    };

    const option = region ? regionLabels[matchedRegion] : null;
    setSelectedRegion(option);
  }, [session?.location?.meta_info?.region, content?.info]);

  const buttonText = session?.location?.button.apply_button_text;

  const isAliasLocation = (slug) => {
    const mapped = session?.academyAliasDictionary?.[slug];
    return Boolean(mapped && mapped !== slug);
  };

  // Helper function to determine location display text
  const getLocationDisplayText = (cohort) => {
    const isFullStackFt =
      cohort.syllabus_version?.courseSlug === "full-stack-ft";
    const cityName = cohort.academy.city.name?.toLowerCase();
    const inPersonCities = ["miami", "dallas"];
    const isInPersonLocation =
      isFullStackFt &&
      inPersonCities.some(
        (city) => cityName === city || cityName?.includes(city)
      );

    return isInPersonLocation
      ? `${cohort.academy.city.name} - ${content.info.in_person}`
      : getRegionalRemoteText(cohort.academy?.slug);
  };

  return (
    <GridContainer
      id={id}
      style={style}
      margin_tablet="0 auto 48px auto"
      maxWidth="1280px"
      containerColumns_tablet="14fr"
      gridColumn_tablet="1 / 15"
      padding_xxs="0 20px"
      padding_md="40px 80px"
      padding_lg="40px 0px"
      padding_tablet="40px 40px"
    >
      <Div flexDirection="column">
        <H2 textAlign="center">{content?.title}</H2>
        <Div
          padding="30px 0"
          gap="15px"
          style={{ borderBottom: "1px solid black" }}
          justifyContent_tablet="between"
          flexDirection="column"
          flexDirection_tablet="row"
          alignItems_tablet="center"
        >
          <H3 textAlign="left" width="188px">
            {content?.title}
          </H3>
          {!location && (
            <Div
              width_tablet="220px"
              width_md="320px"
              width_xs="320px"
              width_xxs="280px"
            >
              <SelectRaw
                style={{
                  input: (styles) => ({
                    ...styles,
                    width: "100%",
                    margin: "5px 0px",
                  }),
                  control: (styles, state) => ({
                    ...styles,
                    fontFamily: "Lato, sans-serif",
                    background: "#ffffff",
                    border: "1px solid #000",
                    boxShadow: "none",
                    marginBottom: "0px",
                    marginTop: "0px",
                    width: "100%",
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "#000",
                    lineHeight: "22px",
                    "&:hover": { boxShadow: "0 0 0 1px black" },
                    "&:focus": {
                      boxShadow: "0 0 0 1px black",
                      border: "1px solid #000000",
                    },
                  }),
                  option: (
                    styles,
                    { data, isDisabled, isFocused, isSelected }
                  ) => {
                    return {
                      ...styles,
                      fontFamily: "Lato, sans-serif",
                    };
                  },
                }}
                options={data?.cohorts?.catalog}
                placeholder={selectedRegion?.label || content.placeholder}
                value={selectedRegion}
                onChange={(opt) => {
                  setSelectedRegion(opt);
                }}
              />
            </Div>
          )}
        </Div>
        <Div flexDirection="column" alignItems="stretch" width="100%">
          {isLoading ? (
            <Div margin="30px 0" justifyContent="center">
              <Spinner />
            </Div>
          ) : (
            <>
              {Array.isArray(data.cohorts.filtered) &&
              data.cohorts.filtered.length > 0 ? (
                <>
                  {/* Header row for consistent alignment */}
                  <Div
                    flexDirection="column"
                    flexDirection_tablet="row"
                    style={{
                      borderTop: "1px solid black",
                      borderBottom: "2px solid black",
                    }}
                    padding="15px 0"
                    justifyContent="between"
                    alignItems="stretch"
                    display="none"
                    display_tablet="flex"
                  >
                    <Div width_tablet="20%" flexShrink="0">
                      <H4
                        textAlign="left"
                        textTransform="uppercase"
                        fontWeight="700"
                      >
                        {content.info.date}
                      </H4>
                    </Div>
                    <Div width_tablet="25%" flexShrink="0">
                      <H4
                        textAlign="left"
                        textTransform="uppercase"
                        fontWeight="700"
                      >
                        {content.info.program_label}
                      </H4>
                    </Div>
                    <Div width_tablet="20%" flexShrink="0">
                      <H4
                        textAlign="left"
                        textTransform="uppercase"
                        fontWeight="700"
                      >
                        {content.info.location_label}
                      </H4>
                    </Div>
                    <Div width_tablet="15%" flexShrink="0">
                      <H4
                        textAlign="left"
                        textTransform="uppercase"
                        fontWeight="700"
                      >
                        {content.info.duration_label}
                      </H4>
                    </Div>
                    <Div width_tablet="20%" flexShrink="0">
                      <H4
                        textAlign="left"
                        textTransform="uppercase"
                        fontWeight="700"
                      >
                        {content.info.action_label}
                      </H4>
                    </Div>
                  </Div>
                  {data.cohorts.filtered.map((cohort, i) => {
                    const loc = locations.find(
                      ({ node }) =>
                        node.breathecode_location_slug === cohort.academy.slug
                    );
                    const displayInfo =
                      getDisplayInfoFromCohortSlug(cohort.slug) ||
                      getDisplayInfoFromCohortSlug(
                        cohort.syllabus_version?.slug
                      );
                    return (
                      i < 4 && (
                        <Div
                          key={i}
                          flexDirection="column"
                          flexDirection_tablet="row"
                          style={{ borderBottom: "1px solid black" }}
                          padding="30px 0"
                          justifyContent="between"
                          alignItems="stretch"
                        >
                          <Div
                            flexDirection_tablet="column"
                            width_tablet="20%"
                            alignItems="center"
                            alignItems_tablet="start"
                            margin="0 0 10px 0"
                            flexShrink="0"
                          >
                            <H4
                              textAlign="left"
                              textTransform="uppercase"
                              width="fit-content"
                              margin="0 10px 0 0"
                              fontWeight="700"
                              lineHeight="22px"
                            >
                              {dayjs(cohort.kickoff_date)
                                .locale(`${lang === "us" ? "en" : "es"}`)
                                .format("MMMM")}
                            </H4>
                            <Paragraph textAlign="left" fontWeight="700">
                              {`
                          ${
                            lang === "us"
                              ? dayjs(cohort.kickoff_date)
                                  .locale("en")
                                  .format("MM/DD")
                              : dayjs(cohort.kickoff_date)
                                  .locale("es")
                                  .format("DD/MM")
                          } 
                          ${content.to} 
                          ${
                            lang === "us"
                              ? dayjs(cohort.ending_date)
                                  .locale("en")
                                  .format("MM/DD")
                              : dayjs(cohort.ending_date)
                                  .locale("es")
                                  .format("DD/MM")
                          }
                        `}
                            </Paragraph>
                          </Div>
                          <Div
                            flexDirection="column"
                            width_tablet="25%"
                            margin="0 0 20px 0"
                            flexShrink="0"
                            alignItems_tablet="flex-start"
                          >
                            {cohort.syllabus_version?.courseSlug ? (
                              <Link
                                to={`/${lang}/coding-bootcamps/${cohort.syllabus_version.courseSlug}`}
                              >
                                <Paragraph textAlign="left" color={Colors.blue}>
                                  {displayInfo?.name ||
                                    cohort.syllabus_version?.name ||
                                    "Program"}
                                </Paragraph>
                              </Link>
                            ) : (
                              <Paragraph textAlign="left" color={Colors.blue}>
                                {displayInfo?.name ||
                                  cohort.syllabus_version?.name ||
                                  "Program"}
                              </Paragraph>
                            )}
                          </Div>
                          <Div
                            flexDirection="column"
                            display="none"
                            display_tablet="flex"
                            width_tablet="20%"
                            flexShrink="0"
                            alignItems_tablet="flex-start"
                          >
                            <Div>
                              <Paragraph textAlign="left" color={Colors.black}>
                                {getLocationDisplayText(cohort)}
                              </Paragraph>
                            </Div>
                          </Div>

                          <Div
                            flexDirection="column"
                            display="none"
                            display_tablet="flex"
                            width_tablet="15%"
                            flexShrink="0"
                            alignItems_tablet="flex-start"
                          >
                            <Paragraph textAlign="left">
                              {cohort?.syllabus_version?.duration ||
                                getDurationFromSyllabus(
                                  cohort?.syllabus_version?.courseSlug
                                ) ||
                                displayInfo?.duration_weeks ||
                                "Duration not available"}
                            </Paragraph>
                          </Div>

                          <Div
                            display="flex"
                            display_tablet="none"
                            justifyContent="between"
                            margin="0 0 20px 0"
                            width="100%"
                          >
                            <Div flexDirection="column" width="50%">
                              <H4 textAlign="left" textTransform="uppercase">
                                {content.info.location_label}
                              </H4>
                              <Div>
                                <Paragraph
                                  textAlign="left"
                                  color={Colors.black}
                                >
                                  {getLocationDisplayText(cohort)}
                                </Paragraph>
                              </Div>
                            </Div>
                            <Div flexDirection="column" width="50%">
                              <H4 textAlign="left" textTransform="uppercase">
                                {content.info.duration_label}
                              </H4>
                              <Paragraph textAlign="left">
                                {cohort?.syllabus_version?.duration ||
                                  getDurationFromSyllabus(
                                    cohort?.syllabus_version?.courseSlug
                                  ) ||
                                  displayInfo?.duration_weeks ||
                                  "Duration not available"}
                              </Paragraph>
                            </Div>
                          </Div>

                          <Div
                            flexDirection="column"
                            width_tablet="20%"
                            flexShrink="0"
                            alignItems_tablet="flex-start"
                          >
                            <Link to={content.info.button_link}>
                              <Button
                                variant="full"
                                width="fit-content"
                                color={Colors.black}
                                margin="0"
                                textColor="white"
                              >
                                {buttonText || content.info.button_text}
                              </Button>
                            </Link>
                          </Div>
                        </Div>
                      )
                    );
                  })}
                </>
              ) : (
                <>
                  <Div
                    display={showForm ? "none" : "flex"}
                    padding="70px 0"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    padding_tablet="90px 0"
                  >
                    <Icon icon="agenda" />
                    {message && (
                      <Paragraph margin="25px 0 0 0">{message}</Paragraph>
                    )}
                    {actionMessage && (
                      <Paragraph
                        color={Colors.blue}
                        onClick={() => setShowForm(true)}
                        width="auto"
                        cursor="pointer"
                        margin="10px 0 0 0"
                        fontWeight="700"
                      >
                        {actionMessage}
                      </Paragraph>
                    )}
                  </Div>
                  <Div
                    padding="70px 10%"
                    padding_tablet="90px 32%"
                    display={showForm ? "flex" : "none"}
                    flexDirection="column"
                  >
                    {formStatus.status === "thank-you" ? (
                      <Div alignItems="center" flexDirection="column">
                        <Icon icon="success" width="80px" height="80px" />{" "}
                        <H4
                          fontSize="15px"
                          lineHeight="22px"
                          margin="25px 0 10px 10px"
                          align="center"
                        >
                          {emailFormContent.successful_text}
                        </H4>
                      </Div>
                    ) : (
                      <>
                        <H4
                          margin="0 0 25px 0"
                          textAlign="left"
                          display="block"
                          display_tablet="block"
                        >
                          {emailFormContent.heading}
                        </H4>
                        <Div justifyContent="center" width="100%">
                          <Form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              if (formStatus.status === "error") {
                                setFormStatus({
                                  status: "idle",
                                  msg: "Resquest",
                                });
                              }
                              if (!formIsValid(formData)) {
                                setFormStatus({
                                  status: "error",
                                  msg: "There are some errors in your form",
                                });
                              } else {
                                setFormStatus({
                                  status: "loading",
                                  msg: "Loading...",
                                });
                                const token = await executeRecaptcha();
                                newsletterSignup(
                                  {
                                    ...formData,
                                    token: {
                                      value: token || "",
                                      valid: !!token,
                                    },
                                  },
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
                              placeholder="E-mail *"
                              borderRadius="3px"
                              bgColor={Colors.white}
                              margin="0"
                              onChange={(value, valid) => {
                                setVal({
                                  ...formData,
                                  email: { value, valid },
                                });
                                if (formStatus.status === "error") {
                                  setFormStatus({
                                    status: "idle",
                                    msg: "Resquest",
                                  });
                                }
                              }}
                              value={formData.email.value}
                              errorMsg="Please specify a valid email"
                              required
                            />
                            <Div width="fit-content" margin="10px auto 0 auto">
                              <SafeReCAPTCHA ref={captcha} size="invisible" />
                            </Div>
                            <Button
                              height="40px"
                              background={Colors.blue}
                              // margin="0 0 0 10px"
                              type="submit"
                              fontWeight="700"
                              justifyContent="center"
                              margin="35px 0 0 0"
                              width="100%"
                              fontSize="14px"
                              variant="full"
                              color={
                                formStatus.status === "loading"
                                  ? Colors.darkGray
                                  : Colors.blue
                              }
                              textColor={Colors.white}
                              disabled={
                                formStatus.status === "loading" ? true : false
                              }
                            >
                              {formStatus.status === "loading"
                                ? "Loading..."
                                : emailFormContent.button_text}
                            </Button>
                          </Form>
                        </Div>
                      </>
                    )}
                  </Div>
                </>
              )}
              {Array.isArray(data.cohorts.filtered) &&
                data.cohorts.filtered.length > 0 &&
                showMoreRedirect && (
                  <Link to={content.footer.button_link}>
                    <Paragraph margin="20px 0" color={Colors.blue}>
                      {content.footer.button_text}
                    </Paragraph>
                  </Link>
                )}
            </>
          )}
        </Div>
      </Div>
    </GridContainer>
  );
};

export default UpcomingDates;
