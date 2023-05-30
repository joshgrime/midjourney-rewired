function ImageView(props){
    return (
    <div>
        <div>2</div>
        <div className="link" onClick={()=>{props.port.postMessage({ route: '/get-details' })}}>Send Message</div>
    </div>
    )
}

export default ImageView;