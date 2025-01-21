const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} University of Peradeniya. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#privacy" className="hover:text-blue-500">
                        Privacy Policy
                    </a>
                    <a href="#terms" className="hover:text-blue-500">
                        Terms of Service
                    </a>
                    <a href="#contact" className="hover:text-blue-500">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
