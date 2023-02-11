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
            expect(estimator.howLong('BB')).toBe(5);
        });

        it("Ship returns before taking next cargo", () => {
            expect(estimator.howLong('AA')).toBe(13);
        });

        it("Vehicles move simultaneously", () => {
            expect(estimator.howLong('AAA')).toBe(21);
            expect(estimator.howLong('ABA')).toBe(13);
            expect(estimator.howLong('ABBA')).toBe(15);

            expect(estimator.howLong('ABB')).toBe(7);
            expect(estimator.howLong('ABBB')).toBe(15);
            expect(estimator.howLong('AABABBAB')).toBe(29);
            expect(estimator.howLong('ABBBABAAABBB')).toBe(41);
        });
    });
});