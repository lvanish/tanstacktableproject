import {useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import mData from '../MOCK_DATA.json'
import { useMemo, useState } from 'react'
import {DateTime} from 'luxon'
export default function BasicTable() {

  const data = useMemo(() => mData, [])

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'ID',
    },
    {
      header: 'First name',
      accessorKey: 'first_name',
      footer: 'First name',
    },
    {
      header: 'Last name',
      accessorKey: 'last_name',
      footer: 'Last name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      footer: 'Email',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      footer: 'Gender',
    },
    {
      header: 'Date of birth',
      accessorKey: 'dob',
      footer: 'Date of birth',
      cell: info=> DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
    },
  ]
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
  const table = useReactTable({
    data, 
    columns, 
    getCoreRowModel: getCoreRowModel(), 
    getPaginationRowModel: getPaginationRowModel(), 
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })

  return (
    <div className="overflow-x-auto pt-6">
      <input type='text' value={filtering} onChange={e => setFiltering(e.target.value)}/>
      <table className='table'>
        <thead className="bg-base-200 ">
          {table.getHeaderGroups().map(x => (
            <tr key={x.id}>
              {x.headers.map(head => (
                <th key={head.id} onClick={head.column.getToggleSortingHandler()}>
                  {
                    flexRender(
                      head.column.columnDef.header,
                      head.getContext()
                    )
                  }
                  {
                    {asc:'⬆️', desc:'⬇️'}[head.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(x => (
            <tr key={x.id}>
              {x.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className='btn' onClick={() => table.setPageIndex(0)}>First Page</button>
        <button className='btn' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
        <button className='btn' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
        <button className='btn' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
      </div>
    </div>
  )
}
