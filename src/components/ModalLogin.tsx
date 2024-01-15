import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z } from 'zod';
import useAuthStore from '../store/authStore';

const schema = z.object({
  username: z.string().min(3, {message: "O campo deve ter pelo menos 3 caracteres"}).max(20, {message: "O campo deve ter no máximo 20 caracteres"}),
  password: z.string().min(3, {message: "O campo deve ter pelo menos 3 caracteres"}).max(20, {message: "O campo deve ter no máximo 20 caracteres"}),
});

type LoginData = {
  username: string;
  password: string;
}

export const ModalLogin = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const { setToken } = useAuthStore();

  const handleFormSubmit: SubmitHandler<LoginData> = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const token = response.data.access_token;
      setToken(token);
  } catch (error) {
    console.error(error);
  } finally {
    reset();
  }
}

  return (
    <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="p-3 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
        Login
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Dialog.Title className="text-black m-0 text-[17px] font-medium">
          Fazer Login
        </Dialog.Title>
        <Dialog.Description className="text-zinc-700 mt-[10px] mb-5 text-[15px] leading-normal">
          Digite seu usuário e senha para ter acesso ao registro de carros do catálogo.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-black font-semibold w-[90px] text-right text-[15px]" htmlFor="username">
            Usuário:
          </label>
          <input
            className="text-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="username"
            placeholder="Digite seu nome de usuário"
            type="text"
            {...register('username')}
          />
        {errors.username && <p>{errors.username.message}</p>}
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-black font-semibold w-[90px] text-right text-[15px]" htmlFor="password">
            Senha:
          </label>
          <input
            className="text-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
        {errors.password && <p>{errors.password.message}</p>}
        </fieldset>
        <div className="mt-[25px] flex justify-end">
            <button
            className="bg-green-600 text-green-100 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            type="submit"
            >
              Entrar
            </button>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
};