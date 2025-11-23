window.APP_CONFIG = {
  couple: {
    groom: "Javier Iglesias López",
    bride: "Ana Blanco Fernández",
  },
  event: {
    dateISO: "2026-04-18T13:00:00+02:00",
    dateDayText: "18 de abril de 2026",
    timeText: "Hora: 13:00",
  },
  venue: {
    name: "Hotel La Caminera Club de Campo",
    place: "Torrenueva, Ciudad Real · España",
    query: "Hotel La Caminera Club de Campo Torrenueva",
    googleMapsUrl:
      "https://maps.google.com/?q=Hotel+Club+de+Campo+La+Caminera+Torrenueva",
    busNote:
      "Habrá servicio de autobús desde La Caminera hasta Santa Cruz de Mudela.",
    photos: [
      "https://lh3.googleusercontent.com/p/AF1QipONVpdEtboWtOkZk1Zib8YWLS_rbcPAYm7kv176=s1360-w1360-h1020-rw",
      "https://lh3.googleusercontent.com/p/AF1QipPqeIxslitpArmXs9dTHZ7b-zLSU4m6gur35Lby=s1360-w1360-h1020-rw",
      "https://lh3.googleusercontent.com/p/AF1QipNAbdxKCtDBAXuusIQ1Ugst1Dzzb4lh4CRB-H23=s1360-w1360-h1020-rw",
    ],
  },
  hotels: [
    {
      id: "caminera",
      name: "Hotel La Caminera",
      stars: 5,
      petFriendly: true,
      description:
        "Fabuloso resort 5★ en el que va a ser la ceremonia y la celebración. Hemos conseguido un maravilloso descuento para los invitados.",
      distance: "",
      time: "",
      url: "https://www.hotellacaminera.com/",
      features: [
        "Late check out a las 18:00 p.m.",
        "Spa",
        "Pet friendly",
        "Maravilloso SPA incluido",
        "Pista de pádel",
        "Golf",
        "Entorno en medio de la nada con naves alrededor",
      ],
      pricing: {
        option1: {
          nights: 1,
          price: "219€",
          room: "habitación clásica ó delux",
        },
        option2: {
          nights: 2,
          pricePerNight: "199€",
          room: "habitación clásica ó delux",
        },
      },
      booking: {
        method: "email",
        email: "nuri.soler@salleshotels.com",
        instructions:
          "Escribir al correo: nuri.soler@salleshotels.com con los datos de parte de la boda de Ana y Javier. Pagar directamente al realizar el checkout.",
      },
    },
    {
      id: "santacruz",
      name: "Hotel Santa Cruz de Mudela",
      stars: 3,
      petFriendly: true,
      description:
        "Hotel a 19 min del sitio de la boda. Pondremos un autobús que os llevará el día 18 de la boda.",
      distance: "~18 km",
      time: "~19 min",
      url: "https://restaurante-santa-cruz.hotelcastillalamancha.com/es/",
      query: "Hotel Santa Cruz de Mudela",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/127610222.jpg?k=10f7d5945cd5de47c05e0d738b22a570ced56e3936cbdc8febc89c5cf581b99c&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/131003390.jpg?k=d2e6f135ad0a2fa99b2cfbf4f8a69dac9872056161888dd03edde51b35f5cc51&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/151908053.jpg?k=b705379d4a2e9a35b667740dc05336c17554adadb47f7a5b1a680ba7ff3481c7&o=",
      ],
      features: ["Pet friendly"],
      pricing: {
        option1: { nights: 1, price: "~55€", room: "habitación doble" },
        option2: { nights: 2, price: "~110€", room: "por habitación doble" },
      },
      booking: {
        method: "phone",
        phone: "+34 926 123 456",
        instructions:
          "Llamar al teléfono para reservar indicando que es para la boda de Ana y Javier.",
      },
    },
  ],
  story: [
    {
      title:
        'Nos conocimos en el colegio y comenzamos a hablar. Vimos que teníamos muchas cosas en común y lo que empezó siendo un "a ver qué pasa" se ha convertido en una bonita relación de más de 13 años.',
      text: "",
    },
  ],
  texts: {
    intro:
      "Después de 13 años, 2 meses y 16 días o lo que es lo mismo tras 4823 días, 115.752 horas y 6.945.120 minutos hemos decidido dar el siguiente paso y queremos compartirlo con todos vosotros.",
    rsvp: "Se ruega contestar: lo antes posible, responde a unas breves preguntas. ¡Nos ayudas un montón!",
  },
  nav: {
    historia: "Historia",
    ubicacion: "Ubicación",
    alojamiento: "Alojamiento",
    rsvp: "Se ruega contestar",
  },
  mapLabels: {
    venue: {
      cardTitle: "La Caminera",
      cardDesc: "Escenario de la celebración, naturaleza y tranquilidad.",
    },
    hotel: {
      cardTitle: "Hotel Santa Cruz",
      cardDesc: "Opción cercana para alojarse con fácil conexión.",
    },
    route: {
      cardTitle: "Servicio entre ambos",
      cardDesc:
        "Organizaremos autobús entre La Caminera y Santa Cruz de Mudela.",
    },
  },
  // Reemplaza por tu URL real de Typeform cuando esté listo
  typeformUrl: "https://example.typeform.com/to/javier-y-ana",
};
