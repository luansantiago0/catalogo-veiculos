import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';
import { createCar } from '../actions/createCar';

interface FormData {
  nome: string;
  descricao: string;
  valor: number;
  imagem: FileList;
}

export const ModalNewCar = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { userToken } = useAuthStore();

  const handleFormSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('descricao', data.descricao);
    formData.append('valor', data.valor.toString());
    formData.append('imagem', data.imagem[0]);
    await createCar(formData, `${userToken}`);

    window.location.reload();
  };

  return (
    <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="p-3 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
        Adicionar Novo Carro
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
        <Dialog.Title className="text-black m-0 text-[17px] font-medium">
          Adicionar novo carro
        </Dialog.Title>
        <Dialog.Description className="text-zinc-700 mt-[10px] mb-5 text-[15px] leading-normal">
          Digite as informações do carro a ser adicionado ao catálogo.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-black font-semibold w-[90px] text-right text-[15px]" htmlFor="nome">
            Nome do carro:
          </label>
          <input
            className="text-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="nome"
            placeholder="Digite o nome do carro"
            type="text"
            {...register('nome')}
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-black font-semibold w-[90px] text-right text-[15px]" htmlFor="descricao">
            Descrição do carro:
          </label>
          <input
            className="text-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="descricao"
            placeholder="Digite a descrição do carro"
            {...register('descricao')}
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-black font-semibold w-[90px] text-right text-[15px]" htmlFor="valor">
            Valor:
          </label>
          <input
            className="text-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="valor"
            placeholder="Digite o valor do carro"
            {...register('valor')}
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-black font-semibold w-[90px] text-right text-[15px]" htmlFor="imagem">
            Imagem:
          </label>
          <input
            className="text-gray-800 inline-flex p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type="file"
            id="imagem"
            {...register('imagem', { setValueAs: (v) => v[0] })}
          />
        </fieldset>
        <div className="mt-[25px] flex justify-end">
            <button
            className="bg-green-600 text-green-100 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            type="submit"
            >
              Adicionar Carro
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