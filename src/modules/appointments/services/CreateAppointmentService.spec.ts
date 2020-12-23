import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123123',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });
});

describe('CreateAppointment', () => {
  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

it('should not be able to create an appointment on a past date', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
    createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'provider-id',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
it('should not be able to create an appointment with same user as provider', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
    createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'user-id',
    }),
  ).rejects.toBeInstanceOf(AppError);
});

it('should not be able to create an appointment with same user as provider', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
    createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'user-id',
    }),
  ).rejects.toBeInstanceOf(AppError);
});

it('should not be able to create an appointment before 8am and after 5pm', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
    createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user-id',
      provider_id: 'provider-id',
    }),
  ).rejects.toBeInstanceOf(AppError);

  await expect(
    createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user-id',
      provider_id: 'provider-id',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
