import React, { useState } from "react";
import { Main } from "./Main";
import { DateTable } from "./Table";
import {
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useRadioGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { RadioCard } from "./RadioCard";
import { IBookings } from "../pages";

interface ITable {
  headers: string[];
  data: IBookings[];
  caption?: string;
  sorting?: boolean;
  pagination?: boolean;
}

export const TableContainer = ({
  headers,
  data,
  caption,
  sorting,
  pagination,
}: ITable) => {
  const [searchText, setSearchText] = useState("");
  const [size, setSize] = useState("lg");
  const [value, setValue] = useState([]);
  const [selected, setSelected] = useState([]);

  const sizes = ['sm', 'md', 'lg']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'sizes',
    defaultValue: 'lg',
    onChange: (e) => setSize(e),
  })

  const group = getRootProps()

  const options = [
    {
      label: "Success",
      value: "success",
    },
    {
      label: "Failed",
      value: "failed",
    },
    {
      label: "Waiting",
      value: "waiting",
    },
  ];

  const getColumns = () => {
    let columns = [];
    headers.map((header) => {
      columns.push({
        Header: header,
        accessor: header.replaceAll(" ", "").toLowerCase(),
      });
    });
    return columns;
  };

  const chakraStyles: ChakraStylesConfig = {
    container: (provided, state) => ({
        ...provided,
        flex: "1 1 30%",
    }),
    control: (provided, state) => ({
      ...provided,
      flex: "1 1 30%",
      flexWrap: "nowrap",
      minWidth: "12rem",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      flexWrap: "nowrap",
    }),
  };

  return (
    <>
      <Main
          overflowY={"scroll"} 
          maxHeight={!pagination ? "50rem" : ""} 
        >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          flexGrow={"1"}
          width={"100%"}
          flexWrap={"wrap"}
          gap={"2rem"}
        >
          <Heading fontSize="1.5rem">{caption}</Heading>
          <Flex alignItems={"center"} gap={"2rem"} flexWrap={{base: "wrap", sm: "nowrap"}}>
            <Select
              chakraStyles={chakraStyles}
              isMulti
              defaultValue={value}
              onChange={setValue}
              options={options}
              placeholder="Select status"
              size={"md"}
            />
            <InputGroup minWidth={"12rem"} flex={"1 1 30%"}>
              <Input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                type="text"
                placeholder="Search bookings"
                size={"md"}
              />
              <InputRightElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputRightElement>
            </InputGroup>
            <HStack flex={"1 1 30%"} {...group}>
                {sizes.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                    )
                })}
            </HStack>
          </Flex>
        </Flex>
        <DateTable
          columns={getColumns()}
          getCellProps={(cellInfo) => ({
            onClick: () => cellInfo.column.id === "select" && selected.includes(cellInfo.row.original.purchaseid) ? setSelected((selected) => selected.filter((d) => d != cellInfo.row.original.purchaseid)) : setSelected((selected) => [...selected,  cellInfo.row.original.purchaseid]),
            style: {
              minWidth: '7rem',
              borderRadius: cellInfo.column.id === "status" ? "25px" : cellInfo.column.id === "select" ? "8px" : null,
              padding: cellInfo.column.id === "status" || cellInfo.column.id === "select" ? "0.5rem 1rem" : null,
              textAlign: cellInfo.column.id === "status" || cellInfo.column.id === "select" ? "center" : null,
              color: cellInfo.column.id === "status" ? "#151515" : null,
              cursor: cellInfo.column.id === "select" ? "pointer" : null,
              width: "fit-content",
              backgroundColor:  cellInfo.column.id === "select" ? "rgba(255,255,255,0.15)" : cellInfo.value === "Waiting" ? "#FFFCC9" : cellInfo.value === "Success" ? "#90EE90" : cellInfo.value === "Failed" ? "#ffc6c4" : null
            }
          })}
          data={data
            .filter((d) => {
              const isExists = value.find(({ value }) => {
                return value === d.status.toLowerCase();
              });
              if (isExists || value.length === 0) {
                return true;
              } else {
                return false;
              }
            })
            .filter((d) => {
              if (
                d.name.toLowerCase().includes(searchText) ||
                d.mail.toLowerCase().includes(searchText) ||
                d.purchaseid.toLowerCase().includes(searchText)
              ) {
                return true;
              }
              return false;
            })}
          sorting={sorting}
          pagination={pagination}
          selected={selected}
          size={size}
        />
      </Main>
    </>
  );
};
