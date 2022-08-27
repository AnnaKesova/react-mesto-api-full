import React, {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText={loading ? "Загрузка" : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__item form__item_type_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        id="avatar"
        ref={avatarRef}
      />
      <span
        className="form__item-error form__item-error_active"
        id="avatar-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
