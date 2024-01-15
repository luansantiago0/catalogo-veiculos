import { useState, useEffect, useCallback } from "react";
import useAuthStore from "../store/authStore";
import useCarsStore from "../store/carsStore";
import { ModalUpdateCar } from "../components/ModalUpdateCar";
import { Loading } from "../components/Loading";
import { getCars } from "../actions/getCars";
import { deleteCar } from "../actions/deleteCar";

export type DataCars = {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  imagem_url: string;
}

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const { userToken } = useAuthStore();
  const { cars, setCars } = useCarsStore();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const cars = await getCars();
    setCars(cars);
    setLoading(false);
  }, [setCars]);

  const handleDelete = async (id: number) => {
    await deleteCar(id, `${userToken}`);
    alert('Carro deletado com sucesso!');
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="flex flex-col items-center p-3 md:p-20">
      <h1 className="text-3xl font-bold">Catálogo - Usados</h1>

      <p className="mt-2 font-semibold text-center text-gray-600 md:mt-0">Confira as opções de carros usados disponíveis.</p>

      { loading ? 
      <Loading /> : 
      <section className="grid gap-6 p-6 my-10 -translate-y-8 rounded-lg opacity-0 md:grid-cols-2 lg:grid-cols-3 animate-enter">
        {cars.map((car: DataCars) => (
          <div key={car.id} className="flex flex-col rounded border-[1px]">
              <img className="object-cover w-full rounded-t h-60" src={car.imagem_url} alt={car.nome} />
              <div className="p-4">
                <h1 className="mt-3 text-xl font-semibold">{car.nome}</h1>
                <p className="text-sm text-gray-600">{car.descricao}</p>
                <div className="flex flex-col">
                  <p className="mt-2 text-3xl font-bold text-gray-800"><span className="text-sm">
                    R$</span> {car.valor}
                  </p>
                  { userToken ? 
                  <div className="grid grid-cols-2 gap-3">
                    <ModalUpdateCar id={car.id} onSubmit={() => fetchData()} />   
                    <button
                    className="px-3 py-2 mt-3 text-sm font-bold text-white duration-150 ease-in-out bg-red-500 rounded hover:bg-red-700 hover:scale-95"
                    onClick={() => handleDelete(car.id)}
                    >
                      Excluir carro
                    </button>
                  </div>
                   : <button className="px-3 py-2 mt-3 text-sm font-bold text-white duration-150 ease-in-out bg-blue-600 rounded hover:bg-blue-800 hover:scale-95">
                    Comprar agora
                    </button>}
                </div>
              </div>
          </div>
        ))}
      </section>}
    </main>
  )
}