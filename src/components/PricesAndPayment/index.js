import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useStaticQuery, graphql } from "gatsby";
import Icon from "../Icon";
import { Link } from "../Styling/index";
import { GridContainer, Div, Grid } from "../Sections";
import { SelectRaw } from "../Select";
import { H2, H3, H4, H5, Paragraph } from "../Heading";
import {
  Button,
  Colors,
  RoundImage,
  Img,
  Toggle,
  Spinner,
  OfferTag,
} from "../Styling";
import { SessionContext } from "../../session";
import { isWindow } from "../../utils/utils";

// Constants for fallback values
const FALLBACK_VALUES = {
  bookCallText: "Book a call →",
  applyLink: "/us/apply",
  financialsLink: "/us/financials",
};

// Helper function to check if job guarantee should be shown for selected location
const shouldShowJobGuarantee = (selectedLocation, info) => {
  if (!selectedLocation || !info?.job_guarantee_locations) return false;

  const candidates = [
    selectedLocation?.breathecode_location_slug,
    selectedLocation?.meta_info?.slug,
    selectedLocation?.active_campaign_location_slug,
  ].filter((s) => typeof s === "string" && s.length > 0);

  // Check if any candidate location is in the job_guarantee_locations array
  for (const locationSlug of candidates) {
    if (info.job_guarantee_locations.includes(locationSlug)) {
      return true;
    }
  }
  return false;
};

// Helper function to determine if location is in America region
const isAmericaLocation = (session) => {
  if (!session?.location) return false;

  const locationSlug = session.location.active_campaign_location_slug;
  if (!locationSlug) return false;

  // US locations typically end with "-usa" or are special cases
  return (
    locationSlug.includes("-usa") ||
    locationSlug === "downtown-miami" ||
    locationSlug === "orlando"
  );
};

// Helper function to get regional CTA configuration
const getRegionalCTA = (session, info) => {
  if (!info?.cta) return null;

  const isAmerica = isAmericaLocation(session);
  return isAmerica ? info.cta.america : info.cta.international;
};

// Helper function to check if "More details" button should be shown
const shouldShowMoreDetails = (financial) => {
  return !financial; // Hide if on financials page
};

// Helper function to get job guarantee configuration for selected location
const getJobGuaranteeConfig = (selectedLocation, info) => {
  if (!selectedLocation || !info?.job_guarantee) return null;

  const candidates = [
    selectedLocation?.breathecode_location_slug,
    selectedLocation?.meta_info?.slug,
    selectedLocation?.active_campaign_location_slug,
  ].filter((s) => typeof s === "string" && s.length > 0);

  // Find matching job guarantee configuration
  for (const locationSlug of candidates) {
    const matchingConfig = info.job_guarantee.find(
      (config) => config.academies && config.academies.includes(locationSlug)
    );
    if (matchingConfig) return matchingConfig;
  }

  // Return first config as fallback
  return info.job_guarantee[0] || null;
};

// Helper function to get no job guarantee configuration for selected location
const getNoJobGuaranteeConfig = (selectedLocation, info) => {
  if (!selectedLocation || !info?.no_job_guarantee) return null;

  const candidates = [
    selectedLocation?.breathecode_location_slug,
    selectedLocation?.meta_info?.slug,
    selectedLocation?.active_campaign_location_slug,
  ].filter((s) => typeof s === "string" && s.length > 0);

  // Find matching no job guarantee configuration
  for (const locationSlug of candidates) {
    const matchingConfig = info.no_job_guarantee.find(
      (config) => config.academies && config.academies.includes(locationSlug)
    );
    if (matchingConfig) return matchingConfig;
  }

  // Return first config as fallback
  return info.no_job_guarantee[0] || null;
};

