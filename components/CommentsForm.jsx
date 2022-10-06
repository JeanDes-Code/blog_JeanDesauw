import React, { useRef, useState, useEffect } from 'react';

import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] =
    useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value =
      window.localStorage.getItem('name');
    emailEl.current.value =
      window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });

    return;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Laisser un commentaire
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
          placeholder="Votre commentaire..."
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Nom"
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
        />
        <input
          type="email"
          ref={emailEl}
          placeholder="Adresse email"
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value={true}
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Enregistrer mon nom et mon email pour mon
            prochain commentaire.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-[#CC3333]">
          Tous les champs sont requis.
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease px-8 py-3 cursor-pointer hover:bg-bluish inline-block text-lg rounded-full text-bluish border border-gray-400 hover:text-white"
          onClick={handleCommentSubmission}
        >
          {' '}
          Commenter{' '}
        </button>
        {showSuccessMessage && (
          <span className="text-md float-right font-semibold mt-3 text-[#22c55e] ">
            Votre commentaire a été envoyé, il est en
            attente de modération.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
