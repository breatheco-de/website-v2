import React, { useState, useContext, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Icon from "../Icon";
import Toggle from "../ToggleSwitch";
import { Link } from "../Styling/index";
import { GridContainer, Div, Grid } from "../Sections";
import Select, { SelectRaw } from "../Select";
import { H2, H3, H4, H5, Paragraph } from "../Heading";
import { Button, Colors, RoundImage, Img } from "../Styling";
import { SessionContext } from "../../session";
import { isWindow } from "../../utils/utils";

const PricingCard = ({
  data,
  info,
  selectedPlan,
  setSelectedPlan,
  buttonText,
  jobGuarantee,
}) => {
  const { session, setSession } = useContext(SessionContext);
  const { recomended, scholarship, payment_time, slug } = data;
  const isSelected = selectedPlan === slug;
  return (
    <>
      <Div
        position="relative"
        cursor="pointer"
        display="block"
        width="100%"
        onClick={() => {
          setSelectedPlan(slug);
        }}
        height="fit-content"
        alignItems="flex-start"
        margin_xs="9px 0 0 0"
        margin_tablet="0"
      >
        {data.offer && (
          <Div position="absolute" right="0" top="-20px">
            <Div
              borderRadius="55px"
              background={Colors.red}
              padding="2px 8px"
              position="relative"
            >
              <Div
                top="-9px"
                left="-37px"
                justifyContent="center"
                textAlign="center"
                width="44px"
                height="44px"
                fontSize="24px"
                position="absolute"
                borderRadius="41px"
                padding="10px"
                border="2px solid #C20000"
                background={Colors.red}
              >
                🔥
              </Div>
              <Paragraph fontSize="24px" opacity="1" color={Colors.white}>
                {data.offer}
              </Paragraph>
            </Div>
          </Div>
        )}
        {recomended && (
          <Div
            padding="4px 0"
            background={Colors.blue}
            borderRadius="4px 4px 0 0"
          >
            <Paragraph
              color={Colors.white}
              fontSize="18px"
              fontWeight="700"
              fontWeight_tablet="700"
              lineHeight="17px"
              opacity="1"
            >
              {info.recomended}
            </Paragraph>
          </Div>
        )}
        <Div
          border={
            isSelected
              ? `${recomended ? 2 : 1}px solid ${Colors.blue}`
              : `1px solid black`
          }
          borderTop={recomended && "none"}
          borderRadius={recomended ? "0 0 4px 4px" : "4px"}
          padding_md="17px 20px"
          padding_tablet="8px 5px"
          padding_xs="8px 20px"
          display="block"
        >
          <Div className="price-section" justifyContent="between" width="100%">
            <Div alignItems_xs="flex-start" width="60%" padding_xs="5px 0 0 0">
              <Div
                border={`1px solid ${isSelected ? Colors.blue : "#A4A4A4"}`}
                width="21px"
                height="21px"
                borderRadius="15px"
                background={isSelected ? Colors.blue : Colors.white}
                margin="0 10px 0 0"
                padding="3px"
                flexShrink="0"
                flexShrink_tablet="0"
              >
                {isSelected && (
                  <Icon
                    icon="check"
                    width="14px"
                    height="14px"
                    color={Colors.white}
                    fill={Colors.white}
                  />
                )}
              </Div>
              <Div display="block">
                <Paragraph
                  color={Colors.black}
                  textAlign="left"
                  margin="0 0 5px 0"
                >
                  {scholarship}
                </Paragraph>
                <Paragraph color={Colors.black} textAlign="left">
                  {payment_time}
                </Paragraph>
              </Div>
            </Div>
            <Div className="price-container" display="block">
              <H3
                textAlign="end"
                fontWeight="700"
                fontSize="30px"
                lineHeight="36px"
                color={Colors.black}
                opacity="1"
              >
                {!jobGuarantee ? data.price : data.job_guarantee_price}
              </H3>
              {!jobGuarantee && (
                <Paragraph
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21px"
                  opacity="1"
                  textAlign="right"
                  color="#B4B4B4"
                >
                  <s>{data.original_price}</s>
                </Paragraph>
              )}
              {data.warning_message && (
                <Paragraph
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="36px"
                  opacity="1"
                  textAlign="right"
                  color={Colors.black}
                >
                  {data.warning_message}
                </Paragraph>
              )}
            </Div>
          </Div>

          {data.icons && data.icons.length > 0 && (
            <Div
              className="icons"
              background={Colors.verylightGray}
              padding="4px 7px"
              borderRadius="26px"
              width="fit-content"
              alignItems="center"
              margin="15px 0 0 0"
            >
              {data.icons.map((icon) => (
                <Img
                  key={`${icon}-${slug}`}
                  src={icon}
                  alt="4Geeks Academy Icon"
                  backgroundSize="contain"
                  height="17px"
                  minWidth="30px"
                  width="50px"
                  margin="0 5px"
                />
              ))}
            </Div>
          )}
        </Div>
      </Div>
      {isSelected && (
        <Div
          className="expandable"
          display="block"
          display_tablet="none"
          margin="0 0 10px 0"
          background="#F9F9F9"
          border="1px solid #EBEBEB"
          padding="24px 15px"
          width="100%"
          borderRadius="4px"
        >
          <H3 textAlign="center" margin="0 0 15px 0">
            {info.plan_details}
          </H3>
          {data.bullets &&
            data.bullets.map((bullet) => (
              <Div key={bullet} alignItems="center" margin="21px 0 0 0">
                <Icon
                  icon="check"
                  width="17px"
                  height="17px"
                  style={{ marginRight: "10px" }}
                  color={Colors.blue}
                  fill={Colors.blue}
                />
                <Paragraph
                  lineHeight="19px"
                  fontWeight="500"
                  fontSize="14px"
                  color={Colors.black}
                  opacity="1"
                  textAlign="left"
                  dangerouslySetInnerHTML={{ __html: bullet }}
                />
              </Div>
            ))}
          <Link
            style={{
              marginTop: "21px",
              display: "block",
            }}
            to={`${info.apply_button.link}${
              selectedPlan ? `?utm_plan=${selectedPlan}` : ""
            }`}
          >
            <Button
              variant="full"
              width="100%"
              color={Colors.black}
              textColor={Colors.white}
              fontSize="12px"
              margin="auto"
              textAlign="center"
              display="block"
              onClick={() => {
                if (selectedPlan) {
                  setSession({
                    ...session,
                    utm: { ...session.utm, utm_plan: selectedPlan },
                  });
                }
              }}
            >
              {buttonText || info.apply_button.label}
            </Button>
          </Link>
        </Div>
      )}
    </>
  );
};

const ChartSection = ({ info, currentLocation }) => {
  const statistics = currentLocation?.chart_section || info.chart_section;
  return (
    <Div
      className="chart-section"
      maxWidth_md="800px"
      width_xs="80%"
      margin="auto"
      display="block"
    >
      <H3 margin=" 0 auto 10px auto" fontSize="26px" lineHeight="31.2px">
        {info.chart_section.title}
      </H3>
      <Div
        margin="25px 0 15px 0"
        gap="10px"
        flexWrap="wrap"
        flexWrap_md="nowrap"
      >
        <Div
          id="chart-image"
          width="100%"
          width_xs="300px"
          margin="auto"
          // height="256px"
        >
          <Icon icon="payments_chart" style={{ margin: "auto" }} />
        </Div>
        <Div id="data" flexWrap="wrap" justifyContent="between">
          {statistics &&
            Array.isArray(statistics.data) &&
            statistics.data.map((item, i) => (
              <Div
                width={i === 0 ? "100%" : "48%"}
                height="auto"
                border={`1px solid ${item.color}`}
                className="info"
                margin="0 0 4% 0"
              >
                <Div
                  flexShrink_tablet="0"
                  // height="100%"
                  width="19.39px"
                  background={item.color}
                />
                <Div padding="10px" display="block">
                  <H5
                    margin={i !== 0 && "0 0 10px 0"}
                    textAlign="left"
                    color={item.color}
                  >
                    {item.percentage}
                  </H5>
                  <Paragraph
                    fontWeight_tablet="700"
                    fontSize="16px"
                    lineHeight="19px"
                    textAlign="left"
                    opacity="1"
                  >
                    {item.description}
                  </Paragraph>
                </Div>
              </Div>
            ))}
        </Div>
      </Div>
    </Div>
  );
};

const PricesAndPayment = (props) => {
  const data = useStaticQuery(graphql`
    query PricesAndPayment {
      content: allPricesAndPaymentYaml {
        edges {
          node {
            fields {
              lang
            }
            pricing_error_contact
            pricing_error
            get_notified
            contact_carrer_advisor
            contact_link
            we_accept
            top_label
            top_label_2
            plans_title
            plan_details
            select
            select_2
            job_guarantee {
              title
              description
            }
            recomended
            not_available
            not_available_job_guarantee
            apply_button {
              label
              link
            }
            chart_section {
              title
              data {
                percentage
                color
                description
              }
            }
            button {
              button_text
              button_link
            }
          }
        }
      }
      allPlansYaml {
        edges {
          node {
            full_time {
              slug
              academies
              recomended
              scholarship
              payment_time
              price
              original_price
              warning_message
              offer
              job_guarantee_price
              bullets
              icons
            }
            part_time {
              slug
              academies
              recomended
              scholarship
              payment_time
              price
              original_price
              warning_message
              offer
              job_guarantee_price
              bullets
              icons
            }
            fields {
              lang
              file_name
            }
          }
        }
      }
    }
  `);
  let info = data.content.edges.find(
    ({ node }) => node.fields.lang === props.lang
  );
  if (info) info = info.node;

  function phoneNumberClean(phoneNumber) {
    if (phoneNumber) {
      const arr = phoneNumber.split("");
      const numberClean = arr.filter((elem) => elem.match(/[0-9]/));
      return numberClean.join("");
    }
    return phoneNumber;
  }

  const mainContainer = useRef(null);
  const { session, setSession } = useContext(SessionContext);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [course, setCourse] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [jobGuarantee, setJobGuarantee] = useState(false);
  const [schedule, setSchedule] = useState("part_time");
  const [availablePlans, setAvailablePlans] = useState([]);
  const [courseArrayFiltered, setCourseArrayFiltered] = useState([]);

  const getCurrentPlans = () => {
    let _plans = data.allPlansYaml.edges
      .filter(({ node }) => node.fields.lang === props.lang)
      .find((p) =>
        p.node.fields.file_name.includes(
          course ? course.value?.replaceAll("_", "-") : props.defaultCourse
        )
      );

    if (_plans) _plans = _plans.node[schedule];
    else _plans = [];

    return _plans;
  };

  const programs = !Array.isArray(props.programs)
    ? []
    : props.programs
        .filter(
          ({ node }) =>
            !["unlisted", "hidden"].includes(node.meta_info.visibility) &&
            node.meta_info.show_in_apply
        )
        .map(({ node }) => ({
          label: node.apply_form.label,
          value: node.meta_info.bc_slug,
        }));

  const getAvailablePlans = () => {
    const currentPlans = getCurrentPlans();

    if (currentPlans && currentLocation) {
      return currentPlans
        .filter((plan) =>
          plan.academies.includes(currentLocation.fields.file_name.slice(0, -3))
        )
        .filter((plan) => {
          if (jobGuarantee) {
            if (plan.job_guarantee_price) return true;
            return false;
          }
          return true;
        })
        .sort((a) => (a.recomended ? -1 : 1));
    }
    return [];
  };

  useEffect(() => {
    if (isWindow) {
      if (window.location.hash.includes("prices_and_payment")) {
        window.scrollTo({
          top: mainContainer.current?.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [mainContainer.current]);

  useEffect(() => {
    setLocations(
      props.locations
        .filter(
          (l) =>
            (l.node.meta_info.visibility !== undefined ||
              l.node.meta_info.visibility === "visible") &&
            !l.node.meta_info.slug.includes("online")
        )
        .sort((a, b) => (a.node.name > b.node.name ? 1 : -1))
    );
    if (session && session.location) {
      const _loc = props.locations.find(
        (l) =>
          l.node.active_campaign_location_slug ===
          session.location.active_campaign_location_slug
      );
      setCurrentLocation(_loc ? _loc.node : null);
    }
  }, [session, props.locations]);

  // sync property course
  useEffect(() => {
    setCourse(programs.find((c) => c.value === props.defaultCourse));
    setSchedule(props.defaultSchedule || "part_time");
  }, [props.defaultCourse, props.defaultSchedule]);

  useEffect(() => {
    setJobGuarantee(false);
  }, [currentLocation]);

  useEffect(() => {
    const filteredPlans = getAvailablePlans();
    setAvailablePlans(filteredPlans);
    setSelectedPlan(filteredPlans[0]?.slug);
  }, [jobGuarantee, currentLocation, course]);

  const city = session && session.location ? session.location.city : [];

  const findCity = props.locations.find((loc) => loc.node?.city === city);
  useEffect(() => {
    if (findCity !== undefined && findCity.node) {
      setButtonText(findCity.node.button?.apply_button_text);
    }
  }, [findCity]);

  const selected = availablePlans.find((plan) => plan.slug === selectedPlan);

  //shows the available plans according to the selected location
  useEffect(() => {
    const courseFilteredAux = [];

    if (currentLocation) {
      programs.map((course) => {
        let currentPlans = data.allPlansYaml.edges
          .filter(({ node }) => node.fields.lang === props.lang)
          .find((p) =>
            p.node.fields.file_name.includes(
              course?.value?.replaceAll("_", "-")
            )
          );

        currentPlans = currentPlans?.node[schedule];

        const availablePlans = currentPlans?.filter((plan) =>
          plan.academies.includes(currentLocation.fields.file_name.slice(0, -3))
        );

        if (availablePlans && availablePlans.length > 0) {
          courseFilteredAux.push(course);
        }
      });
      setCourseArrayFiltered(courseFilteredAux);
    }
  }, [currentLocation]);

  return (
    <Div
      ref={mainContainer}
      id="prices_and_payment"
      display="block"
      background={props.background}
      github="/location"
      flexDirection="column"
      padding="50px 17px"
      padding_xxs="20px"
      padding_tablet="70px 40px"
      padding_md="70px 80px"
      padding_lg="70px 0px"
      maxWidth_md="1280px"
      margin="0 auto"
    >
      <H2
        fontSize="21px"
        fontSize_md="35px"
        fontWeight="400"
        lineHeight="46px"
        textAlign="center"
        width="100%"
        margin="0 0 20px 0"
      >
        {info?.plans_title}
      </H2>
      <Grid
        gridTemplateColumns_lg={
          props.financial ? "repeat(26,1fr)" : "repeat(23,1fr)"
        }
        gridTemplateColumns_md="1fr repeat(14,1fr) 1fr"
        gridTemplateColumns_tablet={
          props.financial ? "1fr repeat(14,1fr) 1fr" : "1fr repeat(13,1fr) 1fr"
        }
        gridGap="8px"
        margin_tablet="20px 0 0 0"
      >
        <Div
          gridColumn_md="1/9"
          gridColumn_lg={props.financial ? "2/14" : "1/16"}
          gridColumn_tablet={props.financial ? "1/9" : "1/10"}
          alignItems="center"
        >
          <H3
            fontSize="16px"
            fontSize_md="24px"
            lineHeight="26px"
            fontWeight="400"
            textAlign_tablet="start"
            textAlign_xs="center"
            opacity="1"
            color={Colors.black}
            padding="0 0 16px 0"
          >
            {props.financial ? info.select_2 : info.select}
          </H3>
        </Div>
        {/* SELECT COUNTRY */}
        <Div
          gridColumn_lg={props.financial ? "14/26" : "16/25"}
          gridColumn_md={props.financial ? "9/16" : "10/16"}
          gridColumn_tablet={props.financial ? "9/16" : "10/15"}
          justifyContent_xxs="center"
          justifyContent_tablet="start"
        >
          <Div
            flexDirection_tablet="row"
            flexDirection="column"
            alignItems="center"
            width="100%"
          >
            <Div
              flexDirection_tablet="row"
              flexDirection="column"
              width_tablet="100%"
              gap="20px"
              // width_md="320px"
              width_xs="320px"
              width_xxs="280px"
            >
              <SelectRaw
                placeholderFloat
                bgColor={Colors.white}
                single={props.financial ? false : true}
                options={locations.map((l) => ({
                  label: l.node.name,
                  value: l.node.active_campaign_location_slug,
                }))}
                placeholder={info.top_label}
                value={{
                  label: currentLocation?.name,
                  value: currentLocation?.active_campaign_location_slug,
                }}
                onChange={(opt) => {
                  const current = locations.find(
                    (l) => l.node.active_campaign_location_slug === opt.value
                  ).node;
                  setCurrentLocation(current);
                }}
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
                    borderRadius: "0",
                    marginBottom: "0px",
                    marginTop: "0px",
                    width: "100%",
                    fontSize: "15px",
                    fontWeight: "400",
                    fontStyle: "italic",
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
              />
              {props.financial && (
                <SelectRaw
                  placeholderFloat
                  bgColor={Colors.white}
                  single={props.financial ? false : true}
                  options={currentLocation && courseArrayFiltered}
                  placeholder={info.top_label_2}
                  value={course}
                  onChange={(opt) => setCourse(opt)}
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
                      borderRadius: "0",
                      marginBottom: "0px",
                      marginTop: "0px",
                      width: "100%",
                      fontSize: "15px",
                      fontWeight: "400",
                      fontStyle: "italic",
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
                />
              )}
            </Div>
          </Div>
        </Div>
      </Grid>

      <Div
        display="block"
        background="#FFF"
        padding_tablet="0 0 38px 0"
        maxWidth_md="1280px"
        minWidth_md="580px"
        margin="20px auto"
        className="main-container"
      >
        {availablePlans && availablePlans.length === 0 ? (
          <Div
            margin_xs="20px 15px"
            margin_tablet="30px 60px"
            margin_lg="60px 0"
            fontSize="25px"
            display="block"
            textAlign="center"
            dangerouslySetInnerHTML={{
              __html: jobGuarantee
                ? info.not_available_job_guarantee
                : info.not_available,
            }}
          />
        ) : (
          <>
            <Grid
              gridTemplateColumns_tablet="repeat(20,1fr)"
              gridTemplateRows_tablet="1fr 1fr 1fr"
              gridGap="32px 0px"
              className="inner-container"
            >
              {availablePlans.some((plan) => plan.job_guarantee_price) && (
                <Div
                  className="job-guarantee"
                  padding="8px"
                  margin_tablet="32px 0 0 0"
                  gridColumn_tablet="1/21"
                  gridRow_tablet="1"
                  flexWrap="wrap"
                >
                  <Div alignItems="center" margin="0 0 7px 0">
                    <Toggle
                      isChecked={jobGuarantee}
                      onChange={() => setJobGuarantee(!jobGuarantee)}
                    />
                    <H4
                      textAlign="left"
                      fontWeight="700"
                      fontSize_tablet="18px"
                      fontSize_xs="16px"
                      margin="0 0 0 10px"
                    >
                      {info.job_guarantee.title}
                    </H4>
                  </Div>
                  <Paragraph textAlign="left" color={Colors.black}>
                    {info.job_guarantee.description}
                  </Paragraph>
                </Div>
              )}
              {availablePlans && availablePlans.length > 0 && (
                <Div
                  className="bullets-container"
                  borderRadius="4px"
                  display="none"
                  display_tablet="block"
                  background="#F9F9F9"
                  border="1px solid #EBEBEB"
                  padding="24px 15px"
                  margin_tablet="0 0 0 15px"
                  gridColumn_tablet="11/21"
                  gridRow_tablet="2"
                >
                  <H3 textAlign="center" margin="0 0 16px 0">
                    {info.plan_details}
                  </H3>
                  <hr style={{ border: "1px solid #ebebeb", width: "60%" }} />
                  {selected?.bullets &&
                    selected.bullets.map((bullet, index) => (
                      <Div alignItems="center" margin="21px 0 0 0" key={index}>
                        <Icon
                          icon="check"
                          width="17px"
                          height="17px"
                          style={{ marginRight: "10px" }}
                          color={Colors.blue}
                          fill={Colors.blue}
                        />
                        <Paragraph
                          color={Colors.black}
                          textAlign="left"
                          dangerouslySetInnerHTML={{ __html: bullet }}
                        />
                      </Div>
                    ))}
                </Div>
              )}
              <Div
                className="cards-container"
                flexWrap="wrap"
                justifyContent_tablet="between"
                justifyContent_xs="evenly"
                gap="16px"
                margin_tablet="0 0 0 8px"
                gridColumn_tablet="1/11"
                gridRow="2"
              >
                {availablePlans &&
                  availablePlans.map((plan) => (
                    <PricingCard
                      key={plan.slug}
                      data={plan}
                      info={info}
                      selectedPlan={selectedPlan}
                      setSelectedPlan={setSelectedPlan}
                      buttonText={buttonText}
                      jobGuarantee={jobGuarantee}
                    />
                  ))}
              </Div>
              {availablePlans && availablePlans.length !== 0 && (
                <Div
                  display="none"
                  display_tablet="flex"
                  flexDirection="row-reverse"
                  gridRow_tablet="3"
                  gridColumn_tablet="12/22"
                  gridColumn_md="13/24"
                  gridColumn_lg="14/26"
                >
                  <Link
                    style={{
                      display: "block",
                    }}
                    to={`${info.apply_button.link}${
                      selectedPlan ? `?utm_plan=${selectedPlan}` : ""
                    }`}
                  >
                    <Button
                      variant="full"
                      width="100%"
                      color={Colors.black}
                      textColor={Colors.white}
                      fontSize="16px"
                      margin="auto"
                      textAlign="center"
                      display="block"
                      borderRadius="4px"
                      onClick={() => {
                        if (selectedPlan) {
                          setSession({
                            ...session,
                            utm: { ...session.utm, utm_plan: selectedPlan },
                          });
                        }
                      }}
                    >
                      {buttonText || info.apply_button.label}
                    </Button>
                  </Link>
                </Div>
              )}
            </Grid>
          </>
        )}
      </Div>
      <GridContainer
        columns_tablet="12"
        gridGap="0"
        margin_tablet="55px 0 37px 0"
      >
        <Div
          gridArea_tablet="1/5/1/9"
          justifyContent="center"
          alignItems="center"
        >
          <H4
            fontSize="13px"
            lineHeight="22px"
            width="fit-content"
            color={Colors.darkGray}
          >
            {info.we_accept}{" "}
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
      </GridContainer>
      <Paragraph margin_xxs="15px 0" margin_tablet="0 0 0 0">
        {info.get_notified + " "}
        <Link
          to={
            session && session?.location && session?.location.phone
              ? `https://wa.me/${phoneNumberClean(session?.location?.phone)}`
              : session?.email
              ? `mailto:${session?.email}`
              : `${info?.contact_link}`
          }
        >
          {info.contact_carrer_advisor}
        </Link>
      </Paragraph>
    </Div>
  );
};
export default PricesAndPayment;
