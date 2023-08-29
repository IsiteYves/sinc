import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { useLoadScript } from '@react-google-maps/api'
import { Field } from 'formik'
import { Input } from '@components/ui/input'
import { ChangeEvent } from 'react'
import { FC } from 'react'

interface Props {
  setFieldValue: any
}

const libraries: any = ['places']

const LocationAutoCompleteInput: FC<Props> = ({ setFieldValue }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAuFOBkKPE7yVSkPzBUGoMX5M4KfyAR90Y',
    libraries,
  })

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data, loading },
    clearSuggestions,
  } = usePlacesAutoComplete()

  const handleChooseLocation = async (address: string) => {
    setValue(address)
    const result = await getGeocode({ address })
    const { lat, lng } = await getLatLng(result[0])
    setFieldValue('latitude', lat)
    setFieldValue('longitude', lng)
    setFieldValue('location', address)
    clearSuggestions()
  }

  if (!isLoaded) return <span>Loading...</span>
  return (
    <div className="relative">
      {status === 'OK' && value !== data[0].description && (
        <div className="absolute bottom-12 inset-x-0 h-40 overflow-auto shadow-sm z-20 bg-[#121212]">
          {loading ? (
            <span>Loading...</span>
          ) : (
            data.map(({ description, place_id }) => {
              return (
                <button
                  type="button"
                  key={place_id}
                  className="text-sm p-1.5 hover:bg-secondary block w-full"
                  onClick={() => {
                    handleChooseLocation(description)
                  }}>
                  {description}
                </button>
              )
            })
          )}
        </div>
      )}

      <Field
        name="location"
        id="location"
        label="Event location"
        placeholder="Search for location.."
        component={Input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}

export default LocationAutoCompleteInput
