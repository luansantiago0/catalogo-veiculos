import {  ModalLogin } from "./ModalLogin";
import useAuthStore from "../store/authStore";
import { ModalNewCar } from "./ModalNewCar";

export const Header = () => {
  const { setToken, userToken } = useAuthStore();

  const handleLogout = () => {
    setToken(null);
  }
  
  return (
    <header className="flex items-center justify-between p-5 px-20 bg-blue-500">
      <h1 className="text-2xl font-bold text-white">Catálogo de Carros 🚗</h1>
      { userToken
      ?
      <div className="flex gap-3">
      <ModalNewCar />
      <button
        onClick={handleLogout} className="px-3 py-1 text-sm font-semibold text-white duration-150 ease-in-out bg-red-500 rounded hover:bg-red-600">Sair
      </button>
      </div> 

      : <ModalLogin />}
  </header>
  )
}