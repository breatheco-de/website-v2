import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { Devices } from "../Responsive";
import { SessionContext } from "../../session";
import { H3, H4, Paragraph } from "../Heading";
import { Colors, Button, Anchor, Link } from "../Styling";
import { Div, Grid } from "../Sections";
import Icon from "../Icon";
import { NavItem } from "../Navbar";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import CustomBar from "../CustomBar";
import { locByLanguage } from "../../actions";

const MegaMenuContainer = styled(Div)`
  top: 70px;
  left: 50%;
  width: ${(props) => props.width || "90vw"};
  transform: translate(-50%);
  max-width: 950px;
`;

const Triangle = styled.div`
  position: absolute;
  display: none;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 60px solid white;
  top: 10px;
  left: 0px;
  &::before {
    content: " ";
    display: block;
    position: relative;
    height: 40px;
    width: 94px;
    top: -15px;
    transform: translateX(-50%);
  }
`;

const Nav = styled.nav`
  height: ${(props) => props.height || "71px"};
  display: ${(props) => props.display};
  position: ${(props) => props.position || "fixed"};
  width: 100%;
  background: ${(props) => props.background || "white"};
  z-index: ${(props) => props.zIndex || "100"};
  top: ${(props) => props.top || "0"};
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
    display: ${(props) => props.display_tablet};
  }
  @media ${Devices.md} {
    display: ${(props) => props.display_md};
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;
const Menu = styled.ul`
  display: flex;
`;
const MenuItem = styled.li`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0.5rem;
  text-align: center;
  font-family: lato, sans-serif;
  &:hover {
    .megamenu-container {
      text-transform: initial;
      display: block;
    }
    .triangle {
      display: block;
      z-index: 1;
    }
  }
