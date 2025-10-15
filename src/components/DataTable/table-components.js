import React from "react";
import { Link } from "gatsby";
import { Div } from "../Sections";
import { H3, H4, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";

const BUTTON_BORDER_RADIUS = "3px";
const BUTTON_PADDING = "14px";
const SMALL_FONT_SIZE = "14px";

const ACTION_BUTTON_PROPS = {
  DEFAULT: {
    background: Colors.blue,
    color: Colors.white,
  },
  OUTLINE: {
    background: Colors.white,
    color: Colors.blue,
  },
  LINK: {
    width: "auto",
    background: "transparent",
    color: Colors.blue,
    padding: "0",
    borderRadius: "0",
    cursor: "pointer",
  },
};

const CellContent = React.memo(({ cell, cellStyle, isHeaderCell = false }) => {
  const TextComponent = isHeaderCell ? H4 : Paragraph;
  const textProps = isHeaderCell
    ? {
        type: "h4",
        fontWeight: "700",
        fontSize: "15px",
        fontSize_tablet: "16px",
        color: Colors.darkGray,
        textAlign: "left",
        letterSpacing: "0.3px",
      }
    : {
        fontWeight: "400",
        color: Colors.black,
        textAlign: cell?.text_align || "left",
        lineHeight: "1.4",
      };

  const cellContent = typeof cell === "string" ? cell : cell.content || "";
  const hasContent = cellContent && cellContent.trim() !== "";
  const hasIcon = cell.icon;

  if (!hasContent && !hasIcon) return null;

  if (!hasIcon) {
    return (
      <TextComponent
        fontSize={cellStyle?.fontSize || SMALL_FONT_SIZE}
        fontSize_tablet={cellStyle?.fontSize_tablet || "14px"}
        margin="0"
        {...textProps}
        {...(cell.html
          ? { dangerouslySetInnerHTML: { __html: cellContent } }
          : { children: cellContent })}
      />
    );
  }

  return (
    <Div
      display="flex"
      alignItems="center"
      justifyContent={
        isHeaderCell || cell?.text_align !== "center" ? "flex-start" : "center"
      }
      gap={cell.gap || "8px"}
    >
      {(!cell.icon_position || cell.icon_position === "left") && (
        <Icon
          style={{ flexShrink: 0, ...cell.icon_style }}
          icon={cell.icon}
          width={cell.size || "16px"}
          height={cell.size || "16px"}
          color={
            cell.icon_color || (isHeaderCell ? Colors.darkGray : Colors.black)
          }
        />
      )}
      {hasContent && (
        <TextComponent
          fontSize={cellStyle?.fontSize || SMALL_FONT_SIZE}
          fontSize_tablet={cellStyle?.fontSize_tablet || "14px"}
          margin="0"
          {...textProps}
          {...(cell.html
            ? { dangerouslySetInnerHTML: { __html: cellContent } }
            : { children: cellContent })}
        />
      )}
      {cell.icon_position === "right" && (
        <Icon
          icon={cell.icon}
          style={{ flexShrink: 0, ...cell.icon_style }}
          width={cell.size || "16px"}
          height={cell.size || "16px"}
          color={
            cell.icon_color || (isHeaderCell ? Colors.darkGray : Colors.black)
          }
        />
      )}
    </Div>
  );
});

const ActionButtons = React.memo(({ actions }) => {
  const primaryVariant = actions.primary?.variant?.toUpperCase();
  const secondaryVariant = actions.secondary?.variant?.toUpperCase();

  return (
    <Div
      width="100%"
      display="flex"
      flexDirection="column"
      gap="10px"
      alignItems="center"
      margin="10px 0"
    >
      {actions.primary && actions.primary.text && (
        <Link to={actions.primary.path} state={actions.primary.link_state}>
          <Button
            className={primaryVariant ? `button-${primaryVariant}` : ""}
            width="100%"
            fontSize={SMALL_FONT_SIZE}
            fontWeight="700"
            padding={BUTTON_PADDING}
            borderRadius={BUTTON_BORDER_RADIUS}
            textDecoration="none"
            display="inline-block"
            textAlign="center"
            transition="background-color 0.3s ease"
            {...(ACTION_BUTTON_PROPS[primaryVariant] ||
              ACTION_BUTTON_PROPS.DEFAULT)}
          >
            {actions.primary.text}
          </Button>
        </Link>
      )}
      {actions.secondary && actions.secondary.text && (
        <Link to={actions.secondary.path} state={actions.secondary.link_state}>
          <Button
            className={secondaryVariant ? `button-${secondaryVariant}` : ""}
            width="100%"
            fontSize={SMALL_FONT_SIZE}
            fontWeight="700"
            padding={BUTTON_PADDING}
            borderRadius={BUTTON_BORDER_RADIUS}
            textDecoration="none"
            display="inline-block"
            textAlign="center"
            transition="background-color 0.3s ease"
            {...(ACTION_BUTTON_PROPS[secondaryVariant] ||
              ACTION_BUTTON_PROPS.OUTLINE)}
          >
            {actions.secondary.text}
          </Button>
        </Link>
      )}
    </Div>
  );
});

const TableHeader = React.memo(
  ({
    columns,
    headerStyle,
    stickyHeaders,
    gridColumns,
    gridColumns_tablet,
    childBorderRadius,
    borderRadiusValue,
  }) => {
    const stickyHeaderStyles = stickyHeaders
      ? {
          position: "sticky",
          top: "0",
          zIndex: "10",
          backgroundColor: Colors.white,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }
      : {};

    const [topLeft, topRight] = childBorderRadius.split(" ");

    return (
      <Div
        as="thead"
        display="grid"
        gridTemplateColumns={gridColumns}
        gridTemplateColumns_tablet={gridColumns_tablet}
        gridGap="1px"
        {...stickyHeaderStyles}
      >
        <Div as="tr" display="contents">
          {columns.map((column, index) => {
            const isFirst = index === 0;
            const isLast = index === columns.length - 1;

            let headerBorderRadius = "0px";
            if (isFirst) headerBorderRadius = `${topLeft} 0px 0px 0px`;
            else if (isLast) headerBorderRadius = `0px ${topRight} 0px 0px`;

            return (
              <Div
                as="th"
                key={`header-${index}`}
                background={isFirst ? Colors.black : Colors.white}
                padding={stickyHeaders ? "8px 16px" : "15px"}
                padding_tablet="20px"
                display="flex"
                alignItems="center"
                justifyContent={isFirst ? "flex-start" : "center"}
                borderBottom={`2px solid ${Colors.lightGray}`}
                borderRight={
                  index < columns.length - 1
                    ? `1px solid ${Colors.borderGray}`
                    : "none"
                }
                borderRadius={headerBorderRadius}
                minWidth="120px"
                minWidth_tablet="auto"
                whiteSpace="nowrap"
                whiteSpace_tablet="normal"
                scope={isFirst ? "row" : "col"}
                {...headerStyle}
              >
                <H3
                  type="h3"
                  fontSize={stickyHeaders ? "14px" : "16px"}
                  fontSize_tablet="18px"
                  fontWeight="600"
                  color={isFirst ? Colors.white : Colors.darkGray}
                  margin="0"
                  textAlign={isFirst ? "left" : "center"}
                >
                  {column.title || column}
                </H3>
              </Div>
            );
          })}
        </Div>
      </Div>
    );
  }
);

const TableCell = React.memo(
  ({
    cell,
    cellIndex,
    rowIndex,
    totalRows,
    totalColumns,
    cellStyle,
    childBorderRadius,
  }) => {
    const isFirstColumn = cellIndex === 0;
    const isLastRow = rowIndex === totalRows - 1;
    const isLastColumn = cellIndex === totalColumns - 1;

    const backgroundColor =
      !cellStyle?.disableLinePattern && rowIndex % 2 === 1
        ? cellStyle?.linePatternColor || Colors.veryLightBlue3
        : Colors.white;

    let cellBorderRadius = "0px";
    if (isLastRow) {
      const borderValues = childBorderRadius.split(" ");
      const bottomRight = borderValues[2] || borderValues[0];
      const bottomLeft = borderValues[3] || borderValues[2] || borderValues[0];

      if (isFirstColumn) cellBorderRadius = `0px 0px 0px ${bottomLeft}`;
      else if (isLastColumn) cellBorderRadius = `0px 0px ${bottomRight} 0px`;
    }

    return (
      <Div
        as={isFirstColumn ? "th" : "td"}
        key={`cell-${rowIndex}-${cellIndex}`}
        background={backgroundColor}
        padding="15px"
        padding_tablet="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderBottom={
          rowIndex < totalRows - 1 ? `1px solid ${Colors.borderGray}` : "none"
        }
        borderRight={
          cellIndex < totalColumns - 1
            ? `1px solid ${Colors.borderGray}`
            : "none"
        }
        borderRadius={cellBorderRadius}
        minHeight="80px"
        minWidth="120px"
        minWidth_tablet="auto"
        whiteSpace="nowrap"
        whiteSpace_tablet="normal"
        scope={isFirstColumn ? "row" : undefined}
        {...cellStyle}
      >
        <CellContent
          cell={cell}
          cellStyle={cellStyle}
          isHeaderCell={isFirstColumn}
        />
        {(cell.primary_action || cell.secondary_action) && (
          <ActionButtons
            actions={{
              primary: cell.primary_action,
              secondary: cell.secondary_action,
            }}
          />
        )}
      </Div>
    );
  }
);

const TableRow = React.memo(
  ({
    row,
    rowIndex,
    totalRows,
    totalColumns,
    cellStyle,
    childBorderRadius,
  }) => (
    <Div as="tr" key={`row-${rowIndex}`} display="contents">
      {row.cells?.map((cell, cellIndex) => (
        <TableCell
          key={`cell-${rowIndex}-${cellIndex}`}
          cell={cell}
          cellIndex={cellIndex}
          rowIndex={rowIndex}
          totalRows={totalRows}
          totalColumns={totalColumns}
          cellStyle={cellStyle}
          childBorderRadius={childBorderRadius}
        />
      ))}
    </Div>
  )
);

export { CellContent, ActionButtons, TableHeader, TableCell, TableRow };
