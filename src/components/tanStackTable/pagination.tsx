import React, { Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'

const Pagination = ({ table }: any) => {
  return (
    <div className="flex mx-8">
      <div className=" flex ">
        <div
          className={
            'flex items-center justify-center gap-2 text-xs font-bold uppercase leading-4 text-hc-gray-300 dark:text-hc-darkgray-200'
          }>
          Rows per page
          <Listbox
            value={table.getState().pagination.pageSize}
            onChange={(value: number) => table.setPageSize(value)}>
            <div className="relative">
              <Listbox.Button
                className={
                  'relative  cursor-pointer rounded-md bg-primary-500 px-2 py-1 text-left font-bold leading-4 tracking-[5%] text-white outline-none dark:text-hc-darkgray-100 sm:text-sm'
                }>
                <span className="block truncate pr-3 text-xs font-semibold">
                  {table.getState().pagination.pageSize}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-1 top-[5px] ">
                  <IconChevronDown size={14} stroke={2} strokeLinejoin="miter" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  className={
                    'absolute left-0 z-20 mt-1 max-h-60 w-10  overflow-auto rounded-md  bg-black py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-hc-darkgray-100 sm:text-sm'
                  }>
                  {[50, 100, 150, 200, 250].map((page, pageIdx) => (
                    <Listbox.Option
                      key={pageIdx}
                      className={({ active }) =>
                        `} relative cursor-default select-none py-2 pl-4 text-xs text-hc-gray-700
                        dark:text-hc-darkgray-400 ${
                          active ? 'bg-hc-gray-100 text-hc-gray-800' : 'dark:bg-hc-darkgray-200 '
                        }`
                      }
                      value={page}>
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'text-xs font-medium' : 'font-normal'
                            }`}>
                            {page}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <span>
            Page&nbsp;
            <span className="text-primary">{table.getState().pagination.pageIndex + 1}</span>
            &nbsp;of {table.getPageCount()}
          </span>
        </div>
      </div>
      <div
        className={'ml-auto flex font-bold uppercase text-hc-gray-500 dark:text-hc-darkgray-200'}>
        <span className="flex items-center gap-2">
          <button
            className={
              'flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border  bg-white outline-none dark:border-hc-darkgray-100 dark:bg-hc-darkgray-50'
            }
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <IconChevronsLeft
              size={16}
              className="text-gray-500"
              stroke={2}
              strokeLinejoin="miter"
            />
          </button>
          <span className="text-xs">Prev</span>
        </span>
        <div className="flex gap-2 px-3 ">
          <button
            className={
              'flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border  bg-white outline-none dark:border-hc-darkgray-100 dark:bg-hc-darkgray-50'
            }
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <IconChevronLeft
              size={16}
              className="text-gray-500"
              stroke={2}
              strokeLinejoin="miter"
            />
          </button>
          <button
            className={
              'flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border  bg-white outline-none dark:border-hc-darkgray-100 dark:bg-hc-darkgray-50'
            }
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <IconChevronRight
              size={16}
              className="text-gray-500"
              stroke={2}
              strokeLinejoin="miter"
            />
          </button>
        </div>
        <span className="flex items-center gap-2">
          <span className="text-xs">Next</span>
          <button
            className={
              'flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border  bg-white outline-none dark:border-hc-darkgray-100 dark:bg-hc-darkgray-50'
            }
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <IconChevronsRight
              size={16}
              className="text-gray-500"
              stroke={2}
              strokeLinejoin="miter"
            />
          </button>
        </span>
      </div>
    </div>
  )
}

export default Pagination
