const listItem = ({ countries, getWeather }) => (
  <div
    className="pl-2 pt-2 pb-2 bg-gray-900 bg-opacity-70 flex flex-col z-30 absolute w-full text-2xl backdrop-filter backdrop-blur-md rounded-md
text-white">
    {countries.map((country) => (
      <p key={country.name} className="cursor-pointer" onClick={() => getWeather(country.latlng)}>
        {country.name}, {country.capital}
      </p>
    ))}
  </div>
)

export default listItem
