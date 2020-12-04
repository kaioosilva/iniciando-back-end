import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        //new Date (Ano, Mes(Começando no 0 = janeiro), Dia, Hora, Minuto, segundos)
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        //new Date (Ano, Mes(Começando no 0 = janeiro), Dia, Hora, Minuto, segundos)
        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});