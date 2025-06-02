import { useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { RadioGroup, Dialog, Transition } from '@headlessui/react'
import { StarIcon, HeartIcon, ShareIcon, PlusIcon, MinusIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Types
interface Product {
  id: string
  name: string
  price: string
  rating: number
  reviewCount: number
  images: {
    id: number
    src: string
    alt: string
  }[]
  colors: {
    name: string
    bgColor: string
    selectedColor: string
  }[]
  sizes: {
    name: string
    inStock: boolean
  }[]
  description: string
  details: string[]
}

const product: Product = {
  id: '1',
  name: 'NON STANDARD LAYER ZIP HOODIE',
  price: '990,000₫',
  rating: 4.5,
  reviewCount: 117,
  images: [
    {
      id: 1,
      src: '/images/products/non-standard-layer-zip-hoodie.jpg',
      alt: 'NON STANDARD LAYER ZIP HOODIE front view.',
    },
    {
      id: 2,
      src: '/images/products/non-standard-layer-zip-hoodie-back.jpg',
      alt: 'NON STANDARD LAYER ZIP HOODIE back view.',
    },
    {
      id: 3,
      src: '/images/products/non-standard-layer-zip-hoodie-detail.jpg',
      alt: 'NON STANDARD LAYER ZIP HOODIE detail view.',
    },
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
  ],
  description: `
    <p>The NON STANDARD LAYER ZIP HOODIE is a premium quality hoodie featuring a unique layered design with multiple zip details. Made from high-quality cotton blend fabric, this hoodie offers both style and comfort.</p>
    <p>Features:</p>
    <ul>
      <li>Premium cotton blend fabric</li>
      <li>Multiple zip details</li>
      <li>Layered design</li>
      <li>Ribbed cuffs and hem</li>
      <li>Kangaroo pocket</li>
      <li>Drawstring hood</li>
    </ul>
  `,
  details: [
    'Made from 80% cotton, 20% polyester',
    'Machine wash cold',
    'Made in Vietnam',
  ],
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const { id } = useParams<{ id: string }>()

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', {
      productId: id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: 'Check out this awesome product!',
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                {product.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={classNames(
                      'relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4',
                      selectedImage.id === image.id ? 'ring-2 ring-primary-500' : ''
                    )}
                    role="tab"
                    aria-selected={selectedImage.id === image.id}
                    aria-label={`View ${image.alt}`}
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div 
              className="aspect-h-1 aspect-w-1 w-full cursor-zoom-in"
              onClick={() => setIsImageModalOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Zoom image"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg relative group">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 transition-opacity">
                  <MagnifyingGlassIcon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className="rounded-full p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Share product"
                >
                  <ShareIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="rounded-full p-2 text-gray-400 hover:text-gray-500"
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isWishlisted ? (
                    <HeartIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartOutlineIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a href="#reviews" className="ml-3 text-sm font-medium text-primary-600 hover:text-primary-500">
                  {product.reviewCount} reviews
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6" onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }}>
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Size guide
                  </button>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active, checked }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-primary-500' : '',
                            checked ? 'border-transparent' : 'border-gray-300',
                            'relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-primary-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <ul className="mt-4 space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="text-sm text-gray-600">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Transition show={isImageModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsImageModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all max-w-5xl w-full">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => setIsImageModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {selectedImage.alt}
                      </Dialog.Title>
                      <div className="mt-2">
                        <img
                          src={selectedImage.src}
                          alt={selectedImage.alt}
                          className="w-full max-h-[80vh] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Size Guide Modal */}
      <Transition show={isSizeGuideOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsSizeGuideOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div>
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                        onClick={() => setIsSizeGuideOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Size Guide
                      </Dialog.Title>
                      <div className="mt-4">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chest (cm)
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Length (cm)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">96-100</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">68-70</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">M</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100-104</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">70-72</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">L</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">104-108</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72-74</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XL</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">108-112</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">74-76</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
} 