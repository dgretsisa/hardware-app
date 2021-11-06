import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const options = [
  { name: '--- Select ---' },
  { name: 'Name: A-Z', field: 'name', sort: 'ascending'},
  { name: 'Name: Z-A', field: 'name', sort: 'descending' },
  { name: 'Newest - Oldest', field: 'createdAt', sort: 'descending' },
  { name: 'Oldest - Newest', field: 'createdAt', sort: 'ascending' },
  { name: 'Date Range', field: 'createdAt', sort: 'range' }
]

const Filter = ({ sortByAscending, sortByDescending }) => {
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="w-70 top-16">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-full mt-1 flex items-center gap-2">
          <Listbox.Label>Sort By: </Listbox.Label>
          <div>
          <Listbox.Button className="relative w-full py-1.5 pl-3 pr-10 text-left bg-white rounded cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                        onClick={() => {
                          if(option.sort === 'ascending') sortByAscending(option.field)
                          else if(option.sort === 'descending') sortByDescending(option.field)
                        }}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          </div>
        </div>
      </Listbox>
    </div>
  )
}

export default Filter