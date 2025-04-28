import Navbar from "../components/Navbar";
import "../styles/globals.css";

/**
 * Main application component 
 * 
 * @param {Object} props - The component props 
 * @returns 
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
