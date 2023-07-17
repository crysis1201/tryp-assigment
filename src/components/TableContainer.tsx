import { IBookings, MockData } from "../mock/MOCK";
import React from "react";
import { Main } from "./Main";
import { DateTable } from "./Table";

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

  return (
    <>
      <Main>
        <DateTable columns={getColumns()} data={data} sorting={sorting} pagination={pagination} />
      </Main>
    </>
  );
};
