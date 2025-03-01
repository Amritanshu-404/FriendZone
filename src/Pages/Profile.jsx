import React, { useState } from 'react';
import PersonalInfo from '../Components/PersonalInfo';
import UserPartners from '../Components/UserPartners';
import UserNotification from '../Components/UserNotification';

const UserDetails = () => {
    const [activeTab, setActiveTab] = useState('personal');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='ProfilePage bg-[#181818] w-full h-[624px] flex flex-col justify-center items-center'>
            <div className="links gap-x-10 flex w-2/3">
                <button onClick={() => handleTabChange('personal')}>Personal Info</button>
                <button onClick={() => handleTabChange('partners')}>Working With</button>
                <button onClick={() => handleTabChange('notification')}>Notification</button>
            </div>
            {activeTab === 'personal' && <PersonalInfo />}
            {activeTab === 'partners' && <UserPartners />}
            {activeTab === 'notification' && <UserNotification />}
        </div>
    );
};

export default UserDetails;
