import useShopping from '@/hooks/useShopping'

import { Card } from '@/components/Card'
import { ProductDetail } from '@/components/ProductDetail'
import { InputSearch } from '@/components/InputSearch'

export default function HomePage() {
  const { searchInput, setSearchInput, filterItems } = useShopping()


  const renderView = () => {
    if (filterItems?.length > 0) {
      return filterItems?.map(item => (
        <Card
          key={ item.id }
          item={ item }
        />
      ))
    } else {
      return <div className="grid-cols-12">No Results Found</div>
    }
  }

  return (
    <>
      <div className='flex justify-center items-center relative w-80 mb-4'>
        <h2 className='font-medium text-2xl dark:text-white'>Home - Exclusive products</h2>
      </div>
      <InputSearch
        search={ searchInput }
        onChangeSearch={ setSearchInput }
        placeholder='Search a product'
      />
      <section className='grid gap-9 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-auto max-w-screen-lg'>
        { renderView() }
      </section>
      <ProductDetail />
    </>
  )
}
