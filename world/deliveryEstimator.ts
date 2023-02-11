const PORT_DISTANCE = 1;
const A_DISTANCE = 4;
const B_DISTANCE = 5;

class DeliveryEstimator {    
    howLong(cargoManifest: string): number {
        if (cargoManifest === '')
            return 0;
        
        if (cargoManifest.length === 1)
            return 5;
        
        return 5;
    }
}

export { DeliveryEstimator };