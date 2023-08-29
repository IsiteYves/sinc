import { Input } from '@components/ui/input'
import {
  useUseUploadMultipleFilesUploadMutation,
  useUseDeleteUploadedFileMutation,
} from '@store/actions/file'
import { BLUR_HUSH } from '@utils/constants'
import useDisplayToast from '@utils/hooks/useToast'
import { ICreatEventFileSchema } from '@utils/types/event'
import { IFilePurposeEnums } from '@utils/types/file'
import { ITicketSchema } from '@utils/types/ticket'
import Image from 'next/image'
import { Trash, Upload } from 'phosphor-react'
import { ChangeEvent, Dispatch, FC, Fragment, SetStateAction } from 'react'
import ReactDropzone from 'react-dropzone'
import { ClipLoader } from 'react-spinners'
export const emptyTicket = {
  name: '',
  price: 0,
  availableTickets: 0,
}
interface onChangeTicket {
  index: number
  data: {
    name: string
    value: string
  }
}

interface Props {
  eventMedia: ICreatEventFileSchema[]
  setEventMedia: Dispatch<SetStateAction<ICreatEventFileSchema[]>>
  tickets: ITicketSchema[]
  setTickets: Dispatch<SetStateAction<ITicketSchema[]>>
}

const EventMedia: FC<Props> = ({ eventMedia, setEventMedia, tickets, setTickets }) => {
  const [uploadMultipleFiles, { isLoading }] = useUseUploadMultipleFilesUploadMutation()
  const { showToast } = useDisplayToast()

  const handleOnDrop = (files: File[]) => {
    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }
    formData.append('blurhash', BLUR_HUSH)
    formData.append('purpose', IFilePurposeEnums.EVENT_FLYER)
    uploadMultipleFiles(formData)
      .unwrap()
      .then((res) => {
        const uploadedFiles = res.data
        const newMedias = uploadedFiles.map((file) => {
          const {
            image: { id: imageId, url, blurhash },
            file: { id: fileId, fileType },
          } = file
          return {
            imageId,
            fileId,
            isMainFlyer: true,
            url,
            blurhash,
            fileType,
          }
        })
        const updatedMediaArray = [...eventMedia, ...newMedias]
        setEventMedia(updatedMediaArray)
        showToast(res?.message, 'success')
      })
      .catch((e) => {
        showToast(e?.data?.message, 'error')
      })
  }
  const [deleteUploadedFile] = useUseDeleteUploadedFileMutation()

  const handleDeleteMedia = async (fileId: number) => {
    try {
      const updatedMedia = eventMedia.filter((media) => media.fileId !== fileId)
      setEventMedia(updatedMedia)

      // Use the deleteUploadedFile mutation here
      const response = await deleteUploadedFile(fileId.toString())

      if (response) {
        showToast('File Deleted Successfully')
      } else {
        showToast('Error deleting media')
      }
    } catch (e) {
      showToast('Error deleting media')
    }
  }

  const handleTicketOnChange = ({ index, data: { name, value } }: onChangeTicket) => {
    let ticket = tickets[index]
    ticket = { ...ticket, [name]: value }
    const ticketsCopy = [...tickets]
    ticketsCopy[index] = ticket
    setTickets(ticketsCopy)
  }

  const incrementNumberOfTickets = () => {
    const ticketsCopy = [...tickets]
    ticketsCopy.push(emptyTicket)
    setTickets(ticketsCopy)
  }

  const removeTicket = (index: number) => {
    if (index > -1 && tickets.length > 1) {
      const ticketsCopy = [...tickets]
      ticketsCopy.splice(index, 1)
      setTickets(ticketsCopy)
    }
  }

  return (
    <Fragment>
      <div className="my-2 mb-3 text-2xl font-medium text-left text-primary">Media</div>
      <ReactDropzone
        onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles)}
        multiple={true}
        disabled={isLoading}
        accept={{
          'image/*': [],
        }}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div className="flex flex-col gap-4">
              {eventMedia.length !== 0 &&
                eventMedia.map((media, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div className="flex items-center flex-1 gap-3 border-2 border-secondary-dark rounded-2xl">
                        <div className="relative w-[100px] h-[80px]">
                          <Image
                            src={media.url}
                            alt="Profile image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-2xl "
                          />
                        </div>
                        <button className="flex items-center flex-1 p-2 my-3 rounded-2xl">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm line-clamp-2">
                                {media?.url && media.url.match(/[^/]+_(.+)$/)?.[1]}
                              </div>

                              <div className="text-xs text-gray-400">238 KB</div>
                            </div>
                          </div>
                        </button>
                      </div>
                      <div className="flex justify-end ">
                        <Trash
                          className="cursor-pointer text-error"
                          size={25}
                          onClick={() => handleDeleteMedia(media.fileId)}></Trash>
                      </div>
                    </div>
                  )
                })}

              <div {...getRootProps()}>
                <div
                  className={`w-full flex items-center gap-4 justify-center relative cursor-pointer mx-auto border border-dashed rounded-2xl py-6 ${
                    isLoading && 'opacity-50 !cursor-not-allowed'
                  }`}>
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <ClipLoader color="#F09F1B" size={20} />
                      <span>Uploading Media...</span>
                    </div>
                  ) : (
                    <Fragment>
                      <Upload className="text-primary" size={30} />
                      <span className="text-gray-500"> Upload event media</span>
                    </Fragment>
                  )}
                </div>
                <input {...getInputProps()} />
              </div>
            </div>
          )
        }}
      </ReactDropzone>
      <div className="my-5 mb-3 text-2xl font-medium text-left text-primary">Ticket</div>
      <div className="flex flex-col gap-3">
        {tickets.map((ticket, index) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Regular, VIP or VVIP"
                label="Label"
                value={ticket.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target
                  handleTicketOnChange({
                    index,
                    data: {
                      name,
                      value,
                    },
                  })
                }}
              />
              <Input
                type="number"
                name="price"
                placeholder="Price"
                label="Price"
                value={ticket.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target
                  handleTicketOnChange({
                    index,
                    data: {
                      name,
                      value,
                    },
                  })
                }}
              />
              <Input
                type="number"
                name="availableTickets"
                placeholder="Max Seats"
                label="Max seats"
                value={ticket.availableTickets}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target
                  handleTicketOnChange({
                    index,
                    data: {
                      name,
                      value,
                    },
                  })
                }}
              />
              <Trash
                className="cursor-pointer text-error"
                size={25}
                onClick={() => removeTicket(index)}
              />
            </div>
          )
        })}
        <button
          onClick={incrementNumberOfTickets}
          className="mt-5 underline text-primary underline-offset-2 w-max">
          Add ticket
        </button>
      </div>
    </Fragment>
  )
}
export default EventMedia
