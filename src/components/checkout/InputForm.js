import { useFormContext, Controller } from "react-hook-form";
import { TextField, Input } from "@material-ui/core";

const InputForm = ({ name, label }) => {
const { control } = useFormContext();
  return (
    <div>
      <Controller
       name={name}
       control={control}
       as={TextField}
       render={({ field }) => <Input {...field} value={field.value || ''} fullWidth placeholder={label} required/>}
      />
    </div>
  );
};
export default InputForm;