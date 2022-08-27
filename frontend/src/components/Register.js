import React, { useState } from "react";

import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  const [data, setData] = useState({ email: "", password: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(data);
  }
  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      text="Уже зарегистрированы? "
      link="Войти"
    >
      <input
        className="form__item login__item form__item_type_email"
        type="text"
        name="email"
        placeholder="Email"
        value={data.email}
        minLength="2"
        maxLength="40"
        required
        id="email"
        onChange={handleChange}
      />
      <span
        className="form__item-error form__item-error_active"
        id="username-error"
      ></span>
      <input
        className="form__item login__item  form__item_type_password"
        type="text"
        name="password"
        placeholder="Пароль"
        value={data.password}
        minLength="2"
        maxLength="200"
        required
        id="password"
        onChange={handleChange}
      />
      <span
        className="form__item-error form__item-error_active"
        id="job-error"
      ></span>
    </AuthForm>
  );
}

export default Register;
