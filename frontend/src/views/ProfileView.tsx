import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast} from 'sonner'
import ErrorMessage from '../components/ErrorMessage'
import type { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevTreeAPI'

export default function ProfileView() {
    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ defaultValues: {
        handle: data.handle,
        description: data.description
    } })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data
                }
            })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user : User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    return (
        <form
            className="bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-500/40 shadow-lg shadow-purple-900/40 rounded-2xl p-10 space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-white text-center font-bold tracking-wide">Editar Información</legend>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                    className="text-purple-200 text-sm font-medium"
                >Handle:</label>
                <input
                    type="text"
                    className="bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El Nombre de Usuario es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                    className="text-purple-200 text-sm font-medium"
                >Descripción:</label>
                <textarea
                    className="bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none"
                    placeholder="Tu Descripción"
                    {...register('description', {
                        required: "La Descripción es obligatoria"
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                    className="text-purple-200 text-sm font-medium"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="bg-white/10 border border-purple-400/30 text-purple-200 rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:text-sm file:cursor-pointer hover:file:bg-purple-500 transition-colors cursor-pointer"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 p-3 text-lg w-full uppercase text-white rounded-xl font-bold shadow-lg shadow-purple-900/40 tracking-widest cursor-pointer"
                value='Guardar tus cambios'
            />
        </form>
    )
}