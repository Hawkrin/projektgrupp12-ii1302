import React from 'react'
import personImage from '../resources/personTemplate.png'
import './css/CreatorPage.css'

const RenderPerson = ( {name, role, image} ) => {
    return (
        <div className="person">
            <h2 className="creatorName">{name}</h2>
            <h3 className="creatorRole">{role}</h3>
            <img className="creatorImage" src={image} alt=""/>
        </div>
    )
}

function CreatorPageView() {

    return (
        <div>
            <div className="personContainer">
                <RenderPerson name="Malcolm Liljedahl" role="Projektledare" image={personImage}/>
                <RenderPerson name="Nahom Kifle Solomon" role="Kravansvarig" image={personImage}/>
                <RenderPerson name="Robin Fransson" role="Arkitekt" image={personImage}/>
                <RenderPerson name="Maximilian Petersson" role="Utvecklingsansvarig" image={personImage}/>
                <RenderPerson name="Anders Bager Björzén" role="Testansvarig" image={personImage}/>
            </div>
        </div>
    )
}

export default CreatorPageView