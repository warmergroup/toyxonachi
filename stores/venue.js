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
        address: 'Улица Рисалиий, 34',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        images: [
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        prices: [
          {
            title: 'Standard tarif',
            amount: 100,
            currency: 'USZ',
            description: 'Includes private room, dedicated staff, and premium menu options for up to 20 guests.',
            tabs: {
              foods: [
                {name: "Steak", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
                {name: "Chicken Roast", image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg"},
                {name: "Seafood Special", image: "https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg"}
              ],
              salads: [
                {name: "Caesar Salad", image: "https://images.pexels.com/photos/551991/pexels-photo-551991.jpeg"},
                {name: "Greek Salad", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"},
                {name: "Olivier", image: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg"}
              ],
              tablecloth: [
                {name: "Tort", image: "https://images.pexels.com/photos/167586/pexels-photo-167586.jpeg"},
                {name: "Fruits", image: "https://images.pexels.com/photos/135047/pexels-photo-135047.jpeg"},
                {
                  name: "Traditional Pastries",
                  image: "https://images.pexels.com/photos/302252/pexels-photo-302252.jpeg"
                }
              ],
              bonuses: [
                {name: "Live Music", image: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg"},
                {name: "Free Parking", image: "https://images.pexels.com/photos/175696/pexels-photo-175696.jpeg"},
                {
                  name: "Welcome Drinks",
                  image: "https://images.pexels.com/photos/1322182/pexels-photo-1322182.jpeg"
                }
              ]
            }
          },
          {
            title: 'VIP tarif',
            amount: 200,
            currency: 'USZ',
            description: 'Includes private room, dedicated staff, and premium menu options for up to 40 guests.',
            tabs: {
              foods: [
                {name: "Steak", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
                {name: "Chicken Roast", image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg"},
                {name: "Seafood Special", image: "https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg"}
              ],
              salads: [
                {name: "Caesar Salad", image: "https://images.pexels.com/photos/551991/pexels-photo-551991.jpeg"},
                {name: "Greek Salad", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"},
                {name: "Olivier", image: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg"}
              ],
              tablecloth: [
                {name: "Tort", image: "https://images.pexels.com/photos/167586/pexels-photo-167586.jpeg"},
                {name: "Fruits", image: "https://images.pexels.com/photos/135047/pexels-photo-135047.jpeg"},
                {
                  name: "Traditional Pastries",
                  image: "https://images.pexels.com/photos/302252/pexels-photo-302252.jpeg"
                }
              ],
              bonuses: [
                {name: "Live Music", image: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg"},
                {name: "Free Parking", image: "https://images.pexels.com/photos/175696/pexels-photo-175696.jpeg"},
                {
                  name: "Welcome Drinks",
                  image: "https://images.pexels.com/photos/1322182/pexels-photo-1322182.jpeg"
                }
              ]
            }
          },
          {
            title: 'Premium tarif',
            amount: 300,
            currency: 'USZ',
            description: 'Includes private room, dedicated staff, and premium menu options for up to 60 guests.'
          }
        ],

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
            description: 'Outdoor ceremony package with garden setup and basic catering.',
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
      },
      {
        id: 5,
        name: 'Crystal Palace',
        location: 'Yunusabad tumani',
        distance: 2.9,
        rating: 4.6,
        reviewCount: 398,
        description: 'Spacious and beautifully decorated for all kinds of weddings and parties.',
        prices: [
          {
            title: 'Standard Package',
            amount: 150,
            currency: 'USZ',
            description: 'Includes venue and basic services for up to 100 guests.'
          },
          {
            title: 'Premium Package',
            amount: 250,
            currency: 'USZ',
            description: 'Expanded services with special decor and menu for 150 guests.'
          },
          {
            title: 'Luxury Package',
            amount: 400,
            currency: 'USZ',
            description: 'Top-tier service with VIP options and extras for 200 guests.'
          }
        ],
        address: 'Улица Ташкент, 100',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
        images: [
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg'
        ]
      },
      {
        id: 6,
        name: 'Zarafshan Hall',
        location: 'Yakkasaroy tumani',
        distance: 3.3,
        rating: 4.4,
        reviewCount: 198,
        description: 'Elegant venue with eastern-style decoration and live music options.',
        prices: [
          {
            title: 'Budget Package',
            amount: 120,
            currency: 'USZ',
            description: 'Basic event services for small gatherings.'
          },
          {
            title: 'Standard Package',
            amount: 200,
            currency: 'USZ',
            description: 'Ideal for weddings up to 120 guests.'
          },
          {
            title: 'Premium Package',
            amount: 320,
            currency: 'USZ',
            description: 'All-inclusive event experience with top-tier services.'
          }
        ],
        address: 'Улица Мирабад, 87',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
        images: [
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg'
        ]
      },
      {
        id: 7,
        name: 'Golden Event Hall',
        location: 'Chilonzor tumani',
        distance: 4.9,
        rating: 4.7,
        reviewCount: 265,
        description: 'Bright and spacious wedding hall with beautiful lighting and premium sound.',
        prices: [
          {
            title: 'Evening Package',
            amount: 180,
            currency: 'USZ',
            description: 'Perfect for evening events up to 100 guests.'
          },
          {
            title: 'Weekend Package',
            amount: 300,
            currency: 'USZ',
            description: 'Popular for Friday-Sunday bookings.'
          },
          {
            title: 'VIP Package',
            amount: 450,
            currency: 'USZ',
            description: 'Full-service with exclusive decorations and catering.'
          }
        ],
        address: 'Улица Фаргона Йули, 58',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
        images: [
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg'
        ]
      },
      {
        id: 8,
        name: 'Velvet Sky',
        location: 'Olmazor tumani',
        distance: 3.5,
        rating: 4.5,
        reviewCount: 179,
        description: 'Modern rooftop venue offering panoramic views and elegant design.',
        prices: [
          {
            title: 'Sunset Package',
            amount: 220,
            currency: 'USZ',
            description: 'Includes sunset ceremony setup for up to 80 guests.'
          },
          {
            title: 'Moonlight Package',
            amount: 280,
            currency: 'USZ',
            description: 'Ideal for evening receptions with live music.'
          },
          {
            title: 'Sky Premium',
            amount: 380,
            currency: 'USZ',
            description: 'Full rooftop experience with catering and service staff.'
          }
        ],
        address: 'Улица Университетская, 11',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg',
        images: [
          'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg',
          'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
          'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg'
        ]
      },
      {
        id: 9,
        name: 'Emerald Garden',
        location: 'Yashnobod tumani',
        distance: 4.7,
        rating: 4.3,
        reviewCount: 165,
        description: 'Green open-air venue with natural beauty and customizable event space.',
        prices: [
          {
            title: 'Basic Garden',
            amount: 160,
            currency: 'USZ',
            description: 'Outdoor setting for 100 guests.'
          },
          {
            title: 'Decorated Garden',
            amount: 260,
            currency: 'USZ',
            description: 'Includes flower arrangements and seating decoration.'
          },
          {
            title: 'Garden Royal',
            amount: 360,
            currency: 'USZ',
            description: 'Full event service with garden and indoor backup.'
          }
        ],
        address: 'Улица Янгийул, 23',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg',
        images: [
          'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg',
          'https://images.pexels.com/photos/1680713/pexels-photo-1680713.jpeg',
          'https://images.pexels.com/photos/1679826/pexels-photo-1679826.jpeg',
          'https://images.pexels.com/photos/1679827/pexels-photo-1679827.jpeg'
        ]
      },
      {
        id: 10,
        name: 'Diamond Plaza',
        location: 'Uchtepa tumani',
        distance: 5.3,
        rating: 4.8,
        reviewCount: 322,
        description: 'Luxurious event space with chandelier lighting and gourmet catering.',
        prices: [
          {
            title: 'Basic Diamond',
            amount: 250,
            currency: 'USZ',
            description: 'Elegant décor and seating for up to 120 guests.'
          },
          {
            title: 'Shining Diamond',
            amount: 350,
            currency: 'USZ',
            description: 'Premium menu and photo zone with live music.'
          },
          {
            title: 'Diamond Elite',
            amount: 500,
            currency: 'USZ',
            description: 'All-in service including transport and concierge.'
          }
        ],
        address: 'Улица Олтинтепа, 45',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
        images: [
          'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
          'https://images.pexels.com/photos/190952/pexels-photo-190952.jpeg',
          'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg',
          'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'
        ]
      },
      {
        id: 11,
        name: 'Oriental Luxe',
        location: 'Bektemir tumani',
        distance: 4.4,
        rating: 4.6,
        reviewCount: 243,
        description: 'Traditional eastern decor with a modern twist, ideal for cultural events.',
        prices: [
          {
            title: 'Classic',
            amount: 170,
            currency: 'USZ',
            description: 'Standard seating with traditional décor.'
          },
          {
            title: 'Eastern Premium',
            amount: 270,
            currency: 'USZ',
            description: 'Live music and food catering included.'
          },
          {
            title: 'Royal Eastern',
            amount: 370,
            currency: 'USZ',
            description: 'Full oriental package with ceremonial services.'
          }
        ],
        address: 'Улица Шохрух, 31',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg',
        images: [
          'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg',
          'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
          'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg',
          'https://images.pexels.com/photos/190952/pexels-photo-190952.jpeg'
        ]
      },
      {
        id: 12,
        name: 'Skyline Hall',
        location: 'Yakkasaroy tumani',
        distance: 3.2,
        rating: 4.4,
        reviewCount: 210,
        description: 'High-rise wedding venue with skyline views and elegant design.',
        prices: [
          {
            title: 'Top View',
            amount: 240,
            currency: 'USZ',
            description: 'Panoramic setup for 100 guests.'
          },
          {
            title: 'Evening Glow',
            amount: 340,
            currency: 'USZ',
            description: 'Evening event with lighting and music.'
          },
          {
            title: 'Sky Premium',
            amount: 460,
            currency: 'USZ',
            description: 'Complete service with high-rise photography.'
          }
        ],
        address: 'Улица Хива, 64',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
        images: [
          'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
          'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
          'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg',
          'https://images.pexels.com/photos/190952/pexels-photo-190952.jpeg'
        ]
      },
      {
        id: 13,
        name: 'Pearl Grand',
        location: 'Mirobod tumani',
        distance: 3.8,
        rating: 4.7,
        reviewCount: 284,
        description: 'White-theme venue specializing in formal and luxury ceremonies.',
        prices: [
          {
            title: 'Basic White',
            amount: 200,
            currency: 'USZ',
            description: 'Minimal setup for up to 90 guests.'
          },
          {
            title: 'Pearl Classic',
            amount: 320,
            currency: 'USZ',
            description: 'Complete pearl-themed decor and menu.'
          },
          {
            title: 'Pearl Prestige',
            amount: 450,
            currency: 'USZ',
            description: 'Top-class event with white floral themes and orchestra.'
          }
        ],
        address: 'Улица Дархан, 17',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/2893238/pexels-photo-2893238.jpeg',
        images: [
          'https://images.pexels.com/photos/2893238/pexels-photo-2893238.jpeg',
          'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
          'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg',
          'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg'
        ]
      },
      {
        id: 14,
        name: 'Moonlight Venue',
        location: 'Chilonzor tumani',
        distance: 4.2,
        rating: 4.3,
        reviewCount: 192,
        description: 'Romantic venue perfect for night weddings and candlelight events.',
        prices: [
          {
            title: 'Moon Start',
            amount: 180,
            currency: 'USZ',
            description: 'Evening event for 80 guests.'
          },
          {
            title: 'Moon Classic',
            amount: 280,
            currency: 'USZ',
            description: 'With special lighting and moon-themed decoration.'
          },
          {
            title: 'Moon Premium',
            amount: 390,
            currency: 'USZ',
            description: 'Full romantic setup with live piano and candle dining.'
          }
        ],
        address: 'Улица Хуршид, 91',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
        images: [
          'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
          'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg',
          'https://images.pexels.com/photos/190952/pexels-photo-190952.jpeg',
          'https://images.pexels.com/photos/2893238/pexels-photo-2893238.jpeg'
        ]
      },
      {
        id: 15,
        name: 'Rosewood Palace',
        location: 'Sergeli tumani',
        distance: 5.1,
        rating: 4.6,
        reviewCount: 231,
        description: 'Classic palace-style wedding venue with grand halls and vintage decor.',
        prices: [
          {
            title: 'Rose Basic',
            amount: 190,
            currency: 'USZ',
            description: 'Classic decor and music setup.'
          },
          {
            title: 'Rose Deluxe',
            amount: 310,
            currency: 'USZ',
            description: 'Vintage decor with western menu.'
          },
          {
            title: 'Royal Rose',
            amount: 450,
            currency: 'USZ',
            description: 'Grand package with everything included.'
          }
        ],
        address: 'Улица Феруза, 76',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
        images: [
          'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
          'https://images.pexels.com/photos/2893238/pexels-photo-2893238.jpeg',
          'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg',
          'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg'
        ]
      },
      {
        id: 16,
        name: 'White Lotus',
        location: 'Yakkasaroy tumani',
        distance: 3.0,
        rating: 4.5,
        reviewCount: 215,
        description: 'Minimalist design and peaceful atmosphere perfect for small weddings.',
        prices: [
          {
            title: 'Lotus Simple',
            amount: 140,
            currency: 'USZ',
            description: 'Small hall for up to 60 guests.'
          },
          {
            title: 'Lotus Classic',
            amount: 240,
            currency: 'USZ',
            description: 'Serene atmosphere with elegant setup.'
          },
          {
            title: 'Lotus Premium',
            amount: 350,
            currency: 'USZ',
            description: 'Spa-style experience with decorations and buffet.'
          }
        ],
        address: 'Улица Джахонгир, 19',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/2979334/pexels-photo-2979334.jpeg',
        images: [
          'https://images.pexels.com/photos/2979334/pexels-photo-2979334.jpeg',
          'https://images.pexels.com/photos/2893238/pexels-photo-2893238.jpeg',
          'https://images.pexels.com/photos/190952/pexels-photo-190952.jpeg',
          'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg'
        ]
      },
      {
        id: 17,
        name: 'Caspian Royale',
        location: 'Yunusabad tumani',
        distance: 4.6,
        rating: 4.9,
        reviewCount: 410,
        description: 'Elite venue with gold interior, private valet, and luxury catering.',
        prices: [
          {
            title: 'Caspian Basic',
            amount: 300,
            currency: 'USZ',
            description: 'Formal arrangement for 150 guests.'
          },
          {
            title: 'Caspian Premium',
            amount: 450,
            currency: 'USZ',
            description: 'VIP catering and private rooms.'
          },
          {
            title: 'Caspian Royal',
            amount: 600,
            currency: 'USZ',
            description: 'All-in-one luxurious wedding experience.'
          }
        ],
        address: 'Улица Кипчак, 29',
        mapUrl: 'https://maps.google.com/',
        imageUrl: 'https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg',
        images: [
          'https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg',
          'https://images.pexels.com/photos/2893238/pexels-photo-2893238.jpeg',
          'https://images.pexels.com/photos/290605/pexels-photo-290605.jpeg',
          'https://images.pexels.com/photos/2979334/pexels-photo-2979334.jpeg'
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