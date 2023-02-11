const TO_PORT = 1;
const PORT_TO_A = 4;
const B_DISTANCE = 5;

class DeliveryEstimator {
    #estimate(routes: any[]) {
        return Math.max(...routes, 0);
    }

    planRoute(cargoManifest: string): any[] {
        const cargo = cargoManifest.split('');
        const routes: any[] = [];

        if (cargo[0] == 'B') {
            routes.push(B_DISTANCE);
        }

        if (cargo[1] == 'B') {
            routes.push(B_DISTANCE);
        }

        if (cargo[0] == 'A') {
            routes.push(TO_PORT);
            routes.push(TO_PORT + PORT_TO_A);
        }

        if (cargo[1] == 'A') {
            routes.push(TO_PORT);
            routes.push(TO_PORT + PORT_TO_A + PORT_TO_A + PORT_TO_A);
        }

        return routes;
    }

    howLong = (cargoManifest: string) =>
        this.#estimate(this.planRoute(cargoManifest));
}

export { DeliveryEstimator };