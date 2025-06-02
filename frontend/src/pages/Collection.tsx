import { useParams } from 'react-router-dom'
import ProductList from '../components/product/ProductList'

const collectionProducts = {
  'non-standard': {
    title: 'NON STANDARD',
    description: 'Express yourself with NON-STANDARD',
    products: [
      {
        id: 1,
        name: 'NON STANDARD LAYER ZIP HOODIE',
        price: '990,000₫',
        imageSrc: '/images/products/non-standard-layer-zip-hoodie.jpg',
        imageAlt: 'NON STANDARD LAYER ZIP HOODIE',
        href: '/product/non-standard-layer-zip-hoodie',
      },
      {
        id: 2,
        name: 'NON STANDARD ZIP HOODIE',
        price: '900,000₫',
        imageSrc: '/images/products/non-standard-zip-hoodie.jpg',
        imageAlt: 'NON STANDARD ZIP HOODIE',
        href: '/product/non-standard-zip-hoodie',
      },
      {
        id: 3,
        name: 'NON STANDARD REGULAR HOODIE',
        price: '680,000₫',
        imageSrc: '/images/products/non-standard-regular-hoodie.jpg',
        imageAlt: 'NON STANDARD REGULAR HOODIE',
        href: '/product/non-standard-regular-hoodie',
      },
      {
        id: 4,
        name: 'NON STANDARD ZIP TRACK SHORTS',
        price: '550,000₫',
        imageSrc: '/images/products/non-standard-zip-track-shorts.jpg',
        imageAlt: 'NON STANDARD ZIP TRACK SHORTS',
        href: '/product/non-standard-zip-track-shorts',
      },
    ],
  },
  'supertramp': {
    title: 'SUPERTRAMP',
    description: 'With our SUPERTRAMP 2024, we aim to inspire creativity',
    products: [
      {
        id: 1,
        name: 'SUPERTRAMP WINDBREAKER',
        price: '950,000₫',
        imageSrc: '/images/products/supertramp-windbreaker.jpg',
        imageAlt: 'SUPERTRAMP WINDBREAKER',
        href: '/product/supertramp-windbreaker',
      },
      {
        id: 2,
        name: 'SUPERTRAMP HALF-ZIP',
        price: '950,000₫',
        imageSrc: '/images/products/supertramp-half-zip.jpg',
        imageAlt: 'SUPERTRAMP HALF-ZIP',
        href: '/product/supertramp-half-zip',
      },
      {
        id: 3,
        name: 'SUPERTRAMP MULTI-POCKET PANTS',
        price: '600,000₫',
        imageSrc: '/images/products/supertramp-multi-pocket-pants.jpg',
        imageAlt: 'SUPERTRAMP MULTI-POCKET PANTS',
        href: '/product/supertramp-multi-pocket-pants',
      },
      {
        id: 4,
        name: 'SUPERTRAMP ALL-IN-ONE BACKPACK',
        price: '1,600,000₫',
        imageSrc: '/images/products/supertramp-all-in-one-backpack.jpg',
        imageAlt: 'SUPERTRAMP ALL-IN-ONE BACKPACK',
        href: '/product/supertramp-all-in-one-backpack',
      },
    ],
  },
}

export default function Collection() {
  const { collection } = useParams<{ collection: keyof typeof collectionProducts }>()
  const collectionData = collection ? collectionProducts[collection] : null

  if (!collectionData) {
    return <div className="text-center py-12">Collection not found</div>
  }

  return (
    <ProductList
      title={collectionData.title}
      description={collectionData.description}
      products={collectionData.products}
    />
  )
} 