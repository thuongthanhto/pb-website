import { IconButton } from '@material-tailwind/react';
import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer flex flex-col items-center border-t-2 pt-4">
      <div className="flex my-3">
        <IconButton
          variant="outlined"
          className="mx-2"
          onClick={() =>
            window.open('https://www.facebook.com/PhatBo0905', '_blank')
          }
        >
          <FaFacebook className="text-[18px]" />
        </IconButton>

        <IconButton variant="outlined" className="mx-2">
          <a href="tel:+84909383332">
            <FaPhone className="text-[18px]" />
          </a>
        </IconButton>

        <IconButton variant="outlined" className="mx-2">
          <a href="mailto:phatchay95@gmail.com">
            <FaEnvelope className="text-[18px]" />
          </a>
        </IconButton>
      </div>
      <p className="text-[#222222] mb-[20px]">
        COPYRIGHT 2022 - PBIMAGES. ALL RIGHTS RESERVED
      </p>
    </footer>
  );
};

export default Footer;
