import React from "react";
import { GridContainerWithImage, Div, GridContainer } from "../Sections";
import { H3, H2, H5, H4, Paragraph } from "../Heading";
import { Colors, Img, Button, StyledBackgroundSection, Link } from "../Styling";
import Badges from "../Badges";
import News from "../News";
import { navigate } from "gatsby";
import { requestSyllabus } from "../../actions";
import ReactPlayer from "../ReactPlayer";
import TestimonialsCarrousel from "../Testimonials";
import With4Geeks from "../With4Geeks";
import FaqCard from "../FaqCard";
// import WhyPython from '../WhyPython';
import AlumniProjects from "../AlumniProjects";
import SuccessStories from "../SuccessStories";
import GeeksVsOthers from "../GeeksVsOthers";
import GeeksInfo from "../GeeksInfo";
import ProgramDetails from "../ProgramDetails";
import ProgramDetailsMobile from "../ProgramDetailsMobile";
import LeadForm from "../LeadForm";
import OurPartners from "../OurPartners";
import About4Geeks from "../About4Geeks";
import IconsBanner from "../IconsBanner";
import Icon from "../Icon";
import ChooseYourProgram from "../ChooseYourProgram";
import JobGuaranteeSmall from "../JobGuaranteeSmall";
import StarRating from "../StarRating";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { smartRedirecting, transferQuerystrings } from "../../utils/utils.js";
import CardsCarousel from "../CardsCarousel";
import SimpleCards from "../SimpleCards";
import Overlaped from "../Overlaped";
import TwoColumn from "../TwoColumn/index.js";
import { SingleColumn } from "../TwoColumn/index.js";
import Iconogram from "../Iconogram/index.js";
import { background } from "@storybook/theming";
import WeTrust from "../WeTrust";

const Title = ({ id, title, paragraph }) => {
  return (
    <GridContainer
      id={id}
      margin={paragraph ? "40px 0 20px 0" : "40px 0 30px 0"}
    >
      <H2 type="h2">{title}</H2>
      {paragraph && <Paragraph margin="26px 0">{paragraph}</Paragraph>}
    </GridContainer>
  );
};

export const MultiColumns = ({
  heading,
  sub_heading,
  end_paragraph,
  button,
  columns,
  swipable,
  session,
}) => {
  const utm = session && session.utm;
  const [h_xl, h_lg, h_md, h_sm, h_xs] = heading ? heading.font_size : [];
  const [sh_xl, sh_lg, sh_md, sh_sm, sh_xs] =
    sub_heading && Array.isArray(sub_heading.font_size)
      ? sub_heading.font_size
      : [];
  const [p_xl, p_lg, p_md, p_sm, p_xs] =
    end_paragraph && Array.isArray(end_paragraph.font_size)
      ? end_paragraph.font_size
      : [];
  return (
    <Div
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding_tablet="0 4em"
      padding="0 10px"
      width="100%"
      style={{ textAlign: "center" }}
    >
      {heading && (
        <H2
          type="h2"
          lineHeight="38px"
          lineHeight_tablet="38px"
          fontSize={h_xs || "30px"}
          fs_xl={h_xl}
          fontSize_md={h_md || "40px"}
          fontSize_sm={h_sm}
          margin="30px 0 20px 0"
          style={{ textAlign: "center" }}
        >
          {heading.text}
        </H2>
      )}

      {sub_heading && /<\/?[a-z0-9]+>/g.test(sub_heading.text) ? (
        <Paragraph
          padding={heading ? "0" : "20px"}
          margin="15px 0"
          fontSize={sh_xl}
          fontSize_sm={sh_sm}
          fonSize_md={sh_md}
          fontSize_xs={sh_xs}
          style={sub_heading.style ? JSON.parse(sub_heading.style) : null}
          dangerouslySetInnerHTML={{ __html: sub_heading.text }}
        />
      ) : sub_heading ? (
        <Paragraph
          padding={heading ? "0" : "20px"}
          margin="15px 0"
          fontSize={sh_xl}
          fontSize_sm={sh_sm}
          fonSize_md={sh_md}
          fontSize_xs={sh_xs}
          style={sub_heading.style ? JSON.parse(sub_heading.style) : null}
        >
          {sub_heading.text}
        </Paragraph>
      ) : null}
      <Columns swipable={swipable} columns={columns} />
      {end_paragraph && (
        <Paragraph
          padding={end_paragraph ? "0" : "20px"}
          margin="15px 0"
          fontSize={p_xl}
          fontSize_sm={p_sm}
          fonSize_md={p_md}
          fontSize_xs={p_xs}
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: end_paragraph.text }}
          onClick={(e) => {
            if (e.target.tagName === "A")
              smartRedirecting(e, end_paragraph.path);
          }}
        />
      )}
      {button && (
        <Button
          outline
          colorHoverText={button.hover_color || Colors.blue}
          lineHeight="26px"
          textColor={Colors[button.color] || button.color}
          color={Colors[button.color] || button.color}
          fontSize="15px"
          style={button.style ? JSON.parse(button.style) : null}
          background={Colors[button.background] || button.background}
          margin="2rem 0"
          padding=".35rem.85rem"
          onClick={() => {
            if (button.path && button.path.indexOf("http") > -1)
              window.open(transferQuerystrings(button.path, utm));
            else navigate(button.path);
          }}
        >
          {button.text}
        </Button>
      )}
    </Div>
  );
};

