var appRouter = function (app) {
  app.get('/api/geolocation', function (req, res) {
    res.send({
      center: [14.9460585, -87.1793395],
      defaultCenter: [59.938043, 30.337157],
      zoom: 6,
      markers: {
        0: {
          key: 0,
          name: 'Tegucigalpa',
          latitud: 14.0840718,
          longitud: -87.2751851,
          address: 'colonia loarque, Tegucigalpa Honduras',
          totalEmployees: 122,
          hiredMonth: 10,
          firedMonth: 5,
          imgSrc: 'http://www.dashboard.com/loarque.jpg',
          hover: false,
        },
        1: {
          key: 1,
          name: 'San Pedro Sula',
          latitud: 15.5198896,
          longitud: -88.0557019,
          address: 'colonia Satelite, Tegucigalpa Honduras',
          totalEmployees: 222,
          hiredMonth: 12,
          firedMonth: 15,
          imgSrc: 'http://www.dashboard.com/satelite.jpg',
          hover: false,
        },
        2: {
          key: 2,
          name: 'Islas de la Bahia',
          latitud: 16.3234395,
          longitud: -86.549731,
          address: 'Boluverd los proceres, Tegucigalpa Honduras',
          totalEmployees: 322,
          hiredMonth: 1,
          firedMonth: 0,
          imgSrc: 'http://www.dashboard.com/proceres.jpg',
          hover: false,
        },
      },
    });
  });
};

module.exports = appRouter;
