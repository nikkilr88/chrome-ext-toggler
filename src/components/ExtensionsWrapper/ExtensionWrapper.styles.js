import styled from 'styled-components'

export const StyledTitle = styled.div`
  color: #fff;
  background: #3498db;
  border-radius: 3px;
  margin: 0 5px;
  padding: 3px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  h3 {
    font-size: 1.3em;
    font-weight: normal;
  }

  .turn-off {
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`

export const StyledExtensionListWrapper = styled.ul`
  ${({ showSearch }) =>
    showSearch && {
      filter: 'blur(2px)',
      pointerEvents: 'none'
    }}
`
