import dayjs from 'dayjs'

const weatherDailyItem = ({ item, index }) => (
  <div className="daily-list">
    <h2 className="text-md">{index === 0 ? 'Today' : dayjs(item.dt * 1000).format('ddd DD')}</h2>
    <img alt="icon-01d" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
    <h2 className="text-md sm:text-lg truncate">{item.weather[0].description}</h2>
    <h2 className="text-md sm:text-xl">{`${Math.floor(item.temp.day)} C°`}</h2>
  </div>
)

export default weatherDailyItem
