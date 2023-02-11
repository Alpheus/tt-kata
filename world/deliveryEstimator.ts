const PORT_DISTANCE = 1;
const A_DISTANCE = 4;
const B_DISTANCE = 5;

class DeliveryEstimator {    
    howLong(cargoManifest: string): number {
        if (cargoManifest === '')
            return 0;
        
        return 5;
    }
}

export { DeliveryEstimator };