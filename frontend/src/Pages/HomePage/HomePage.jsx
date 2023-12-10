import { Loadable } from '../../utils/loadable';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './HomePage.css';
import { getNotifications } from '../../gateway/notifications';
import { getApplications } from '../../gateway/applications';
import { ApplicationRow } from '../../Components/Applications/ApplicationRow';
import { NotificationShort } from '../../Components/Notifications/NotificationShort';

export const HomePage = ({userInfo}) => {

    const [notifications, setNotifications] = useState(new Loadable());
    const [applications, setApplications] = useState(new Loadable());
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const notifs = getNotifications(1, false);
        const applications = getApplications(1);
        notifs.then(x => setNotifications(prev => prev.withValue(x)))
        applications.then(x => setApplications(prev => prev.withValue(x)));
    }, []);

    return <div className="home-page-container">
        <div className="home-grid">
            <div className="search">
                <div className="page-logo">
                    <img src="./assets/logo-dark.svg"></img>
                    <h1>PetPal</h1>
                </div>
                <div className="search-bar">
                    <div className="input-group">
                        <div className="form-outline">
                            <input type="search" className="form-control" placeholder="Search For Listings" value={searchText} onChange={v => setSearchText(v.target.value)} />
                        </div>
                        <Link type="button" className="btn btn-primary" to={`/search?q=${encodeURIComponent(searchText)}`}>
                            <span className="material-symbols-outlined">search</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="notifications">
                <h3>Recent Notifications<span className="material-symbols-outlined">notifications</span></h3>
                {
                    notifications.hasValue &&
                    notifications.value.results.map((notif, i) =>
                        <NotificationShort key={i} notification={notif} userInfo={userInfo}></NotificationShort>)
                }
                {
                    notifications.hasValue && !!notifications.value.next &&
                    <div className='more-button'>
                        <Link to='/notifications'>
                            Show More...
                        </Link>
                    </div>
                }
            </div>
            <div className="applications">
                <h3>Recent Applications<span className="material-symbols-outlined">description</span></h3>
                <div className="d-flex justify-content-center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="sortable sorted">
                                    <div>
                                        Pet Name
                                        <span className="material-symbols-outlined">arrow_drop_down</span>
                                    </div>
                                </th>
                                <th scope="col" className="sortable">
                                    <div>
                                        Shelter
                                        <span className="material-symbols-outlined">arrow_drop_up</span>
                                    </div>
                                </th>
                                <th scope="col" className="sortable">
                                    <div>
                                        Date
                                        <span className="material-symbols-outlined">arrow_drop_up</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applications.hasValue && 
                                applications.value.results.map((application, i) => 
                                    <ApplicationRow key={i} application={application}></ApplicationRow>)
                            }
                            {
                                applications.hasValue && !!applications.value.next &&
                                <tr>
                                    <td colSpan={3}>
                                        <Link to='/my-applications'>
                                            Show More...
                                        </Link>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>;
}