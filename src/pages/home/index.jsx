import useShopping from '@/hooks/useShopping'

import { Card } from '@/components/Card'
import { ProductDetail } from '@/components/ProductDetail'
import { InputSearch } from '@/components/InputSearch'

function ProductSkeleton() {
  return (
    <div className="bg-white shadow-md w-56 h-60 rounded-lg dark:bg-violet-700 animate-pulse">
      <div className="w-full h-4/5 bg-gray-200 dark:bg-violet-600 rounded-t-lg" />
      <div className="flex justify-between px-2 mt-2">
        <div className="h-4 w-16 bg-gray-200 dark:bg-violet-600 rounded" />
        <div className="h-4 w-12 bg-gray-200 dark:bg-violet-600 rounded" />
      </div>
    </div>
  )
}

export default function HomePage() {
  const { searchInput, setSearchInput, filterItems, status } = useShopping()

  const isLoading = status === 'loading'
  const isError = status === 'error'

  return (
    <>
      <div className="flex justify-center items-center relative w-80 mb-4">
        <h2 className="font-medium text-2xl dark:text-white">
          Exclusive Products
        </h2>
      </div>
      <InputSearch
        search={searchInput}
        onChangeSearch={setSearchInput}
        placeholder="Search a product"
      />

      {isLoading && (
        <section className="grid gap-9 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-auto max-w-screen-lg">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </section>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-2 mt-10 dark:text-white">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="text-gray-500 dark:text-gray-400">Could not load products. Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && filterItems?.length > 0 && (
        <section className="grid gap-9 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-auto max-w-screen-lg">
          {filterItems.map((item) => <Card key={item.id} item={item} />)}
        </section>
      )}

      {!isLoading && !isError && filterItems?.length === 0 && (
        <div className="flex flex-col items-center gap-2 mt-10 dark:text-white">
          <h2 className="text-3xl font-semibold">No results found</h2>
          <p className="text-gray-500 dark:text-gray-400">Try a different search term or category.</p>
        </div>
      )}

      <ProductDetail />
    </>
  )
}
