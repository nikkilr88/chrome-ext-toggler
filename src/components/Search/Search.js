import React, { useRef, useState, useEffect, useContext } from 'react'
import ExtensionItem from '../ExtensionItem/ExtensionItem'
import { ExtensionContext } from '../../contexts/ExtensionContext'

const Search = () => {
  const [inputValue, setInputValue] = useState('')
  const { extensions } = useContext(ExtensionContext)

  const inputRef = useRef(null)

  const handleInputChange = e => {
    e.persist()

    if (/^[A-Z\s]*$/i.test(e.target.value)) {
      setInputValue(e.target.value)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const searchReg = new RegExp(inputValue, 'gi')

  const searchResults = extensions
    .filter(ext => ext.name.match(searchReg))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((ext, i) => <ExtensionItem key={i} index={i} ext={ext} tabIndex="1" />)

  return (
    <div className="search-wrapper">
      <input
        type="text"
        ref={inputRef}
        className="search"
        spellCheck={false}
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue.length > 0 && (
        <ul className="search-results">
          {searchResults.length > 0 ? searchResults : <p>No Results :(</p>}
        </ul>
      )}
    </div>
  )
}

export default Search
