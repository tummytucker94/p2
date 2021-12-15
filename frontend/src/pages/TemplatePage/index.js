import React from 'react'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import TemplateList from '../../components/TemplateList';

const TemplatePage = () => {
    return(
        <div>
            <>
            <Navbar />
            <TemplateList />
            <Footer />
            </>
        </div>
    );
}

export default TemplatePage;