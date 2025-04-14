import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-green-200">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-green-200">
              <li>Email: support@farmercare.com</li>
              <li>Phone: +91 7489923678</li>
              <li>Address: Dwarka Mor</li>
              <li>New Delhi</li>
              <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-4 text-green-200">
              Stay connected with us on social media for the latest updates and farming tips.
            </p>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>&copy; 2024 FarmerCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