MultiColumns.defaultProps = {
  heading: null,
  sub_heading: null,
  end_paragraph: null,
  button: null,
  columns: [],
};

export const Columns = ({ columns, proportions, swipable }) => {
  return swipable ? (
    <Div
      width="100%"
      className="badge-slider hideOverflowX__"
      flexDirection="row"
      m_sm="0px 0px 100px 0"
      justifyContent="between"
    >
      {columns.map((c, index) => (
        <Div
          key={index}
          flexDirection="column"
          textAlign={c.align}
          minWidth="250px"
          margin="25px 15px 0 15px"
        >
          <Img
            src={c.image.src}
            onClick={() => {
              if (c.image.link) {
                if (c.image.link.indexOf("http") > -1)
                  window.open(c.image.link);
                else navigate(c.image.link);
              }
            }}
            style={c.image.style ? JSON.parse(c.image.style) : null}
            // borderRadius={"1.25rem"}
            className="pointer"
            alt="4Geeks Academy Section"
            margin="auto"
            height="100%"
            width="100%"
            h_sm="250px"
            backgroundSize="cover"
          />

          {/* <div style={{background:"red", width:"250px", height:"250px"}}></div> */}
          <Paragraph
            // lineHeight="30px"
            // fontWeight="700"
            color="black"
            margin="25px 0 0 0"
            style={c.content.style ? JSON.parse(c.content.style) : null}
            dangerouslySetInnerHTML={{ __html: c.content.text }}
          />
        </Div>
      ))}
    </Div>
  ) : (
    <Div
      flexDirection="row"
      m_sm="0px 0px 100px 0"
      justifyContent="around"
      width="100%"
      flexWrap="wrap"
    >
      {columns.map((c, index) => (
        <Div
          key={index}
          flexDirection="column"
          size={c.size[0]}
          size_sm={c.size[2]}
          size_xs={c.size[3]}
          textAlign={c.align}
        >
          <Img
            src={c.image.src}
            onClick={() => {
              if (c.image.link) {
                if (c.image.link.indexOf("http") > -1)
                  window.open(c.image.link);
                else navigate(c.image.link);
              }
            }}
            style={c.image.style ? JSON.parse(c.image.style) : null}
            borderRadius={"1.25rem"}
            className="pointer"
            alt={"4Geeks Academy Section"}
            margin="auto"
            height="100%"
            width="100%"
            h_sm="250px"
            backgroundSize={`cover`}
          />
          <Paragraph
            lineHeight="30px"
            fontWeight="700"
            color="black"
            style={c.content.style ? JSON.parse(c.content.style) : null}
            dangerouslySetInnerHTML={{ __html: c.content.text }}
          />
        </Div>
      ))}
    </Div>
  );
};
Columns.defaultProps = {
  columns: [],
  proportions: [],
};

