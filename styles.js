
import Color from 'color'
import 'nprogress/nprogress.css'
import { createGlobalStyle } from 'styled-components'
import { CONFIG } from '~/config'
import { BLACK, GRAY3 } from '~/constants/colors'
import { WHITE } from '~/constants/colors'

export default createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {

    /* fonts */
    --sans-serif: 'Roboto', sans-serif;
    --sans-serif-condensed: 'Roboto Condensed', var(--sans-serif);
    --bebas: 'Bebas Neue', var(--sans-serif-condensed);
    --bebas-book: 'Bebas Neue Book', var(--sans-serif-condensed);

    /* colors */
    --white:         ${WHITE};
    --light-gray:    #c4c4c4;
    --gray:          #b2b2b2;
    --gray2:         #808080;
    --gray2-rgb:     128, 128, 128;
    --gray3:         ${GRAY3};
    --gray3-rgb:     51, 51, 51;
    --gray3-darken:  #282828;
    --mid-gray:      #4d4d4d;
    --dark-gray3:    ${Color(GRAY3).darken(.5)};
    --black:         #000;
    --black-rgb:     0, 0, 0;
    --primary:       ${CONFIG.color};
    --primary-hover: ${Color(CONFIG.color).darken(.2)};
    --gray4:         #666; /* 656565 */

    /* colors by job */
    --descriptions-color: var(--gray);

    /* font-sizes */
    --font-size: 20px;

    /* others */
    --padding-top: 75px;

  }
  @media (min-width: 768px) {
    :root {
      --padding-top: 80px;
    }
  }
  @media (min-width: 992px) {
    :root {
      --font-size: 20px;
    }
  }

  html {
    height: 100%;
  }

  body {
    background-color: var(--background);
    color: var(--color);
    /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */
    font-family: var(--sans-serif);
    font-size: var(--font-size);
    height: 100%;
    margin: 0;
  }

  /* next container */
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* nprogress */
  #nprogress {
    .bar {
      background: var(--primary);
    }
    .peg {
      box-shadow: 0 0 10px var(--primary), 0 0 5px var(--primary);
    }
    .spinner-icon {
      border-top-color: var(--primary);
      border-left-color: var(--primary);
    }
  }

  /* headings */
  h1, .h1 {
    font-family: var(--bebas-book);
    font-size: 48px;
    font-weight: normal;
    line-height: 1;
    margin-bottom: 5px;
    @media (min-width: 768px) {
      font-size: 68px;
    }
  }
  h2, .h2 {
    font-family: var(--sans-serif);
    font-size: 31px;
    font-weight: bold;
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0;
  }

  /* block elements */
  p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  /* inline elements */
  a {
    color: inherit;
    transition: .2s ease;
    :focus,
    :hover {
      color: var(--primary);
    }
  }
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  strong {
    font-weight: bold;
  }

  /* toasts */
  .Toastify__toast {
    border-radius: 5px;
    background-color: ${Color(WHITE).fade(.1)};
    color: ${BLACK};
    min-height: 50px;
    padding: 15px;
  }
  .Toastify__toast--info {
    border-right: 4px solid rgb(220, 159, 27);
    border-left: 4px solid rgb(220, 159, 27);
  }
  .Toastify__toast--success {
    border-right: 4px solid rgb(26, 115, 26);
    border-left: 4px solid rgb(26, 115, 26);
  }
  .Toastify__toast--error {
    border-right: 4px solid rgb(190, 0, 0);
    border-left: 4px solid rgb(190, 0, 0);;
  }
  .Toastify__toast-container {
    font-size: 14px;
  }
  .Toastify__toast-container--top-right {
    top: 5rem;
  }
  .Toastify__progress-bar {
    background-color: var(--primary);
    height: 100%;
    width: 100%;
  }
  .Toastify__progress-bar--info {
    background-color: rgba(220, 159, 27, 0.2);
  }
  .Toastify__progress-bar--error {
    background-color: rgba(190, 0, 0, 0.2);
  }
  .Toastify__progress-bar--success {
    background-color: rgba(26, 115, 26, 0.2)
  }
  .Toastify__close-button {
    color: ${BLACK};
  }

  /* gutters */
  .no-gutters {
    margin-right: 0;
    margin-left: 0;
    > .col,
    > [class*="col-"] {
      padding-right: 0;
      padding-left: 0;
    }
  }
  .gutter-10 {
    margin-right: -5px;
    margin-left: -5px;
    > .col,
    > [class*="col-"] {
      padding-right: 5px;
      padding-left: 5px;
    }
  }
  .gutter-15 {
    margin-right: -7.5px;
    margin-left: -7.5px;
    > .col,
    > [class*="col-"] {
      padding-right: 7.5px;
      padding-left: 7.5px;
    }
  }

  /* helpers */
  .img-fluid {
    display: block;
    height: auto;
    max-width: 100%;
    width: 100%;
  }
  .w-100 {
    width: 100%;
  }
  .text-uppercase {
    text-transform: uppercase;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  @media (min-width: 768px) {
    .text-md-left {
      text-align: left;
    }
    .text-md-right {
      text-align: right;
    }
  }
  .text-decoration-none {
    text-decoration: none;
  }
  .bold {
    font-weight: bold;
  }
  .invalid-feedback,
  .valid-feedback {
    display: block;
    font-size: 14px;
  }
`
