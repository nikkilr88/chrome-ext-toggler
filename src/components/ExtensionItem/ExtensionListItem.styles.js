import styled from 'styled-components'

export const StyledExtensionListItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: #333;
  padding: 3px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  border-left: 3px solid transparent;
  font-size: 1.25em;

  &:hover {
    background: #dfdfdf;
    border-left: 3px solid #c1c1c1;

    .cog {
      visibility: visible;
    }
  }

  .selected {
    background: #dfdfdf;
    border-left: 3px solid #c1c1c1;
  }

  .icon {
    height: 16px;
    width: 16px;
    margin-right: 5px;
    opacity: ${({ enabled }) => (enabled ? '1' : '0.5')};
  }

  .name {
    margin-right: auto;
    opacity: ${({ enabled }) => (enabled ? '1' : '0.5')};
  }

  .cog-wrapper {
    height: 16px;
  }

  .cog {
    visibility: hidden;
    height: 16px;
    min-width: 16px;
    padding-left: 5px;
  }
`
