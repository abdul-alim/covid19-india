import React from 'react';
import SocialCard from './social';

function Footer() {
    return (
        <footer className="flex justify-center my-10 flex-col items-center">
            <SocialCard github={true} facebook={true} twitter={true} />
        </footer>
    );
}

export default Footer;
