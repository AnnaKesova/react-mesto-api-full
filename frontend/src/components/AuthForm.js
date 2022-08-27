import React from "react";
import { Link } from "react-router-dom";

function AuthForm({ title, buttonText, children, onSubmit, text, link }) {
  return (
    <div className="login">
      <form className="form login__form" onSubmit={onSubmit}>
        <h2 className="login__title">{title}</h2>
        {children}
        <button
          type="submit"
          className="button popup__save form__exit"
          title="Согласие"
          aria-label="Согласиться"
        >
          {buttonText}
        </button>
        <p className="form__question">
          {text}
          <span>
            <Link to="/sign-in" className="form__confirm">
              {link}
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
