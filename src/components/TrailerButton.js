import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function TrailerButton(props) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <button
        onClick={toggleShow}
        className="text-center text-sm bg-red-800 hover:bg-red-900 rounded-3xl px-3 py-2.5 inline-flex items-center gap-1"
      >
        <PlayIcon
          width={20}
          height={20}
          color="white"
          className="inline-block"
        />
        Play trailer
      </button>

      <Modal
        show={show}
        onHide={toggleShow}
        backdrop="true"
        keyboard={true}
        size="lg"
        dialogClassName="modal-dialog modal-dialog-centered"
        className="modal-container"
      >
        <Modal.Body className="p-0">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${props.trailerKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
