


const Review = ({ token }) => {
    return(
        <>
        <h4>Order Summary</h4>
        <ul>
            {token.live.line_items.map(item => (
                <li key={item.name}>
                    <h5>{item.name}</h5>
                    <h5>{item.quantity}</h5>
                    <h4>{item.line_total.formatted_with_symbol}</h4>
                </li>
            ))}
            <li>
              <h3>Total</h3>
              <h3>{token.live.subtotal.formatted_with_symbol}</h3>
            </li>
        </ul>
        </>
    );
};

export default Review;