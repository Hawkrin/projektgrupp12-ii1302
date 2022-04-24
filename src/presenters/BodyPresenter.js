import * as api_client from '../services/api_client'
import React, {useState, useEffect} from 'react';
import BodyView from '../views/BodyView';
import { useNavigate } from 'react-router-dom';
import '../views/css/Body.css'
import { saveAs } from 'file-saver'

function BodyPresenter() {

    const [blobs, setBlobs] = useState([]);

    //Navigate the user around the website
    const navigate = useNavigate();

    useEffect(() => {
        async function blobStorage() {

            let blobs = api_client.containerClient.listBlobsFlat();

            console.log(blobs);

            let arrayForBlobs = [];
            let index = 1;
            for await (const blob of blobs) {
                let t = {
                    images: blob.name,
                    datesAndTime: blob.properties.createdOn.getDate() + "/" + 
                    (blob.properties.createdOn.getMonth()+1) + "-" + 
                    blob.properties.createdOn.getFullYear() + " " + 
                    blob.properties.createdOn.getHours() + ":" + 
                    blob.properties.createdOn.getMinutes() + ":" + 
                    blob.properties.createdOn.getSeconds(),
                    blob,
                } 
                
                arrayForBlobs.push(t)
                index++;
            }

            setBlobs(arrayForBlobs);

        }
        return blobStorage;
    }, []) 


    
    const redirect = (index, blob) => {
        return navigate("/summary/" + index, {
            blob
        });
    }

    const downloadImage = () => {
        saveAs(api_client.get_image_url(blobs[0][0]), blobs[0][0])
        saveAs(blobs[0][1], "hello world.txt");
    }

    if (!blobs) {
        return (<h1>Loading...</h1>)
    }

    console.log(blobs)

    return (
        <div className="bodyPresenter">

                {blobs.map((blob, i) => {

                    console.log(blob[i])

                    return (
                        <div key={i} className="elementBox">
                            <BodyView
                                images={blob[i].images}
                                datesAndTime={blob[i].datesAndTime}  
                                index ={i}
                                redirect={redirect}
                                key={i}    
                            />
                        </div>

                    )
                })}
                
                {/* {blobs.map((blob, i) => (
                    <div key={i} className="elementBox">
                        <BodyView
                            images={blob[i].images}
                            datesAndTime={blob[i].datesAndTime}  
                            index ={i}
                            redirect={redirect}
                            key={i}    
                        />
                    </div>
                ))}    */}
                {/* <button onClick={downloadImage}>DOWNLOAD TEST</button> */}
        </div >
    )
}

export default BodyPresenter;