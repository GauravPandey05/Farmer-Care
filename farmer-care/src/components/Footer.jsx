function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: support@farmercare.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Farming Street, Agricultural District</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-green-300">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-green-300">Services</a></li>
              <li className="mb-2"><a href="#" className="hover:text-green-300">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-300">Facebook</a>
              <a href="#" className="hover:text-green-300">Twitter</a>
              <a href="#" className="hover:text-green-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-4 border-t border-green-700">
          <p>&copy; 2024 FarmerCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;