import { useParams } from 'react-router-dom'
import ProductList from '../components/product/ProductList'

const categoryProducts = {
  'bestseller': {
    title: 'Bestseller',
    description: 'Our most popular products',
    products: [
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
    ],
  },
  't-shirts': {
    title: 'T-Shirts',
    description: 'Express your style with our unique t-shirts',
    products: [
      {
        id: 1,
        name: 'CLASSIC REGULAR TEE',
        price: '330,000₫',
        imageSrc: '/images/products/classic-regular-tee.jpg',
        imageAlt: 'CLASSIC REGULAR TEE',
        href: '/product/classic-regular-tee',
      },
      {
        id: 2,
        name: 'CLASSIC BOXY TEE',
        price: '340,000₫',
        imageSrc: '/images/products/classic-boxy-tee.jpg',
        imageAlt: 'CLASSIC BOXY TEE',
        href: '/product/classic-boxy-tee',
      },
      {
        id: 3,
        name: 'NON STANDARD LOGO TEE',
        price: '450,000₫',
        imageSrc: '/images/products/non-standard-logo-tee.jpg',
        imageAlt: 'NON STANDARD LOGO TEE',
        href: '/product/non-standard-logo-tee',
      },
      {
        id: 4,
        name: 'SUPERTRAMP ZERO JERSEY',
        price: '580,000₫',
        imageSrc: '/images/products/supertramp-zero-jersey.jpg',
        imageAlt: 'SUPERTRAMP ZERO JERSEY',
        href: '/product/supertramp-zero-jersey',
      },
    ],
  },
  'jackets': {
    title: 'Jackets',
    description: 'Stay warm and stylish with our jackets',
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
        name: 'NON STANDARD LAYER ZIP HOODIE',
        price: '990,000₫',
        imageSrc: '/images/products/non-standard-layer-zip-hoodie.jpg',
        imageAlt: 'NON STANDARD LAYER ZIP HOODIE',
        href: '/product/non-standard-layer-zip-hoodie',
      },
      {
        id: 3,
        name: 'NON STANDARD ZIP HOODIE',
        price: '900,000₫',
        imageSrc: '/images/products/non-standard-zip-hoodie.jpg',
        imageAlt: 'NON STANDARD ZIP HOODIE',
        href: '/product/non-standard-zip-hoodie',
      },
      {
        id: 4,
        name: 'SUPERTRAMP HALF-ZIP',
        price: '950,000₫',
        imageSrc: '/images/products/supertramp-half-zip.jpg',
        imageAlt: 'SUPERTRAMP HALF-ZIP',
        href: '/product/supertramp-half-zip',
      },
    ],
  },
}

export default function Category() {
  const { category } = useParams<{ category: keyof typeof categoryProducts }>()
  const categoryData = category ? categoryProducts[category] : null

  if (!categoryData) {
    return <div className="text-center py-12">Category not found</div>
  }

  return (
    <ProductList
      title={categoryData.title}
      description={categoryData.description}
      products={categoryData.products}
    />
  )
} 