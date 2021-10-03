import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import './Review.css'

const Review = ({ token }) => {
    return(
        <div className="review-container">
        <Typography style={{ background: 'rgb(148, 241, 210)' }} variant="h6" gutterBottom>Order Summary</Typography>
        <List disablePadding>
            {token.live.line_items.map(item => (
                <ListItem style={{padding: '20px 0'}} key={item.name}>
                    <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}/>
                    <Typography variant="body2">{item.line_total.formatted_with_symbol}</Typography>
                </ListItem>
            ))}
            <ListItem style={{paqdding: '10px 0'}}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>{token.live.subtotal.formatted_with_symbol}</Typography>
            </ListItem>
        </List>
        </div>
    );
};

export default Review;