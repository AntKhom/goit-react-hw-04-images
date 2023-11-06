import React, { useEffect } from "react";
import css from "../css/modal.module.css"

const Modal = ({ onClose, img }) => {

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    // componentDidMount() {
    //     window.addEventListener('keydown', this.keyDownHandler);
    // };

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.keyDownHandler);
    // };
    
    const keyDownHandler = e => {
        console.log(e.code)
        if (e.code === 'Escape') {
            onClose();
        };
    };

    const backdropClickHandler = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
        
    }

        return (
            <div className={css.Overlay} onClick={backdropClickHandler}>
                <div className={css.Modal}>
                    <img src={img} alt="" />
                </div>
            </div>
        )   
}

export default Modal;