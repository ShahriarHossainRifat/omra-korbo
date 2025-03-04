// Common components
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} Omra Korbo. All rights reserved.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-center text-sm text-gray-500">
            Contact us: info@omrakorbo.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
