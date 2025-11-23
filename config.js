window.APP_CONFIG = {
  couple: {
    groom: 'Javier Iglesias López',
    bride: 'Ana Blanco Fernández',
  },
  event: {
    dateISO: '2026-04-18T13:00:00+02:00',
  dateDayText: '18 de abril de 2026',
  timeText: '13:00',
  },
  venue: {
    name: 'Hotel Club de Campo La Caminera',
    place: 'Torrenueva, Ciudad Real · España',
    query: 'Hotel Club de Campo La Caminera Torrenueva',
    googleMapsUrl: 'https://maps.google.com/?q=Hotel+Club+de+Campo+La+Caminera+Torrenueva',
    busNote: 'Habrá servicio de autobús desde La Caminera hasta Santa Cruz de Mudela.',
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&auto=format&q=70'
    ]
  },
  hotels: [
    {
      id: 'caminera',
      name: 'Hotel La Caminera',
      petFriendly: true,
      description: 'En el propio lugar de la celebración. Comodidad máxima y encanto único.',
  distance: '',
  time: '',
      url: 'https://www.hotellacaminera.com/',
      coupon: { code: 'ANAYJAVIER', hint: 'Introduce este cupón al reservar.' },
      features: ['Late checkout', 'Spa', 'Pet friendly', 'Pádel', 'Golf', 'Rutas', 'Desayuno incluido']
    },
    {
      id: 'santacruz',
      name: 'Hotel Santa Cruz de Mudela',
      petFriendly: true,
      description: 'Opción cercana en Santa Cruz de Mudela, ideal con el servicio de autobús.',
      distance: '~18 km',
      time: '~20 min',
      url: 'https://restaurante-santa-cruz.hotelcastillalamancha.com/es/',
      query: 'Hotel Santa Cruz de Mudela',
      features: ['Pet friendly', 'Rutas', 'Desayuno incluido']
    }
  ],
  story: [
    { title: 'Coincidencia inesperada', text: 'Nos conocimos por amigos en común una tarde cualquiera y la conversación fluyó como si nos hubiéramos buscado toda la vida.' },
    { title: 'Primer viaje juntos', text: 'Descubrimos que compartir caminos nos hacía más felices: paisajes, risas y planes que reforzaron que queríamos seguir sumando capítulos.' },
    { title: 'La decisión', text: 'Con el corazón claro, elegimos celebrar nuestro amor rodeados de quienes nos acompañan en esta historia.' },
  ],
  texts: {
    intro: 'La magia nos unió y queremos celebrar este hechizo de amor contigo. Reserva la fecha para vivir un día único donde todo brillará con luz propia.',
    rsvp: 'Se ruega contestar: cuando te venga bien, responde a unas breves preguntas. ¡Nos ayudas un montón!'
  },
  nav: {
    historia: 'Historia',
    ubicacion: 'Ubicación',
    alojamiento: 'Alojamiento',
    rsvp: 'Se ruega contestar'
  },
  mapLabels: {
    venue: {
      cardTitle: 'La Caminera',
      cardDesc: 'Escenario de la celebración, naturaleza y tranquilidad.'
    },
    hotel: {
      cardTitle: 'Hotel Santa Cruz',
      cardDesc: 'Opción cercana para alojarse con fácil conexión.'
    },
    route: {
      cardTitle: 'Servicio entre ambos',
      cardDesc: 'Organizaremos autobús entre La Caminera y Santa Cruz de Mudela.'
    }
  },
  // Reemplaza por tu URL real de Typeform cuando esté listo
  typeformUrl: 'https://example.typeform.com/to/javier-y-ana'
};
