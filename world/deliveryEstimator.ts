const TO_PORT = 1;
const PORT_TO_A = 4;
const B_DISTANCE = 5;

class DeliveryEstimator {
    howLong(cargoManifest: string): number {
        const cargo = cargoManifest.split('');

        let vehicleTime = { truckA: 0, truckB: 0, ship: 0 };
        let availableTruck = 'truckA';
        let lastDelivery = 0;

        for (let destination of cargo) {
            let thisDelivery;

            switch (destination) {
                case 'A':
                    let shipDeparture = Math.max(vehicleTime[availableTruck] + TO_PORT, vehicleTime.ship);
                    thisDelivery = shipDeparture + PORT_TO_A;
                    vehicleTime.ship = shipDeparture + 2 * PORT_TO_A;
                    vehicleTime[availableTruck] += 2 * TO_PORT;

                    break;
                case 'B':
                    thisDelivery = vehicleTime[availableTruck] + B_DISTANCE;
                    vehicleTime[availableTruck] += 2 * B_DISTANCE;

                    break;
            }

            lastDelivery = Math.max(lastDelivery, thisDelivery);
            availableTruck = vehicleTime.truckA > vehicleTime.truckB ? 'truckB' : 'truckA';
        }

        return lastDelivery;
    }
}

export { DeliveryEstimator };