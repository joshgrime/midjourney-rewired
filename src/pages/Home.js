import React from 'react';

function Home(props){
    return (
    <div>
        <div>HELOOOOOOOOO</div>
        <div className="link" onClick={()=>{props.navTo('imageview')}}>Go to other page</div>
    </div>
    )
}

export default Home;