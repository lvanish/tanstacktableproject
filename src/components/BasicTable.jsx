import {useReactTable, flexRender} from '@tanstack/react-table'
import mData from '../MOCK_DATA.json'
import { useMemo } from 'react'
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
    },
  ]


  const table = useReactTable({data, columns})

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(x => (
            <tr key={x.id}>
              {x.headers.map(head => (
                <th key={head.id}>
                  {
                    flexRender(
                      head.column.columnDef.header,
                      head.getContext()
                    )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}