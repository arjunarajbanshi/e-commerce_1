import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6 md:px-12 mt-auto">
            {/* Top Grid Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-800">
                {/* Contact Us */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold text-lg tracking-wide">
                        Contact Us
                    </h3>
                    <p className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                        <FaPhone className="text-blue-500" />
                        <span>Phone: +9800000000</span>
                    </p>
                    <p className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                        <MdEmail className="text-blue-500" />
                        <span>Email: admin@outlook.com</span>
                    </p>
                </div>

                {/* Follow Me */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold text-lg tracking-wide">
                        Follow Me
                    </h3>
                    <div className="flex items-center gap-4 text-xl">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                            aria-label="YouTube"
                        >
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* About Section */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold text-lg tracking-wide">
                        About
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Repellendus, soluta!
                    </p>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-gray-500">
                <p>&copy; {year} All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
