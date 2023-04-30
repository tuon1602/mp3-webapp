import React, { useState } from "react";
import { useEventStore } from "../../store/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../../db/db";
import { db } from "../../db/db";
import Swal from "sweetalert2";
import { Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";

import { useTranslation } from "react-i18next";

const SongModal = () => {
  //i18n
  const { t } = useTranslation();
  //zustand
  const globalSongModalEvent = useEventStore((state) => state.songModalEvent);
  const globalSetSongModalEvent = useEventStore(
    (state) => state.setSongModalEvent
  );
  //react
  const [uploadSongValue, setUploadSongValue] = useState("");
  const [songUrl, setSongUrl] = useState("");

  //formik + yup

  const formik = useFormik({
    initialValues: {
      song_name: "",
      author: "",
      cover_path: "",
      song_path: "",
      lyrics: "",
    },
    validationSchema: Yup.object({
      song_name: Yup.string().required("Required!"),
      author: Yup.string().required("Required!"),
      cover_path: Yup.string().url("Your image link is invalid").nullable(),
      //   song_path: Yup.string().url().required("Required!"),
      song_path: Yup.string()
        .url("This should be mp3 url")
        .required("Required!"),
      lyrics: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      const songCollectionRef = collection(db, "mp3s");
      try {
        const docRef = await addDoc(songCollectionRef, {
          song_path: values.song_path,
          song_name: values.song_name,
          author: values.author,
          cover_path: values.cover_path,
          lyrics: values.lyrics,
        });

        await Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Upload song sucessfull",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
        // add any other success handling code here
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

        // add any error handling code here
      }
    },
  });

  // const [hidden,setHidden ] = useState(false)
  const handleOnHideModal = () => {
    globalSetSongModalEvent(false);
  };
  //   const handleClickCancel = () =>{
  //     globalSetSongModalEvent(false);

  //   }
  const uploadSong = () => {
    if (uploadSongValue === null) {
      Swal.fire({
        icon: "error",
        title: "There's no input song",
        text: "Check your input song",
        showConfirmButton: true,
      });
    }
    const songRef = ref(storage, `${uploadSongValue.name}`);
    uploadBytes(songRef, uploadSongValue).then((snapshot) => {
      setSongUrl("");
      getDownloadURL(songRef).then((url) => {
        setSongUrl(url);
      });
    });
    Swal.fire({
      icon: "info",
      title: "Pending",
      text: "Check your song url box",
      timer: 3000,
    });
  };
  console.log(uploadSongValue.name);
  return (
    //     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    //     {/* Modal content */}
    //   </div>
    <main className={`${globalSongModalEvent ? "block" : "hidden"}`}>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-gray-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-600 text-lg">
                      {t("Add your song")}
                    </span>
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 500 }}
                      placement="top"
                      title="Please check on list prevent duplicate song. Upload your song then press upload song to generate song URL"
                    >
                      <ExclamationCircleIcon className="w-6 h-6 cursor-pointer" />
                    </Tooltip>
                  </div>

                  <button onClick={handleOnHideModal}>
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div class="bg-white px-4 py-3 sm:flex sm:px-6 flex-col mb-2">
                  <div className="flex flex-col mt-2">
                    <div>
                      <label className="text-slate-600 font-bold">
                        {t("Your song file")}
                      </label>
                      <span className="text-red-400"> *</span>
                    </div>
                    <input
                      type="file"
                      onChange={(event) => {
                        setUploadSongValue(event.target.files[0]);
                      }}
                      accept="audio/*"
                    />
                    {uploadSongValue.name ? (
                      <button
                        className="px-4 py-2 bg-slate-600 text-white hover:opacity-50 mt-2"
                        onClick={uploadSong}
                      >
                        {t("Upload song")}
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-slate-600 text-white hover:opacity-50 mt-2 disabled:opacity-50"
                        onClick={uploadSong}
                        disabled
                      >
                        {t("Upload song")}
                      </button>
                    )}
                  </div>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col">
                      <div>
                        <label className="text-slate-600 font-bold">
                          {t("Song name")}
                        </label>
                        <span className="text-red-400"> *</span>
                      </div>
                      <input
                        type="text"
                        name="song_name"
                        value={formik.values.song_name}
                        onChange={formik.handleChange}
                        placeholder= {t("AddSongPlaceholder")}
                      />
                      {formik.errors.song_name && formik.touched.song_name && (
                        <p className="text-red-600">
                          {formik.errors.song_name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col mt-2">
                      <div>
                        <label className="text-slate-600 font-bold">
                          {t("Author")}
                        </label>
                        <span className="text-red-400"> *</span>
                      </div>
                      <input
                        type="text"
                        name="author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        placeholder={t("AuthorPlaceholder")}
                      />
                      {formik.errors.author && formik.touched.author && (
                        <p className="text-red-600">{formik.errors.author}</p>
                      )}
                    </div>
                    <div className="flex flex-col mt-2">
                      <div>
                        <label className="text-slate-600 font-bold">
                          {t("Song Url")}
                        </label>
                        <span className="text-red-400"> *</span>
                      </div>
                      <input
                        type="text"
                        name="song_path"
                        onChange={(event) =>
                          formik.setFieldValue("song_path", event.target.value)
                        }
                        value={(formik.values.song_path = songUrl)}
                        placeholder={t("SongUrlPlaceholder")}
                      />
                      {formik.errors.song_path && formik.touched.song_path && (
                        <p className="text-red-600">
                          {formik.errors.song_path}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col mt-2">
                      <label className="text-slate-600 font-bold">
                        {t("Your background image")}
                      </label>
                      <input
                        type="text"
                        name="cover_path"
                        value={formik.values.cover_path}
                        onChange={formik.handleChange}
                        placeholder={t("BackgroundPlaceholder")}
                      />
                      {formik.errors.cover_path &&
                        formik.touched.cover_path && (
                          <p>{formik.errors.cover_path}</p>
                        )}
                    </div>
                    <div className="flex flex-col mt-2">
                      <label className="text-slate-600 font-bold">
                        {" "}
                        {t("Lyrics")}
                      </label>
                      <textarea
                        type="text"
                        name="lyrics"
                        value={formik.values.lyrics}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.lyrics && formik.touched.lyrics && (
                        <p>{formik.errors.lyrics}</p>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white rounded-md mt-2 hover:opacity-50"
                      >
                        {t("Add")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SongModal;
