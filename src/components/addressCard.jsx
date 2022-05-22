
export function AddressCard(props){
    const address = props.address
    return(
        <div className="address selected">
            <h5>{address.province}</h5>
            <h5>{address.city}</h5>
            <h5>{address.street}</h5>
            <h5>{address.number}</h5>
            <h5>{address.area_code}</h5>
        </div>
    )
}