// Shared styles to avoid recreating objects per render
const selectStyles = {
  input: (styles) => ({
    ...styles,
    width: "100%",
    margin: "5px 0px",
  }),
  control: (styles) => ({
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
  menu: (styles) => ({
    ...styles,
    zIndex: 3,
  }),
  option: (styles) => ({
    ...styles,
    fontFamily: "Lato, sans-serif",
  }),
};

// Additional UI per new Figma: payment options explainer and mobile dropdown
const LoadingSpinner = () => (
  <Div
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="300px"
  >
    <Spinner color={Colors.blue} />
  </Div>
);

const PaymentOptionCard = ({
  option,
  selectedPlan,
  setSelectedPlan,
  jobGuarantee,
}) => {
  return (
    <Div
      border="1px solid #E5E5E5"
      borderRadius="8px"
      margin="0 0 12px 0"
      background={Colors.veryLightBlue3}
      display="block"
      display_xs="block"
      display_xxs="block"
    >
      <Div
        padding="16px 20px"
        cursor="pointer"
        onClick={() => {
          setSelectedPlan(selectedPlan === option.id ? null : option.id);
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Div display="block" width="calc(100% - 32px)">
          {option.recomended && (
            <Paragraph
              fontSize="12px"
              fontWeight="700"
              color={
                option.recommended_color?.startsWith("#")
                  ? option.recommended_color
                  : Colors[option.recommended_color?.toLowerCase()] ||
                    Colors.green
              }
              margin="0 0 4px 0"
              textAlign="left"
            >
              {option.recomended}
            </Paragraph>
          )}
          <Paragraph
            fontSize="14px"
            fontWeight="600"
            color={Colors.black}
            margin="0"
            textAlign="left"
          >
            {option.title}
          </Paragraph>
        </Div>
        <Div
          flexShrink="0"
          width="24px"
          display="flex"
          justifyContent="center"
          marginTop="10px"
        >
          <Icon
            icon={selectedPlan === option.id ? "angleup" : "angledown"}
            width="16px"
            height="16px"
            color="#666666"
          />
        </Div>
      </Div>

      {selectedPlan === option.id && (
        <Div
          borderTop="1px solid #E5E5E5"
          padding="16px 20px"
          // background="#FAFAFA"
          display="block"
          display_xs="block"
          display_xxs="block"
        >
          <Paragraph
            fontSize="12px"
            color="#666666"
            margin="0 0 16px 0"
            textAlign="left"
          >
            {jobGuarantee && option.job_guarantee_description
              ? option.job_guarantee_description
              : option.description}
          </Paragraph>
          {option.icons && option.icons.length > 0 && (
            <Div
              className="icons"
              background={Colors.verylightGray}
              padding="4px 7px"
              borderRadius="26px"
              width="fit-content"
              alignItems="center"
              margin="16px 0 0 0"
              position="bottom"
            >
              {option.icons.map((icon) => (
                <Img
                  key={icon}
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
      )}
    </Div>
  );
};

// Desktop-only enhanced financial options component
const FinancialOptionsDesktop = ({
  info,
  selectedPlan,
  setSelectedPlan,
  jobGuarantee,
  setJobGuarantee,
  session,
  setSession,
  availablePlans,
  isLocationDropdownOpen,
  isProgramDropdownOpen,
  currentLocation,
  financial,
  schedule,
}) => {
  // Build options list from available plans (YAML-driven)
  const paymentOptions = useMemo(
    () =>
      (availablePlans || []).map((plan) => ({
        id: plan.slug,
        title: plan.scholarship,
        description: plan.description,
        job_guarantee_description: plan.job_guarantee_description,
        details: plan.warning_message,
        price: plan.price,

        icons: plan.icons,
        recomended: plan.recomended,
        recommended_color: plan.recommended_color,

        offer: plan.offer,
      })),
    [availablePlans]
  );

  const jobGuaranteeInfo = getJobGuaranteeConfig(currentLocation, info);

  const currentPlan = useMemo(
    () =>
      (availablePlans || []).find((p) => p.slug === selectedPlan) ||
      (availablePlans || [])[0],
    [availablePlans, selectedPlan]
  );

  return (
    <>
      <Div
        display="none"
        display_tablet="flex"
        width="100%"
        maxWidth_md="1280px"
        border="4px solid black"
        boxShadow="0 8px 32px rgba(0,0,0,0.25)"
        borderRadius="12px"
        gap="0"
        margin="24px 0"
        position="relative"
      >
        {/* Offer tag removed on desktop per revamp */}
        {/* Left column */}
        <Div
          display="flex"
          flexDirection="column"
          background={Colors.white}
          padding="24px"
          width_tablet="50%"
        >
          <H3
            color={Colors.blue}
            fontWeight="700"
            margin="0 0 16px 0"
            textAlign="left"
          >
            {info.plan_details}
          </H3>
          <Div display="block" margin="0 0 12px 0">
            {jobGuarantee && jobGuaranteeInfo?.monthly_label ? (
              <H2
                fontSize="36px"
                lineHeight="42px"
                fontWeight="700"
                color={Colors.black}
                margin="0 0 6px 0"
                textAlign="left"
              >
                {jobGuaranteeInfo.monthly_label}
              </H2>
            ) : getNoJobGuaranteeConfig(currentLocation, info)
                ?.monthly_label ? (
              <H2
                fontSize="36px"
                lineHeight="42px"
                fontWeight="700"
                color={Colors.black}
                margin="0 0 6px 0"
                textAlign="left"
              >
                {getNoJobGuaranteeConfig(currentLocation, info).monthly_label}
              </H2>
            ) : monthlyPriceText ? (
              <H2
                fontSize="36px"
                lineHeight="42px"
                fontWeight="700"
                color={Colors.black}
                margin="0 0 6px 0"
                textAlign="left"
              >
                {monthlyPriceText}
              </H2>
            ) : null}
            <H2
              fontSize="36px"
              lineHeight="42px"
              fontWeight="700"
              color={Colors.black}
              margin="0 0 6px 0"
              textAlign="left"
            >
              {jobGuarantee && jobGuaranteeInfo?.monthly_label
                ? ""
                : getNoJobGuaranteeConfig(currentLocation, info)?.monthly_label
                ? ""
                : monthlyPriceText
                ? ""
                : currentPlan?.price || ""}
            </H2>
            <Paragraph
              color={Colors.black}
              fontSize="14px"
              margin="0 0 6px 0"
              textAlign="left"
            >
              {info?.financing_message}
            </Paragraph>
            {currentPlan?.warning_message && (
              <Paragraph
                color={Colors.darkGray}
                fontSize="12px"
                opacity="1"
                textAlign="left"
              >
                {currentPlan.warning_message}
              </Paragraph>
            )}
          </Div>
          {availablePlans?.some((p) => p.price) &&
            shouldShowJobGuarantee(currentLocation, info) &&
            schedule !== "full_time" && (
              <Div
                margin="16px 0 0 0"
                display="block"
                background="#f8f9fa"
                padding="16px"
                borderRadius="8px"
                border="1px solid #e9ecef"
              >
                <Div alignItems="left" display="flex">
                  <Toggle
                    width="42px"
                    height="22px"
                    margin="0 0 0 12px"
                    b_radius="9999px"
                    bg={jobGuarantee ? Colors.blue : Colors.lightGray}
                    onClick={() =>
                      setJobGuarantee && setJobGuarantee(!jobGuarantee)
                    }
                  >
                    <Div position="relative" width="42px" height="22px">
                      <Div
                        position="absolute"
                        top="2px"
                        left={jobGuarantee ? "22px" : "2px"}
                        width="18px"
                        height="18px"
                        borderRadius="9999px"
                        background={Colors.white}
                        transition="left 0.2s ease-in-out"
                      />
                    </Div>
                  </Toggle>
                  <H4
                    fontSize_tablet="18px"
                    fontSize_xs="16px"
                    margin="0"
                    padding="0"
                  >
                    {getJobGuaranteeConfig(currentLocation, info)?.title}
                  </H4>
                </Div>
                <Paragraph
                  textAlign="left"
                  color={Colors.black}
                  margin="8px 0 0 0"
                >
                  {jobGuaranteeInfo?.description}
                </Paragraph>
              </Div>
            )}
          {/* Bullets from selected plan removed on desktop per revamp */}
          {/* Partner logos from YAML icons */}
          <Div flexGrow="1" /> {/* This pushes the icons to the bottom */}
          {currentPlan?.icons && currentPlan.icons.length > 0 && (
            <Div
              className="icons"
              background={Colors.verylightGray}
              padding="4px 7px"
              borderRadius="26px"
              width="fit-content"
              alignItems="center"
              margin="0 0 24px 0"
            >
              {currentPlan.icons.map((icon) => (
                <Img
                  key={`${icon}-${currentPlan.slug}`}
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

        {/* Right column */}
        <Div
          display="block"
          background={Colors.verylightGray3}
          padding="24px"
          width_tablet="50%"
        >
          <H3
            color={Colors.blue}
            fontWeight="700"
            margin="0 0 12px 0"
            textAlign="left"
          >
            {info.other_payment_options}
          </H3>
          {(paymentOptions || []).map((option) => {
            return (
              <Div
                key={option.id}
                border="none"
                background={Colors.verylightGray3}
                padding="8px"
                borderRadius="8px"
                cursor="default"
              >
                <Div display="block" width="100%">
                  {option.recomended && (
                    <Paragraph
                      fontSize="12px"
                      fontWeight="700"
                      color={
                        option.recommended_color?.startsWith("#")
                          ? option.recommended_color
                          : Colors[option.recommended_color?.toLowerCase()] ||
                            Colors.green
                      }
                      margin="0 0 4px 0"
                      textAlign="left"
                    >
                      {option.recomended}
                    </Paragraph>
                  )}
                  <Paragraph
                    fontWeight="700"
                    color={Colors.black}
                    margin="0 0 6px 0"
                    textAlign="left"
                  >
                    {option.title}
                  </Paragraph>
                  <Paragraph
                    color={Colors.darkGray}
                    fontSize="14px"
                    textAlign="left"
                  >
                    {jobGuarantee && option.job_guarantee_description
                      ? option.job_guarantee_description
                      : option.description}
                  </Paragraph>
                </Div>
              </Div>
            );
          })}
        </Div>
      </Div>

      {/* CTA Section - Desktop */}
      <Div
        display="none"
        display_tablet="block"
        textAlign="center"
        margin="24px 0 0 0"
      >
        <Paragraph fontSize="12px" color="#666666" margin="0 0 16px 0">
          {info.cta.advisor_text}
        </Paragraph>

        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="12px"
        >
          <Link
            to={`${
              getRegionalCTA(session, info)?.apply_link ||
              FALLBACK_VALUES.applyLink
            }${selectedPlan ? `?utm_plan=${selectedPlan}` : ""}`}
          >
            <Button
              variant="full"
              background={Colors.blue}
              textColor={Colors.white}
              fontSize="14px"
              padding="12px 24px"
              borderRadius="6px"
              fontWeight="600"
              onClick={() => {
                if (selectedPlan) {
                  setSession({
                    ...session,
                    utm: { ...session.utm, utm_plan: selectedPlan },
                  });
                }
              }}
            >
              {getRegionalCTA(session, info)?.book_call ||
                FALLBACK_VALUES.bookCallText}
            </Button>
          </Link>

          {shouldShowMoreDetails(financial) && (
            <Link
              to={
                info?.cta?.more_details_link || FALLBACK_VALUES.financialsLink
              }
            >
              <Button
                background="transparent"
                textColor={Colors.blue}
                fontSize="14px"
                padding="12px 24px"
                borderRadius="6px"
                fontWeight="600"
              >
                {info.cta.more_details}
              </Button>
            </Link>
          )}
        </Div>
      </Div>
    </>
  );
};

// Keep the original mobile card implementation for MobileFinancialDropdown
const FinancialOptionsCard = ({
  info,
  selectedPlan,
  setSelectedPlan,
  session,
  setSession,
  availablePlans,
  isLocationDropdownOpen,
  isProgramDropdownOpen,
  jobGuarantee,
  setJobGuarantee,
  currentLocation,
  financial,
  schedule,
}) => {
  // Build options list from available plans (YAML-driven)
  const paymentOptions = useMemo(
    () =>
      (availablePlans || []).map((plan) => ({
        id: plan.slug,
        title: plan.scholarship,
        description: plan.description,
        job_guarantee_description: plan.job_guarantee_description,
        details: plan.warning_message,
        price: plan.price,

        icons: plan.icons,
        recomended: plan.recomended,
        recommended_color: plan.recommended_color,

        offer: plan.offer,
      })),
    [availablePlans]
  );

  // Get currently selected option or default to first one
  const currentOption = useMemo(
    () =>
      paymentOptions.find((opt) => opt.id === selectedPlan) ||
      paymentOptions[0],
    [paymentOptions, selectedPlan]
  );

  const jobGuaranteeInfo = getJobGuaranteeConfig(currentLocation, info);

  return (
    <>
      <Div
        background={Colors.white}
        border="4px solid black"
        borderRadius="12px"
        padding="24px"
        maxWidth="600px"
        width="100%"
        margin="0 auto"
        display="block"
        boxShadow="0 8px 32px rgba(0,0,0,0.25)"
        position="relative"
      >
        {/* Offer tag removed on mobile per revamp */}
        <Div display="block" margin="0 0 24px 0">
          <H3
            fontSize="18px"
            fontWeight="600"
            color={Colors.blue}
            margin="0 0 8px 0"
            textAlign="center"
          >
            {info.plan_details}
          </H3>

          <Div
            alignItems="center"
            justifyContent="center"
            margin="0 0 16px 0"
            display="block"
          >
            {jobGuarantee && jobGuaranteeInfo?.monthly_label ? (
              <H2
                fontSize="32px"
                fontWeight="700"
                color={Colors.black}
                margin="0 8px 0 0"
              >
                {jobGuaranteeInfo.monthly_label}
              </H2>
            ) : getNoJobGuaranteeConfig(currentLocation, info)
                ?.monthly_label ? (
              <H2
                fontSize="32px"
                fontWeight="700"
                color={Colors.black}
                margin="0 8px 0 0"
              >
                {getNoJobGuaranteeConfig(currentLocation, info).monthly_label}
              </H2>
            ) : (
              <H2
                fontSize="32px"
                fontWeight="700"
                color={Colors.black}
                margin="0 8px 0 0"
              >
                {currentOption?.price || ""}
              </H2>
            )}
            <Paragraph
              fontSize="16px"
              color={Colors.black}
              margin="0"
              textAlign="center"
            >
              {info?.financing_message}
            </Paragraph>
          </Div>

          {availablePlans?.some((p) => p.price) &&
            shouldShowJobGuarantee(currentLocation, info) &&
            schedule !== "full_time" && (
              <Div
                margin="8px 0 0 0"
                display="block"
                alignItems="center"
                justifyContent="center"
              >
                <Div alignItems="center" justifyContent="center">
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={() =>
                      setJobGuarantee && setJobGuarantee(!jobGuarantee)
                    }
                  >
                    <Toggle
                      width="42px"
                      height="22px"
                      b_radius="9999px"
                      bg={jobGuarantee ? Colors.blue : Colors.lightGray}
                      as="div"
                    >
                      <Div position="relative" width="42px" height="22px">
                        <Div
                          position="absolute"
                          top="2px"
                          left={jobGuarantee ? "22px" : "2px"}
                          width="18px"
                          height="18px"
                          borderRadius="9999px"
                          background={Colors.white}
                          transition="left 0.2s ease-in-out"
                        />
                      </Div>
                    </Toggle>
                    <H4
                      fontSize_tablet="18px"
                      fontSize_xs="16px"
                      margin="0 0 0 10px"
                      width="auto"
                      as="span"
                    >
                      {jobGuaranteeInfo?.title}
                    </H4>
                  </label>
                </Div>
                <Paragraph
                  textAlign="center"
                  color={Colors.black}
                  margin="8px 0 0 0"
                >
                  {jobGuaranteeInfo?.description}
                </Paragraph>
              </Div>
            )}

          {currentOption?.warning_message && (
            <Paragraph
              color={Colors.darkGray}
              fontSize="12px"
              opacity="1"
              textAlign="center"
              margin="0 0 16px 0"
            >
              {currentOption.warning_message}
            </Paragraph>
          )}
        </Div>

        <Div display="block" margin="0 0 24px 0">
          <Paragraph
            fontSize="14px"
            fontWeight="600"
            color={Colors.black}
            margin="0 0 12px 0"
          >
            {"Other payment options"}
          </Paragraph>

          {paymentOptions.map((option) => (
            <PaymentOptionCard
              key={option.id}
              option={option}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              jobGuarantee={jobGuarantee}
            />
          ))}
        </Div>
      </Div>

      {/* CTA Section - Mobile */}
      <Div display="block" textAlign="center" margin="24px 0 0 0">
        <Paragraph
          fontSize="12px"
          color="#666666"
          textAlign="center"
          margin="0 0 16px 0"
        >
          {info.cta.advisor_text}
        </Paragraph>

        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="12px"
          maxWidth="280px"
          margin="0 auto"
        >
          <Link
            to={`${
              getRegionalCTA(session, info)?.apply_link ||
              FALLBACK_VALUES.applyLink
            }${selectedPlan ? `?utm_plan=${selectedPlan}` : ""}`}
          >
            <Button
              variant="full"
              background={Colors.blue}
              textColor={Colors.white}
              fontSize="14px"
              padding="12px 32px"
              borderRadius="6px"
              fontWeight="600"
              onClick={() => {
                if (selectedPlan) {
                  setSession({
                    ...session,
                    utm: { ...session.utm, utm_plan: selectedPlan },
                  });
                }
              }}
            >
              {getRegionalCTA(session, info)?.book_call ||
                FALLBACK_VALUES.bookCallText}
            </Button>
          </Link>

          {shouldShowMoreDetails(financial) && (
            <Link
              to={
                info?.cta?.more_details_link || FALLBACK_VALUES.financialsLink
              }
            >
              <Button
                background="transparent"
                textColor={Colors.blue}
                fontSize="14px"
                padding="12px 32px"
                borderRadius="6px"
                fontWeight="600"
              >
                {info.cta.more_details}
              </Button>
            </Link>
          )}
        </Div>
      </Div>
    </>
  );
};

const PricesAndPayment = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query PricesAndPayment {
      content: allPricesAndPaymentYaml {
        edges {
          node {
            fields {
              lang
            }
            job_guarantee_locations
            get_notified
            contact_carrer_advisor
            contact_link
            we_accept
            other_payment_options
            top_label
            top_label_2
            plans_title
            plan_details
            financing_message
            select
            select_2
            job_guarantee {
              slug
              academies
              title
              description
              monthly_label
            }
            no_job_guarantee {
              slug
              academies
              monthly_label
            }
            not_available
            not_available_job_guarantee
            cta {
              advisor_text
              america {
                book_call
                apply_link
              }
              international {
                book_call
                apply_link
              }
              more_details
              more_details_link
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
              recommended_color
              scholarship
              description
              job_guarantee_description
              price

              warning_message
              offer

              icons
            }
            part_time {
              slug
              academies
              recomended
              recommended_color
              scholarship
              description
              job_guarantee_description
              price

              warning_message
              offer

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

  // Stable handlers (avoid conditional hook calls in JSX)
  const handleLocationChange = useCallback(
    (opt) => {
      const current = locations.find(
        (l) => l.node.active_campaign_location_slug === opt.value
      ).node;
      setCurrentLocation(current);
    },
    [locations]
  );
  const handleProgramChange = useCallback((opt) => setCourse(opt), []);

  const getCurrentPlans = () => {
    // If we're on a specific course page, use defaultCourse directly
    const rawCourse = props.financial
      ? course?.value || props.defaultCourse
      : props.defaultCourse;

    // Normalize course slug to match plan filenames
    const courseToUse = (() => {
      const lower = (rawCourse || "").toLowerCase();
      const aliasMap = {
        "full-stack-ft": "full-stack", // full-time uses same plans as part-time
        "cyber-security": "cybersecurity",
      };
      return aliasMap[lower] || lower;
    })();

    let _plans = data.allPlansYaml.edges
      .filter(({ node }) => node.fields.lang === props.lang)
      .find((p) =>
        p.node.fields.file_name.includes(courseToUse?.replaceAll("_", "-"))
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
            if (plan.price) return true;
            return false;
          }
          return true;
        });
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
  }, []);

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
    setIsLoading(true);
    // On specific course pages, we don't need to wait for course selection
    if (!currentLocation || (!course && props.financial)) {
      return;
    }
    const filteredPlans = getAvailablePlans();
    setAvailablePlans(filteredPlans);
    setSelectedPlan(null);
    setIsLoading(false);
  }, [currentLocation, course, props.financial]);

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

  if (isLoading) {
    return (
      <Div
        ref={mainContainer}
        id="prices_and_payment"
        display="flex"
        justifyContent="center"
        alignItems="center"
        background={props.background}
        height="600px"
      >
        <LoadingSpinner />
      </Div>
    );
  }

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
      margin="0 auto"
    >
      <Div flexDirection="column" maxWidth_md="1280px" margin="0 auto">
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
        <Grid gridGap="8px" margin_tablet="20px 0 0 0">
          <Div gridColumn="1" gridColumn_tablet="1/ 15" alignItems="center">
            <H3
              fontSize="16px"
              fontSize_md="24px"
              lineHeight="26px"
              fontWeight="400"
              textAlign="center"
              textWrap="balance"
              // textAlign_tablet="start"
              // textAlign_xs="center"
              opacity="1"
              color={Colors.black}
              margin="0 0 2.5rem 0"
            >
              {props.financial ? info.select_2 : info.select}
            </H3>
          </Div>
          {/* SELECT COUNTRY */}
          <Div
            gridColumn="1"
            gridColumn_tablet="2/ 14"
            gridColumn_md="4/12"
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
                  onChange={handleLocationChange}
                  onMenuOpen={() => setIsLocationDropdownOpen(true)}
                  onMenuClose={() => setIsLocationDropdownOpen(false)}
                  style={selectStyles}
                />
                {props.financial && (
                  <SelectRaw
                    placeholderFloat
                    bgColor={Colors.white}
                    single={true}
                    options={currentLocation && courseArrayFiltered}
                    placeholder={info.top_label_2}
                    value={course}
                    onChange={handleProgramChange}
                    onMenuOpen={() => setIsProgramDropdownOpen(true)}
                    onMenuClose={() => setIsProgramDropdownOpen(false)}
                    style={selectStyles}
                  />
                )}
              </Div>
            </Div>
          </Div>
        </Grid>
        {availablePlans && availablePlans.length > 0 ? (
          <>
            {/* Financial explainer card (desktop/tablet) */}
            <FinancialOptionsDesktop
              info={info}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              jobGuarantee={jobGuarantee}
              setJobGuarantee={setJobGuarantee}
              session={session}
              setSession={setSession}
              availablePlans={availablePlans}
              isLocationDropdownOpen={isLocationDropdownOpen}
              isProgramDropdownOpen={isProgramDropdownOpen}
              currentLocation={currentLocation}
              financial={props.financial}
              schedule={schedule}
            />
            {/* Financial explainer card (mobile) */}
            <Div
              display_tablet="none"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <FinancialOptionsCard
                info={info}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                session={session}
                setSession={setSession}
                availablePlans={availablePlans}
                isLocationDropdownOpen={isLocationDropdownOpen}
                isProgramDropdownOpen={isProgramDropdownOpen}
                jobGuarantee={jobGuarantee}
                setJobGuarantee={setJobGuarantee}
                currentLocation={currentLocation}
                financial={props.financial}
                schedule={schedule}
              />
            </Div>
          </>
        ) : (
          availablePlans &&
          availablePlans.length === 0 && (
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
          )
        )}

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
    </Div>
  );
};
export default PricesAndPayment;