export const landingSections = {
  we_trust_section: ({ data, yml }) => {
    let dataYml =
      data.allLandingYaml.edges[0] || data.allDownloadableYaml.edges[0];
    let we_trust_data = dataYml.node.we_trust_section;

    return (
      <WeTrust
        id="we-trust-section"
        margin="0"
        padding="0"
        padding_md="0"
        padding_lg="0"
        padding_tablet="0 !important"
        width="100%"
        width_md="100%"
        width_tablet="100%"
        maxWidth="1280px"
        we_trust={we_trust_data}
      />
    );
  },
  choose_program: ({ data, pageContext, yml, course, location, index }) => {
    let dataYml =
      data.allLandingYaml.edges[0] || data.allDownloadableYaml.edges[0];
    let choose_program_data = dataYml.node.choose_program;

    // Build list of course slugs that have job guarantee enabled
    const jobGuaranteeSlugs = data.allCourseYaml.edges
      .filter(({ node }) => node.meta_info?.job_guarantee)
      .map(({ node }) => node.meta_info.slug);

    const programs =
      data.allChooseYourProgramYaml.edges[0].node.programs.filter((p) => {
        const linkSlug = p.link?.split("/").filter(Boolean).pop();
        return jobGuaranteeSlugs.includes(linkSlug);
      });

    return (
      <ChooseYourProgram
        lang={pageContext.lang}
        title={choose_program_data.title}
        paragraph={choose_program_data.paragraph}
        background={Colors.veryLightBlue3}
        programs={programs}
        padding="0"
      />
    );
  },
  in_the_news: ({ session, pageContext, yml, course, location, index }) => (
    <GridContainer
      id="in_the_news"
      key={index}
      padding="40px 0"
      padding_tablet="50px 0"
    >
      <H4
        align="center"
        fontSize="18px"
        color={Colors.darkGray}
        margin="20px 0px 10px 0px"
        m_sm="20px auto"
        maxWidth="350px"
      >
        {yml.heading}
      </H4>

      <News
        maxWidth="100px"
        justifySelf="center"
        margin="40px 0 40px"
        padding="0"
        padding_tablet="0 6%"
        limit={yml.limit || 3}
        location={
          location
            ? location
            : session &&
              session.location &&
              session.location.breathecode_location_slug
        }
        lang={pageContext.lang}
        filter={
          !Array.isArray(yml.filter) ? null : (n) => yml.filter.includes(n.name)
        }
      />
    </GridContainer>
  ),

  about4Geeks: ({ session, data, pageContext, yml, index }) => {
    let dataYml =
      data.allLandingYaml.edges.length !== 0 &&
      data.allLandingYaml.edges[0].node.about4Geeks !== null
        ? data.allLandingYaml.edges
        : data.allDownloadableYaml.edges;
    return (
      <React.Fragment key={index}>
        <About4Geeks id="about4Geeks" lang={dataYml[0].node.about4Geeks} />
      </React.Fragment>
    );
  },

  iconogram: ({ yml, index }) => {
    return <Iconogram yml={yml} index={index} />;
  },

  badges: ({ pageContext, yml, index }) => {
    const title = yml.heading?.text || yml.heading;
    const subHeading = yml.sub_heading?.text || yml.sub_heading;
    return (
      <React.Fragment key={index}>
        <Div width="100%">
          <Badges
            link
            id="badges"
            variant="squares"
            lang={pageContext.lang}
            title={title}
            paragraph={subHeading}
            imageBorder={`1px solid ${Colors.lightGray2}`}
            short_text
            padding="60px 0"
            padding_tablet="68px 0"
            margin_tablet="0 0 78px 0"
            maxWidth="1280px"
          />
        </Div>
      </React.Fragment>
    );
  },

  rating_reviews: ({ data, pageContext, yml, course, index }) => {
    let dataYml =
      data.allLandingYaml.edges[0] || data.allDownloadableYaml.edges[0];
    let ratingReviews = dataYml.node.rating_reviews;
    const { background } = ratingReviews;

    return (
      <Div
        background={Colors[background] || background}
        padding="0 20px"
        padding_tablet="0 40px"
      >
        <Div
          key={index}
          padding="60px 0 60px 0"
          display="flex"
          flexDirection="column"
          margin="auto"
          width="100%"
          maxWidth="1280px"
        >
          {ratingReviews.heading && (
            <H2 type="h2" padding="10px 0 60px 0">
              {ratingReviews.heading}
            </H2>
          )}
          <Div
            display="flex"
            flexDirection="column"
            flexDirection_tablet="row "
            justifyContent="center"
            gap="45px"
            gap_tablet="24px"
          >
            {ratingReviews.rating_list.map((item) => {
              return (
                <Div
                  key={`rating-component-${item.alt}`}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  borderRadius="4px"
                  background="white"
                  width="100%"
                  padding="10px"
                >
                  <GatsbyImage
                    style={{
                      height: "50px",
                      minWidth: "135px",
                      width: "135px",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    loading="eager"
                    // draggable={false}
                    // fadeIn={false}
                    alt={item.alt}
                    image={getImage(item.image.childImageSharp.gatsbyImageData)}
                  />
                  <StarRating rating={item.rating} />
                  <Paragraph
                    padding="6px 0"
                    fontSize="9px"
                    color={Colors.darkGray3}
                    fontWeight="bold"
                    textTransform="lowercase"
                  >
                    {`${item.rating} ${
                      pageContext.lang === "us" ? "On Reviews" : "En reseñas"
                    }`}
                  </Paragraph>
                </Div>
              );
            })}
          </Div>
        </Div>
      </Div>
    );
  },

  syllabus: ({ session, data, pageContext, yml, course, location, index }) => {
    const filteredPrograms = data.allCourseYaml.edges
      .filter(({ node }) => {
        if (
          ["unlisted", "hidden"].includes(node.meta_info.visibility) ||
          !node.meta_info.show_in_apply
        )
          return false;
        return (
          course.filter((array_el) => {
            return node.meta_info.bc_slug === array_el;
          }).length !== 0
        );
      })
      .map(({ node }) => ({
        ...node,
      }));

    const programs = filteredPrograms.map((p) => ({
      label: p.apply_form.label,
      value: p.meta_info.bc_slug,
    }));

    const locations =
      (session &&
        session.locations
          ?.filter((loc) => location.includes(loc.breathecode_location_slug))
          .map((loc) => ({
            label: loc.name,
            value: loc.breathecode_location_slug,
          }))) ||
      [];

    const defaultCourse = Array.isArray(course) ? course[0] : course;
    return (
      <GridContainer
        key={index}
        id="syllabus"
        padding_tabletChild="0px calc(55% - 30%)"
        padding="50px 40px"
        padding_tablet="50px 40px"
        background={Colors.lightGray}
      >
        <Div
          flexDirection="column"
          background={Colors.verylightGray}
          padding="20px 0"
          borderRadius="3px"
          borderRadius_tablet="10px"
          padding_tablet="60px 40px"
          size="12"
          size_tablet="12"
          width="100%"
          width_tablet="100%"
          margin="0"
          textAlign_sm="center"
        >
          <H5 type="h5" fontSize="20px" padding="0 0 35px 0">
            {yml.heading.text}
          </H5>
          <LeadForm
            landingTemplate
            // layout="block"
            background={Colors.verylightGray}
            margin="0"
            marginButton={`15px 0 30px auto`}
            buttonBorderRadius="3px"
            justifyContentButton="center"
            // inputBgColor="#F9F9F9"
            selectProgram={programs}
            selectLocation={locations}
            inputBgColor={Colors.white}
            layout="flex"
            lang={pageContext.lang}
            sendLabel={yml.button ? yml.button.text : "SEND"}
            formHandler={requestSyllabus}
            data={{
              course: {
                type: "hidden",
                value:
                  programs.length === 1 ? programs[0].value : defaultCourse,
                valid: true,
              },
              utm_location: {
                type: "hidden",
                value: locations.length <= 1 ? locations[0]?.value : location,
                valid: true,
              },
            }}
          />
        </Div>
      </GridContainer>
    );
  },
  geeks_vs_others: ({ session, pageContext, yml, course, index }) => {
    return (
      <React.Fragment key={index}>
        <GeeksVsOthers
          lang={pageContext.lang}
          limit={yml?.total_rows || 5}
          title={yml?.heading}
          paragraph={yml?.sub_heading}
          mainBackround={Colors.white}
          thirdBackground="#F9F9F9"
          border={`1px solid ${Colors.lightGray}`}
          borderRadius="4px"
          style={{
            background: Colors.veryLightBlue3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "20px",
            padding_table: "20px",
            padding_lg: "20px 40px",
            margin: "0 auto",
          }}
        />
      </React.Fragment>
    );
  },

  program_details: ({ session, pageContext, yml, data, index }) => {
    const getCourse = () => {
      const course_slug = data.allLandingYaml.edges[0]?.node.meta_info
        ?.utm_course
        ? data.allLandingYaml.edges[0].node.meta_info?.utm_course[0]
        : null;
      if (data.allCourseYaml.edges.length > 0) {
        const singleCourse = data.allCourseYaml.edges.find(
          ({ node }) => node.meta_info.bc_slug === course_slug
        );
        return singleCourse
          ? singleCourse.node
          : data.allCourseYaml.edges[0].node;
      }
      return {};
    };
    const course = getCourse();
    return (
      <React.Fragment key={index}>
        <ProgramDetails
          id="program_details"
          heading={yml.heading}
          sub_heading={yml.sub_heading}
          background={yml?.background}
          details={course?.details}
          lang={pageContext.lang}
        />
        <ProgramDetailsMobile details={course && course.details} />
      </React.Fragment>
    );
  },

  overlaped: ({ session, pageContext, yml, data, index }) => {
    const { heading, content, button, background, image } = yml;
    return (
      <React.Fragment key={index}>
        <Overlaped
          landingTemplate
          heading={heading.text}
          content={content.text}
          button={button}
          background={background}
          image={image}
          lang={pageContext.lang}
        />
      </React.Fragment>
    );
  },

  cards_carousel: ({ session, pageContext, yml, data, index }) => {
    const { heading, sub_heading, content, cards, button, width } = yml;
    return (
      <React.Fragment key={index}>
        <Div
          id="cards_carousel"
          width="100%"
          flexDirection="column"
          background_md="linear-gradient(180deg, #C7F3FD 58.6%, #FFFFFF 50%)"
          background_tablet="linear-gradient(180deg, #C7F3FD 58.1%, #FFFFFF 50%)"
          background_sm="linear-gradient(180deg, #C7F3FD 61.04%, #FFFFFF 50%)"
          background_xs="linear-gradient(180deg, #C7F3FD 59.45%, #FFFFFF 50%)"
          background_xxs="linear-gradient(180deg, #C7F3FD 60%, #FFFFFF 50%)"
          display_xs="flex"
        >
          <CardsCarousel
            landingTemplate
            title={heading}
            cardWidth={width}
            sub_title={sub_heading}
            content={content}
            cards={cards}
            button={button}
            lang={pageContext.lang}
          />
        </Div>
      </React.Fragment>
    );
  },

  simple_cards: ({ yml, index }) => {
    const { heading, sub_heading, content, cards, button, width, background } =
      yml;
    return (
      <SimpleCards
        index={index}
        heading={heading}
        cardWidth={width}
        background={background}
        sub_heading={sub_heading}
        content={content}
        cards={cards}
        button={button}
      />
    );
  },

  choose_your_program: ({ session, pageContext, yml, data, index }) => {
    return (
      <React.Fragment key={index}>
        <Div
          id="choose_your_program"
          width="100%"
          flexDirection="column"
          background_tablet="linear-gradient(180deg, #f5f5f5 50%, #FFFFFF 50%)"
        >
          <Div
            background={Colors.lightGray}
            alignSelf="center"
            height="2px"
            width="94%"
            width_tablet="63.4%"
          />
        </Div>
        <ChooseYourProgram
          landingTemplate
          title={yml.heading.text}
          paragraph={yml.content.text}
          lang={pageContext.lang}
          programs={yml.programs}
        />
      </React.Fragment>
    );
  },

  testimonials: ({ session, data, pageContext, yml, index }) => {
    return (
      <Div
        id="testimonials"
        key={index}
        flexDirection="column"
        margin="50px"
        margin_tablet="100px"
        m_sm="0"
        p_xs="0"
      >
        <TestimonialsCarrousel
          lang={data.allTestimonialsYaml.edges}
          categories={yml.categories}
        />
      </Div>
    );
  },

  geeksInfo: ({ session, data, pageContext, yml, index }) => (
    <Div
      id="geeksInfo"
      key={index}
      flexDirection="column"
      margin="30px auto 42px auto"
      margin_tablet="30px auto 42px auto"
      m_sm="0"
      p_xs="0"
    >
      <GeeksInfo lang={pageContext.lang} />
    </Div>
  ),

  testimonials_new: ({ session, data, pageContext, yml, index }) => {
    const [h_xl, h_lg, h_md, h_sm, h_xs] =
      yml.heading && yml.heading.font_size ? yml.heading.font_size : [];

    return (
      <Div
        id="testimonials_new"
        key={`${index}-testimonials_new`}
        flexDirection="column"
        margin="50px auto"
        m_sm="0"
        p_xs="0 10px"
        width_tablet="100%"
        maxWidth_tablet="1280px"
      >
        {yml.heading && yml.heading.text !== "" && (
          <H2
            type="h2"
            textAlign_tablet="center"
            lineHeight="38px"
            lineHeight_tablet="38px"
            fontSize={h_xs || "30px"}
            fs_xl={h_xl}
            fontSize_lg={h_lg || "30px"}
            fontSize_md={h_md || "30px"}
            fontSize_sm={h_sm}
            margin="30px 0 0px 0"
            style={yml.heading.style ? JSON.parse(yml.heading.style) : null}
          >
            {yml.heading.text}
          </H2>
        )}
        <SuccessStories
          lang={pageContext.lang}
          filterIndexes={yml.filter_indexes}
          variant={yml.variant}
        />
      </Div>
    );
  },

  job_guarantee_small: ({ data, yml, index }) => {
    const { heading } = yml;

    const { icons, link, title } = data.allJobGuaranteeSmallYaml.edges[0].node;
    const formatedIcons = icons.map(({ title, icon }) => ({
      icon,
      content: title,
    }));
    return (
      <JobGuaranteeSmall
        key={`job-guarantee-small-${index}`}
        content={{
          title: heading?.text || title,
          link,
          icons: formatedIcons,
        }}
      />
    );
  },

  faq: ({ data, yml, index }) => (
    <FaqCard
      key={`faq-${index}`}
      faqs={data.allFaqYaml.edges[0].node.faq}
      topicSlug={yml.topic}
    />
  ),

  why_4geeks: ({ session, pageContext, yml, index }) => {
    const title = yml.heading?.text || yml.heading;
    return (
      <Div
        id="why_4geeks"
        key={index}
        flexDirection="column"
        margin="0"
        padding="0"
      >
        <With4Geeks
          text={yml.footer?.text}
          sessionLocation={
            session &&
            session.location &&
            session.location.breathecode_location_slug
          }
          text_link={yml.footer?.text_link}
          lang={pageContext.lang}
          playerHeight="auto"
          title={title}
        />
      </Div>
    );
  },
  alumni_projects: ({ session, data, pageContext, yml, index }) => (
    <Div
      id="alumni_projects"
      key={index}
      flexDirection="column"
      margin_xs="0 0 50px 0"
      margin_tablet="0 0 30px 0"
      //margin_md="0 0 30px 0"
      padding="0"
      padding_tablet="0"
      position="relative"
    >
      <Div
        background={Colors.lightGray}
        width="50%"
        height="414px"
        position="absolute"
        top="173px"
        display_xxs="none"
        display_tablet="flex"
      />
      <AlumniProjects
        data={data.allAlumniProjectsYaml.edges[0]?.node}
        yml={yml}
        hasTitle
        showThumbs="false"
        limit={5}
      />
    </Div>
  ),
  who_is_hiring: ({ session, data, pageContext, yml, location, index }) => {
    let dataYml =
      data.allLandingYaml &&
      data.allLandingYaml.edges.length !== 0 &&
      data.allLandingYaml.edges[0].node?.who_is_hiring !== null
        ? data.allLandingYaml.edges
        : data.allPageYaml &&
          data.allPageYaml.edges.length !== 0 &&
          data.allPageYaml.edges[0].node?.who_is_hiring !== null
        ? data.allPageYaml.edges
        : data.allDownloadableYaml.edges;

    const hiring = data.allPartnerYaml.edges[0].node;
    let landingHiring = dataYml[0].node?.who_is_hiring;

    // Obtener featured del YAML específico
    const featuredLogos = landingHiring?.featured;

    // Determinar qué imágenes mostrar
    let imagesToShow;
    let featuredImagesToShow;

    if (featuredLogos?.length > 0) {
      // Si hay featured en el YAML, mostrar primero los featured y luego el resto
      const featuredNames = featuredLogos.map((logo) => logo.name);
      const remainingLogos = hiring.partners.images.filter(
        (img) => !featuredNames.includes(img.name)
      );
      imagesToShow = [...featuredLogos, ...remainingLogos];
      featuredImagesToShow = featuredLogos;
    } else {
      // Si NO hay featured, usar comportamiento por defecto
      imagesToShow = hiring.partners.images;
      featuredImagesToShow = hiring.partners.images.filter(
        (img) => img.featured === true
      );
    }

    let landingHiriging = dataYml[0].node?.who_is_hiring;

    return (
      <Div
        id="who_is_hiring"
        key={index}
        flexDirection="column"
        padding={landingHiriging?.padding || "0"}
        padding_tablet={landingHiriging?.padding_tablet || "0"}
        margin_tablet={landingHiriging?.margin || "60px auto 60px auto"}
        m_sm="0"
        p_xs="0"
        margin_xs="60px 0 40px 0"
        background={landingHiriging?.background || ""}
      >
        <OurPartners
          multiLine
          variant="carousel"
          background={landingHiriging?.background || ""}
          images={imagesToShow}
          margin="0"
          padding="0 0 75px 0"
          marquee
          paddingFeatured="0 0 70px 0"
          featuredImages={featuredImagesToShow}
          showFeatured={true}
          withoutLine
          title={
            landingHiring ? landingHiring.heading : hiring.partners.tagline
          }
          paragraph={
            landingHiring
              ? landingHiring.sub_heading
              : hiring.partners.sub_heading
          }
        />
      </Div>
    );
  },

  divider: ({ session, data, pageContext, yml, index }) => {
    const [h_xl, h_lg, h_md, h_sm, h_xs] =
      yml.section_heading && yml.section_heading.font_size
        ? yml.section_heading.font_size
        : [];
    return (
      <Div
        id="divider"
        flexDirection="column"
        key={index}
        height={yml.height[0]}
        lg={yml.height[1]}
        md={yml.height[2]}
        sm={yml.height[3]}
        xs={yml.height[4]}
      >
        {yml.heading && yml.heading !== "" && (
          <H2
            type="h2"
            textAlign_tablet="center"
            lineHeight="38px"
            lineHeight_tablet="38px"
            fontSize={h_xs || "30px"}
            fs_xl={h_xl}
            fontSize_md={h_md || "30px"}
            fontSize_sm={h_sm}
            margin="30px 0 0px 0"
            style={yml.heading.style ? JSON.parse(heading.heading.style) : null}
          >
            {yml.heading.text}
          </H2>
        )}
      </Div>
    );
  },
  two_column_left: ({ session, data, pageContext, yml, index }) => {
    const [h_xl, h_lg, h_md, h_sm, h_xs] =
      yml.section_heading && yml.section_heading.font_size
        ? yml.section_heading.font_size
        : [];
    return (
      <Div
        id={`two_column_left-${index}`}
        key={index}
        background={Colors[yml.background] || yml.background}
        flexDirection="column"
        // padding="30px 0"
        // padding_tablet="30px 40px"
        margin_tablet="0 auto"
        width_md="100%"
        // padding_xs="30px 0px"
      >
        {yml.section_heading && yml.section_heading !== "" && (
          <H2
            type="h2"
            textAlign_tablet="center"
            lineHeight="38px"
            lineHeight_tablet="38px"
            fontSize={h_xs || "30px"}
            fs_xl={h_xl}
            fontSize_md={h_md || "30px"}
            fontSize_sm={h_sm}
            margin="30px 0 0px 0"
            style={
              yml.section_heading.style
                ? JSON.parse(yml.section_heading.style)
                : null
            }
          >
            {yml.section_heading.text}
          </H2>
        )}
        <TwoColumn
          left={{
            image: yml.image,
            video: yml.video,
            videoHeight: yml.videoHeight,
            videoWidth: yml.videoWidth,
            justify: yml.justify,
          }}
          right={{
            heading: yml.heading,
            sub_heading: yml.sub_heading,
            bullets: yml.bullets,
            content: yml.content,
            button: yml.button,
          }}
          alignment={yml.alignment}
          proportions={yml.proportions}
          session={session}
        />
      </Div>
    );
  },
  two_column_right: ({ session, data, pageContext, yml, index }) => {
    const [h_xl, h_lg, h_md, h_sm, h_xs] =
      yml.section_heading && yml.section_heading.font_size
        ? yml.section_heading.font_size
        : [];
    return (
      <Div
        id={`two_column_right-${index}`}
        key={index}
        background={Colors[yml.background] || yml.background}
        flexDirection="column"
        //padding="40px 0 50px 0"
        margin_tablet="0 auto"
        width_md="100%"
        // padding_xs="30px 0px"
      >
        {yml.section_heading && yml.section_heading !== "" && (
          <H2
            type="h2"
            textAlign_tablet="center"
            lineHeight="38px"
            lineHeight_tablet="38px"
            fontSize={h_xs || "30px"}
            fs_xl={h_xl}
            fontSize_md={h_md || "30px"}
            fontSize_sm={h_sm}
            margin="30px 0 0px 0"
            style={
              yml.section_heading.style
                ? JSON.parse(yml.section_heading.style)
                : null
            }
          >
            {yml.section_heading.text}
          </H2>
        )}
        <TwoColumn
          left={{
            heading: yml.heading,
            sub_heading: yml.sub_heading,
            bullets: yml.bullets,
            content: yml.content,
            button: yml.button,
          }}
          right={{
            image: yml.image,
            video: yml.video,
            videoHeight: yml.videoHeight,
            videoWidth: yml.videoWidth,
            justify: yml.justify,
          }}
          alignment={yml.alignment}
          proportions={yml.proportions}
          session={session}
        />
      </Div>
    );
  },
  multi_column: ({ session, data, pageContext, yml, index }) => {
    return (
      <Div
        id="multi_column"
        key={index}
        background={Colors[yml.background] || yml.background}
        flexDirection="column"
        padding="0 0 50px 0"
        padding_tablet="6%"
        margin="0"
      >
        <MultiColumns
          heading={yml.heading}
          sub_heading={yml.sub_heading}
          columns={yml.columns}
          end_paragraph={yml.content}
          button={yml.button}
          swipable={yml.swipable}
          session={session}
        />
      </Div>
    );
  },
  single_column: ({ session, data, pageContext, yml, index }) => (
    <Div
      id="single_column"
      key={index}
      flexDirection="column"
      padding="0px 0"
      padding_tablet="50px 14%"
    >
      <SingleColumn
        column={{
          heading: yml.heading,
          content: yml.content,
          button: yml.button,
          image: yml.image,
          video: yml.video,
        }}
      />
    </Div>
  ),
  columns: ({ session, data, pageContext, yml, index }) => (
    <Div id="columns" key={index} flexDirection="column" margin="50px 0">
      <Columns columns={yml.columns} proportions={yml.proportions} />
    </Div>
  ),
};