`;

const parsedUrl =
  typeof window !== "undefined" ? new URL(window.location.href) : false;
export const isTestMode = parsedUrl
  ? parsedUrl.searchParams.get("test") === "true"
  : false;

//This Function prevents troubles when component renders during cypress test process
export const isDevelopment = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return true;
    // dev code
  }
  return false;
};

export const Navbar = ({
  lang,
  currentURL,
  menu,
  open,
  button,
  onToggle,
  languageButton,
  onLocationChange,
  myLocations,
}) => {
  const { session, setSession } = useContext(SessionContext);
  const [status, setStatus] = useState({
    toggle: false,
    hovered: false,
    itemIndex: null,
  });

  let city = session && session.location ? session.location.city : [];
  const [buttonText, setButtonText] = useState("");
  const [contentBar, setContentBar] = useState({});
  const [showDiscount, setShowDiscount] = useState(false);
  /* In case of want change the Button text "Aplica" search the key 
       "apply_button_text" in /src/data/location/locationfile.yaml
    */
  let findCity = myLocations?.find((loc) => loc.node?.city === city);
  useEffect(() => {
    if (findCity !== undefined && findCity.node) {
      setButtonText(findCity.node.button.apply_button_text);
      setContentBar(findCity.node.custom_bar);
      if (findCity.node.custom_bar.discounts) setShowDiscount(true);
    }
  }, [findCity]);

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/4geeksacademy-logo-old.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
            width: 200
            placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
          )
        }
      }
      allLocationYaml {
        edges {
          node {
            city
            name
            latitude
            longitude
            phone
            socials {
              name
              icon
              link
            }
            country
            country_shortname
            defaultLanguage
            breathecode_location_slug
            active_campaign_location_slug
            in_person_available
            online_available
            meta_info {
              slug
              visibility
              position
              region
              dialCode
            }
            button {
              apply_button_text
              syllabus_button_text
            }
            custom_bar {
              active
            }
          }
        }
        nodes {
          fields {
            file_name
            lang
            slug
          }
        }
      }
      allCustomBarYaml {
        edges {
          node {
            bar_content {
              discount {
                message
                ends_in
                button {
                  label
                  path
                }
              }
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const isContentBarActive = contentBar.active || isDevelopment();

  const langDictionary = {
    us: "es",
    es: "us",
  };

  const locations = locByLanguage(data.allLocationYaml, langDictionary[lang]);

  const myCustomBar = data.allCustomBarYaml.edges.find(
    (item) => item.node.fields.lang === lang
  );

  return (
    <Div
      display="inline"
      position="fixed"
      width="100%"
      top="0"
      opacity="1"
      zIndex="100"
    >
      {/* <CustomBar
        isContentBarActive={isContentBarActive}
        contentBar={contentBar}
        discountContent={myCustomBar?.node}
        showDiscount={showDiscount}
        display_md="flex"
        display_xxs="none"
        position="static"
      /> */}
      <Nav
        display_md="flex"
        display="none"
        position="relative"
        top="0"
        height="60px"
      >
        <Link to={lang == "es" ? "/es/inicio" : "/"}>
          <GatsbyImage
            // fadeIn={false}
            loading="eager"
            image={getImage(data.file.childImageSharp.gatsbyImageData)}
            // fixed={data.file.childImageSharp.fixed}
            alt="4Geeks Logo"
            style={{
              height: "auto",
              width: "132px",
            }}
          />
        </Link>
        <Menu>
          {menu &&
            menu.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() =>
                    setStatus({
                      ...status,
                      toggle: !status.toggle,
                      itemIndex: index,
                    })
                  }
                  className="menu-item"
                >
                  {item.sub_menu && (
                    <div style={{ position: "relative" }}>
                      <Triangle className="triangle" />
                    </div>
                  )}
                  <H3
                    margin="0 5px 0 0"
                    fontSize="13px"
                    lineHeight="16px"
                    fontWeight="400"
                  >
                    {index === menu.length - 1 ? (
                      <Link to={item.link}>{item.name}</Link>
                    ) : (
                      item.name
                    )}
                  </H3>
                  {index !== menu.length - 1 && <Icon icon="arrowdown" />}
                  {item.sub_menu && (
                    <MegaMenu
                      key={item.name}
                      status={{
                        ...status,
                        toggle: !status.toggle,
                        itemIndex: index,
                      }}
                      setStatus={setStatus}
                      menu={menu}
                    />
                  )}
                </MenuItem>
              );
            })}
          {/* <MegaMenu status={status} setStatus={setStatus} menu={menu} /> */}
        </Menu>
        <Div alignItems="center" justifyContent="between">
          <Link
            onClick={() =>
              setSession({
                ...session,
                language: langDictionary[lang],
                locations,
              })
            }
            to={
              session && session.pathsDictionary && currentURL
                ? `${session.pathsDictionary[currentURL] || ""}${
                    languageButton.link
                  }`
                : "/?lang=en#home"
            }
          >
            <Paragraph
              dangerouslySetInnerHTML={{ __html: languageButton.text }}
              fontSize="13px"
              margin="0 50px 0 0"
              fontWeight="400"
              lineHeight="16px"
            />
          </Link>
          <Link onClick={onToggle} to={button.button_link || "#"}>
            <Button
              variant="full"
              width="fit-content"
              color={Colors.black}
              textColor={Colors.white}
            >
              {buttonText || button.apply_button_text}
            </Button>
          </Link>
        </Div>
      </Nav>
    </Div>
  );
};

const CampusMenu = ({ status, setStatus, menu }) => {
  let campusIndex = menu.map((e) => e.name).indexOf("Campus");
  const [activeOpt, setActiveOpt] = useState({
    ...menu[campusIndex].sub_menu.links[0],
  });

  return (
    <>
      <Div id="menu-container" width="100%">
        <Div id="options-container" flexDirection="column" width="25%">
          {Array.isArray(menu[status.itemIndex].sub_menu.links) &&
            menu[status.itemIndex].sub_menu.links.map((m, i) => (
              <Button
                color={activeOpt.title === m.title ? Colors.black : Colors.gray}
                borderLeft={
                  activeOpt.title === m.title
                    ? `5px solid ${Colors.blue}`
                    : null
                }
                padding="10px"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={() => {
                  setActiveOpt({ ...m });
                }}
              >
                {m.title}
              </Button>
            ))}
        </Div>
        <Div
          id="links-container"
          flexDirection="column"
          flexWrap="wrap"
          maxHeight="330px"
          width="75%"
        >
          {activeOpt.sub_links != undefined &&
            Array.isArray(activeOpt.sub_links) &&
            activeOpt.sub_links.map((l, i) => {
              return (
                <Link to={l.link_to} key={i}>
                  <Div
                    margin="2px 5px 2px 0"
                    padding="10px 0 10px 18px"
                    backgroundHover={`#E6F5FB`}
                    borderRadius="3px"
                    alignItems="baseline"
                  >
                    <H3
                      textAlign="left"
                      width="fit-content"
                      fontSize="15px"
                      lineHeight="20px"
                      fontWeight="400"
                      margin="0 5px 0 0"
                    >
                      {l.title}
                    </H3>
                    <Icon
                      icon="arrow-right"
                      color="#A4A4A4"
                      width="8px"
                      height="8px"
                    />
                  </Div>
                </Link>
              );
            })}
        </Div>
      </Div>
    </>
  );
};

