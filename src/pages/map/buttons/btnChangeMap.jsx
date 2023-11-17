export default function btnChangeMap({mapLayer, setMapLayer}) {
    return (
      <button className='button_change_map' onClick={() => setMapLayer(mapLayer === 'osm' ? 'google' : 'osm')}>
          {mapLayer === 'osm' ? 'Satellite Maps' : 'Google Maps'}
        </button>
    )
  }
  