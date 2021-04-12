
import { useContext } from 'react'
import Color from 'color'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import { STATIC_PATH, TENANT } from '~/constants/constants'

 export  const StyledHeader = styled.div.attrs((props)=>{
    const theme = useContext(ThemeContext)
    props.whiteColor = theme.colors.white
    props.lightColor = theme.colors.texts
    props.background = Color(props.theme.colors.background).fade(.1).string()

  })
  `
  background-color: ${ props => props.closed ? 'var(--background)' :
    props.scrolled ? props =>props.background :
    props.layoutColor === 'white' ? props.background : 'transparent'};
   box-shadow: 0 0 5px rgba(var(--black-rgb), ${props => props.layoutColor !== 'white' && props.scrolled ? '.9' : '0'});
  color: ${props => props.theme.colors.texts};
  font-family: var(--sans-serif);
  font-size: 16px;
  font-weight: bold;
  min-width: 100%;
  padding: 10px;
  position: ${props => props.closed ? 'static' : 'fixed'};
  transition: ${props => props.closed ? 'background-color .3s, box-shadow .3s' :
    'background-color .6s, box-shadow .6s'};
  width: 90%;
  z-index: 10;
  @media (min-width: 768px) {
    padding: 10px 30px;
  }
   .nav {
          display: flex;
          align-items: center;
          justify-content: ${props=> props.closed ? 'center' : 'space-between'};
        }
        .form-control {
          background-color: transparent;
          border: 0;
          display: inline-block;
          color: ${props=>props.whiteColor};
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          outline: 0;
          padding: 0;
          transition: ease .6s;
          vertical-align: middle;
          width: 0;
        }
        .form-control:focus {
          box-shadow: 0 0 0 .1rem var(--primary);
          margin-right: 10px;
          padding: 0 10px;
          width: 15vw;
        }
        .form-control::placeholder {
          color: ${props=>props.lightColor};
        }
        .search-form {
          margin-left: auto;
        }
        .search-btn {
          background-color: transparent;
          border: 0;
          color: #FFF;
          cursor: pointer;
          margin-right: 10px;
          outline: 0;
          padding: 5px;
          vertical-align: middle;
        }
        .search-btn :global(svg) {
          transition: color .2s;
        }
        .search-btn:focus,
        .search-btn:hover {
          color: var(--white);
        }
        .notifications-btn {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          outline: 0;
          margin-right: 10px;
          padding: 5px;
          vertical-align: middle;
        }

        .menu-sub {
          display:flex;
        }
        .menu-sub-text{
            margin-top:14px;
        }
         @media (max-width:376px){
           .menu-sub-text{
             display:none;
           }
         }


  `;
