import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TrailerButton(props) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <button
        onClick={toggleShow}
        className="mt-4 text-center text-sm bg-red-800 hover:bg-red-900 rounded-3xl px-6 py-4"
      >
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
              src={`https://www.youtube.com/embed/${props.trailerUrl}?autoplay=1`}
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
