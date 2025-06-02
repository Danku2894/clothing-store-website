import { Link } from 'react-router-dom'

const collections = [
  {
    name: 'NON STANDARD',
    description: 'Express yourself with NON-STANDARD',
    imageSrc: '/images/collections/non-standard-hero.jpg',
    imageAlt: 'NON STANDARD Collection',
    href: '/collections/non-standard',
  },
  {
    name: 'SUPERTRAMP',
    description: 'With our SUPERTRAMP 2024, we aim to inspire creativity',
    imageSrc: '/images/collections/supertramp-hero.jpg',
    imageAlt: 'SUPERTRAMP Collection',
    href: '/collections/supertramp',
  },
]

const featuredProducts = [
  {
    id: 1,
    name: 'KANKO CAP',
    price: '250,000₫',
    imageSrc: '/images/products/kanko-cap.jpg',
    imageAlt: 'KANKO CAP',
    href: '/product/kanko-cap',
  },
  {
    id: 2,
    name: 'BRICK LONG SLEEVE TEE',
    price: '450,000₫',
    imageSrc: '/images/products/brick-long-sleeve.jpg',
    imageAlt: 'BRICK LONG SLEEVE TEE',
    href: '/product/brick-long-sleeve',
  },
  {
    id: 3,
    name: 'TU DO TEE',
    price: '400,000₫',
    imageSrc: '/images/products/tu-do-tee.jpg',
    imageAlt: 'TU DO TEE',
    href: '/product/tu-do-tee',
  },
  {
    id: 4,
    name: 'INFO TEE',
    price: '400,000₫',
    imageSrc: '/images/products/info-tee.jpg',
    imageAlt: 'INFO TEE',
    href: '/product/info-tee',
  },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Are you ready to DARE TO BE OUT with Abysswear?
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Discover our latest collections and express your unique style.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/categories/all"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Shop Now
                  </Link>
                  <Link to="/collections/non-standard" className="text-sm font-semibold leading-6 text-gray-900">
                    View Collections <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src="/images/hero.jpg"
            alt="Abysswear hero"
          />
        </div>
      </div>

      {/* Collections section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
            {collections.map((collection) => (
              <div key={collection.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={collection.imageSrc}
                    alt={collection.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link to={collection.href}>
                    <span className="absolute inset-0" />
                    {collection.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">{collection.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured products section */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 