import { ReactNode } from 'react';

interface FooterProps {
  className?: string;
  logo?: ReactNode;
  links?: {
    title: string;
    href: string;
  }[];
  socialLinks?: {
    icon: ReactNode;
    href: string;
  }[];
  bottomText?: string;
}

export default function Footer({
  className = "",
  logo,
  links = [],
  socialLinks = [],
  bottomText = "© 2024 Vault. All rights reserved."
}: FooterProps) {
  return (
    <footer className={`bg-gray-900 border-t border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and Social Links */}
          <div className="flex flex-col items-center space-y-6">
            {logo && <div>{logo}</div>}
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links in a line with dots */}
          <nav>
            <ul className="flex flex-wrap justify-center items-center">
              {links.map((link, index) => (
                <li key={index} className="flex items-center">
                  <a
                    href={link.href}
                    className="text-base text-gray-400 hover:text-gray-200 transition-colors px-3"
                  >
                    {link.title}
                  </a>
                  {index < links.length - 1 && (
                    <span className="text-gray-700">•</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Text */}
          <div className="pt-8 border-t border-gray-800 w-full">
            <p className="text-base text-gray-500 text-center">
              {bottomText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
