function ImageView(props){
    return (
    <div>
        <div>2</div>
        <div className="link" onClick={()=>{props.navTo('home')}}>Go to other page</div>
    </div>
    )
}

export default ImageView;