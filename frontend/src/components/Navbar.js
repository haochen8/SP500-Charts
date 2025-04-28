import Link from "next/link";

/**
 * Navbar component
 * 
 * @returns {JSX.Element} - The Navbar component.
 */
export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-center gap-4"
    >
      <Link href="/" className="hover:underline">
        Stock Charts
      </Link>
      <Link href="/index-chart" className="hover:underline" >
        S&P 500 Index
      </Link>
    </nav>
  );
}