export const MegaMenu = ({ status, setStatus, menu }) => {
  return (
    <>
      {status.itemIndex !== null && status.itemIndex !== menu.length - 1 && (
        <MegaMenuContainer
          className="megamenu-container"
          width={menu[status.itemIndex].sub_menu.width}
          display="none"
          maxHeight="auto"
          background="white"
          padding_tablet="30px 30px 17px 30px"
          position="absolute"
          borderRadius="3px"
          minHeight_tablet="347px"
          boxShadow_tablet="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
        >
          <Grid
            gridTemplateColumns_tablet="repeat(12, 1fr)"
            gridTemplateRows="2"
            width="100%"
          >
            <Div
              borderBottom_tablet="1px solid #EBEBEB"
              gridArea_tablet="1/1/1/13"
              padding="0 0 27px 0"
            >
              {menu[status.itemIndex].sub_menu.icon && (
                <Div margin="0 15px 0 0">
                  <Icon
                    icon={menu[status.itemIndex].sub_menu.icon}
                    width="43px"
                    height="34px"
                  />
                </Div>
              )}
              <Div flexDirection="column">
                {status.itemIndex != null && (
                  <Link
                    to={
                      menu[status.itemIndex].sub_menu.link &&
                      menu[status.itemIndex].sub_menu.link
                    }
                  >
                    <Div alignItems="baseline" margin="5px 0 ">
                      <H3
                        textAlign="left"
                        width="fit-content"
                        fontSize="15px"
                        lineHeight="20px"
                        fontWeight="400"
                        margin="0 5px 0 0"
                      >
                        {menu[status.itemIndex].sub_menu.title}
                      </H3>
                      {menu[status.itemIndex].sub_menu.link && (
                        <Icon
                          icon="arrow-right"
                          color="#A4A4A4"
                          width="8px"
                          height="8px"
                        />
                      )}
                    </Div>
                  </Link>
                )}
                {menu[status.itemIndex].sub_menu.paragraph
                  .split("\n")
                  .map((d, i) => (
                    <Paragraph textAlign="left" color={Colors.darkGray} key={i}>
                      {d}
                    </Paragraph>
                  ))}
              </Div>
            </Div>

            <Div gridArea_tablet="2/1/2/13">
              <Grid
                gridTemplateColumns_tablet={`repeat(${
                  menu[status.itemIndex].sub_menu.links.length
                }, 1fr)`}
                width="100%"
              >
                {menu[status.itemIndex].name !== "Campus" &&
                  Array.isArray(menu[status.itemIndex].sub_menu.links) &&
                  menu[status.itemIndex].sub_menu.links.map((m, i) => {
                    return (
                      <Div flexDirection="column" key={i}>
                        {m.icon && (
                          <Icon icon={m.icon} width="100px" height="73px" />
                        )}
                        {m.level && (
                          <H4
                            textAlign="left"
                            margin="19px 0 5px 0"
                            fontSize="15px"
                            fontWeight="400"
                            lineHeight="22px"
                          >
                            {m.level}
                          </H4>
                        )}
                        <H3
                          textAlign="left"
                          fontSize="15px"
                          lineHeight="22px"
                          fontWeight="900"
                          margin="0 0 5px 0"
                        >
                          {m.title != "-" ? m.title : <span>&nbsp;</span>}
                        </H3>
                        {m.paragraph && (
                          <Paragraph textAlign="left">{m.paragraph}</Paragraph>
                        )}
                        {m.buttons != undefined && (
                          <Div>
                            {Array.isArray(m.buttons) &&
                              m.buttons.map((m, i) => {
                                return (
                                  <Link to={m.link} key={i}>
                                    <Button
                                      variant="outline"
                                      color="black"
                                      font='"Lato", sans-serif'
                                      width="fit-content"
                                      margin="20px 10px 0 0"
                                      pointer
                                      textColor={Colors.black}
                                      fontSize={"13px"}
                                      padding="10px"
                                      colorHover={Colors.blue}
                                      colorHoverText={Colors.white}
                                      transition="all 0.3s ease"
                                    >
                                      {m.text}
                                    </Button>
                                  </Link>
                                );
                              })}
                          </Div>
                        )}
                        {m.sub_links != undefined &&
                          Array.isArray(m.sub_links) &&
                          m.sub_links.map((m, i) => {
                            return (
                              <Link to={m.link_to} key={i}>
                                <Div
                                  margin="2px 0"
                                  padding="10px 0 10px 18px"
                                  backgroundHover={`#E6F5FB`}
                                  borderRadius="3px"
                                  alignItems="baseline"
                                >
                                  <H3
                                    textAlign="left"
                                    width="fit-content"
                                    fontSize="15px"
                                    lineHeight="20px"
                                    fontWeight="400"
                                    margin="0 5px 0 0"
                                  >
                                    {m.title}
                                  </H3>
                                  <Icon
                                    icon="arrow-right"
                                    color="#A4A4A4"
                                    width="8px"
                                    height="8px"
                                  />
                                </Div>
                              </Link>
                            );
                          })}
                      </Div>
                    );
                  })}
              </Grid>
            </Div>
          </Grid>
          {menu[status.itemIndex].id === "programs" && (
            <Div
              width="100%"
              justifyContent="center"
              margin="20px 0 0 0"
              padding="15.5px 0 0 0"
              borderTop={`1px solid ${Colors.lightGray}`}
            >
              <Paragraph
                margin="0"
                textAlign="center"
                width="auto"
                dangerouslySetInnerHTML={{
                  __html:
                    menu[status.itemIndex].sub_menu.program_comparison_cta.text,
                }}
              />
            </Div>
          )}
          {menu[status.itemIndex].name === "Campus" && (
            <CampusMenu status={status} setStatus={setStatus} menu={menu} />
          )}
        </MegaMenuContainer>
      )}
    </>
  );
};
