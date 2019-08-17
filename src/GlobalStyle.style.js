import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }   

    ul {
        padding: 0 5px;
    }

    ::-webkit-scrollbar {
        width: 7px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #d1d1d1;
    }
`
