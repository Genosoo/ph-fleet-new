import styled from 'styled-components';
import Breadcrumbs from './breadcrumbs/BreadCrumbs';
import BtnMenu from './buttons/btnMenu';
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { baseUrl } from '../../api/api_urls';

const StyledAvatar = styled(Avatar)`
  font-family: "Manrope", "sans-serif" !important;
`;

export default function Navbar() {
  const { accountData } = useContext(DataContext);

  return (
    <div className="navbar_container">
      <Breadcrumbs />
      <div className='navbar_menu_wrapper'>
        <StyledAvatar
          alt={accountData?.username || null}
          src={`${baseUrl}${accountData?.personal_details?.image}`}
        />
        <BtnMenu />
      </div>
    </div>
  );
}
