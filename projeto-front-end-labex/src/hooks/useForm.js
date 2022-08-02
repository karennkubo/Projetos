import React, {useState} from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const cleanFields = () => {
    setForm(initialState)
  }

  return {form, onChange, cleanFields}
}

export default useForm;