
import styled from "styled-components"

export const StylePayment = styled.div`

    color: var(--black);
   .payments - wrapper.bg - dark {
  /* It's appearing a compiler error here on dev at Windows,
  but apparently it has already been resolved in newer versions of next and styled-jsx:
  https://github.com/zeit/next.js/issues/9065 */
}

    th {
    font-weight: 100;
    font-size:14px
    }

    p {
    font-size: 14px;
    }
    // font-weight: 100;

    .painel {
    display: flex;
    justify-content: space-between;
    }

    h1 {
    display: flex;
    justify-content: center;
    color: black;
    padding:20px;
    }

    td > a  {
    color: var(--black);
    line - height: 1.5;
    text - decoration: underline;
    }

    label {
    display: inline - block;
    margin - bottom: .5rem;
    text - align: center;

    }

    dd > a {
    color: var(--primary);
    }

    td > a: hover {
    color: var(--primary - hover);
    }

    dd > a: hover {
    text - decoration: underline;
    color: var(--primary - hover);
    }

    h3 {
      margin - bottom: 25px;
    }

    .table {
       margin - top: 15px;
    }

     .table-dark {
         background: transparent;
    }

    .table-sm {
      font-size: 9px;
      color: var(--black);
    }

    }

    .card-text {
      font - size: 14px;
     }

    .table - dark.table - hover tbody tr: hover {
       background - color: var(--black);
    }



    th {
    border-color: transparent!important;
    background: #cfcfcf;
    border: none;


      }
    }


    @media(max-width:765px) {

   h1 {
    padding: 34px;
    text-align: center;
   }


    th {
    font-weight: 100;
    font-size: 9px;
    }

}

`

