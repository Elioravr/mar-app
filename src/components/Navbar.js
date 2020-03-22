import React, {useState} from 'react';

const handleScroll = (e) => e.preventDefault();
const Navbar = ({title, shouldHaveProfile, shouldHaveCancelButton, moveToMealsListPage}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileClassName = `profile ${isProfileOpen ? 'wide' : ''}`;

    if (isProfileOpen) {
      document.addEventListener('wheel', handleScroll, {passive: false});
    } else {
      document.removeEventListener('wheel', handleScroll, {passive: false});
    }

    const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

    return (
      <div className="navbar">
        <span>{title}</span>
        {shouldHaveProfile && isProfileOpen && <div className="backdrop"></div>}
        {shouldHaveProfile && <div className={profileClassName} onClick={handleProfileClick}></div>}
        {shouldHaveCancelButton &&
          <div className="close-button" onClick={moveToMealsListPage}><span>X</span></div>
        }
      </div>
    )
}

export default Navbar;
