import React from "react";
import { Div } from "../Sections";
import { H2, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import { TableHeader, TableRow } from "./table-components";

/**
 * @typedef {Object} DataAction
 * @property {string} text
 * @property {string} path
 *
 * @typedef {Object} DataCellObject
 * @property {string} content
 * @property {boolean} [html]
 * @property {string} [icon]
 * @property {'left'|'right'} [icon_position]
 * @property {string} [icon_color]
 * @property {DataAction} [primary_action]
 * @property {DataAction} [secondary_action]
 *
 * @typedef {string|DataCellObject} DataCell
 *
 * @typedef {Object} DataColumn
 * @property {string} text
 * @property {Object} [style]
 *
 * Responsive table component with optional sticky headers and HTML-capable cells.
 *
 * @param {Object} props
 * @param {string|{text?: string}} [props.title] Table title. Accepts plain string or object with Heading props.
 * @param {string} [props.sub_title]
 * @param {DataColumn[]} [props.columns=[]]
 * @param {DataCell[][]} [props.rows=[]]
 * @param {Object} [props.headerStyle={}] Custom styles for header cells.
 * @param {Object} [props.cellStyle={}] Custom styles for body cells.
 * @param {Object} [props.tableStyle={}] Custom styles for the outer table wrapper.
 * @param {boolean} [props.responsive=true] Enables horizontal scroll on small screens.
 * @param {boolean} [props.stickyHeaders=false] Keeps column headers visible while scrolling.
 * @param {boolean} [props.withBorder=false] Adds solid border and shadow styling.
 * @param {string|number} [props.borderRadius="0px"] Radius applied to the table wrapper.
 * @returns {JSX.Element}
 *
 * @example
 * <DataTable
 *   title="Comparison"
 *   columns={[{ text: 'Feature' }, { text: 'A' }, { text: 'B' }]}
 *   rows={[["Duration", "6m", "9m"]]}
 * />
 *
 * @remarks
 * Optimized for ~2–5 columns; wider tables remain horizontally scrollable on mobile.
 * Can be sourced from YAML: data_table { title, sub_title, columns, rows }.
 */
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
        display="block"
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
    </Div>
  );
};

export default DataTable;
