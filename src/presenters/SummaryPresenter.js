import React, {useState, useEffect} from 'react';
import SummaryView from '../views/SummaryView'
import * as api_client from '../services/api_client'


function SummaryPresenter( {route, navigation }) {

    const {blob} = route.params;

    console.log(blob)
    return (
        <div>
            <SummaryView index={true} />
        </div>  
    )
}

export default SummaryPresenter