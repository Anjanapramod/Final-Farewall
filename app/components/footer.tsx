import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 ">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Final Farewell</h3>
            <p className="text-gray-600">
              Connecting compassionate care with those in need.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800">
                  For Funeral Homes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800">
                  For Families
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-800">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-800">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-800">
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Final Farewell. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
