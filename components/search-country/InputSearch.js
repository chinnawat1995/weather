import ListItem from '@/components/search-country/ListItem'

const inputSearch = (props) => {
  return (
    <div className="w-11/12 sm:w-3/4 m-auto pt-5 text-md sm:text-5xl flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 sm:h-10 sm:w-10 text-gray-600 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      <div className="relative">
        <input
          placeholder="Thailand"
          type="text"
          onInput={(event) => props.handleInputSearch(event.target.value)}
          className="bg-transparent underline-red focus:outline-none placeholder-gray-600 placeholder-opacity-50 text-gray-900 border-b-2 border-transparent focus:border-gray-300"
        />
        {props.countries.length > 0 && (
          <ListItem countries={props.countries} getWeather={props.getWeather} />
        )}
      </div>
    </div>
  )
}

export default inputSearch
