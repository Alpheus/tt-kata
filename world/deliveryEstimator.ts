const TO_PORT = 1;
const PORT_TO_A = 4;
const B_DISTANCE = 5;

class DeliveryEstimator {
    howLong(cargoManifest: string): number {
        const cargo = cargoManifest.split('');

        let vehicleTime = {
            truckA: 0,
            truckB: 0,
            ship: 0
        };

        let availableTruck = 'truckA';

        let lastDelivery = 0;

        for (let destination of cargo) {
            let thisDelivery;

            switch (destination) {
                case 'A':
                    thisDelivery = Math.max(vehicleTime[availableTruck], vehicleTime.ship) + TO_PORT + PORT_TO_A;
                    vehicleTime[availableTruck] += 2 * TO_PORT;
                    vehicleTime.ship += 2 * PORT_TO_A;                  

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