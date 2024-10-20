import React from 'react'

export default function DropdownTheme({changeTheme}) {
    return (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                    onClick={() => changeTheme('light')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                >
                    Light Theme
                </button>
                <button
                    onClick={() => changeTheme('dark')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                >
                    Dark Theme
                </button>
                <button
                    onClick={() => changeTheme('custom')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                >
                    Custom Theme
                </button>
            </div>
        </div>
    )
}
