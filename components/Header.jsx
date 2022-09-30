import React, { useContext } from 'react';

import Link from 'next/link';

const categories = [
  { name: 'React', slug: 'react' },
  { name: 'WebDev', slug: 'webdev' },
];

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-bluish py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-bluish">
              Blog{' '}
              <span className="text-black">
                - Jean Desauw
              </span>
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
            >
              <span className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer uppercase hover:text-bluish hover:drop-shadow-sm">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
