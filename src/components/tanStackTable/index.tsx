import React, { useMemo, useState } from 'react'

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Pagination from './pagination'

export default function TSTable<R>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
  getRowLink,
  getRowId,
  showPagination,
}: {
  columns: Array<any>
  data: Array<R>
  globalFilter?: string
  setGlobalFilter?: (value: string) => void
  getRowLink?: (row: R) => string
  getRowId?: (row: R) => string
  showPagination?: boolean
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  })
  return (
    <>
      <table className="w-full text-left text-base bg-[#191919] m-5 rounded-md">
        <thead className={'z-100 sticky top-12 bg-[#191919] cursor-pointer'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope="col"
                  key={header.id}
                  className="whitespace-nowrap py-3 px-4 first:rounded-l-lg last:rounded-r-lg text-gray-500">
                  {header.isPlaceholder ? null : (
                    <button onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <IconChevronDown className="h-3 w-3 text-white" />,
                        desc: <IconChevronUp className="h-3 w-3 text-whte" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-t border-gray-500 ">
                {row.getVisibleCells().map((cell: any) => {
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap py-2 px-4 first:rounded-l-lg last:rounded-r-lg font-extralight text-gray-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {showPagination && <Pagination table={table} />}
    </>
  )
}
