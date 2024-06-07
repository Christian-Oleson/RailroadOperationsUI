export interface Trains {
    trains: Train[]
}

export interface Train {
    id: number
    name: string
    destination: string
    cars?: Car[]
}

export interface Car {
    id: number
    name: string
    destination: string
    railCarType: string
}