
import styled from "styled-components"

export const StylePayment = styled.div`

    color: var(--gray);
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
    color: var(--gray);
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
      font-size: 16px;
      color: var(--gray);
    }

    }

    .card-text {
      font - size: 14px;
     }

    .table - dark.table - hover tbody tr: hover {
      // background - color: var(--primary - alpha);
    }

    .mobile - table {
     font - size: 16px;
     margin - top: 40px;
     margin - bottom: 20px;
     display: none;
    }
    .mobile - row {
     border - top: 1px solid white;
    }
    dl: first - child {
      margin - top: 15px;
    }
    // dl {
    //   margin - bottom: 0.5rem;
    // }
    // dt, dd {
    //   font - weight: 300;
    //   display: inline;
    // }
    // dd {
    // float: right;
    // }

    th {
    border-color: transparent!important;
    background: #cfcfcf;
    border: none;


    }
    }


    @media(max-width:765px) {

    .mobile - table {
    display: inherit;
    }

    // .table {
    // display: none;
    // }

    th {
    font-weight: 100;
    font-size: 11px;
    }

}

`

