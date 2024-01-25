export function InputSearch({ search, onChangeSearch, placeholder }) {
  return (
    <div className="m-4">
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        type="text"
        name="search"
        value={search}
        placeholder={placeholder}
        onChange={(event) => onChangeSearch(event.target.value)}
      />
    </div>
  )
}