import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
    const { notifications } = props;
    return(
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <div className="card-title">Notifications</div>
                    <hr/>
                    <ul className="notifications">
                        {notifications && notifications.map((notification,index)=>{
                                return  <li key={index}>
                                            <span className="red-text">{notification.user} </span>
                                            <span>{notification.content}</span>
                                            <div className="grey-text">{moment(notification.time.toDate()).calendar()}</div>
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
