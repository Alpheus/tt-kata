import { DeliveryEstimator } from '../world/deliveryEstimator';

describe("Episode 1", () => {
    let estimator: DeliveryEstimator;

    const TRIVIAL_CASE = '';

    beforeAll(() => {
        estimator = new DeliveryEstimator();
    });

    describe("Estimator", () => {
        let trivialEstimate : unknown;

        beforeAll(() => {
            trivialEstimate = estimator.howLong(TRIVIAL_CASE);
        });

        it("should return a number given a cargo manifest", () => {
            expect(typeof trivialEstimate).toBe('number');
        });

        it("should return zero given no cargo", () => {
            expect(trivialEstimate).toEqual(0);
        });

        it('Should return the duration of the delivery for single cargo', () => {
            expect(estimator.howLong('A')).toBe(5);
            expect(estimator.howLong('B')).toBe(5);
        });
    });

    describe("On map 1 - Route Planner", () => {
        it("Estimates delivery time to deliver cargo using all vehicles", () => {
            const DoubleDeliveryToB = {
                cargo: 'BB',
                route: estimator.planRoute('BB')
            };

            expect(DoubleDeliveryToB.route).toHaveLength(2);
            expect(estimator.howLong(DoubleDeliveryToB.cargo)).toBe(5);
        });

        it("Routes separately for dock", () => {
            const DoubleDeliveryToA = {
                cargo: 'AA',
                route: estimator.planRoute('AA')
            };

            expect(DoubleDeliveryToA.route).toHaveLength(4);
            expect(estimator.howLong(DoubleDeliveryToA.cargo)).toBe(13);
        });
    });
});