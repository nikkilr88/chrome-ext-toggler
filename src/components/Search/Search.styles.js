import styled from 'styled-components'
import MagIcon from '../../images/mag.png'

export const StyledSearchWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 5px;
  position: absolute;
  width: 100%;
  z-index: 999;
  background: #fff;
  box-shadow: 0 5px 10px -1px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    top: 10px;
    left: 10px;
    background: url(${MagIcon});
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.35;
  }

  .search {
    width: 100%;
    padding: 5px 5px 5px 25px;
    border: 1px solid #dfdfdf;
    background: #dfdfdf;
    border-radius: 3px;
    margin-right: 3px;
    outline: none;
    color: #555;
  }
`
export const StyledResults = styled.div`
  background: #fff;
  padding: 10px 0;

  .search-results p {
    text-align: center;
    padding: 10px 0;
    color: #999;
    font-weight: bold;
  }
`
