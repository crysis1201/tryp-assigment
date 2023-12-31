import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ComponentDefaultProps,
  Box,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import moment from "moment";
import { IBookings } from "../pages";

interface ITable {
  columns: string[];
  data: IBookings[];
  selected: string[];
  size: string
  getCellProps: any;
  caption?: string;
  sorting?: boolean;
  pagination?: boolean;
}

export const DateTable = ({
  columns,
  data,
  selected,
  sorting,
  pagination,
  getCellProps,
  size
}: ITable) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      disableSortBy: !sorting,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
    <Box overflowX={'scroll'}>
      <Table
        {...getTableProps()}
        overflowX={"scroll"}
        size={size}
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <Th
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex alignItems="center">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {(pagination ? page : rows).map((row, i) => {
            prepareRow(row);
            return (
              <Tr style={{background: selected.includes(row.original.purchaseid) ? "rgba(255,255,255,0.05)" : ""}} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>
                      <p
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                          getCellProps(cell),
                        ])}
                      >
                        {cell.column.id === "select" ?  selected.includes(row.original.purchaseid) ? "Deselect" : "Select" : cell.column.id === "timestamp" ? moment(new Date(cell.value)).fromNow() : cell.render("Cell")}
                      </p>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </Box>
      {pagination && (
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                aria-label="btn"
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                aria-label="btn"
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={{sm: "8px", base: "0"}}>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
            <Text display={{md: "block", base: "none"}} flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              display={{md: "block", base: "none"}}
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions.length}
              onChange={(value) => {
                const page = value ? Number(value) - 1 : 0;
                gotoPage(page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              display={{md: "block", base: "none"}}
              w={32}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                aria-label="btn"
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                aria-label="btn"
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      )}
    </>
  );
};
