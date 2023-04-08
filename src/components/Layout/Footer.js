import { IconButton } from '@material-tailwind/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer flex flex-col items-center border-t-2 pt-4">
      <div className="flex my-3">
        <IconButton variant="outlined" className="mx-2">
          <FaFacebook className="text-[18px]" />
        </IconButton>

        <IconButton variant="outlined" className="mx-2">
          <FaInstagram className="text-[18px]" />
        </IconButton>
      </div>
      <p className="text-[#222222] mb-[20px]">
        COPYRIGHT 2022 - PBIMAGES. ALL RIGHTS RESERVED
      </p>
    </footer>
  );
};

export default Footer;
