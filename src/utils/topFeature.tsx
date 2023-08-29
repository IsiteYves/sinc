import { EventImage } from '@utils/images'
import { Calendar, Detective, Ticket, Users } from 'phosphor-react'

const TopData = {
  FeatureContent: [
    {
      image: 'https://res.cloudinary.com/drqtk4af2/image/upload/v1689579143/cld-sample-3.jpg',
      place: 'Welcome all to the mixed gender basket ball association and many...',
      location: 'BK Arena',
      time: 'In 3 hrs',
      revenue: '4,760$',
      number: '23.4K',
    },
    {
      image: 'https://res.cloudinary.com/drqtk4af2/image/upload/v1689579143/cld-sample-3.jpg',
      place: 'BAL',
      location: 'BK Arena',
      time: '21/08/2023',
      revenue: '4,760$',
      number: '23.4K',
    },
    {
      image: 'https://res.cloudinary.com/drqtk4af2/image/upload/v1689579143/cld-sample-2.jpg',
      place: 'Hiking festival',
      location: 'Muhabura volcano peak',
      time: '12/02/2023',
      revenue: '4,760$',
      number: '2345',
    },
    // {
    //   image: EventImage3,
    //   place: "EAST AFRICAN PARTY",
    //   location: "CHICK ARENA",
    //   time: "01.may.2023",
    //   revenue: "4,760$",
    //   number: "2345",
    // },
    // {
    //   image: EventImage,
    //   place: "EAST AFRICAN PARTY",
    //   location: "BK ARENA",
    //   time: "01.may.2023",
    //   revenue: "4,760$",
    //   number: "2345",
    // },
  ],
  OverviewContent: [
    {
      title: 'Total Events',
      number: '43',
      display: 'View all',
      icon: <Calendar size={20} />,
    },
    {
      title: 'Total Ticket Sales',
      number: '$ 22.5k',
      display: 'View all',
      icon: <Ticket size={20} />,
    },
    // {
    //   title: "Total Hosts",
    //   number: "12",
    //   display: "View all",
    //   icon: <Ticket size={20} />,
    // },
    {
      title: 'Subscribers',
      number: '22k',
      display: 'View all',
      icon: <Users size={20} />,
    },
    {
      title: 'Admins',
      number: '10',
      display: 'View all',
      icon: <Detective size={20} />,
    },
  ],
}
export default TopData
