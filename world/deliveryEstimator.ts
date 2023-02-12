const TO_PORT = 1;
const PORT_TO_A = 4;
const B_DISTANCE = 5;

type Destination = 'A' | 'B';
type CargoManifest = Destination[];

const TRUCK_RETURN_TIME: {[key in Destination]: number} = {
    A: TO_PORT * 2,
    B: B_DISTANCE * 2
};

const SHIP_RETURN_TIME = PORT_TO_A * 2;

class DeliveryEstimator {
    howLong(cargoManifest: string): number {
        const cargo = cargoManifest.split('') as CargoManifest;

        let lastDelivery = 0;
        let vehicleTime = { truckA: 0, truckB: 0, ship: 0 };

        for (let destination of cargo) {
            let availableTruck = vehicleTime.truckA > vehicleTime.truckB ? 'truckB' : 'truckA';
            let thisDelivery: number = 0;

            switch (destination) {
                case 'A':
                    let shipDeparture = Math.max(vehicleTime[availableTruck] + TO_PORT, vehicleTime.ship);
                    thisDelivery = shipDeparture + PORT_TO_A;
                    vehicleTime.ship = shipDeparture + SHIP_RETURN_TIME;

                    break;
                case 'B':
                    thisDelivery = vehicleTime[availableTruck] + B_DISTANCE;

                    break;
            }

            vehicleTime[availableTruck] += TRUCK_RETURN_TIME[destination];

            lastDelivery = Math.max(lastDelivery, thisDelivery);
        }

        return lastDelivery;
    }
}

export { DeliveryEstimator };