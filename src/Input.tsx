import { Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from './App';

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    required: boolean;
};
// <input>要素を含んだ子コンポーネント
export const Input = ({ label, register, required }: InputProps) => (
    <label>
        {label} :&nbsp;
        <input className="inputBox" {...register(label, { required })} />
    </label>
);