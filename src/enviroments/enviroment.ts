export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:3000',
  endpoints: {
    employee: {
      getAll: '/employee/employees',
      signup: '/employee/signup',
      delete: '/employee/delete',
      update: '/employee/update',
      login: '/employee/login',
      logout: '/employee/logout',
    },
    patient: {
      signup: '/patient/signup',
      login: '/patient/login',
      logout: '/patient/logout',
      getAll: '/patient/patients',
      delete: '/patient/delete',
      update: '/patient/update',
    },

    appointment: {
      getAll: '/appointment/appointments',
      getById: '/appointment/getById',
      create: '/appointment/create',
      update: '/appointment/update',
      delete: '/appointment/delete',
    },
    reservation: {
      getAll: '/reservation/reservations',
      create: '/reservation/create',
      update: '/reservation/update',
      delete: '/reservation/delete',
    },
    service: {
      getAll: '/service/services',
      getById: '/service/getbyid',
      create: '/service/create',
      update: '/service/update',
      delete: '/service/delete',
    },
  },
};