import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import LoadMoreBtn from "./LoadMoreBtn";
import { fetchPictures } from "api/api";


import css from "../css/app.module.css";
const App = () => {
  const [ query, setQuery ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ modalData, setModalData ] = useState();
  const [ pictures, setPictures ] = useState([]);
  const [ , setError ] = useState();
  const [ status, setStatus ] = useState('idle');
  const [ page, setPage ] = useState(1);
  const [ totalHits, setTotalHits ] = useState(0);

  console.log(pictures);

  useEffect(() => {
    if (query) {
      updateGallery();
    }
  },[query, page]);
  // componentDidUpdate=(prevProps, prevState)=> {
  //   const prevQuery = prevState.query;
  //   const newQuery = query;
  //   if (prevQuery !== newQuery) {
  //     console.log(newQuery);
  //     this.setState({ pictures: [] });
  //     updateGallery(newQuery)
  //     this.setState({
  //       status: 'pending',
  //       page: 1,
  //     });
  //   }
  //   if (newQuery === prevQuery && page !== prevState.page) {
  //     updateGallery(prevQuery);
  //   }
  // };

  const updateGallery = () => {
    setStatus('pending');
    fetchPictures( query, page)
      .then(pictures => {
        if (pictures.totalHits === 0) {
          toast(`Nothing was found for query ${query}`);
          console.log(pictures,'No pictures');
        }
        console.log(pictures.hits);
        setPictures(prevState=>[...prevState, ...pictures.hits]);
        setStatus('resolved');
        setTotalHits(pictures.totalHits);
      // this.setState({
      //   pictures: [...pictures, ...pictures.hits],
      //   status: 'resolved',
      //   totalHits: pictures.totalHits,
      // });
    })
    .catch(error => {
      // this.setState({ error, status: 'error' });
      setError('error');
      setStatus('error');
    })
  }

  const toggleModal = (dataInModal) => {
    console.log('toggleModal')
    setShowModal(prevState=>!prevState);
    setModalData(dataInModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    //   modalData: dataInModal,
    // }));
  };
  
  const hideLoadMoreButton = (totalHits, arr) => {
    // console.log(totalHits, arr.length);
    if (!arr) {
      return false;
    } else {
      return totalHits > arr.length;
    }
   
  }


  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1)
      // this.setState((prevState) => ({
      //  page: prevState.page + 1
      // }));
  };
  
  const submitHandler = query => {
    setQuery(query);
    setPictures([]);
    setPage(1);
    setError();
    // this.setState({query});
  };
  
    // const {pictures, showModal} = this.state;
    return <div className={css.App}>
      {showModal && <Modal onClose={toggleModal} img={modalData }/>}
      <Searchbar onSubmit={submitHandler} />
      {status==='pending' && <Loader />}
      {(pictures)&&<ImageGallery pictures={pictures} showModal={toggleModal} />}
      {(hideLoadMoreButton(totalHits, pictures)) && <LoadMoreBtn onClick={loadMoreHandler} />}
      {<ToastContainer /> }
    </div>
};

export default App;

        
        // if (status === 'idle') {
        //     return <div>No data</div>
        // }

        // if (status === 'pending') {
        //     return <Loader/ >
        // }
        
        // if (status === 'rejected') {
        //     return <div>{error.message}</div>
        // }