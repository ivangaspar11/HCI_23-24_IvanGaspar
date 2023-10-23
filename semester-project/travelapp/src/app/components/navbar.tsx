import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">Home
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/pages/adventure-travel" className="text-white hover:text-blue-200">Adventure Travel
            </Link>
          </li>
          <li>
            <Link href="/pages/family-travel" className="text-white hover:text-blue-200">Family Travel
            </Link>
          </li>
          <li>
            <Link href="/pages/practical-travel-information"className="text-white hover:text-blue-200">Practical Travel Information
            </Link>
          </li>
          <li>
            <Link href="/pages/solo-traveler-corner"className="text-white hover:text-blue-200">Solo Traveler Corner
            </Link>
          </li>
          <li>
            <Link href="/pages/cultural-exploration"className="text-white hover:text-blue-200">Cultural Exploration
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

  