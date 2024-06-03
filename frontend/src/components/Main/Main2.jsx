import React from 'react'
import Contact from './MainComponents/Contact'
import Experience from './Leftside/Sections/Experience'
import Education from './Leftside/Sections/Education'
import Skill from './Leftside/Sections/Skill'


const tabs = [
    {
        name: 'Contact',
        component: <Contact />
    },
    {
        name: 'Education',
        component: <Education />
    },
    {
        name: 'Experience',
        component: <Experience />
    },
    {
        name: 'Skills',
        component: <Skill />
    }
]

const Main2 = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div className='h-screen'>
            <div className='flex'>
                <div className='flex flex-col px-[15%]'>
                    <div className='flex flex-col'>
                        <h1 className='text-[32px]'>Let’s create your first resume!</h1>
                        <p>Fill the inputs, please.</p>
                    </div>
                    <div>
                        {/* tab */}
                        <div className='flex'>
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex items-center justify-center w-[25%] h-[50px]  cursor-pointer ${activeTab === index ? 'border-b border-primary-500' : ''}`}>
                                    {tab.name}
                                </div>
                            ))}
                        </div>

                        {/* tab content */}
                        {tabs[activeTab].component}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main2;
