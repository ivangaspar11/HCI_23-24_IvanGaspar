

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto my-4 px-5 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Company Information */}
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-bold mb-2">ITA</h3>
          <p>Splits street ,Split</p>
          <p>Phone: (385) 91-7890</p>
          <p>Email: info@example.com</p>
        </div>

        {/* Help Links */}
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-bold mb-2">Helpful Links</h3>
          <ul>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
