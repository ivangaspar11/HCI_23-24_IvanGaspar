import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <FaFacebook size={28} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <FaTwitter size={28} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <FaInstagram size={28} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <FaLinkedin size={28} />
          </a>
        </div>

        {/* Company Information */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">ITA</h3>
          <p>Splits street, Split</p>
          <p>Phone: (385) 91-7890</p>
          <p>Email: info@example.com</p>
        </div>

        {/* Help Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Helpful Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">FAQs</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
