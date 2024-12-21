export default function Pagination({
  betsPerPage,
  totalBets,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBets / betsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="flex items-center justify-between border-t border-gray-600 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1"></div>
      <div className="hidden md:-mt-px md:flex ">
        {pageNumbers.map((number) => (
          <li key={number} className="hidden md:-mt-px md:flex">
            <a
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? "inline-flex items-center border-t-2 border-gray-200 px-4 pt-4 text-sm font-medium text-cyan-500"
                  : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer"
              }
            >
              {number}
            </a>
          </li>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end"></div>
    </nav>
  );
}
