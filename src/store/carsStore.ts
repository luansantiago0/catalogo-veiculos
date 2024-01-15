import { create } from "zustand";
import { DataCars } from "../pages/Home";

interface CarsStore {
  cars: DataCars[];
  setCars: (newCars: DataCars[]) => void;
}

const useCarsStore = create<CarsStore>((set) => ({
  cars: [],
  setCars: (newCars) => set({ cars: newCars }),
}));

export default useCarsStore;