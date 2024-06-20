export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:3000',
  endpoints: {
    employee: {
      getAll: '/employee/employees',
      get: '/employee/by-token',
      signup: '/employee/signup',
      delete: '/employee/delete',
      update: '/employee/update',
      getemployeeByToken: '/employee/by-token',
      login: '/employee/login',
      logout: '/employee/logout',
    },
    patient: {
      signup: '/patient/signup',
      login: '/patient/login',
      logout: '/patient/logout',
      getAll: '/patient/patients',
      getpatientByToken: '/patient/by-token',
      delete: '/patient/delete',
      update: '/patient/update',
    },
    appointment: {
      getAll: '/appointment/appointments',
      getById: '/appointment/getById',
      getByDate: '/appointment/appointmentsByDate',
      create: '/appointment/create',
      update: '/appointment/update',
      delete: '/appointment/delete',
      createMultiple: '/appointment/createMultiple',
      createForDateRange: '/appointment/createForDateRange',
    },
    reservation: {
      getAll: '/reservation/reservations',
      getPatientReservations: '/reservation/patient-appointments',
      create: '/reservation/create',
      update: '/reservation/update',
      delete: '/reservation/delete',
      loadpatientreservationsbyid:'/reservation/getPatientAppointmentsbyid',
      reservationByAppointment: '/reservation/reservationByAppointment',
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
