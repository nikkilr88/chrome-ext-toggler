import React, { Component, useState, useRef, useEffect } from 'react'
import AppInfo from '../AppInfo'

const Search = ({ handleSearch, extensions, searchValue }) => {
  const [inputValue, setInputValue] = useState('')
  const [currentIndex, setCurrentIndex] = useState(-1)

  const inputRef = useRef(null)

  const handleChange = e => {
    e.persist()

    if (/\\/.test(e.target.value)) return

    handleSearch(e)
    setCurrentIndex(-1)
    setInputValue(e.target.value)
  }

  const preventScroll = e => {
    if (e.which === 38 || e.which === 40) {
      e.preventDefault()
      return false
    }
  }

  useEffect(() => {
    inputRef.current.focus()

    document.addEventListener('keydown', preventScroll, false)
    // document.addEventListener('keyup', this.switchFocus, false)

    return () => {
      document.removeEventListener('keydown', preventScroll, false)
      // document.removeEventListener('keyup', this.switchFocus, false)
    }
  }, [])

  const searchReg = new RegExp(searchValue, 'gi')

  const searchResults = extensions
    .filter(ext => {
      if (ext.name.match(searchReg)) {
        return ext
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((ext, i) => <AppInfo key={i} index={i} ext={ext} tabIndex="1" />)

  return (
    <div className="search-wrapper">
      <input
        type="text"
        ref={inputRef}
        className="search"
        spellCheck={false}
        value={inputValue}
        onChange={e => handleChange(e)}
      />
      {searchValue.length > 0 && (
        <ul className="search-results">
          {searchResults.length > 0 ? searchResults : <p>No Results :(</p>}
        </ul>
      )}
    </div>
  )
}

// class Search extends Component {
//   state = {
//     inputValue: "",
//     currentIndex: -1
//   };

//   handleChange = e => {
//     e.persist();

//     if (/\\/.test(e.target.value)) return;

//     this.props.handleSearch(e);

//     this.setState(() => ({
//       inputValue: e.target.value,
//       currentIndex: -1
//     }));
//   };

//   switchFocus = e => {
//     const li = this.ul ? this.ul.childNodes : [];

//     const arrowKeyPress = e.which === 40 || e.which === 38;
//     const arrowDownPress = e.which === 38 && this.state.currentIndex >= 0;
//     const arrowUpPress =
//       e.which === 40 && this.state.currentIndex < li.length - 1;

//     this.setState(prevState => ({
//       currentIndex: arrowDownPress
//         ? prevState.currentIndex + -1
//         : arrowUpPress
//         ? prevState.currentIndex + 1
//         : arrowKeyPress
//         ? -1
//         : prevState.currentIndex
//     }));

//     if (arrowKeyPress && this.state.inputValue.length > 0) {
//       if (this.state.currentIndex === -1) {
//         this.searchInput.focus();
//       } else {
//         li[this.state.currentIndex].focus();
//       }
//     }
//   };

//   preventScroll = e => {
//     if (e.which === 38 || e.which === 40) {
//       e.preventDefault();
//       return false;
//     }
//   };

//   componentDidMount() {
//     this.searchInput.focus();

//     document.addEventListener("keydown", this.preventScroll, false);
//     document.addEventListener("keyup", this.switchFocus, false);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.preventScroll, false);
//     document.removeEventListener("keyup", this.switchFocus, false);
//   }

//   render() {
//     const { handleSearch, extensions, searchValue } = this.props;
//     const searchReg = new RegExp(searchValue, "gi");

//     const searchResults = extensions
//       .filter(ext => {
//         if (ext.name.match(searchReg)) {
//           return ext;
//         }
//       })
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .map((ext, i) => <AppInfo key={i} index={i} ext={ext} tabIndex="1" />);

//     return (
//       <div className="search-wrapper">
//         <input
//           type="text"
//           onChange={e => this.handleChange(e)}
//           className="search"
//           spellCheck={false}
//           value={this.state.inputValue}
//           ref={input => {
//             this.searchInput = input;
//           }}
//         />
//         {searchValue.length > 0 && (
//           <ul className="search-results" ref={ul => (this.ul = ul)}>
//             {searchResults.length > 0 ? searchResults : <p>No Results :(</p>}
//           </ul>
//         )}
//       </div>
//     );
//   }
// }

export default Search
