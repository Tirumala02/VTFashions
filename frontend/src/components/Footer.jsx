import React from 'react';
import ecomlogo from '../assets/ecomlogo.png'; // Import logo

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={ecomlogo} alt='Venkatesh Collections Logo' className="h-12 mb-3" /> {/* Added Logo */}
            <p className='w-full md:w-2/3 text-gray-600'>
                Elevate your style with our latest fashion trends. At Venkatesh Collections, we bring you the perfect blend of elegance, quality, and comfort. Discover a wide range of apparel curated just for you.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery Information</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>support@Venkateshcollections.com</li>
                <li>Shop No.4, Sharada Complex, Near J.J Hospital,</li>
                <li>Kalyan Nagar X Road, S.R Nagar,</li>
                <li>Hyderabad - 500038.</li>
            </ul>
        </div>

      </div>

      <div>
          <hr />
          <p className='py-5 text-sm text-center'>© 2024 Venkatesh Collections - All Rights Reserved.</p>
      </div>

    </div>
  );
}

export default Footer;
