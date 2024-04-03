import { useFetchData } from "../../context/FetchData"

export default function Map() {
  const fetchedData = useFetchData();
  console.log('Test:', fetchedData.marineTrafficData)
  return (
    <div>Map</div>
  )
}
