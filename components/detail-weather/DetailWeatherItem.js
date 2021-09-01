const DetailWeatherItem = ({ image, title, detail }) => (
  <div className="detail-weather-today-list">
    <img alt="temperature hot" className="w-4 sm:w-7" src={`/images/${image}`} />
    <div className="ml-2">
      <p className="text-xs md:text-sm text-gray-100">{title}</p>
      <p className="text-sm md:text-lg">{detail}</p>
    </div>
  </div>
)

export default DetailWeatherItem
