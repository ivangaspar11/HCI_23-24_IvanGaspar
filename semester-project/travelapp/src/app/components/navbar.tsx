import Link from 'next/link';
import { FaHome } from 'react-icons/fa'

const pages = {
  home: "/",
  adventureTravel: "pages/adventure-travel",
  culturalExploration: "pages/cultural-exploration",
  familyTravel: "pages/family-travel",
  support: "pages/support",
  soloTravelerCorner: "pages/solo-traveler-corner"
};




const Navbar = () => {
  return (
    <nav className="flex items-center justify-center p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-8">
          {Object.entries(pages).map(([name, path]) => (
            <li key={name}>
              {name === 'home' ? (
                <Link href={path}>
                  <a>
                    <FaHome /> 
                  </a>
                </Link>
              ) : (
                <Link href={path}>{name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

