import React, {useState, useEffect} from 'react';
import SummaryView from '../views/SummaryView'
import * as api_client from '../services/api_client'
import { saveAs } from 'file-saver'
import '../views/css/Summary.css'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getBlobsAsync } from '../services/BlobRetriever'


function SummaryPresenter() {
    const dispatch = useDispatch();
    const blob = useSelector((state) => state.blob.value);


    useEffect(() => {
        dispatch(getBlobsAsync())
    }, [getBlobsAsync])

    // const {blobs} = useParams();

    // console.log(blobs)

    // /**
    //  * Downloads the image to the computer
    //  */
    // const downloadImageButton = () => {
    //     saveAs(api_client.get_image_url(blob.image), blob)
    // }

    return (
        <div className="summmaryPresenter">
            <SummaryView
                // downloadImageButton={downloadImageButton}
            />
        </div>  
    )
}

export default SummaryPresenter