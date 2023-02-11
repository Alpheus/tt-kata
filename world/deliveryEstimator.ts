const TO_PORT = 1;
const PORT_TO_A = 4;
const B_DISTANCE = 5;

class DeliveryEstimator {
    #estimate(routes: any[]) {
        return Math.max(...routes, 0);
    }

    #planRoute(cargoManifest: string): any[] {
        const cargo = cargoManifest.split('');
        const routes: any[] = [];

        let aTravelled = 0;
        let shipTravelled = 0;
        let firstTruckToA = true;

        for (let destination of cargo) {
            switch (destination) {
                case 'A':
                    let truckTimeIncluded = aTravelled > shipTravelled ? aTravelled : 0;
                    routes.push(truckTimeIncluded + TO_PORT + shipTravelled + PORT_TO_A);
                    if (firstTruckToA) {
                        firstTruckToA = false;
                    } else {
                        aTravelled += 2 * TO_PORT;
                        firstTruckToA = true;
                    }
                    shipTravelled += 2 * PORT_TO_A;
                    break;
                case 'B':
                    routes.push(B_DISTANCE);
                    break;
            }
        }

        return routes;
    }

    howLong = (cargoManifest: string) =>
        this.#estimate(this.#planRoute(cargoManifest));
}

export { DeliveryEstimator };