import {defineStore} from 'pinia';

export const useVenueStore = defineStore('venues', {
  state: () => ({
    venues: [
      {
        id: 1,
        name: 'Yakkasaroy',
        location: 'Yunusabad tumani',
        distance: 3.6,
        rating: 4.6,
        reviewCount: 248,
        description: `Многие из нас дегустируют по достатку и поэтому угощать кафе «Порт Баку». Каппучино, чай прикланяться 25 лет и выдаёт как крутым фан-фудом, повседневными пищами и изысканной кондитерской.`,
        prices: [
          {
            title: 'VIP tarif',
            amount: 200,
            currency: 'USZ',
            description: 'Includes private room, dedicated staff, and premium menu options for up to 20 guests.'
          },
          {
            title: 'VIP tarif',
            amount: 200,
            currency: 'USZ',
            description: 'Includes private room, dedicated staff, and premium menu options for up to 40 guests.'
          },
          {
            title: 'VIP tarif',
            amount: 200,
            currency: 'USZ',
            description: 'Includes private room, dedicated staff, and premium menu options for up to 60 guests.'
          }
        ],
        address: 'Улица Рисалиий, 34',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        images: [
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
      },
      {
        id: 2,
        name: 'Grand Palace',
        location: 'Chilonzor tumani',
        distance: 5.2,
        rating: 4.8,
        reviewCount: 312,
        description: 'Elegant wedding venue with modern amenities and exceptional service for your special day.',
        prices: [
          {
            title: 'Standard tarif',
            amount: 150,
            currency: 'USZ',
            description: 'Basic package for up to 100 guests with standard catering options.'
          },
          {
            title: 'Premium tarif',
            amount: 250,
            currency: 'USZ',
            description: 'Enhanced service with premium menu and decorations for up to 150 guests.'
          },
          {
            title: 'Deluxe tarif',
            amount: 350,
            currency: 'USZ',
            description: 'All-inclusive luxury package with exclusive services for up to 200 guests.'
          }
        ],
        address: 'Улица Амира Темура, 107',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        images: [
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
      },
      {
        id: 3,
        name: 'Royal Garden',
        location: 'Mirzo Ulugbek tumani',
        distance: 4.1,
        rating: 4.5,
        reviewCount: 189,
        description: 'Beautiful garden venue with lush greenery and open-air spaces perfect for weddings and special events.',
        prices: [
          {
            title: 'Garden Ceremony',
            amount: 180,
            currency: 'USZ',
            description: 'Outdoor ceremony package with garden setup and basic catering.'
          },
          {
            title: 'Garden Reception',
            amount: 280,
            currency: 'USZ',
            description: 'Full reception package with outdoor and indoor spaces for up to 120 guests.'
          },
          {
            title: 'Complete Garden Wedding',
            amount: 380,
            currency: 'USZ',
            description: 'All-inclusive package with ceremony and reception for up to 150 guests.'
          }
        ],
        address: 'Улица Бунёдкор, 72',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        images: [
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
      },
      {
        id: 4,
        name: 'Luxury Hall',
        location: 'Shayxontohur tumani',
        distance: 2.8,
        rating: 4.7,
        reviewCount: 275,
        description: 'Contemporary luxury venue with state-of-the-art facilities and exquisite interior design.',
        prices: [
          {
            title: 'Weekday Package',
            amount: 220,
            currency: 'USZ',
            description: 'Special weekday rates for events from Monday to Thursday.'
          },
          {
            title: 'Weekend Package',
            amount: 320,
            currency: 'USZ',
            description: 'Premium weekend package with enhanced services for Friday to Sunday events.'
          },
          {
            title: 'Holiday Package',
            amount: 420,
            currency: 'USZ',
            description: 'Exclusive package for holidays and special dates with additional amenities.'
          }
        ],
        address: 'Улица Навоий, 45',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        images: [
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
      }
    ]
  }),
  getters: {
    getVenueById: (state) => (id) => {
      return state.venues.find(venue => venue.id === parseInt(id));
    }
  }
});