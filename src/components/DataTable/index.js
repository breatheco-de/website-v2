import React, { useState } from "react";
import { Link } from "gatsby";
import { Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";

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
        fontSize={cellStyle?.fontSize || "14px"}
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
        <Div style={{ flexShrink: 0, ...cell.icon_style }}>
          <Icon
            icon={cell.icon}
            width={cell.size || "16px"}
            height={cell.size || "16px"}
            color={
              cell.icon_color || (isHeaderCell ? Colors.darkGray : Colors.black)
            }
          />
        </Div>
      )}
      {hasContent && (
        <TextComponent
          fontSize={cellStyle?.fontSize || "14px"}
          fontSize_tablet={cellStyle?.fontSize_tablet || "14px"}
          margin="0"
          {...textProps}
          {...(cell.html
            ? { dangerouslySetInnerHTML: { __html: cellContent } }
            : { children: cellContent })}
        />
      )}
      {cell.icon_position === "right" && (
        <Div style={{ flexShrink: 0, ...cell.icon_style }}>
          <Icon
            icon={cell.icon}
            width={cell.size || "16px"}
            height={cell.size || "16px"}
            color={
              cell.icon_color || (isHeaderCell ? Colors.darkGray : Colors.black)
            }
          />
        </Div>
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
            fontSize="14px"
            fontWeight="700"
            padding="14px"
            borderRadius="3px"
            textDecoration="none"
            display="inline-block"
            textAlign="center"
            transition="background-color 0.3s ease"
            background={
              primaryVariant === "OUTLINE" ? Colors.white : Colors.blue
            }
            color={primaryVariant === "OUTLINE" ? Colors.blue : Colors.white}
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
            fontSize="14px"
            fontWeight="700"
            padding="14px"
            borderRadius="3px"
            textDecoration="none"
            display="inline-block"
            textAlign="center"
            transition="background-color 0.3s ease"
            background={
              secondaryVariant === "DEFAULT" ? Colors.blue : Colors.white
            }
            color={secondaryVariant === "DEFAULT" ? Colors.white : Colors.blue}
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

const DataTable = ({
  title,
  sub_title,
  columns = [],
  rows = [],
  headerStyle = {},
  cellStyle = {},
  tableStyle = {},
  responsive = true,
  stickyHeaders = false,
  withBorder = false,
  borderRadius = "0px",
  ...props
}) => {
  const [selected, setSelected] = useState({ index: null, manual: false });

  const handleToggle = (index) => {
    setSelected((prev) => ({
      index: prev.index === index ? null : index,
      manual: true,
    }));
  };

  const handleKeyDown = (e, index, firstCellContent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(index);
    }
  };
  const columnCount = columns.length;
  const gridColumns = `1fr repeat(${columnCount - 1}, 1fr)`;
  const gridColumns_tablet = responsive
    ? `repeat(${columnCount}, 1fr)`
    : gridColumns;

  const borderWidth = 3;
  const borderRadiusValue =
    typeof borderRadius === "number" ? borderRadius : parseFloat(borderRadius);
  const borderRadiusValuePx = `${borderRadiusValue}px`;
  const calculatedRadius = Math.max(0, borderRadiusValue - borderWidth);
  const childBorderRadiusValue = `${calculatedRadius}px`;
  const childBorderRadius = `${childBorderRadiusValue} ${childBorderRadiusValue} ${childBorderRadiusValue} ${childBorderRadiusValue}`;

  return (
    <Div
      display="block"
      padding="40px 17px"
      padding_tablet="60px 40px"
      padding_md={withBorder ? "60px 80px 90px 80px" : "60px 80px"}
      padding_lg="60px 0"
      maxWidth="1280px"
      margin="0 auto"
      {...props}
    >
      {title && (
        <H2
          type="h2"
          maxWidth="800px"
          textAlign="center"
          margin="0 auto 20px auto"
          textWrap="balance"
          fontSize="28px"
          fontSize_tablet="35px"
          fontWeight="700"
          {...title}
        >
          {title.text || title}
        </H2>
      )}

      {sub_title && (
        <Paragraph
          textAlign="center"
          margin="0 auto 40px auto"
          fontSize="16px"
          fontSize_tablet="18px"
          color={Colors.darkGray}
          textWrap="balance"
          margin_tablet="0 auto 40px auto"
        >
          {sub_title}
        </Paragraph>
      )}

      {/* Responsive table wrapper with horizontal scroll */}
      <Div
        as="div"
        display_xxs="none"
        display_md="block"
        overflowX="auto"
        overflowY={stickyHeaders ? "auto" : "visible"}
        maxHeight={stickyHeaders ? "620px" : "none"}
        borderRadius={borderRadiusValuePx}
        border={
          withBorder
            ? `${borderWidth}px solid #000`
            : `2.5px solid ${Colors.borderGray}`
        }
        boxShadow={withBorder ? "22px 26px 0px 0px rgba(0,0,0,1)" : undefined}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: `${Colors.darkGray} ${Colors.lightGray}`,
        }}
      >
        {/* Semantic HTML Table */}
        <Div
          as="table"
          display="block"
          borderRadius={borderRadiusValuePx}
          minWidth="600px"
          minWidth_tablet="auto"
          {...tableStyle}
        >
          <TableHeader
            columns={columns}
            headerStyle={headerStyle}
            stickyHeaders={stickyHeaders}
            gridColumns={gridColumns}
            gridColumns_tablet={gridColumns_tablet}
            childBorderRadius={childBorderRadius}
            borderRadiusValue={borderRadiusValue}
          />

          {/* Table Body */}
          <Div
            as="tbody"
            display="grid"
            gridTemplateColumns={gridColumns}
            gridTemplateColumns_tablet={gridColumns_tablet}
            gridGap="1px"
          >
            {rows.map((row, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                row={row}
                rowIndex={rowIndex}
                totalRows={rows.length}
                totalColumns={columns.length}
                cellStyle={cellStyle}
                childBorderRadius={childBorderRadius}
              />
            ))}
          </Div>
        </Div>
      </Div>

      {/* MOBILE VERSION - Dropdown/Accordion */}
      <Div
        flexWrap="wrap"
        justifyContent="center"
        padding_xs="0 0 40px 0"
        margin_tablet="20px 35px"
        margin_xxs="10px 15px"
        gridGap="10px"
        display_md="none"
        border={
          withBorder
            ? `${borderWidth}px solid #000`
            : `2.5px solid ${Colors.borderGray}`
        }
        borderRadius={borderRadiusValuePx}
        boxShadow={withBorder ? "22px 26px 0px 0px rgba(0,0,0,1)" : undefined}
        background={Colors.white}
      >
        {title && (
          <H2
            fontSize="18px"
            fontWeight="900"
            lineHeight="19px"
            textAlign="center"
            color={Colors.darkGray}
            padding="30px 0 10px 0"
          >
            {title.text || title}
          </H2>
        )}

        {rows.map((row, index) => {
          const firstCell = row.cells?.[0] || row?.[0];
          const firstCellContent =
            typeof firstCell === "string"
              ? firstCell
              : firstCell?.content || "";

          return (
            <React.Fragment key={index}>
              <Div
                key={index}
                width="90%"
                height={selected.index === index ? "auto" : "50px"}
                margin_xs="0 15px"
                display_md="none"
                cursor="pointer"
                role="button"
                tabIndex={0}
                aria-expanded={selected.index === index}
                aria-label={`Toggle details for ${firstCellContent}`}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index, firstCellContent)}
                justifyContent="between"
                flexDirection={selected.index === index && "column"}
                position="relative"
                alignItems="center"
                borderBottom="none"
                borderBottom_tablet="1px solid #a4a4a47a"
                borderBottom_xs="1px solid #a4a4a47a"
              >
                <H2
                  textAlign="left"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="22px"
                  textTransform="uppercase"
                  color={Colors.darkGray}
                  padding={selected.index === index ? "14px 0 0 0" : "0px"}
                >
                  {firstCellContent}
                </H2>
                <Div
                  position="absolute"
                  right="0px"
                  top="15px"
                  transform={
                    selected.index === index ? "rotate(90deg)" : "rotate(0deg)"
                  }
                >
                  <Icon icon="arrow-right" width="32px" height="16px" />
                </Div>
                {selected.index === index && (
                  <Div flexDirection="row" margin="10px 0" width="100%">
                    {columns.slice(1).map((column, colIndex) => {
                      const cell =
                        row.cells?.[colIndex + 1] || row?.[colIndex + 1];
                      const cellContent =
                        typeof cell === "string" ? cell : cell?.content || "";
                      const hasIcon = typeof cell === "object" && cell?.icon;
                      const hasActions =
                        typeof cell === "object" &&
                        (cell?.primary_action || cell?.secondary_action);

                      return (
                        <Div
                          key={colIndex}
                          flexDirection="column"
                          width={`${100 / (columns.length - 1)}%`}
                          background={
                            colIndex % 2 === 0 ? "#e3f2ff" : Colors.white
                          }
                          padding="8px"
                          borderRadius="6px"
                          justifyContent="center"
                          margin="0 2px"
                        >
                          <Paragraph
                            textAlign="center"
                            fontSize="14px"
                            fontWeight="700"
                            lineHeight="20px"
                            color={Colors.darkGray}
                          >
                            {column.title || column}
                          </Paragraph>
                          <Div
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap="4px"
                          >
                            {hasIcon && (
                              <Icon
                                icon={cell.icon}
                                width={cell.size || "16px"}
                                height={cell.size || "16px"}
                                color={cell.icon_color || Colors.darkGray}
                              />
                            )}
                            <Paragraph
                              textAlign="center"
                              fontSize="12px"
                              fontWeight="300"
                              lineHeight="20px"
                              color={Colors.darkGray}
                              {...(cell?.html
                                ? {
                                    dangerouslySetInnerHTML: {
                                      __html: cellContent,
                                    },
                                  }
                                : { children: cellContent })}
                            />
                          </Div>
                          {hasActions && (
                            <Div margin="8px 0 0 0">
                              {cell.primary_action && (
                                <Div
                                  as="a"
                                  href={cell.primary_action.path}
                                  fontSize="10px"
                                  fontWeight="600"
                                  padding="4px 8px"
                                  borderRadius="3px"
                                  background={Colors.blue}
                                  color={Colors.white}
                                  textDecoration="none"
                                  display="inline-block"
                                  margin="2px"
                                >
                                  {cell.primary_action.text}
                                </Div>
                              )}
                              {cell.secondary_action && (
                                <Div
                                  as="a"
                                  href={cell.secondary_action.path}
                                  fontSize="10px"
                                  fontWeight="600"
                                  padding="4px 8px"
                                  borderRadius="3px"
                                  background="transparent"
                                  color={Colors.blue}
                                  border={`1px solid ${Colors.blue}`}
                                  textDecoration="none"
                                  display="inline-block"
                                  margin="2px"
                                >
                                  {cell.secondary_action.text}
                                </Div>
                              )}
                            </Div>
                          )}
                        </Div>
                      );
                    })}
                  </Div>
                )}
              </Div>
            </React.Fragment>
          );
        })}
      </Div>
    </Div>
  );
};

export default DataTable;
